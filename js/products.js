document.addEventListener('DOMContentLoaded', function() {
    // 初期表示件数：PC/タブレットは8商品、スマホは4商品
    let initialCount = (window.innerWidth <= 768) ? 4 : 8;
    let currentVisibleCount = initialCount;
    
    const productCards = Array.from(document.querySelectorAll('.products-grid .product-card'));
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // 更新処理：フィルターおよび「もっと見る」に合わせて表示商品を調整
    function updateProductVisibility() {
      // 現在選択中のフィルター条件を取得
      const activeTab = document.querySelector('.filter-tab.active').getAttribute('data-tab');
      const activeOption = document.querySelector(`.filter-list[data-tab="${activeTab}"] .filter-option.active`);
      const filterValue = activeOption.getAttribute('data-value');
      
      // フィルター条件にマッチする商品を抽出
      let matchingCards = productCards.filter(card => {
        if(filterValue === 'all') {
          return true;
        } else {
          return card.getAttribute('data-' + activeTab) === filterValue;
        }
      });
      
      // すべての商品を一旦非表示にする
      productCards.forEach(card => {
        card.style.display = 'none';
      });
      
      // マッチした商品の先頭 currentVisibleCount 件を表示する
      matchingCards.slice(0, currentVisibleCount).forEach(card => {
        card.style.display = 'block';
      });
      
      // 表示件数がマッチ数に満たない場合は「もっと見る」ボタンを非表示
      if(matchingCards.length > currentVisibleCount) {
        loadMoreBtn.style.display = 'inline-block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
    
    // 初回表示
    updateProductVisibility();
    
    // 「もっと見る」ボタンのクリック処理
    loadMoreBtn.addEventListener('click', function() {
      currentVisibleCount += initialCount;
      updateProductVisibility();
    });
    
    // フィルタータブクリック処理
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // タブの active クラス更新
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 対応するフィルターオプションリストの表示更新
        const filterLists = document.querySelectorAll('.filter-list');
        filterLists.forEach(list => {
          list.style.display = 'none';
        });
        const activeTabValue = tab.getAttribute('data-tab');
        const activeList = document.querySelector(`.filter-list[data-tab="${activeTabValue}"]`);
        if(activeList) {
          activeList.style.display = 'inline-block';
          // 初期状態として最初のオプションを active にする
          activeList.querySelectorAll('.filter-option').forEach((opt, index) => {
            if(index === 0) {
              opt.classList.add('active');
            } else {
              opt.classList.remove('active');
            }
          });
        }
        
        // 表示件数リセット
        currentVisibleCount = initialCount;
        updateProductVisibility();
      });
    });
    
    // フィルターオプションクリック処理
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
      option.addEventListener('click', function() {
        const parentList = option.parentElement;
        parentList.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // 表示件数リセット
        currentVisibleCount = initialCount;
        updateProductVisibility();
      });
    });
    
    // 画面リサイズ時に初期表示件数を再計算
    window.addEventListener('resize', function() {
      const newInitial = (window.innerWidth <= 768) ? 4 : 8;
      if(newInitial !== initialCount) {
        initialCount = newInitial;
        currentVisibleCount = initialCount;
        updateProductVisibility();
      }
    });
  });
  