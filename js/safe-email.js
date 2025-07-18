document.addEventListener("DOMContentLoaded", () => {
  const encodedParts = ["aW5m","b0Br","eW91","d2Fn","b3Vz","ZWku","Y28u","anA="];
  const email = atob(encodedParts.join(""));
  const subject = encodeURIComponent("協和合成へのお問い合わせ");
  const body = encodeURIComponent("以下にご記入ください。\n\n会社名：\nお名前：\nお問い合わせ内容：");

  function attachClickListener(root) {
    const links = root.querySelectorAll("[data-email-target]");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;

        // GAイベント
        if (typeof gtag === "function") {
          gtag('event', 'click', {
            event_category: 'contact',
            event_label: 'mailto'
          });
        }
      });
    });
  }

  // Light DOMにある要素を処理
  attachClickListener(document);

  // Shadow DOMを持つWeb Componentを監視
  const observer = new MutationObserver(() => {
    document.querySelectorAll("site-header, site-footer").forEach(el => {
      if (el.shadowRoot) attachClickListener(el.shadowRoot);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
