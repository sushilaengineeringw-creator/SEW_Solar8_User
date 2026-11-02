# SunFlow ERP server (free: Google Sheet + Apps Script + Google Drive)

One small Google Apps Script keeps (1) the authoritative **licence status** and **payments**, and
(2) **encrypted cloud backups**. It runs in YOUR Google account – no hosting, no paid service.

## Set up (once, ~10 minutes, no coding)
1. Sign in to Google. Create a new **Google Sheet** called `SunFlow Licences`.
2. **Extensions > Apps Script**. Delete the sample code, paste all of `server/Code.gs`, click Save.
3. **Project Settings (gear) > Script properties > Add**: name `ADMIN_SECRET`, value = a long password only you
   know (20+ characters). Never share it and never put it in GitHub.
4. **Deploy > New deployment > Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy, then allow the
   permissions Google asks for (Sheets + Drive: Drive is needed for cloud backups). Copy the **Web app URL** (…/exec).
5. In GitHub open `www/config.js`, set `const SEW_SERVER='<your URL>';` and commit. Rebuild BOTH the admin and the
   user APK (same URL in both).
6. Admin app: Menu > Admin panel. The first action asks for the ADMIN_SECRET (kept in memory only).

### Updating an existing server (from v7)
Open the script, replace the code with the new `Code.gs`, Save, then **Deploy > Manage deployments > edit (pencil) >
Version: New version > Deploy**. The URL stays the same. Authorise Drive when asked. Existing licences keep working
(old licences have no short activation code; use the full code for them or create/renew them again).

## Sheet tabs created automatically
`lic` licences · `log` history · `pay` payments (amount, mode, UPI reference, date, days) · `fb` feedback.
Backups are stored in Drive > `SunFlow ERP Backups` > one folder per customer (last 10 kept, encrypted by the app).

## Admin workflow
Create user (Admin panel) → app shows a short **Activation code** (`SFX-XXXX-XXXX`) + password → share by WhatsApp →
customer installs the user APK, enters code + mobile + password → licence is bound to that phone and the countdown
starts at first activation (server time) → you can Extend, **Record payment** (amount, UPI reference, date → licence
extends from today or from its end date), Suspend / Reactivate, change modules, reset the device, revoke.

## What the server enforces
* Suspended / revoked / expired / other-device ⇒ the app locks at the next check (≤30 s between actions, ≤5 min idle,
  on launch/login, on resume and when the network returns). Dates use server time; phone-date changes do nothing.
* One phone per licence. Reinstalling creates a new device id ⇒ refused until you press “Reset device”;
  the original activation time is kept, so a reinstall never restarts a trial.
* Offline: the app works for `SEW_GRACE_H` hours (default 72) after the last successful check, then asks to connect.
* Licence data is not part of business backups, so restoring an old backup cannot revive a suspended licence.

## Honest limits
* Business data lives on each phone (offline-first). The server can lock the app but cannot read or delete that data,
  and someone who rebuilds/modifies the APK could remove the lock screen. Hard server-side enforcement of every
  operation (and true multi-device sync) would require moving all data to a server – a larger redesign.
* Apps Script free quotas apply (about 90 min of script run time per day for a normal Gmail account – enough for a few
  dozen active users). Anyone with the Web app URL can call `check`; only the ADMIN_SECRET can create / suspend / extend.
