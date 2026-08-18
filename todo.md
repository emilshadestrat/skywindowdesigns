# Release Synchronization Checklist

- [x] Verify GitHub authorization for https://github.com/emilshadestrat/skywindowdesigns.git and identify the Netlify site.
- [x] Confirm the production build output and prepare the migration commit without reinitializing or resetting the existing repository.
- [x] Push the completed Next.js migration to the confirmed GitHub repository.
- [x] Restore checkpoint e89710d9 and verify the Next.js App Router source and static export.
- [ ] Resolve the GitHub connector state mismatch, then replace the GitHub main branch content with the restored Next.js migration.
- [ ] Connect the existing https://skywindowdesigns.netlify.app site to GitHub main and configure the static-export build.
- [ ] Confirm the published https://skywindowdesigns.netlify.app deployment status.
- [ ] Document the synchronized GitHub and Netlify release configuration and any deferred follow-up.
