# Modern Tech Store

Responsive website for Modern Tech Store, a value-focused consumer technology store planned for Rawalpindi, Pakistan.

## Website files

- `index.html` — homepage, product/service information, inquiry form and FAQs
- `quote.html` — sample quotation calculator
- `styles.css` — visual design and responsive layout
- `script.js` — mobile navigation, inquiry form and setup finder
- `assets/` — supplied brand logo and website imagery
- `google-apps-script/Code.gs` — source for the inquiry-form Apps Script backend
- `AUTOMATION-CONTRACTS.md` — integration field names and automation safety notes

## Brand

- Primary blue: `#155EEF`
- Light background: `#F5F8FF`
- Accent green: `#12B76A`
- Headlines: Space Grotesk
- Body: Inter

## Customer inquiry automation

The homepage inquiry form sends a JSON payload to the existing Google Apps Script Web App URL configured as `FORM_ENDPOINT` in `script.js`.

Backend fields:
- `name`
- `email`
- `interest`
- `details`
- `source`

Legacy compatibility aliases are also sent:
- `product` (same value as `interest`)
- `message` (same value as `details`)

The Apps Script source in `google-apps-script/Code.gs` is designed to append a row to the `Inquiries` sheet and send owner and customer emails. The source file currently contains placeholder values for `OWNER_EMAIL` and `SHEET_ID`; do not deploy it as-is. The already deployed Web App is separate from this repository source and must be checked independently.

The browser uses `no-cors`, so the page cannot read the Apps Script JSON response. The UI deliberately does not claim that the sheet write or emails were confirmed. Verify the Sheet row and email delivery during an end-to-end test.

## Sample quotation automation

The quotation page posts to the existing Make webhook using a hidden iframe. The field names, product IDs, demo prices, sample delivery fees, hidden calculation fields and arithmetic are documented in `AUTOMATION-CONTRACTS.md`.

All current quotation prices and delivery fees are illustrative examples only. They are not live store prices, availability or confirmed offers. Replace them with verified business data before using the calculator for real customer quotations.

The iframe can confirm a browser-side form hand-off but cannot confirm that the Make scenario completed or that an email was delivered.

## Deployment

The site is intended for GitHub Pages from the `main` branch and repository root (`/ `). After merging website changes, check the Pages deployment workflow and open the published site on desktop and mobile.

## Pre-launch checks

- Verify the live Apps Script deployment, spreadsheet ID, sheet tab, owner email and customer email behaviour.
- Verify the Make webhook, scenario mappings, quote log and email delivery.
- Replace all sample prices and delivery examples with verified values before production use.
- Confirm product condition, warranty, availability, delivery and contact details before publishing specific claims.
- Submit test inquiries and quotations using test customer details, then verify each backend step separately.

## Contact details

- Location: Rawalpindi, Pakistan
- Instagram: [@the_modern_tech_store](https://www.instagram.com/the_modern_tech_store/)
- WhatsApp / phone: CHECK THIS
- Opening hours: CHECK THIS
