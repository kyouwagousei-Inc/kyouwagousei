document.addEventListener('DOMContentLoaded', function () {
    // IntersectionObserver を利用して、拠点情報が画面に入ったらフェードイン
    const companyLocations = document.querySelectorAll('.company-location');
  
    const observerOptions = {
      root: null,
      threshold: 0.2,
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    companyLocations.forEach((location) => {
      observer.observe(location);
    });
  });
  