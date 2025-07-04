class GtmTag extends HTMLElement {
  constructor() {
    super();
    const gtmId = this.getAttribute("gtm-id") || "GTM-5V7G62JJ";

    // headにスクリプト注入
    const script = document.createElement("script");
    script.textContent = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    // body先頭にnoscript注入
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}

customElements.define("gtm-tag", GtmTag);
