// Shared client for posting consultation-form submissions to the Netlify function
// that forwards them to GoHighLevel (see netlify/functions/submit-lead.ts).

const GA4_MEASUREMENT_ID = "G-XKMPRYNWCQ";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface LeadPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  project?: string;
  sourcePage: string;
  formLoadedAt: number;
  // The two optional SMS checkboxes (see lib/smsConsent.ts). Stored on the
  // GoHighLevel contact as tags and in the submission note.
  smsTransactionalOptIn: boolean;
  smsMarketingOptIn: boolean;
}

/**
 * Reports a lead that reached GoHighLevel to GA4 as its recommended
 * `generate_lead` event. The site has no GTM container, so this is the only
 * place a lead reaches GA4. The forms stay on the page after a lead (no
 * redirect), so gtag has time to send the batched hit. Never pass a name, email
 * or phone number: event parameters are stored in Google Analytics.
 */
export function trackGenerateLead(formName: string, sourcePage: string): void {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "generate_lead", {
      send_to: GA4_MEASUREMENT_ID,
      form_name: formName,
      source_page: sourcePage,
    });
  } catch {
    // Tracking must never surface an error to the visitor.
  }
}

export async function submitLead(payload: LeadPayload, formName: string): Promise<void> {
  const res = await fetch("/.netlify/functions/submit-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed with status ${res.status}`);
  }

  // The function answers bot submissions (timing check) with the same 200, so the
  // bot sees nothing different; only a lead it forwarded comes back `delivered`.
  const result = (await res.json().catch(() => ({}))) as { delivered?: boolean };
  if (result.delivered === true) trackGenerateLead(formName, payload.sourcePage);
}
