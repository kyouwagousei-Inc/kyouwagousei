document.addEventListener('DOMContentLoaded', () => {
  // ===== ヒーロースライダー（トップ上部） =====
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevButton = document.querySelector('.slider-nav .prev');
  const nextButton = document.querySelector('.slider-nav .next');
  let currentSlide = 0;
  const totalSlides = slides.length;
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

  if (prevButton && nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    prevButton.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  function resetInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 5000);
  }

  // ===== ギャラリースライダー（製品画像） =====
  const gallerySlides = document.querySelectorAll('.gallery-slider .slide');
  const galleryPrevButton = document.querySelector('.gallery-prev');
  const galleryNextButton = document.querySelector('.gallery-next');
  let currentGallerySlide = 0;

  function showGallerySlide(index) {
    gallerySlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextGallerySlide() {
    currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
    showGallerySlide(currentGallerySlide);
  }

  function prevGallerySlide() {
    currentGallerySlide = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length;
    showGallerySlide(currentGallerySlide);
  }

  if (gallerySlides.length > 0 && galleryPrevButton && galleryNextButton) {
    galleryNextButton.addEventListener('click', nextGallerySlide);
    galleryPrevButton.addEventListener('click', prevGallerySlide);
    showGallerySlide(currentGallerySlide); // 初期表示
  }

  // ===== モーダルギャラリー表示 =====
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.querySelector('.gallery-modal-img');
  const closeBtn = document.querySelector('.gallery-close');

  if (modal && modalImg && closeBtn) {
    document.querySelectorAll('.gallery-slider .slide img').forEach((img) => {
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalImg.src = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        modalImg.src = '';
      }
    });
  }
});
