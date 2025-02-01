document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevButton = document.querySelector('.slider-nav .prev');
    const nextButton = document.querySelector('.slider-nav .next');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // 自動再生の間隔（ミリ秒）
    let sliderInterval = setInterval(nextSlide, 5000);
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }
  
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  
    function resetInterval() {
      clearInterval(sliderInterval);
      sliderInterval = setInterval(nextSlide, 5000);
    }
  });
  