import { describe, expect, it, vi } from "vitest";
import { createHumanCheck, TOKEN_MAX_AGE_MS, type TurnstileApi } from "../client/src/lib/turnstileWidget";

function fakeApi() {
  const widget = { token: "" as string | undefined, expired: false, options: {} as Record<string, unknown> };
  const api: TurnstileApi = {
    render: (_container, options) => { widget.options = options; return "w1"; },
    getResponse: () => widget.token,
    isExpired: () => widget.expired,
    reset: vi.fn(() => { widget.token = undefined; }),
    remove: vi.fn(),
  };
  return { api, widget };
}
const issue = (widget: { token?: string; options: Record<string, unknown> }, token: string) => {
  widget.token = token;
  (widget.options.callback as (token: string) => void)(token);
};

describe("Turnstile widget", () => {
  it("returns a fresh token, and refreshes one older than 270 s before sending", async () => {
    let clock = 1_000_000;
    const { api, widget } = fakeApi();
    const sleep = vi.fn(async () => { clock += 200; if (!widget.token) issue(widget, "fresh"); });
    const human = createHumanCheck({ getApi: () => api, now: () => clock, sleep });
    human.render({} as HTMLElement, "site-key");
    expect(widget.options).toMatchObject({ size: "flexible", appearance: "interaction-only", "refresh-expired": "auto" });
    issue(widget, "first");
    expect(await human.token()).toBe("first");
    expect(api.reset).not.toHaveBeenCalled();
    clock += TOKEN_MAX_AGE_MS + 1;
    expect(await human.token()).toBe("fresh");
    expect(api.reset).toHaveBeenCalledTimes(1);
  });

  it("refreshes a token Cloudflare reports as expired", async () => {
    const { api, widget } = fakeApi();
    const sleep = vi.fn(async () => { if (!widget.token) issue(widget, "fresh"); });
    const human = createHumanCheck({ getApi: () => api, sleep });
    human.render({} as HTMLElement, "site-key");
    issue(widget, "stale");
    widget.expired = true;
    expect(await human.token()).toBe("fresh");
    expect(api.reset).toHaveBeenCalledTimes(1);
  });

  it("sends an empty token when the widget errored or the script failed, and null while a tick is needed", async () => {
    const { api, widget } = fakeApi();
    const human = createHumanCheck({ getApi: () => api, sleep: async () => undefined });
    human.render({} as HTMLElement, "site-key");
    (widget.options["before-interactive-callback"] as () => void)();
    expect(await human.token()).toBeNull();
    (widget.options["error-callback"] as () => void)();
    expect(await human.token()).toBe("");
    const noScript = createHumanCheck({ getApi: () => undefined, sleep: async () => undefined });
    noScript.fail();
    expect(await noScript.token()).toBe("");
  });

  it("resets the widget after a send so the next attempt gets a new token", () => {
    const { api } = fakeApi();
    const human = createHumanCheck({ getApi: () => api });
    human.render({} as HTMLElement, "site-key");
    human.reset();
    expect(api.reset).toHaveBeenCalledWith("w1");
  });
});
