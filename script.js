const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});

function openModal(projectTitle) {
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('modalTitle').textContent = projectTitle;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
const projects = {
  1: {
    title: "TalentFlow HR Suite",
    image: "assets/images/hr.jpg",
    description: "Oversees recruitment, employee records, payroll, leave management, and performance evaluations with secure, role-based access."
  },
  2: {
    title: "CivicAid Request Portal or Request Assistance System",
    image: "assets/images/asisstance.jpg",
    description: "Enables submission, approval, and monitoring of various forms of client or public assistance requests with a seamless UI."
  },
  3: {
    title: "Permit Express or Business Permit System",
    image: "assets/images/business.jpg",
    description: "Automates permit applications, renewals, and compliance for businesses with real-time status tracking and approval workflow."
  },
  4: {
    title: "Alert Response or Emergency Alert System",
    image: "assets/images/emergency.jpg",
    description: "Facilitates real-time emergency reporting and response coordination with automated alert notifications for quick deployment."
  },
  5: {
    title: "Information Center System",
    image: "assets/images/announcement.png",
    description: "Publishes official announcements, community updates, and public records via an admin-controlled content management interface."
  },
  6: {
    title: "JusticeTrack Management System",
    image: "assets/images/casemanagement.jpg",
    description: "Tracks, updates, and resolves cases with role-based access, status monitoring, and case analytics tools."
  },
  7: {
    title: "Online Shopping System",
    image: "assets/images/marketplace.jpg",
    description: "Includes vendor registration, product listings, cart management, payment processing, and customer feedback tools."
  },
  8: {
    title: "Payment System",
    image: "assets/images/onlinepayments.png",
    description: "Processes digital payments with invoicing, billing, and automatic confirmation notifications."
  },
  9: {
    title: "Ease Ticketing System",
    image: "assets/images/e-ticketing.jpg",
    description: "Handles event ticket sales, reservations, payment, and support all in one integrated platform."
  },
  10: {
    title: "Project Management System",
    image: "assets/images/management.jpg",
    description: "Enables collaborative task planning, resource allocation, and project tracking with user role controls."
  },
  11: {
    title: "PowerTop Prepaid Utility Platform",
    image: "assets/images/load.jpg",
    description: "Allows users to purchase prepaid electricity credits and view transaction history via QR codes and Central Payment System."
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = modal.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card => {
  card.style.cursor = 'pointer'; // show pointer cursor
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-project-id");
    if (projects[id]) {
      modalTitle.textContent = projects[id].title;
      modalImage.src = projects[id].image;
      modalImage.alt = projects[id].title;
      modalDescription.textContent = projects[id].description;
      modal.style.display = "flex";
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = '';
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = '';
  }
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out!');
});
