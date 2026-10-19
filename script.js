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
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyYBDCab22h0JHOMnMYq4TuU3o1-FNvh9GFYFYoJ8oEXy2wloEPLqydpuh7IPDQsOCI/exec";

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
      product: interest.value,
      message: details.value.trim()
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
      submitLabel.textContent = "Send inquiry";
      submitLoading.setAttribute("aria-hidden", "true");
    }
  });
}


// Subtle on-scroll reveals and the interactive setup finder.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".hero-copy, .hero-visual, .trust-grid > div, .section-heading, .product-card, .services-intro, .service-item, .approach-steps li, .contact-copy, .contact-card, .finder-copy, .finder-result");
  revealItems.forEach(item => item.classList.add("js-reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
    revealItems.forEach(item => observer.observe(item));
  }

  const profiles = {
    study: {
      title: "A reliable everyday laptop",
      description: "Prioritise a comfortable keyboard, good battery life, an SSD and enough memory for your usual apps. You may not need a dedicated graphics card."
    },
    work: {
      title: "A setup built around your workload",
      description: "For multitasking, design or editing, focus on memory, processor performance, screen quality and storage. The right balance depends on the apps you use."
    },
    gaming: {
      title: "A balanced gaming setup",
      description: "Start with the games and resolution you want to play. Match the graphics card with the processor, monitor and power supply instead of spending on one part alone."
    }
  };
  const buttons = document.querySelectorAll(".finder-option");
  const title = document.querySelector("#finder-title");
  const description = document.querySelector("#finder-description");
  buttons.forEach(button => button.addEventListener("click", () => {
    const profile = profiles[button.dataset.profile];
    if (!profile || !title || !description) return;
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    title.textContent = profile.title;
    description.textContent = profile.description;
    const result = document.querySelector(".finder-result");
    if (result) {
      result.classList.remove("is-visible");
      requestAnimationFrame(() => result.classList.add("is-visible"));
    }
  }));
})();
