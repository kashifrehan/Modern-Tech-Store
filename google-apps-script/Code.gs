/*
  Modern Tech Store — Google Apps Script backend

  What this does:
  - Receives the website inquiry form
  - Adds the inquiry to a Google Sheet
  - Emails you when a new inquiry arrives
  - Sends the customer a confirmation email

  SET THESE TWO VALUES BEFORE DEPLOYING:
*/
const OWNER_EMAIL = "CHECK_THIS_YOUR_EMAIL";
const SHEET_ID = "CHECK_THIS_YOUR_GOOGLE_SHEET_ID";
const SHEET_NAME = "Inquiries";

function setup() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`Create a sheet tab named "${SHEET_NAME}" first.`);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email", "What they're looking for", "Needs + Budget", "Source"]);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const interest = String(data.interest || "").trim();
    const details = String(data.details || "").trim();
    const source = String(data.source || "").trim();

    if (!name || !email || !interest || !details) {
      return jsonResponse({ok: false, error: "Missing required fields."});
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Create a sheet tab named "${SHEET_NAME}".`);

    sheet.appendRow([new Date(), name, email, interest, details, source]);

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: `New Modern Tech Store inquiry — ${interest}`,
      htmlBody:
        `<p><strong>New website inquiry</strong></p>` +
        `<p><strong>Name:</strong> ${escapeHtml(name)}<br>` +
        `<strong>Email:</strong> ${escapeHtml(email)}<br>` +
        `<strong>Looking for:</strong> ${escapeHtml(interest)}</p>` +
        `<p><strong>Needs + budget:</strong><br>${escapeHtml(details).replace(/\n/g, "<br>")}</p>`
    });

    MailApp.sendEmail({
      to: email,
      subject: "We received your Modern Tech Store inquiry",
      htmlBody:
        `<p>Hi ${escapeHtml(name)},</p>` +
        `<p>Thanks for contacting Modern Tech Store. We received your request and will review it.</p>` +
        `<p>We’ll get back to you during working hours with the next step.</p>` +
        `<p>For anything urgent, please contact us on WhatsApp: <strong>CHECK THIS</strong>.</p>` +
        `<p>Modern Tech Store<br>Rawalpindi, Pakistan</p>`
    });

    return jsonResponse({ok: true});
  } catch (err) {
    return jsonResponse({ok: false, error: String(err)});
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
