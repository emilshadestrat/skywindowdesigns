/**
 * Cloudflare Turnstile: every consultation form puts an invisible human check on the
 * page (client/src/hooks/useTurnstile.ts) and netlify/functions/submit-lead.ts checks
 * its token here before anything reaches GoHighLevel.
 *
 * Lives in netlify/lib, not netlify/functions: Netlify treats every file in the
 * functions directory as a function.
 *
 * Without TURNSTILE_SECRET_KEY the check is off, so this can ship before the secret is
 * set in Netlify. If Cloudflare can't be reached the lead goes through rather than being
 * lost; the honeypot, timing check and rate limit still apply.
 */
export const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const TURNSTILE_FIELD = "cf-turnstile-response";

type Env = Record<string, string | undefined>;
type Fetcher = (url: string, init: RequestInit) => Promise<Pick<Response, "ok" | "status" | "json">>;

/** Resolves true when the lead may go on. */
export async function verifyTurnstile(
  token: unknown,
  remoteIp: string | undefined,
  { fetcher = fetch, env = process.env }: { fetcher?: Fetcher; env?: Env } = {},
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  // Cloudflare's tokens are at most 2048 characters.
  if (typeof token !== "string" || !token || token.length > 2048) {
    console.warn("[turnstile] token refused: missing or malformed token");
    return false;
  }
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let result: { success?: unknown; "error-codes"?: unknown };
  try {
    const response = await fetcher(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) {
      console.error(`[turnstile] siteverify unavailable: HTTP ${response.status}; lead accepted`);
      return true;
    }
    result = (await response.json()) as typeof result;
  } catch (error) {
    console.error(`[turnstile] siteverify unavailable: ${(error as Error)?.name ?? "error"}; lead accepted`);
    return true;
  }
  if (result?.success === true) return true;
  const codes = Array.isArray(result?.["error-codes"]) ? result["error-codes"].join(",") : "";
  console.warn(`[turnstile] token refused: ${codes || "no error codes"}`);
  return false;
}
