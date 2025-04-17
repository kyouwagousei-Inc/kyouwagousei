class SiteFooter extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          .site-footer {
            background-color: #f7f7f7;
            padding: 1rem 0;
            text-align: center;
            border-top: 1px solid #ccc;
          }
          .footer-text {
            font-size: 0.9rem;
            color: #666;
          }
          .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
          }
        </style>
        <footer class="site-footer">
          <div class="container">
            <p class="footer-text">© 2025 協和合成株式会社. All Rights Reserved.</p>
          </div>
        </footer>
      `;
    }
  }
  
  customElements.define('site-footer', SiteFooter);
  