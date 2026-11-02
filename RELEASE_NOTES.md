# SunFlow ERP v8.0 – release notes

## Architecture (inspected)
Capacitor Android shell + single-page web app (`www/index.html`); records in localStorage, attachments/app backups in
IndexedDB; PDF via jsPDF; Excel via SheetJS; offline signed licences (ECDSA) + optional Google Apps Script server.

## The 10 developments
1. **Licence system** – `server/Code.gs` (Google Sheet): create users, short activation code, validity, activate, extend,
   suspend / reactivate / revoke, device reset, history; **payments** (amount, mode, UPI reference, date, days → extension);
   Admin panel (administrator only, Menu > Admin panel). App re-validates on launch/login, ≤30 s between actions, every
   5 min, on resume and when online again; configurable offline grace (`SEW_GRACE_H`). Reinstall / second phone / old
   backup / phone-date changes cannot revive or restart a licence. Licence data is kept out of business backups.
2. **Sync & auto backup** – Auto backup every 15 days or monthly, to app storage or encrypted cloud (Google Drive via the
   server), with last/next/status/destination/failure shown, Backup now, Export, Restore (file / app / cloud), checksum
   validation, restore replaces (no duplicates) with a safety copy, v6/v7 backups accepted. *Real multi-device sync is not
   possible in this offline-first design* – cloud backup/restore is the supported alternative.
3. **Bottom bar** – Settings and Summary removed; 7 compact buttons (Menu, Dashboard, Sales, Purchase, Customers, Business,
   Reports). Settings remains in the Menu and header gear.
4. **Financial year** – FY 2020–21 … 2029–30 (+ any year that has data) and All years; opens on the current FY from the phone
   date (1 April boundary, timezone setting); chosen year is session-only; a banner shows when you view a non-current year.
5. **Settings UI** – grouped icon rows with titles + one-line descriptions, no wrapping, 60 px touch rows, new sub-page header.
6. **Company name** – header shows it only after a profile is saved; no hard-coded company anywhere (new installs are blank).
7. **Summary** – moved to Customers › PM Surya Ghar › Summary (with filter, FY, back link); removed from bottom bar/menu.
8. **Menu** – Sales (Tax Invoice, Quotation, Delivery Challan, **Sales Order**, **Proforma Invoice**), Purchase (Bill, Order),
   Reports (Business: Sales, Purchase, Profit & Loss, Party Statement, All Parties; GST: GSTR-1, 3B, 2, 9). GST reports are
   reference summaries from saved data and say so.
9. **Analytics first** – Dashboard, Purchase (cards → graph → vendors → heatmap → FY summary → bills → entry → import),
   new Sales overview, PM Surya Ghar and Business registers show analytics/tables before forms and imports.
10. **New logo & icon** – sun + solar panel + growth bars on a deep-teal tile; SVG/PNG assets, Android icons, favicon,
    web manifest; used in header, login/activation, Settings About and Menu.

## Known limitations (not faked)
* No real multi-device sync; business data stays on each phone. A modified APK can remove the lock screen.
* Auto backup cannot run in the background (Android restriction): a due backup runs when the app is opened. App-storage
  backups are lost if the app is uninstalled; use cloud or exported files. Cloud backups hold data only (not attachments).
* “GSTR-2” is not an active return (GSTR-2B comes from the GST portal); GSTR-3B/9 are summaries, not filed returns.
* P&L = recorded sales vs purchases only; no expense register / cash book / stock in this app.
* A5 / landscape printing not supported. Screens were checked with automated tests and rendered PDFs/icons, not on a physical
  phone: please check Settings/Menu layout on your device.
* Live Google deployment of `Code.gs` (and Drive permission) must be done by you; tested here against a mock.

## Tests – last run: **172 passed, 0 failed** (`cd tests && npm install && npm test`)
Includes: GST/discount/round-off maths vs your sample estimate & invoices, PDF pagination, print settings, reports
reconciliation, financial-year boundaries (31 Mar / 1 Apr), company-name header, backup/restore (checksum, legacy, replace,
company-profile retained, safety copy), 15-day/monthly schedule, encrypted cloud backup & restore, wrong passphrase,
licence: activate by short code, suspend while logged in, restart, reactivate, expiry, hour countdown, grace, clock change,
second device/reinstall, payment extension, forged code, wrong admin secret, old backup cannot revive licence.
