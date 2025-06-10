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

      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-contact">
            <span>Tel: 03-3945-0526</span>
            <span>Fax: 03-3947-1990</span>
            <span>営業時間: 9:00〜17:00（土日祝除く）</span>
          </div>
          <p class="footer-text">© 2025 協和合成株式会社. All Rights Reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
