// ===== Theme toggle (light/dark), persisted in localStorage =====
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    }
}

const storedTheme = localStorage.getItem("theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(storedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem("theme", next);
        applyTheme(next);
    });
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
}

// ===== Highlight the active nav link based on current page =====
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

// ===== Footer year =====
document.querySelectorAll(".current-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
});

// ===== Contact form (client-side only, no backend) =====
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const messageText = document.getElementById("message").value.trim();

        if (!name || !email || !messageText) {
            formStatus.textContent = "Please fill out every field before sending.";
            formStatus.className = "form-status error";
            return;
        }

        const destination = "your.email@example.com"; // TODO: replace with your real email
        const subject = encodeURIComponent("Message from your website (" + name + ")");
        const body = encodeURIComponent(messageText + "\n\nFrom: " + name + " (" + email + ")");

        window.location.href = "mailto:" + destination + "?subject=" + subject + "&body=" + body;

        formStatus.textContent = "Opening your email client to send this message...";
        formStatus.className = "form-status success";
        contactForm.reset();
    });
}
