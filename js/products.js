document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.filter-tab');
  const categories = document.querySelectorAll('.product-category');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // タブ切り替え
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // カテゴリ表示切り替え
      const selected = tab.getAttribute('data-tab');
      categories.forEach(cat => {
        if (cat.getAttribute('data-tab') === selected) {
          cat.style.display = 'block';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
});