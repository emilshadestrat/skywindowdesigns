# Next.js Migration Baseline

## Migration Classification

This is a **framework migration with URL preservation**. The plan is to retain the current public paths and the approved page copy while replacing client-rendered Vite routing and client-side metadata injection with statically generated Next.js App Router pages and server-rendered metadata.

## Current URL Inventory

| Route group | Paths to preserve |
|---|---|
| Core | `/`, `/contact`, `/about`, `/window-treatments`, `/design-services`, `/service-areas`, `/blog` |
| Window treatment services | `/roller-shades`, `/motorized-shades`, `/draperies-curtains`, `/plantation-shutters`, `/cellular-honeycomb-shades`, `/roman-shades`, `/blinds` |
| Design and supporting services | `/wallpaper-interior-design`, `/commercial-window-treatments`, `/visualizer`, `/window-treatment-repairs` |
| Location pages | `/locations/gulf-shores-al`, `/locations/foley-al`, `/locations/fairhope-al`, `/locations/pensacola-fl`, `/locations/gulf-breeze-fl`, `/locations/navarre-fl` |
| Legal and utility | `/privacy`, `/accessibility`, `/404` |

## SEO Assets to Carry Forward

The current project contains page-level titles, meta descriptions, canonical paths, breadcrumbs, local-business/service/FAQ schemas, and crawl assets in the Vite application. The migration will convert these to Next.js metadata, server-rendered JSON-LD, `app/robots.ts`, `app/sitemap.ts`, and preserved `llms.txt` without changing approved page copy.

## Risk Controls

The migration will keep URL paths unchanged, use a single canonical target, statically render every public route, prevent client-side-only SEO metadata, and retain every existing internal navigation path. The current canonical records reference `https://skywindowdesign.com`; this will remain the production canonical base unless the business confirms another primary domain before release.

## Optional Pre-Launch Data

An exported Google Search Console performance report is not required to build the migration, but it is the preferred source for checking high-impression URLs and establishing a before/after organic-search baseline. If provided, it will be incorporated before release.
