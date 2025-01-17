document.addEventListener("DOMContentLoaded", function () {
    // Initialize animations
    AOS.init({
        duration: 1200,
        once: true,
    });

    // Navigation toggle functionality
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !isExpanded);
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("open");
    });

    menuOverlay.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuOverlay.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});
