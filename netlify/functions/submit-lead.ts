// Receives consultation-form submissions from the static site and forwards them to GoHighLevel.
// Keeps GHL_PRIVATE_TOKEN server-side only — never expose it to the client bundle.

type FunctionEvent = {
  httpMethod: string;
  body: string | null;
  headers?: Record<string, string | undefined>;
};

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

// The "Project Details" contact custom field in Sky's GHL location
// ({{contact.project_details}}). GHL matches custom fields by key, so no
// field id is needed here.
const GHL_PROJECT_DETAILS_KEY = "project_details";

// Minimum time (ms) that must elapse between the form rendering and it being
// submitted. Submissions faster than this are almost certainly bots filling
// the form programmatically rather than a person typing.
const MIN_SUBMIT_MS = 3000;

// Simple in-memory sliding-window rate limiter keyed by client IP.
// Note: this resets whenever the function's execution environment is recycled,
// which is fine for the level of abuse this is meant to deter.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitHits = new Map<string, number[]>();

function getClientIp(event: FunctionEvent): string {
  const headers = event.headers || {};
  const nfIp = headers["x-nf-client-connection-ip"];
  if (nfIp) return nfIp;
  const forwardedFor = headers["x-forwarded-for"];
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recentHits = (rateLimitHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recentHits.push(now);
  rateLimitHits.set(ip, recentHits);
  return recentHits.length > RATE_LIMIT_MAX_REQUESTS;
}

interface LeadPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  project?: string;
  sourcePage?: string;
  _gotcha?: string;
  formLoadedAt?: number;
  smsTransactionalOptIn?: unknown;
  smsMarketingOptIn?: unknown;
}

export const handler = async (event: FunctionEvent): Promise<FunctionResponse> => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  const clientIp = getClientIp(event);
  if (isRateLimited(clientIp)) {
    console.warn("submit-lead: rate limit exceeded", clientIp);
    return {
      statusCode: 429,
      body: JSON.stringify({ ok: false, message: "Too many requests. Please wait a few minutes and try again." }),
    };
  }

  let data: LeadPayload;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  // Honeypot — accept quietly without forwarding to GHL.
  if (data._gotcha) {
    console.warn("submit-lead: honeypot triggered, discarding submission silently");
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  // Timing check — a form submitted faster than a human could fill it out is
  // treated the same as the honeypot case: accept quietly, don't forward to GHL.
  if (!data.formLoadedAt || Date.now() - data.formLoadedAt < MIN_SUBMIT_MS) {
    console.warn("submit-lead: submission rejected for suspicious timing, discarding silently");
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();
  const project = data.project?.trim();
  const sourcePage = data.sourcePage?.trim() || "unknown";
  // Only a literal true is consent: a missing or malformed value never opts
  // anyone in to texts.
  const smsTransactional = data.smsTransactionalOptIn === true;
  const smsMarketing = data.smsMarketingOptIn === true;

  if (!firstName || !lastName || !phone) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  const locationId = process.env.GHL_LOCATION_ID;
  const privateToken = process.env.GHL_PRIVATE_TOKEN;

  if (!locationId || !privateToken) {
    console.error("submit-lead: missing GHL_LOCATION_ID or GHL_PRIVATE_TOKEN environment variables");
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfiguration" }) };
  }

  const ghlHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${privateToken}`,
    Version: GHL_API_VERSION,
  };

  try {
    const upsertRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        phone,
        ...(email ? { email } : {}),
        source: "Website Form",
        // Only when the visitor wrote something: an empty value would wipe
        // what a returning contact told us last time.
        ...(project ? { customFields: [{ key: GHL_PROJECT_DETAILS_KEY, field_value: project }] } : {}),
        tags: [
          "website-lead",
          `source:${sourcePage}`,
          ...(smsTransactional ? ["sms-transactional-opt-in"] : []),
          ...(smsMarketing ? ["sms-marketing-opt-in"] : []),
        ],
      }),
    });

    const upsertResult = await upsertRes.json().catch(() => ({}));

    if (!upsertRes.ok) {
      console.error("submit-lead: GHL upsert failed", upsertRes.status, upsertResult);
      return { statusCode: 502, body: JSON.stringify({ error: "Failed to submit lead" }) };
    }

    const contactId = upsertResult?.contact?.id;

    // A note on every lead, not only those with project details: it is the
    // dated record of what the visitor chose for each SMS checkbox, which A2P
    // reviewers and carriers can ask for. Tags alone show only the yeses.
    if (contactId) {
      const note = [
        `Website form submitted ${new Date().toISOString()} from ${sourcePage}`,
        `Service SMS opt-in: ${smsTransactional ? "Yes" : "No"}`,
        `Promotional SMS opt-in: ${smsMarketing ? "Yes" : "No"}`,
        project ? `Project details: ${project}` : "",
      ].filter(Boolean).join("\n");
      await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({ body: note }),
      }).catch((err) => console.error("submit-lead: failed to attach note", err));
    }

    // `delivered` tells the browser this lead reached GHL, so it can report it to
    // GA4. The honeypot and timing replies above leave it out on purpose.
    return { statusCode: 200, body: JSON.stringify({ ok: true, delivered: true }) };
  } catch (err) {
    console.error("submit-lead: GHL request error", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to submit lead" }) };
  }
};
