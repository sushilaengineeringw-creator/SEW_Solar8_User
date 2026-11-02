// Licence / backup server settings. Leave SEW_SERVER empty to use offline licence codes only.
// After deploying server/Code.gs (see server/README.md) paste its Web app URL here and rebuild.
const SEW_SERVER='https://script.google.com/macros/s/AKfycby-OhwfaYHVRqI7KNiKExLvyValWDpefz9dHxDny6LPDzyc8TUa-8cLeoJWbgG2ETS_iA/exec';
const SEW_CHECK_MIN=5;   // re-check the licence every N minutes while the app is open
const SEW_GRACE_H=72;    // hours the app may stay offline after the last successful check
const SEW_SUPPORT='Sushila Engineering Works'; // who users should contact (shown on lock / renewal screens)
