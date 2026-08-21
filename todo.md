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
- [ ] Confirm in Netlify Site configuration that the existing site is linked to `emilshadestrat/skywindowdesigns` on `main` for future automatic Git-triggered builds.
- [ ] Reconcile the restored local `main` branch with GitHub and confirm no release records remain unpushed.
- [ ] Recheck the current Netlify production deploy for `skywindowdesigns.netlify.app` and confirm it remains ready.
