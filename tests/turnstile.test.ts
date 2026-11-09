import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SITEVERIFY_URL, TURNSTILE_FIELD, verifyTurnstile } from "../netlify/lib/turnstile";
import { handler } from "../netlify/functions/submit-lead";
import { turnstileSiteKey } from "../client/src/hooks/useTurnstile";

const env = { TURNSTILE_SECRET_KEY: "test-secret-not-real" };

/** Answers siteverify with `answer` and records what was asked. */
function cloudflare(answer: unknown) {
  const calls: Array<{ url: string; body: URLSearchParams }> = [];
  const fetcher = vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, body: new URLSearchParams(init.body as URLSearchParams) });
    if (answer instanceof Error) throw answer;
    return new Response(typeof answer === "string" ? answer : JSON.stringify(answer), {
      status: typeof answer === "string" ? 502 : 200,
    });
  });
  return { calls, fetcher };
}

describe("verifyTurnstile", () => {
  it("is off without a secret and never calls Cloudflare", async () => {
    const { fetcher } = cloudflare({ success: false });
    expect(await verifyTurnstile(undefined, "1.2.3.4", { fetcher, env: {} })).toBe(true);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("refuses missing or oversized tokens without calling Cloudflare", async () => {
    const { fetcher } = cloudflare({ success: true });
    for (const token of [undefined, "", 42, "x".repeat(2049)]) {
      expect(await verifyTurnstile(token, "1.2.3.4", { fetcher, env })).toBe(false);
    }
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("accepts a token Cloudflare accepts, sent with the secret and the visitor IP", async () => {
    const { calls, fetcher } = cloudflare({ success: true });
    expect(await verifyTurnstile("token-1", "1.2.3.4", { fetcher, env })).toBe(true);
    expect(calls[0].url).toBe(SITEVERIFY_URL);
    expect(Object.fromEntries(calls[0].body)).toEqual({ secret: "test-secret-not-real", response: "token-1", remoteip: "1.2.3.4" });
  });

  it("refuses a token Cloudflare refuses", async () => {
    const { fetcher } = cloudflare({ success: false, "error-codes": ["invalid-input-response"] });
    expect(await verifyTurnstile("forged", "unknown", { fetcher, env })).toBe(false);
  });

  it("lets the lead through when Cloudflare is down, times out, or answers badly", async () => {
    for (const answer of [new Error("down"), new DOMException("timed out", "TimeoutError"), "<html>Bad gateway</html>"]) {
      const { fetcher } = cloudflare(answer);
      expect(await verifyTurnstile("token-1", "1.2.3.4", { fetcher, env })).toBe(true);
    }
    const notJson = vi.fn(async () => new Response("not json", { status: 200 }));
    expect(await verifyTurnstile("token-1", "1.2.3.4", { fetcher: notJson, env })).toBe(true);
  });
});

describe("submit-lead Turnstile check", () => {
  let siteverifyAnswer: unknown;
  const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => {
    if (url === SITEVERIFY_URL) return new Response(JSON.stringify(siteverifyAnswer));
    return new Response(JSON.stringify(url.endsWith("/contacts/upsert") ? { contact: { id: "contact-1" } } : {}));
  });
  let ip = 0;
  const post = () => handler({
    httpMethod: "POST",
    body: JSON.stringify({
      firstName: "Test", lastName: "Lead", phone: "(251) 555-0100", sourcePage: "/contact",
      formLoadedAt: Date.now() - 10_000, [TURNSTILE_FIELD]: "token-1",
    }),
    headers: { "x-nf-client-connection-ip": `198.51.100.${++ip}` },
  });
  const ghlCalls = () => fetchMock.mock.calls.filter(([url]) => String(url).includes("leadconnectorhq.com"));

  beforeEach(() => {
    fetchMock.mockClear();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret-not-real");
    vi.stubEnv("GHL_LOCATION_ID", "test-location");
    vi.stubEnv("GHL_PRIVATE_TOKEN", "test-token");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("refuses a failed check with a 403 and the phone number, without calling GHL", async () => {
    siteverifyAnswer = { success: false, "error-codes": ["timeout-or-duplicate"] };
    const res = await post();
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res.body).message).toContain("(251) 206-7319");
    expect(ghlCalls()).toHaveLength(0);
  });

  it("passes an accepted lead on to GHL without the token, checked with the visitor IP", async () => {
    siteverifyAnswer = { success: true };
    const res = await post();
    expect(res.statusCode).toBe(200);
    const [, verify] = fetchMock.mock.calls.find(([url]) => url === SITEVERIFY_URL)!;
    expect(new URLSearchParams(verify!.body as URLSearchParams).get("remoteip")).toMatch(/^198\.51\.100\./);
    expect(ghlCalls().length).toBeGreaterThan(0);
    for (const [, init] of ghlCalls()) {
      expect(String(init!.body)).not.toContain("token-1");
      expect(String(init!.body)).not.toContain(TURNSTILE_FIELD);
    }
  });
});

describe("Turnstile on the forms", () => {
  it("uses the live key only on skywindowdesign.com and www, and Cloudflare's test key elsewhere", () => {
    expect(turnstileSiteKey("skywindowdesign.com")).toBe("0x4AAAAAAF2pw9zxkd7G5Gh0");
    expect(turnstileSiteKey("www.skywindowdesign.com")).toBe("0x4AAAAAAF2pw9zxkd7G5Gh0");
    expect(turnstileSiteKey("deploy-preview-20--skywindowdesigns.netlify.app")).toBe("1x00000000000000000000AA");
    expect(turnstileSiteKey("localhost")).toBe("1x00000000000000000000AA");
  });

  it("every form renders the widget above its button, reads the token at submit, shows the 403 message and resets", () => {
    for (const file of ["components/ConsultCard.tsx", "components/StandardPage.tsx", "pages/Contact.tsx"]) {
      const source = readFileSync(new URL(`../client/src/${file}`, import.meta.url), "utf8");
      expect(source, file).toMatch(/<div ref=\{turnstile\.containerRef\} \/>\n\s*<button/);
      expect(source, file).toContain("const turnstileToken = await turnstile.getToken();");
      expect(source, file).toContain('"cf-turnstile-response": turnstileToken,');
      expect(source, file).toContain("humanCheckMessage(error) ??");
      expect(source, file).toContain("turnstile.reset();");
      expect(source, file).toContain("if (submitting) return;");
    }
  });
});
