const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-contact");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isExpanded);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

const fields = [
  { input: document.querySelector("#name"), error: document.querySelector("#name-error"), message: "Please enter your name." },
  { input: document.querySelector("#email"), error: document.querySelector("#email-error"), message: "Please enter a valid email address." },
  { input: document.querySelector("#message"), error: document.querySelector("#message-error"), message: "Please add a short note about your project." },
];

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "";
  feedback.classList.remove("error");

  let firstInvalidField;
  fields.forEach(({ input, error, message }) => {
    const value = input.value.trim();
    const isValid = value.length > 0 && input.validity.valid;
    input.setAttribute("aria-invalid", String(!isValid));
    error.textContent = isValid ? "" : message;
    if (!isValid && !firstInvalidField) firstInvalidField = input;
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    feedback.textContent = "Please check the highlighted fields.";
    feedback.classList.add("error");
    return;
  }

  feedback.textContent = "Thanks for your note! This demo form is ready to connect to an email service.";
  contactForm.reset();
  fields.forEach(({ input }) => input.removeAttribute("aria-invalid"));
});

fields.forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") !== "true") return;
    const value = input.value.trim();
    const isValid = value.length > 0 && input.validity.valid;
    if (isValid) {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  });
});
