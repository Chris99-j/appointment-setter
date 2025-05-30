const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    // Show the targeted section
    const target = button.getAttribute('data-target');
    document.getElementById(target).classList.add('active');
  });
});
