class SiteFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .site-footer {
          background-color: #f7f7f7;
          padding: 2rem 1rem;
          border-top: 1px solid #ccc;
          font-family: "Helvetica Neue", Arial, sans-serif;
          position: relative;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-contact {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .footer-contact span {
          display: inline-block;
          margin: 0 0.75rem;
        }

        .footer-nav a {
          margin: 0 0.5rem;
          text-decoration: none;
          color: #005bbb;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .footer-nav a:hover {
          text-decoration: underline;
        }

        .footer-text {
          font-size: 0.85rem;
          color: #666;
          margin-top: 1rem;
        }

        .footer-address {
          font-size: 0.85rem;
          color: #666;
          margin-top: 0.5rem;
        }

        /* 戻るボタン */
        .back-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          background-color: #005bbb;
          color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
          z-index: 999;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .back-to-top:hover {
          transform: translateY(-4px);
          background-color: rgba(1, 90, 255, 0.57);
        }
        .back-to-top.show {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 600px) {
          .footer-contact {
            font-size: 0.9rem;
          }
          .footer-contact span {
            display: block;
            margin: 0.25rem 0;
          }
        }
      </style>
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>

      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-contact">
            <span>Tel: 03-3945-0526</span>
            <span>Fax: 03-3947-1990</span>
            <span>営業時間: 9:00〜17:30（土日祝除く）</span>
          </div>
          <nav class="footer-nav" aria-label="フッターナビゲーション">
            <a href="company.html">会社情報</a> |
            <a href="products.html">製品情報</a> |
            <a id="safe-email-link">お問い合わせ</a> |
            <a href="privacy.html">個人情報保護方針</a>
          </nav>
          <address class="footer-address">東京都文京区本駒込6-5-3 ビューネ本駒込ビル8階</address>
          <p class="footer-text">© 2025 協和合成株式会社. All Rights Reserved.</p>
        </div>
      </footer>

      <!-- 戻るボタン -->
      <a href="#" class="back-to-top" role="button" aria-label="ページトップに戻る">
        <i class="fas fa-arrow-up"></i>
      </a>
    `;

    // 戻るボタンの表示制御
    window.addEventListener('scroll', () => {
      const backToTop = shadow.querySelector('.back-to-top');
      if (window.scrollY > 200) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    // 戻るボタンクリックでスクロール
    const backToTop = shadow.querySelector('.back-to-top');
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // セキュアなメールリンク設定
    const encodedParts = [
      "aW5m", "b0Br", "eW91", "d2Fn", "b3Vz", "ZWku", "Y28u", "anA="
    ];
    const email = atob(encodedParts.join(""));
    const subject = encodeURIComponent("協和合成へのお問い合わせ");
    const body = encodeURIComponent("以下にご記入ください。\n\n会社名：\nお名前：\nお問い合わせ内容：");

    const emailLink = shadow.querySelector("#safe-email-link");
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }
}

customElements.define('site-footer', SiteFooter);
