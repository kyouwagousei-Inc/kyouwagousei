document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // ここに送信処理（Ajaxなど）を実装するか、送信後のメッセージを表示する
        alert('お問い合わせありがとうございます。送信されました。');
        contactForm.reset();
      });
    }
  });
  