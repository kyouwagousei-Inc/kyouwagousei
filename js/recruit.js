document.addEventListener('DOMContentLoaded', function () {
    // 各セクションにシンプルなフェードイン効果を追加（必要に応じて調整）
    const sections = document.querySelectorAll('.job-overview, .job-description, .job-requirements');
    
    const options = {
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  