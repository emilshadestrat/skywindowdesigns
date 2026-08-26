// Receives consultation-form submissions from the static site and forwards them to GoHighLevel.
// Keeps GHL_PRIVATE_TOKEN server-side only — never expose it to the client bundle.

type FunctionEvent = {
  httpMethod: string;
  body: string | null;
};

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

interface LeadPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  project?: string;
  sourcePage?: string;
  _gotcha?: string;
}

export const handler = async (event: FunctionEvent): Promise<FunctionResponse> => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  let data: LeadPayload;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  // Honeypot — accept quietly without forwarding to GHL.
  if (data._gotcha) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();
  const project = data.project?.trim();
  const sourcePage = data.sourcePage?.trim() || "unknown";

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
        tags: ["website-lead", `source:${sourcePage}`],
      }),
    });

    const upsertResult = await upsertRes.json().catch(() => ({}));

    if (!upsertRes.ok) {
      console.error("submit-lead: GHL upsert failed", upsertRes.status, upsertResult);
      return { statusCode: 502, body: JSON.stringify({ error: "Failed to submit lead" }) };
    }

    const contactId = upsertResult?.contact?.id;

    if (contactId && project) {
      await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({ body: `Project details (submitted from ${sourcePage}): ${project}` }),
      }).catch((err) => console.error("submit-lead: failed to attach note", err));
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("submit-lead: GHL request error", err);
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to submit lead" }) };
  }
};
