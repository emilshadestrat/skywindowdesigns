// generate_lead must reach GA4 once per lead that reached GoHighLevel, and never
// for a failed request or a bot the lead function dropped quietly.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handler } from "../netlify/functions/submit-lead";
import { submitLead } from "../client/src/lib/submitLead";

const payload = {
  firstName: "Test",
  lastName: "Lead",
  phone: "(251) 555-0100",
  email: "test-lead@example.com",
  sourcePage: "/contact",
  formLoadedAt: Date.now() - 10_000,
  smsTransactionalOptIn: false,
  smsMarketingOptIn: false,
};

let ip = 0;
function callFunction(body: Record<string, unknown>) {
  ip += 1;
  return handler({
    httpMethod: "POST",
    body: JSON.stringify(body),
    headers: { "x-nf-client-connection-ip": `198.51.100.${ip}` },
  });
}

describe("submit-lead tells the browser which leads were delivered", () => {
  beforeEach(() => {
    vi.stubEnv("GHL_LOCATION_ID", "test-location");
    vi.stubEnv("GHL_PRIVATE_TOKEN", "test-token");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ contact: { id: "contact-1" } }), { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("marks a forwarded lead delivered", async () => {
    const res = await callFunction(payload);
    expect(JSON.parse(res.body)).toEqual({ ok: true, delivered: true });
  });

  it("leaves bot submissions undelivered, with the same 200", async () => {
    for (const bot of [{ ...payload, _gotcha: "spam" }, { ...payload, formLoadedAt: Date.now() }]) {
      const res = await callFunction(bot);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body)).toEqual({ ok: true });
    }
  });
});

describe("submitLead sends generate_lead", () => {
  let gtag: ReturnType<typeof vi.fn>;
  const reply = (status: number, body: unknown) =>
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(body), { status })));

  beforeEach(() => {
    gtag = vi.fn();
    vi.stubGlobal("window", { gtag });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("once for a delivered lead, with only the form name and page", async () => {
    reply(200, { ok: true, delivered: true });
    await submitLead(payload, "Contact page form");
    expect(gtag.mock.calls).toEqual([
      ["event", "generate_lead", { send_to: "G-XKMPRYNWCQ", form_name: "Contact page form", source_page: "/contact" }],
    ]);
    const sent = JSON.stringify(gtag.mock.calls);
    for (const pii of [payload.firstName, payload.lastName, payload.phone, payload.email]) expect(sent).not.toContain(pii);
  });

  it("never for a bot the function dropped", async () => {
    reply(200, { ok: true });
    await submitLead(payload, "Contact page form");
    expect(gtag).not.toHaveBeenCalled();
  });

  it("never for a failed request", async () => {
    reply(502, { error: "Failed to submit lead" });
    await expect(submitLead(payload, "Contact page form")).rejects.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });

  it("still resolves when gtag is missing or throws", async () => {
    reply(200, { ok: true, delivered: true });
    vi.stubGlobal("window", {});
    await expect(submitLead(payload, "Contact page form")).resolves.toBeUndefined();
    reply(200, { ok: true, delivered: true });
    vi.stubGlobal("window", { gtag: () => { throw new Error("blocked"); } });
    await expect(submitLead(payload, "Contact page form")).resolves.toBeUndefined();
  });
});
