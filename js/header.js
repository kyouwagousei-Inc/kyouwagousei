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

        .header {
          border-bottom: 1px solid #ccc;
        }

        .header-top {
          background-color: #f9f9f9;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #ddd;
        }

        .header-contact {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          align-items: center;
        }

        .contact-link {
          font-size: 0.95rem;
          color: #0066cc;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .contact-link:hover {
          text-decoration: underline;
        }

        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          flex-wrap: wrap;
        }

        .header-logo {
          display: flex;
          align-items: flex-start;
        }

        .header-logo img {
          max-width: 250px;
          height: auto;
        }

        .header-tagline {
          font-size: 0.9rem;
          color: #0066cc;
          margin-top: 0.25rem;
          font-weight: bold;
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
          color: #203764;
          font-weight: bold;
        }

        .menu-toggle {
          display: none;
          width: 30px;
          height: 30px;
          position: relative;
          cursor: pointer;
          z-index: 999;
        }

        .menu-toggle span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: #203764;
          transition: 0.4s;
        }

        .menu-toggle span:nth-child(1) { top: 4px; }
        .menu-toggle span:nth-child(2) { top: 11px; }
        .menu-toggle span:nth-child(3) { top: 18px; }

        .menu-toggle.active span:nth-child(1) {
          top: 11px;
          transform: rotate(45deg);
        }

        .menu-toggle.active span:nth-child(2) { opacity: 0; }
        .menu-toggle.active span:nth-child(3) {
          top: 11px;
          transform: rotate(-45deg);
        }

        @media (max-width: 768px) {
          .header-main {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
          }

          .header-logo {
            flex-direction: column;
            flex: 1;
            text-align: center;
            align-items: center;
            width: 100%;
          }

          .header-tagline {
            font-size: 0.85rem;
            text-align: center;
            margin-top: 0rem;
          }

          .menu-toggle {
            display: block;
          }

          .header-nav {
            width: 100%;
            display: none;
            flex-direction: column;
            background-color: #fff;
            padding: 1rem 0;
            position: absolute;
            top: calc(100% + 0px);
            left: 0;
            z-index: 9999;
            border-top: 1px solid #ccc;
          }

          .header-nav.active { display: flex !important; }

          .header-nav ul {
            flex-direction: column;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .header-nav li { margin: 0; text-align: center; }

          .header-nav a {
            display: block;
            padding: 0.75rem 1rem;
            color: #003366;
            font-weight: bold;
            border-bottom: 1px solid #eee;
          }

          .header-nav a:hover { background-color: #f3f3f3; }

          .header-top { padding: 0.5rem; }
          .header-contact { flex-direction: column; gap: 0.25rem; }
          .contact-link { font-size: 0.7rem; text-align: center; }
        }
      </style>
      <header class="header">
        <div class="header-top">
          <div class="header-contact">
            <a href="tel:0339450526" class="contact-link">📞 お電話でのお問い合わせ：<strong>03-3945-0526</strong></a>
            <span id="safe-email-header-link" class="contact-link">📧 メールでのお問い合わせ</span>
          </div>
        </div>
        <div class="header-main">
          <div class="header-logo">
            <a href="index.html">
              <img src="img/logo-l.png" alt="協和合成ロゴ">
            </a>
            <div class="header-tagline" data-year="1961">創業1961年・</div>
          </div>
          <nav class="header-nav" id="nav">
            <ul>
              <li><a href="index.html">ホーム</a></li>
              <li><a href="company.html">会社概要</a></li>
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

    this._toggleMenu = this._toggleMenu.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._updateTagline();

    // ✅ 安全なメールリンク設定
    const encodedParts = ["aW5m","b0Br","eW91","d2Fn","b3Vz","ZWku","Y28u","anA="];
    const email = atob(encodedParts.join(""));
    const subject = encodeURIComponent("協和合成へのお問い合わせ");
    const body = encodeURIComponent("以下にご記入ください。\n\n会社名：\nお名前：\nお問い合わせ内容：");

    const emailLink = shadow.getElementById("safe-email-header-link");
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }

  connectedCallback() {
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    menuToggle.addEventListener('click', this._toggleMenu);

    const navLinks = this.shadowRoot.querySelectorAll('.header-nav a');
    navLinks.forEach(link => link.addEventListener('click', this._closeMenu));

    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    menuToggle.removeEventListener('click', this._toggleMenu);

    const navLinks = this.shadowRoot.querySelectorAll('.header-nav a');
    navLinks.forEach(link => link.removeEventListener('click', this._closeMenu));

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
    if (!event.composedPath().includes(this)) {
      this._closeMenu();
    }
  }

  _updateTagline() {
    const tagline = this.shadowRoot.querySelector('.header-tagline');
    if (!tagline) return;

    const baseYear = parseInt(tagline.getAttribute('data-year'), 10);
    const currentYear = new Date().getFullYear();
    const years = currentYear - baseYear;

    tagline.textContent = `創業${baseYear}年・${years}年以上の実績`;
  }
}

customElements.define('site-header', SiteHeader);
