document.addEventListener("DOMContentLoaded", function () {
    // Initialize animations
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1200,
            once: true,
        });
    }

    // Navigation toggle functionality
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (navToggle && navMenu && menuOverlay) {
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
    }

    // Slider functionality
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const sliderContainer = document.querySelector(".hero-slider");
    let currentIndex = 0;
    let sliderInterval;

    if (slides.length > 0 && prevButton && nextButton) {
        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle("active", index === currentIndex);
            });
        }

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        }

        function showPrevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        }

        nextButton.addEventListener("click", showNextSlide);
        prevButton.addEventListener("click", showPrevSlide);

        // Auto-slide functionality
        function startAutoSlide() {
            sliderInterval = setInterval(showNextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(sliderInterval);
        }

        // Pause auto-slide on mouse hover
        if (sliderContainer) {
            sliderContainer.addEventListener("mouseenter", stopAutoSlide);
            sliderContainer.addEventListener("mouseleave", startAutoSlide);
        }

        // Initialize auto-slide and slides
        startAutoSlide();
        updateSlides();
    }
});
