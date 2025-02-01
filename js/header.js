class SiteHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: "Helvetica Neue", Arial, sans-serif;
        }
        /* ヘッダー全体 */
        .header {
          border-bottom: 1px solid #ccc;
        }
        /* 上段：電話番号＆お問い合わせリンク */
        .header-top {
          background-color: #f5f5f5;
          padding: 0.5rem 1rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 0.9rem;
        }
        .header-top .contact-phone {
          margin-right: 1rem;
        }
        .header-top .contact-link {
          text-decoration: none;
          color: #0066cc;
          font-weight: bold;
        }
        /* 下段：ロゴ・ナビゲーション・ハンバーガーメニュー */
        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          flex-wrap: wrap;
        }
        .header-logo img {
          max-width: 250px;
        }
        .header-nav {
          display: flex;
        }
        .header-nav ul {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }
        .header-nav li {
          margin-left: 2rem;
        }
        .header-nav a {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }
        /* ハンバーガーメニュー */
        .menu-toggle {
          display: none;
          width: 25px;
          height: 25px;
          position: relative;
          cursor: pointer;
        }
        .menu-toggle span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: #333;
          transition: 0.4s;
        }
        /* 各 span の初期配置 */
        .menu-toggle span:nth-child(1) {
          top: 4px;
        }
        .menu-toggle span:nth-child(2) {
          top: 11px;
        }
        .menu-toggle span:nth-child(3) {
          top: 18px;
        }
        /* アクティブ時の変形（位置は固定） */
        .menu-toggle.active span:nth-child(1) {
          top: 11px;
          transform: rotate(45deg);
        }
        .menu-toggle.active span:nth-child(2) {
          opacity: 0;
        }
        .menu-toggle.active span:nth-child(3) {
          top: 11px;
          transform: rotate(-45deg);
        }
        /* レスポンシブ対応 */
        @media (max-width: 768px) {
          .header-nav {
            width: 100%;
            display: none;
            flex-direction: column;
          }
          .header-nav.active {
            display: flex;
          }
          .header-nav ul {
            flex-direction: column;
            width: 100%;
          }
          .header-nav li {
            margin: 1rem 0;
            text-align: center;
          }
          .menu-toggle {
            display: block;
          }
        }
      </style>
      <header class="header">
        <!-- 上段：電話番号とお問い合わせリンク -->
        <div class="header-top">
          <span class="contact-phone">TEL: 0339450526</span>
          <a href="contact.html" class="contact-link">お問い合わせ</a>
        </div>
        <!-- 下段：ロゴ・ナビゲーション・ハンバーガーメニュー -->
        <div class="header-main">
          <div class="header-logo">
            <a href="index.html">
              <img src="https://placehold.jp/250x50.png?text=協和合成" alt="協和合成ロゴ">
            </a>
          </div>
          <nav class="header-nav" id="nav">
            <ul>
              <li><a href="index.html">ホーム</a></li>
              <li><a href="company.html">会社情報</a></li>
              <li><a href="products.html">製品情報</a></li>
              <li><a href="recruit.html">求人情報</a></li>
              <li><a href="contact.html">お問い合わせ</a></li>
            </ul>
          </nav>
          <div class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    `;

    // イベントハンドラーのバインド
    this._toggleMenu = this._toggleMenu.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
  }

  connectedCallback() {
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    menuToggle.addEventListener('click', this._toggleMenu);

    // ナビゲーションリンククリック時にメニューを閉じる
    const navLinks = this.shadowRoot.querySelectorAll('.header-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', this._closeMenu);
    });

    // コンポーネント外クリックでメニューを閉じる
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    menuToggle.removeEventListener('click', this._toggleMenu);

    const navLinks = this.shadowRoot.querySelectorAll('.header-nav a');
    navLinks.forEach(link => {
      link.removeEventListener('click', this._closeMenu);
    });

    document.removeEventListener('click', this._handleOutsideClick);
  }

  _toggleMenu(event) {
    event.stopPropagation();
    const nav = this.shadowRoot.getElementById('nav');
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  }

  _closeMenu() {
    const nav = this.shadowRoot.getElementById('nav');
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  }

  _handleOutsideClick(event) {
    const path = event.composedPath();
    if (!path.includes(this)) {
      this._closeMenu();
    }
  }
}

customElements.define('site-header', SiteHeader);
