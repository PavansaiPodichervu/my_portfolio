// Continuous Typing Animation for Name
const nameElement = document.getElementById("typed-name");
const fullName = "Pavan Sai Podichervu";
let index = 0;
let forward = true;

function typeName() {
  // Update text content based on direction
  nameElement.textContent = fullName.slice(0, index);

  if (forward) {
    if (index < fullName.length) {
      index++; // Type one character forward
    } else {
      forward = false; // Switch to reverse after a pause
      setTimeout(typeName, 1000); // Pause at full name
      return;
    }
  } else {
    if (index > 0) {
      index--; // Erase one character backward
    } else {
      forward = true; // Switch to forward after a pause
      setTimeout(typeName, 500); // Pause at empty
      return;
    }
  }

  // Consistent timing for typing/erasing
  setTimeout(typeName, 150);
}

// Start the animation
typeName();

// Smooth Scrolling for Nav Links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute("href"));
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light")
    ? "🌞"
    : "🌙";
});

// Scroll-to-Top Button
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll Animation for Sections
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));


document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        const successMsg = document.createElement("p");
        successMsg.textContent = "Message sent successfully!";
        successMsg.style.color = "#64ffda";
        form.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Oops! Something went wrong.";
      errorMsg.style.color = "#e6b800";
      form.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
    }
  });

