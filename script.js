// Typing Animation for Name
const nameElement = document.getElementById("typed-name");
const fullName = "Pavan Sai Podichervu";
let index = 0;
let forward = true;

function typeName() {
  nameElement.textContent = fullName.slice(0, index);
  if (forward) {
    if (index < fullName.length) index++;
    else {
      forward = false;
      setTimeout(typeName, 1000);
      return;
    }
  } else {
    if (index > 0) index--;
    else {
      forward = true;
      setTimeout(typeName, 500);
      return;
    }
  }
  setTimeout(typeName, 150);
}
typeName();

// Smooth Scrolling
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
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

// Scroll-to-Top
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Section Animation
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }),
  { threshold: 0.2 }
);
sections.forEach((section) => observer.observe(section));

// Contact Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
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
        successMsg.style.color = "#00d4ff";
        form.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Oops! Something went wrong.";
      errorMsg.style.color = "#ffdd57";
      form.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
    }
  });
