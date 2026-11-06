/**
 * The Cloudflare Turnstile widget logic behind useTurnstile, kept free of React
 * and of the global `window.turnstile` so it can be unit tested.
 */
export type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  getResponse: (widgetId: string) => string | undefined;
  isExpired: (widgetId: string) => boolean;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

/** How long to wait for a token on submit. */
export const TOKEN_WAIT_MS = 8000;
/** Cloudflare tokens expire 300 s after issue; refresh a little before that. */
export const TOKEN_MAX_AGE_MS = 270_000;

export function createHumanCheck({
  getApi,
  now = Date.now,
  sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms)),
}: {
  getApi: () => TurnstileApi | undefined;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
}) {
  const state = { widgetId: undefined as string | undefined, failed: false, needsTick: false, issuedAt: 0 };

  return {
    render(container: HTMLElement, sitekey: string) {
      const api = getApi();
      if (!api) { state.failed = true; return; }
      state.failed = false;
      state.needsTick = false;
      state.issuedAt = 0;
      state.widgetId = api.render(container, {
        sitekey,
        size: "flexible",
        appearance: "interaction-only",
        "refresh-expired": "auto",
        callback: () => { state.issuedAt = now(); },
        "expired-callback": () => { state.issuedAt = 0; },
        "before-interactive-callback": () => { state.needsTick = true; },
        "error-callback": () => { state.failed = true; },
      });
    },

    /** The script failed to load. */
    fail() { state.failed = true; },

    remove() {
      if (state.widgetId !== undefined) getApi()?.remove(state.widgetId);
      state.widgetId = undefined;
    },

    /**
     * The token; "" when the check couldn't run (the server then decides);
     * null while Cloudflare is still waiting for the visitor to tick the box.
     * A token that has expired, or soon will (a form left open in a background
     * tab), is replaced with a fresh one first.
     */
    async token(): Promise<string | null> {
      const api = getApi();
      if (api && state.widgetId !== undefined && !state.failed) {
        const stale = api.isExpired(state.widgetId) || (state.issuedAt > 0 && now() - state.issuedAt > TOKEN_MAX_AGE_MS);
        if (stale) {
          state.issuedAt = 0;
          api.reset(state.widgetId);
        }
      }
      for (let waited = 0; waited < TOKEN_WAIT_MS; waited += 200) {
        if (state.failed) return "";
        const token = state.widgetId !== undefined ? getApi()?.getResponse(state.widgetId) : undefined;
        if (token) return token;
        await sleep(200);
      }
      return state.needsTick ? null : "";
    },

    /** Tokens work once, so every send attempt needs a fresh one. */
    reset() {
      const api = getApi();
      if (state.widgetId === undefined || !api) return;
      state.failed = false;
      state.issuedAt = 0;
      api.reset(state.widgetId);
    },
  };
}
