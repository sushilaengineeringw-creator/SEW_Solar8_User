# SunFlow ERP

Build the APK with GitHub Actions (`.github/workflows/build.yml`).
1. Upload everything in this folder to the repository (keep `debug.keystore`, `icons`, `www`, `.github`).
2. **Admin build:** leave `www/pubkey.js` as `const ADMIN_PUB=null;`, install, create the admin password.
3. **User build:** copy the public key line (Menu > Settings > Licence & security) into `www/pubkey.js` in the user repository.
4. **Server (licences, payments, cloud backup):** follow `server/README.md`, put its URL in `www/config.js`.
5. Details: `RELEASE_NOTES.md`, `MIGRATION_AND_ROLLBACK.md`, `tests/README.md`. No secrets are stored in this repository.
