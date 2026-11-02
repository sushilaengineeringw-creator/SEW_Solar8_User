# Upgrade, data migration and rollback (v7 → v8)

* Install the new APK **over** the old one (same package id and `debug.keystore`). Data stays.
* **Before upgrading: Menu > Backup/Restore > Export backup file (include documents).** Keep the file.
* v8 only *adds* data keys (`ab` auto-backup settings, `set.rnd` for new document types, `nums.e/f`, `co.*` already
  existed). Existing customers, purchase bills, business invoices, PM applications, quotations/invoices, bank accounts,
  numbering and attachments are untouched. Saved company profile, bank accounts and terms stay exactly as saved.
* **New installs start with a blank company profile** (no company name, bank or terms pre-filled). Existing installs keep
  what they already saved.
* IndexedDB `sewdocs` is upgraded from version 1 to 2 (adds the `bk` store for app backups). Attachments are untouched.
* Backup file format v2 adds a checksum; v6/v7 backup files are still accepted. Restoring **replaces** the data (no merging,
  so no duplicates) and first saves a safety copy (“pre-restore”) inside the app.
* **Rollback:** install the previous APK (same keystore). If the app does not start, uninstall it, install the old APK and
  use **Restore** with the backup you exported before upgrading. v8 backups restore into v7 (extra keys are ignored).
* Server: updating `Code.gs` is additive (new columns/sheets are created); to roll back paste the old script and redeploy
  a new version.
