# Meta Pixel Verification Checklist (Preview Only)

Pixel ID: **1783200566262940** · Events: **PageView** (automatic) and **Lead** (on successful inquiry submission)

Use this checklist on the Lovable preview or the published URL. No publishing is required to run these checks in the preview.

---

## Setup (one time)

- [ ] Install the free **Meta Pixel Helper** Chrome extension
- [ ] Disable any ad blocker for the test (ad blockers can stop the pixel from firing — this is normal and affects real visitors too)
- [ ] Open Meta **Events Manager** → your pixel → **Test Events** tab (optional, for live confirmation)

---

## 1. PageView event

- [ ] Open the website in a fresh tab
- [ ] Click the Meta Pixel Helper extension icon
- [ ] Confirm it shows **one** pixel with ID `1783200566262940`
- [ ] Confirm a **PageView** event is listed (green)
- [ ] Confirm the pixel appears **only once** (no duplicates)
- [ ] Navigate between sections (Home, About, Skills, Projects, etc.) — these are same-page scrolls, so no extra PageView is expected

## 2. Lead event — must NOT fire

- [ ] Open the Contact section and click **Send Inquiry** with empty fields
- [ ] Confirm validation messages appear under the fields
- [ ] Confirm Meta Pixel Helper shows **no Lead event**
- [ ] Fill in an invalid email (e.g. `abc`) and submit
- [ ] Confirm **no Lead event** fires

## 3. Lead event — must fire exactly once

- [ ] Fill the form completely: Full Name, valid Email, an "Interested In" option, and Inquiry Details
- [ ] Click **Send Inquiry**
- [ ] Confirm the thank-you message appears
- [ ] Confirm Meta Pixel Helper shows a **Lead** event (green)
- [ ] Confirm the Lead event fired **exactly once** for that submission
- [ ] Check your Google Sheet — the test row should appear (delete it afterwards)

## 4. Meta Events Manager confirmation

- [ ] In Events Manager → Test Events, confirm PageView and Lead appear with your browser listed as the source
- [ ] Note: events can take up to ~20 minutes to show in the overview reports

---

## Known limitations

- The form submits to Google Apps Script in a mode where the browser cannot read Google's reply, so "success" (and the Lead event) means the data was sent — the same moment the thank-you message shows.
- Visitors with ad blockers may not fire pixel events; this is expected for all browser pixels.
- Conversions API (server-side tracking) is intentionally not installed yet.
