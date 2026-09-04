# Blog CMS (Keystatic)

Posts are edited at **`/keystatic`** and stored as Git-tracked files at
`content/blog/<slug>/index.yaml`. The directory name is the URL slug.

## What this replaced

There was no blog. `client/src/pages/Blog.tsx` said so in its own header
comment — *"Placeholder blog/resource hub page for content marketing. Will be
populated with articles in a future sprint"* — and the live page told visitors
to check back soon. There was no article route, no post data and no content
files, so nothing was migrated: this is a new blog rather than a move.

Nothing was stranded either, which is why this change carried no content risk.

## Why the static export had to go

`next.config.ts` set `output: "export"`, and the site deployed a copied
`dist/` of flat files. Keystatic needs two things a static export cannot serve:

- `/keystatic` — a `force-dynamic` page
- `/api/keystatic/[...params]` — a route handler

So the site now builds through Netlify's Next runtime
(`@netlify/plugin-nextjs`) and publishes `.next`, matching the rest of the
portfolio. **Every page is still prerendered** — dropping the export changes
how output is served, not whether pages are pre-built.

All 26 URLs in the sitemap were confirmed returning 200 before the change and
again afterwards on a local production build.

## Scheduling

A post is public only when **status is `published`** and its **publishDate has
arrived**. Both blog routes and the sitemap set `revalidate = 3600`, so a
scheduled post appears on its own date without a redeploy.

`generateStaticParams` emits every **non-draft** slug, including future-dated
ones. The article route sets `dynamicParams = false`, so a slug omitted there
404s permanently and could never revalidate into an article. Drafts are excluded
deliberately — a draft has no date commitment and should not hold a route.

The sitemap lists only posts whose date has passed, so a scheduled post never
appears there before the page exists.

## `content/blog/_example-post`

A draft template covering every block type, kept for editors to duplicate.
Drafts are never published whatever their date, so it stays invisible.

## The build guard

`scripts/sync-blog-content.mjs` runs from `pnpm build` and `pnpm dev`. It
generates nothing — `lib/blog.ts` reads the content files directly — but it
fails the build on a malformed post (missing title, excerpt or publishDate; a
publishDate that is not `YYYY-MM-DD`; an unknown status; a body that is not a
list) rather than letting it throw mid-render. It also prints what is live,
scheduled and draft on every build.

## The trap that breaks deploys

`outputFileTracingIncludes` in `next.config.ts` ships `content/**` into the
serverless bundle. Next cannot trace the reader's dynamic filesystem reads, so
without it every post 404s in production while working perfectly on a local
`next build && next start`. This exact failure has bitten several sites in this
portfolio.

## Required environment variables

`next build` fails outright if these are missing — the whole build, not just
`/keystatic`: `KEYSTATIC_SECRET`, `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
Set them in production, deploy-preview and branch-deploy before merging.

Placeholders are enough to build and deploy; they only need real values to sign
in. **This repo is on the `emilshadestrat` account**, not `cody-del`, so it
needs its own GitHub App — create it from **`/keystatic/setup`** on the deployed
site, not plain `/keystatic`, which redirects to GitHub with the placeholder
client ID and fails.
