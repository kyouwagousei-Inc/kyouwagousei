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

        .footer-text {
          font-size: 0.85rem;
          color: #666;
        }

        /* 戻るボタン */
        .back-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          background-color: #005bbb; /* 濃い青を半透明に */
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
      <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>


      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-contact">
            <span>Tel: 03-3945-0526</span>
            <span>Fax: 03-3947-1990</span>
            <span>営業時間: 9:00〜17:00（土日祝除く）</span>
            <a href="privacy.html">個人情報保護方針</a>
          </div>
          <p class="footer-text">© 2025 協和合成株式会社. All Rights Reserved.</p>
          
        </div>
      </footer>

      <!-- 戻るボタン -->
      <a href="#" class="back-to-top" aria-label="ページトップに戻る">
        <i class="fas fa-arrow-up"></i>
      </a>
    `;

    // ボタンの挙動
    window.addEventListener('scroll', () => {
      const backToTop = shadow.querySelector('.back-to-top');
      if (window.scrollY > 200) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    const backToTop = shadow.querySelector('.back-to-top');
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

customElements.define('site-footer', SiteFooter);
