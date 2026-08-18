# Release Synchronization Checklist

- [x] Verify GitHub authorization for https://github.com/emilshadestrat/skywindowdesigns.git and identify the Netlify site.
- [x] Confirm the production build output and prepare the migration commit without reinitializing or resetting the existing repository.
- [x] Push the completed Next.js migration to the confirmed GitHub repository.
- [x] Restore checkpoint e89710d9 and verify the Next.js App Router source and static export.
- [ ] Replace the GitHub main branch content with the restored Next.js migration.
- [ ] Configure the existing https://skywindowdesigns.netlify.app site to build the GitHub main branch as a static export.
- [ ] Confirm the published https://skywindowdesigns.netlify.app deployment status.
