# Release Synchronization Checklist

- [x] Verify GitHub authorization for https://github.com/emilshadestrat/skywindowdesigns.git and identify the Netlify site.
- [x] Confirm the production build output and prepare the migration commit without reinitializing or resetting the existing repository.
- [x] Push the completed Next.js migration to the confirmed GitHub repository.
- [x] Restore checkpoint e89710d9 and verify the Next.js App Router source and static export.
- [x] Replace the GitHub main branch with the restored Next.js migration using a guarded force-with-lease update.
- [ ] Await the Netlify authorization refresh for site `165c91fc-1d0a-4c6f-8b5d-d4c475c4c967`; current project lookup returns HTTP 401 after reconnection.
- [ ] Connect the existing https://skywindowdesigns.netlify.app site to GitHub main and configure the static-export build after Netlify authorization is restored.
- [ ] Confirm the published https://skywindowdesigns.netlify.app deployment status.
- [ ] Document the synchronized GitHub and Netlify release configuration, including the deferred Netlify authorization follow-up.
