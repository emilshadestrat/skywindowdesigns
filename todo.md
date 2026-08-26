# Release Synchronization Checklist

- [x] Verify GitHub authorization for https://github.com/emilshadestrat/skywindowdesigns.git and identify the Netlify site.
- [x] Confirm the production build output and prepare the migration commit without reinitializing or resetting the existing repository.
- [x] Push the completed Next.js migration to the confirmed GitHub repository.
- [x] Restore checkpoint e89710d9 and verify the Next.js App Router source and static export.
- [x] Replace the GitHub main branch with the restored Next.js migration using a guarded force-with-lease update.
- [x] Verify refreshed Netlify authorization for site `165c91fc-1d0a-4c6f-8b5d-d4c475c4c967`.
- [x] Add repository-based Netlify configuration for `pnpm build` with publish directory `dist` and synchronize it to GitHub `main`.
- [x] Deploy and confirm the published https://skywindowdesigns.netlify.app release.
- [x] Document the synchronized GitHub and Netlify release configuration and deployment verification.
- [x] Confirm in Netlify Site configuration that the existing site is linked to `emilshadestrat/skywindowdesigns` on `main` for future automatic Git-triggered builds. Verified 2026-08-26: repo is linked, auto publishing is on, and commits to `main` deploy automatically (confirmed via three consecutive auto-triggered deploys).
- [x] Reconcile the restored local `main` branch with GitHub and confirm no release records remain unpushed.
- [x] Recheck the current Netlify production deploy for `skywindowdesigns.netlify.app` and confirm it remains ready.

## Post-launch fixes

- [x] Fixed 2026-08-26: Both consultation forms (`/contact` and the per-service-page consult card) were client-side no-ops since launch — submissions showed a success message but were never sent anywhere. Now wired to GoHighLevel via a Netlify function (`netlify/functions/submit-lead.ts`) using `GHL_LOCATION_ID`/`GHL_PRIVATE_TOKEN`. Verified live with a real test submission (200 response, clean function log).
- [ ] Open items from pre-migration audits (`REVIEW.md`, `SEO_AUDIT.md`) haven't been rechecked against the current Next.js codebase — those audits pre-date the migration and reference the old Vite/CSR stack (App.tsx, index.html, Express). Some items (robots.txt, sitemap.xml) appear already addressed via `app/robots.ts`/`app/sitemap.ts` but this hasn't been confirmed page-by-page.
