document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const response = document.getElementById('form-response');
  response.textContent = "Thanks for reaching out, Chris will get back to you!";
  this.reset();
});
