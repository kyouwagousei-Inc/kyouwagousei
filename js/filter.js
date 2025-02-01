document.addEventListener('DOMContentLoaded', () => {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const filterLists = document.querySelectorAll('.filter-list');
    const filterOptions = document.querySelectorAll('.filter-option');
    const productCards = document.querySelectorAll('.product-card');
    let activeTab = 'product'; // 初期タブ
  
    // タブ切り替え処理
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 全タブの active クラスを削除し、クリックされたタブに追加
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.getAttribute('data-tab');
  
        // 各 filter-list の表示切替
        filterLists.forEach(list => {
          list.style.display = (list.getAttribute('data-tab') === activeTab) ? 'inline-block' : 'none';
        });
  
        // 現在のタブのフィルターオプションをリセット（最初の「すべて」を active に）
        document.querySelector(`.filter-list[data-tab="${activeTab}"] .filter-option`).classList.add('active');
        document.querySelectorAll(`.filter-list[data-tab="${activeTab}"] .filter-option:not(:first-child)`)
                .forEach(option => option.classList.remove('active'));
  
        // プロダクトグリッドをリセット（全件表示）
        productCards.forEach(card => {
          card.style.display = '';
        });
      });
    });
  
    // フィルターオプション選択時の処理
    filterOptions.forEach(option => {
      option.addEventListener('click', () => {
        const parentList = option.parentElement;
        // 同じリスト内の全オプションの active クラスを削除し、クリックされたオプションに追加
        parentList.querySelectorAll('.filter-option').forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');
  
        // 選択された値を取得
        const filterValue = option.getAttribute('data-value');
        // active タブに合わせた属性名を決定（例："product", "use", "feature"）
        // すべて選択の場合は全件表示
        productCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = '';
          } else {
            const cardValue = card.getAttribute('data-' + activeTab);
            card.style.display = (cardValue === filterValue) ? '' : 'none';
          }
        });
      });
    });
  });
  