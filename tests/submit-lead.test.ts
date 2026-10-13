// The lead function is where SMS consent becomes a record: a GoHighLevel tag
// for each box the visitor ticked, and a dated note with both answers on
// every lead. Carriers can ask for that proof of opt-in.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handler } from "../netlify/functions/submit-lead";

type Call = { url: string; body: Record<string, unknown> };

let calls: Call[] = [];
let ip = 0;

const lead = { firstName: "Test", lastName: "Lead", phone: "(251) 555-0100", sourcePage: "/contact" };

function post(body: Record<string, unknown>) {
  // A fresh address per request keeps the function's rate limiter out of the way.
  ip += 1;
  return handler({
    httpMethod: "POST",
    body: JSON.stringify({ ...lead, formLoadedAt: Date.now() - 10_000, ...body }),
    headers: { "x-nf-client-connection-ip": `192.0.2.${ip}` },
  });
}

const upsert = () => calls.find((c) => c.url.endsWith("/contacts/upsert"))!.body;
const note = () => String(calls.find((c) => c.url.endsWith("/notes"))?.body.body ?? "");

beforeEach(() => {
  calls = [];
  vi.stubEnv("GHL_LOCATION_ID", "test-location");
  vi.stubEnv("GHL_PRIVATE_TOKEN", "test-token");
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    const body = url.endsWith("/contacts/upsert") ? { contact: { id: "contact-1" } } : {};
    return new Response(JSON.stringify(body), { status: 200 });
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("submit-lead SMS consent", () => {
  it("tags only the boxes the visitor ticked", async () => {
    const res = await post({ smsTransactionalOptIn: true, smsMarketingOptIn: false });
    expect(res.statusCode).toBe(200);
    expect(upsert().tags).toEqual(["website-lead", "source:/contact", "sms-transactional-opt-in"]);
  });

  it("tags both when both are ticked", async () => {
    await post({ smsTransactionalOptIn: true, smsMarketingOptIn: true });
    expect(upsert().tags).toEqual(["website-lead", "source:/contact", "sms-transactional-opt-in", "sms-marketing-opt-in"]);
  });

  it("never reads a missing or non-boolean value as consent", async () => {
    await post({ smsTransactionalOptIn: "true", smsMarketingOptIn: "on" });
    expect(upsert().tags).toEqual(["website-lead", "source:/contact"]);
  });

  it("writes a dated note with both answers on every lead, even without project details", async () => {
    await post({});
    expect(note()).toMatch(/^Website form submitted \d{4}-\d\d-\d\dT[\d:.]+Z from \/contact$/m);
    expect(note()).toContain("Service SMS opt-in: No");
    expect(note()).toContain("Promotional SMS opt-in: No");
    expect(note()).not.toContain("Project details");
  });

  it("adds the project details to the same note", async () => {
    await post({ smsMarketingOptIn: true, project: "Three bedroom windows" });
    expect(note()).toContain("Service SMS opt-in: No");
    expect(note()).toContain("Promotional SMS opt-in: Yes");
    expect(note()).toContain("Project details: Three bedroom windows");
  });
});
