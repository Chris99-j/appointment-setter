// Elements needed for form and doctor select
const form = document.getElementById("appointmentForm");
const doctorSelect = document.getElementById("doctor");
const appointmentList = document.getElementById("appointmentList");

// Store appointments
const appointments = [];

// Example doctors by department to populate doctor select dynamically
const doctorsByDepartment = {
  Cardiology: ["Dr. Heart", "Dr. Pulse"],
  Neurology: ["Dr. Brain", "Dr. Nerve"],
  Pediatrics: ["Dr. Kids", "Dr. Child"]
};

// Update doctor options when department changes
document.getElementById("department").addEventListener("change", function () {
  const dept = this.value;
  doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  if (dept && doctorsByDepartment[dept]) {
    doctorsByDepartment[dept].forEach(doc => {
      const option = document.createElement("option");
      option.value = doc;
      option.textContent = doc;
      doctorSelect.appendChild(option);
    });
  }
});

// Appointment form submit handler
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const doctor = doctorSelect.value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !email || !doctor || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const appointment = `${name} - ${doctor} on ${date} at ${time}`;
    appointments.push(appointment);
    updateAppointments();

    alert(`Appointment booked for ${name} with ${doctor} on ${date} at ${time}`);
    form.reset();
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  });
}

// Function to update the displayed appointment list
function updateAppointments() {
  appointmentList.innerHTML = "";
  if (appointments.length === 0) {
    appointmentList.innerHTML = "<li>No appointments booked yet.</li>";
  } else {
    appointments.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      appointmentList.appendChild(li);
    });
  }
}

// Tab switching logic
function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add("active");

  // Match button by tab text
  const button = Array.from(document.querySelectorAll(".tab-btn")).find(btn =>
    btn.textContent.toLowerCase().includes(tabId.replace("Tab", "").toLowerCase())
  );
  if (button) button.classList.add("active");
}

// Logout function clears login and redirects to login page
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

document.getElementById("guestBtn").addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "guest");  // mark guest login
  window.location.href = "home.html?guest=true"; // make sure query param is added
});
window.addEventListener("load", function () {
  const isGuest = localStorage.getItem("isLoggedIn") === "guest";

  console.log("Guest mode?", isGuest);

  if (isGuest) {
    const bottomTabs = document.getElementById('bottom-tabs');
    if (bottomTabs) {
      bottomTabs.style.display = 'none';
      console.log("Tabs hidden");
    }
  }
});

// Elements needed for form and doctor select

// Doctor availability data with available days
const doctorsData = {
  Cardiology: [
    { name: "Dr. Heart", availableDays: ["Monday", "Wednesday", "Friday"] },
    { name: "Dr. Pulse", availableDays: ["Tuesday", "Thursday"] },
  ],
  Neurology: [
    { name: "Dr. Brain", availableDays: ["Monday", "Thursday"] },
    { name: "Dr. Nerve", availableDays: ["Wednesday", "Friday"] },
  ],
  Pediatrics: [
    { name: "Dr. Kids", availableDays: ["Tuesday", "Thursday"] },
    { name: "Dr. Child", availableDays: ["Monday", "Wednesday", "Friday"] },
  ],
};

// Map day names to numbers (Sunday=0 ... Saturday=6)
const dayNameToIndex = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const departmentSelect = document.getElementById("department");
const availabilityInfo = document.getElementById("availabilityInfo");
const dateInput = document.getElementById("date");

// Update doctor options when department changes
departmentSelect.addEventListener("change", function () {
  const dept = this.value;
  doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  availabilityInfo.textContent = "";
  dateInput.value = "";
  dateInput.disabled = true; // disable date until doctor selected

  if (dept && doctorsByDepartment[dept]) {
    doctorsByDepartment[dept].forEach(doc => {
      const option = document.createElement("option");
      option.value = doc;
      option.textContent = doc;
      doctorSelect.appendChild(option);
    });
  }
});

// Remove previous input listener if any to avoid stacking multiple listeners
function removeDateInputListener() {
  const newDateInput = dateInput.cloneNode(true);
  dateInput.parentNode.replaceChild(newDateInput, dateInput);
  return newDateInput;
}

// When doctor changes, show availability and enable date picker with restrictions
doctorSelect.addEventListener("change", function () {
  const dept = departmentSelect.value;
  const doctorName = this.value;
  availabilityInfo.textContent = "";
  dateInput.value = "";
  dateInput.disabled = true;

  if (!doctorName || !dept) return;

  const doctor = doctorsData[dept].find((doc) => doc.name === doctorName);
  if (doctor) {
    availabilityInfo.textContent = `Available days: ${doctor.availableDays.join(", ")}`;
    dateInput.disabled = false;

    // Save available day indexes for validation
    const allowedDays = doctor.availableDays.map((day) => dayNameToIndex[day]);

    // Remove previous input listener and add a new one
    const newDateInput = removeDateInputListener();

    newDateInput.addEventListener("input", function () {
      const selectedDate = new Date(this.value + "T00:00:00"); // avoid timezone issues
      if (isNaN(selectedDate)) return; // ignore invalid date

      const day = selectedDate.getDay();

      if (!allowedDays.includes(day)) {
        alert(`Selected date is not available for this doctor. Please choose one of: ${doctor.availableDays.join(", ")}`);
        this.value = ""; // reset invalid date
      }
    });

    // Update global dateInput reference to new input element
    dateInput = newDateInput;
  }
});

// Appointment form submit handler
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const doctor = doctorSelect.value;
    const date = dateInput.value;
    const time = document.getElementById("time").value;

    if (!name || !email || !doctor || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const appointment = `${name} - ${doctor} on ${date} at ${time}`;
    appointments.push(appointment);
    updateAppointments();

    alert(`Appointment booked for ${name} with ${doctor} on ${date} at ${time}`);
    form.reset();
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    availabilityInfo.textContent = "";
    dateInput.disabled = true;
  });
}

// Function to update the displayed appointment list
function updateAppointments() {
  appointmentList.innerHTML = "";
  if (appointments.length === 0) {
    appointmentList.innerHTML = "<li>No appointments booked yet.</li>";
  } else {
    appointments.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      appointmentList.appendChild(li);
    });
  }
}

// Tab switching logic
function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add("active");

  // Match button by tab text
  const button = Array.from(document.querySelectorAll(".tab-btn")).find(btn =>
    btn.textContent.toLowerCase().includes(tabId.replace("Tab", "").toLowerCase())
  );
  if (button) button.classList.add("active");
}

// Logout function clears login and redirects to login page
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

document.getElementById("guestBtn").addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "guest");  // mark guest login
  window.location.href = "home.html?guest=true"; // make sure query param is added
});
window.addEventListener("load", function () {
  const isGuest = localStorage.getItem("isLoggedIn") === "guest";

  console.log("Guest mode?", isGuest);

  if (isGuest) {
    const bottomTabs = document.getElementById('bottom-tabs');
    if (bottomTabs) {
      bottomTabs.style.display = 'none';
      console.log("Tabs hidden");
    }
  }
});

