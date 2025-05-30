// Contact form submission alert
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for reaching out, Chris will get back to you soon!");
      form.reset();
    });
  }
});
