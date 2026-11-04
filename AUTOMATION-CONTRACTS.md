# Modern Tech Store — Automation Contracts

This document records the existing website-to-automation interfaces. Treat these as integration contracts: do not rename fields, replace endpoint URLs, or change calculation semantics without checking the connected Google Apps Script deployment, Google Sheet and Make scenario first.

## 1. Customer inquiry form

**Browser file:** `script.js`  
**Form:** `#inquiry-form` in `index.html`  
**Destination:** Existing Google Apps Script Web App endpoint in `script.js` (`FORM_ENDPOINT`).

The browser sends a JSON body containing:

| Field | Purpose |
|---|---|
| `name` | Customer name |
| `email` | Customer email |
| `interest` | Category the customer selected; Apps Script backend field |
| `details` | Customer needs and budget; Apps Script backend field |
| `source` | Origin marker (`website`) |
| `product` | Legacy compatibility alias for `interest` |
| `message` | Legacy compatibility alias for `details` |

The Apps Script source in `google-apps-script/Code.gs` reads `name`, `email`, `interest`, `details` and `source`. It appends the inquiry to the `Inquiries` sheet and sends owner/customer emails when its deployed configuration and permissions allow it.

**Important browser limitation:** the website currently uses `fetch(..., { mode: "no-cors" })`. The browser receives an opaque response and cannot read the Apps Script JSON result. The page must not claim that the sheet write or emails were confirmed. The current UI says the browser sent the request but that storage cannot be verified.

The Apps Script source file contains placeholder values for `OWNER_EMAIL` and `SHEET_ID`. Do not deploy that source as-is. Verify the live deployment separately; editing this repository file does not update an already deployed Apps Script Web App.

## 2. Sample quotation form

**Browser file:** `quote.html`  
**Form:** `#quote-form`  
**Destination:** Existing Make webhook in the form's `action` attribute.  
**Transport:** Standard HTML form POST to a hidden iframe.

The existing field names are part of the Make mapping and must remain stable:

- `customer_name`
- `email`
- `product_id`
- `quantity`
- `delivery_city`
- `request_id`
- `product_name`
- `unit_price`
- `delivery_fee`
- `subtotal`
- `total`
- `sample_mode`
- `customer_notes`

The calculator currently uses demonstration product values and demonstration delivery fees. It calculates subtotal as unit price × quantity and total as subtotal + delivery fee. Keep the visible warning that these are illustrative values; they are not current store prices, stock or confirmed offers.

The iframe can indicate that the browser handed the request to the endpoint, but it cannot prove that Make completed its scenario or delivered an email. The page must describe this limitation honestly.

## 3. Safe change checklist

Before changing either integration:

1. Inspect the live Apps Script deployment and confirm the target spreadsheet/tab and email settings.
2. Inspect the Make scenario's webhook trigger and every downstream field mapping.
3. Preserve field names and value formats unless the corresponding backend mapping is updated and tested.
4. Use test customer details and clearly labelled sample products for end-to-end tests.
5. Confirm the Google Sheet row, owner notification and customer confirmation (where enabled) separately.
6. Confirm the Make execution, quote log and email separately.
7. Never represent a browser-side form hand-off as proof of a completed backend workflow.

## 4. Current scope

This website refresh changes presentation, navigation, accessibility and status messaging. It does not intentionally change either endpoint URL, the Apps Script sheet schema, the Make webhook, quotation field names, sample product IDs, sample prices, delivery fee examples or arithmetic.
