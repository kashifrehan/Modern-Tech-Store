const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

/*
  Modern Tech Store inquiry form
  1) Deploy the Google Apps Script in /google-apps-script/Code.gs as a Web App.
  2) Paste the Web App URL below.
*/
const FORM_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const inquiryForm = document.querySelector("#inquiry-form");

if (inquiryForm) {
  const status = document.querySelector("#form-status");
  const submitButton = inquiryForm.querySelector(".form-submit");
  const submitLabel = inquiryForm.querySelector(".submit-label");
  const submitLoading = inquiryForm.querySelector(".submit-loading");

  const setStatus = (message, type = "") => {
    status.textContent = message;
    status.className = `form-status ${type}`.trim();
  };

  const clearErrors = () => {
    inquiryForm.querySelectorAll(".field-error").forEach(el => el.textContent = "");
    inquiryForm.querySelectorAll(".has-error").forEach(el => el.classList.remove("has-error"));
  };

  const showError = (field, message) => {
    const error = inquiryForm.querySelector(`[data-error-for="${field.id}"]`);
    field.classList.add("has-error");
    if (error) error.textContent = message;
  };

  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    setStatus("");

    const name = inquiryForm.querySelector("#name");
    const email = inquiryForm.querySelector("#email");
    const interest = inquiryForm.querySelector("#interest");
    const details = inquiryForm.querySelector("#details");

    let valid = true;

    if (!name.value.trim()) {
      showError(name, "Please enter your name.");
      valid = false;
    }

    if (!email.validity.valid || !email.value.trim()) {
      showError(email, "Please enter a valid email.");
      valid = false;
    }

    if (!interest.value) {
      showError(interest, "Please choose what you need.");
      valid = false;
    }

    if (!details.value.trim()) {
      showError(details, "Tell us what you need and your budget.");
      valid = false;
    }

    if (!valid) {
      setStatus("Please check the highlighted fields.", "error");
      return;
    }

    if (FORM_ENDPOINT.includes("PASTE_YOUR_")) {
      setStatus("The form is ready, but the Google Apps Script connection still needs to be added.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitLabel.textContent = "SENDING";
    submitLoading.setAttribute("aria-hidden", "false");

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      interest: interest.value,
      details: details.value.trim(),
      source: window.location.href
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "text/plain;charset=utf-8"},
        body: JSON.stringify(payload)
      });

      inquiryForm.reset();
      setStatus("Thanks! We received your request. We’ll get back to you during working hours.", "success");
    } catch (error) {
      setStatus("Something went wrong. Please try again or contact us on Instagram.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      submitLabel.textContent = "GET MY RECOMMENDATION";
      submitLoading.setAttribute("aria-hidden", "true");
    }
  });
}
