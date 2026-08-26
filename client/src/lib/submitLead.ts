// Shared client for posting consultation-form submissions to the Netlify function
// that forwards them to GoHighLevel (see netlify/functions/submit-lead.ts).

export interface LeadPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  project?: string;
  sourcePage: string;
  formLoadedAt: number;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch("/.netlify/functions/submit-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed with status ${res.status}`);
  }
}
