# Modern Tech Store — Final GitHub Website

This is the polished responsive website for Modern Tech Store.

## Files

- `index.html` — website structure/content
- `styles.css` — responsive design and brand styling
- `script.js` — mobile navigation
- `assets/modern-tech-store-logo.png` — supplied/cleaned logo
- `assets/pc-build-showcase.png` — existing Modern Tech Store PC showcase image

## GitHub Pages

1. Open the repository on GitHub.
2. Upload/replace the files and the `assets` folder.
3. Commit the changes.
4. Go to **Settings → Pages**.
5. Source: **Deploy from a branch**
6. Branch: **main**
7. Folder: **/ (root)**
8. Save.

## Verified / intentionally left as CHECK THIS

We do not invent business contact information.

- Location: Rawalpindi, Pakistan
- Instagram: `@the_modern_tech_store`
- WhatsApp / Phone: CHECK THIS
- Opening Hours: CHECK THIS

The website links the Instagram buttons to:
https://www.instagram.com/the_modern_tech_store/

## Brand

- Primary: #155EEF
- Light background: #F5F8FF
- Accent: #12B76A
- Headline direction: Space Grotesk
- Body direction: Inter

The site is designed for desktop and mobile screens.


## Customer inquiry form

The website now includes a native-looking 4-field inquiry form:
1. Name
2. Email
3. What are you looking for?
4. What do you need it for + your budget?

The form is designed to match the existing Modern Tech Store website instead of embedding a Google Form inside the page.

### Connect the form to Google Sheets + email

The included `google-apps-script/Code.gs` is the backend.

1. Create a Google Sheet, for example `Modern Tech Store — Inquiries`.
2. Copy the Sheet ID from the Google Sheets URL.
3. Open **Extensions → Apps Script**.
4. Paste the contents of `google-apps-script/Code.gs`.
5. Set:
   - `OWNER_EMAIL` to the email where you want new inquiry alerts.
   - `SHEET_ID` to your Google Sheet ID.
   - Keep the sheet tab name as `Inquiries`, or change `SHEET_NAME`.
6. Run `setup()` once and approve the Google permissions.
7. Deploy → **New deployment** → type **Web app**.
8. Execute as: **Me**.
9. Who has access: **Anyone**.
10. Copy the Web app URL.
11. Open `script.js` and replace:
   `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
   with the Web app URL.
12. Upload the updated files to GitHub and publish GitHub Pages.
13. Test the form from a phone.

### What happens after setup

Customer submits the form → inquiry is added to Google Sheets → you receive an email alert → customer receives a confirmation email.

No product price or response-time promise is hard-coded. Add the real WhatsApp number and any confirmed response time only after checking them.

### Important

The form will not send anywhere until the Apps Script Web app URL is added to `script.js`. This is intentional so the site never sends customer data to an unknown endpoint.
