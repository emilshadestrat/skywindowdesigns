# Images and static assets

Images live in **two places on purpose**:

| Where | Role |
|---|---|
| `public/media` in this repo | authoritative copy, committed to Git |
| Cloudflare R2 bucket `skywindowdesigns-public-assets` | mirror, serves production traffic |

## Which one the browser actually fetches

`NEXT_PUBLIC_ASSET_BASE_URL`, read by `client/src/lib/assetUrl.ts`:

| Value | Result |
|---|---|
| `https://pub-….r2.dev` | `https://pub-….r2.dev/media/hero.jpg` |
| unset or empty | `/media/hero.jpg`, served by Netlify from this repo |

**Rolling back is an environment-variable change, not a code change.** If the
bucket is deleted, the token expires, or Cloudflare has an outage: clear
`NEXT_PUBLIC_ASSET_BASE_URL` in Netlify, redeploy, and every image comes off
the repo again. Nothing needs editing.

Every image on the site resolves through the `IMAGES` map in
`client/src/lib/siteData.ts`, which is the single place `assetUrl()` is
applied. Two absolute `https://skywindowdesign.com/media/…` URLs in
`client/src/pages/Home.tsx` are JSON-LD `image`/`logo` values and are
deliberately left on the site's own domain — structured data should point at
the canonical host, and those paths keep working because the repo copy stays.

## The drift hazard

Because there are two copies, they can disagree. Add an image to
`public/media`, reference it, deploy — and it **404s in production while
working perfectly on your machine**, because the browser fetches from R2 and
the file was never uploaded.

After adding or replacing anything under `public/media`:

```sh
pnpm assets:sync      # upload whatever is missing from R2
pnpm assets:check     # report drift in both directions, upload nothing
```

`assets:check` exits non-zero when the two sides disagree, so it can be wired
into a pre-push hook or CI.

This is deliberately **not** part of `build`. The build would need R2
credentials to talk to the bucket, and putting write credentials into the build
environment to guard against a mistake in local workflow is a bad trade. The
build only writes the public base URL into the markup; it never contacts R2.

## Verifying a cutover

A missing asset on this site returns **200 with an HTML body**, not a 404 — the
Next runtime serves the catch-all. A status-code check therefore passes on a
broken image. Assert on the content type instead:

```sh
curl -sI "https://<base>/media/hero-coastal-room_f1470a36.jpg" \
  | grep -iE 'HTTP/|content-type|content-length'
# want: 200, content-type: image/jpeg, a plausible content-length
# bad:  200, content-type: text/html  -> the file is not there
```

Two filenames contain parentheses — `SkyLogo(2)_b2bdb6a8.png` and
`SkyLogo(3)_979db2e4.png`. They are legal unencoded in a URL and R2 stores the
key verbatim, but quote them when passing them to `curl`.

Also confirm the legacy redirect still lands on real bytes after cutover; those
URLs are in indexed JSON-LD:

```sh
curl -s -o /dev/null -L -w '%{http_code} %{content_type} %{size_download}\n' \
  "https://skywindowdesign.com/manus-storage/sky-logo_37be9c31.png"
```

> **If the bucket is on `pub-….r2.dev`, you cannot verify this from the office
> network.** Traffic to the Cloudflare IPs fronting `r2.dev` is dropped there;
> the check has to come off cellular. A custom domain removes the problem.

## Credentials

Uploading needs an aws CLI profile (R2 is S3-compatible):

```sh
aws configure --profile r2-skywindowdesigns
# Access Key ID / Secret from Cloudflare > R2 > Manage API Tokens
# Default region name: auto
```

Scope the token to this one bucket with **Object Read & Write** — not
account-wide.

**These credentials do not belong in Netlify.** Only
`NEXT_PUBLIC_ASSET_BASE_URL` does, and that is a public URL, not a secret.

- Account ID: `5930d267d82476bd8e6921d9a847be2c`
- Bucket: `skywindowdesigns-public-assets`
- S3 endpoint: `https://5930d267d82476bd8e6921d9a847be2c.r2.cloudflarestorage.com`
