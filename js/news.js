document.addEventListener('DOMContentLoaded', () => {
    const newsItems = document.querySelectorAll('.news-list .news-item');
    let currentNewsIndex = 0;
    const totalNews = newsItems.length;
    
    // 初期状態：最初のニュース項目のみ active にする
    newsItems.forEach((item, index) => {
      item.classList.toggle('active', index === 0);
    });
    
    function showNextNews() {
      newsItems[currentNewsIndex].classList.remove('active');
      currentNewsIndex = (currentNewsIndex + 1) % totalNews;
      newsItems[currentNewsIndex].classList.add('active');
    }
    
    // 5秒ごとにニュース項目を切り替える
    setInterval(showNextNews, 5000);
  });
  