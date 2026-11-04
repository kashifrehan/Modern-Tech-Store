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

### Google Sheets connection

The website is already connected to the Apps Script Web App URL that was deployed for Modern Tech Store.

The current live flow is:

Customer submits the website form → Google Apps Script → your Google Sheet → owner email notification.

The website sends these fields to the deployed script:
- `name`
- `email`
- `product`
- `message`

The form does not contain invented WhatsApp numbers, prices, opening hours, or response-time promises.

### Final GitHub steps

1. Upload/replace `index.html`, `styles.css`, `script.js`, and the `assets` folder in your GitHub repository.
2. Commit the changes.
3. Make sure GitHub Pages is still set to **main → / (root)**.
4. Open the published site.
5. Scroll to **Let’s Find the Right Tech**.
6. Submit a real test inquiry.
7. Confirm the new row appears in your Google Sheet.
8. Confirm your owner email notification arrives.

### What happens after setup

Customer submits the form → inquiry is added to Google Sheets → you receive an email alert.

Customer confirmation email is **not** enabled by the currently deployed Apps Script. Do not advertise that feature on the website unless you add it to the script.

No product price or response-time promise is hard-coded. Add the real WhatsApp number and any confirmed response time only after checking them.

### Important

The form will not send anywhere until the Apps Script Web app URL is added to `script.js`. This is intentional so the site never sends customer data to an unknown endpoint.


## Recent customer-experience improvements

- Added an FAQ section covering availability, budget-led advice, condition, warranty, sample pricing and services.
- Added keyboard skip navigation, visible focus styles and Escape-to-close mobile navigation.
- Product-category cards now preselect the matching inquiry category.
- Inquiry and quotation status messages no longer claim that a backend workflow succeeded when the browser cannot verify it.
- Existing Apps Script and Make endpoint URLs, form field contracts, sample price values and quote calculations are intentionally preserved.

## Automation safety notes

The inquiry form uses the existing Google Apps Script Web App endpoint. Because the browser uses `no-cors`, it cannot read the Apps Script JSON response; the website therefore reports that the request was sent by the browser, not that the sheet/email operation was verified.

The sample quotation form keeps its existing Make webhook, field names, hidden calculation fields, sample products and iframe submission method. The page can detect the iframe hand-off but cannot verify that Make completed downstream modules or delivered an email.

Before production, replace all sample prices and delivery fees with verified values, and verify the deployed Apps Script configuration and Make scenario independently.
