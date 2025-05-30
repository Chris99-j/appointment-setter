let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
}

// Auto-slide every 3 seconds
setInterval(() => {
  nextSlide();
}, 3000);

function showAbout(sectionId) {
  document.querySelectorAll('.about-content').forEach((el) => {
    el.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  }

