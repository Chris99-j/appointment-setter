document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (name && email && message) {
    // Simple "send" simulation
    document.getElementById('form-response').textContent = 
      `Thanks for your message, ${name}! I'll get back to you soon.`;

    // Reset form
    this.reset();
  } else {
    document.getElementById('form-response').textContent = 
      'Please fill out all fields.';
  }
});
