/**
 * Resolves a site-relative asset path to wherever assets are currently served
 * from.
 *
 * Images live in two places on purpose: committed under `public/media` in this
 * repo and mirrored to the Cloudflare R2 bucket `skywindowdesigns-public-assets`.
 * `NEXT_PUBLIC_ASSET_BASE_URL` decides which one the browser actually fetches:
 *
 *   set to the R2 base  ->  https://pub-….r2.dev/media/hero.jpg
 *   unset or empty      ->  /media/hero.jpg   (served by Netlify from the repo)
 *
 * That makes rollback an environment-variable change rather than a code change:
 * clear the variable in Netlify, redeploy, and every asset comes off the repo
 * again. Nothing here needs editing for that to work.
 *
 * `NEXT_PUBLIC_` prefixed variables are inlined by Next at build time, so this
 * is resolved during the build and costs nothing at runtime.
 */

const RAW_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";

// Tolerate a trailing slash in the configured value — pasting the URL out of
// the Cloudflare dashboard usually brings one along, and `${base}/media/x`
// would otherwise produce a double slash that R2 serves as a different key.
const ASSET_BASE = RAW_BASE.trim().replace(/\/+$/, "");

/**
 * Only `/media/…` is mirrored to R2 — it is the sole directory under `public/`
 * in this repo. Anything added later that must keep being served from the
 * site's own origin (`robots.txt`, a verification file) will not match this
 * and so will not be rewritten.
 */
const MIRRORED = /^\/media\//;

export function assetUrl(path: string): string {
  if (!path) return path;
  // Already absolute (an external CDN, or a full R2 URL someone hardcoded).
  if (/^(https?:)?\/\//.test(path)) return path;
  if (!ASSET_BASE) return path;
  if (!MIRRORED.test(path)) return path;
  return ASSET_BASE + path;
}

/** The configured base, for diagnostics and for the build-time mirror check. */
export const assetBaseUrl = ASSET_BASE;
