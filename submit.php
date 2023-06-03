<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // フォームデータの受け取り
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // 受け取ったデータの処理や保存などの操作を行う

  // 例: フォームデータをメールで送信する
  $to = 'your-email@example.com';
  $subject = 'お問い合わせがありました';
  $body = "お名前: $name\nメールアドレス: $email\nメッセージ: $message";
  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo 'お問い合わせを受け付けました。ありがとうございます！';
  } else {
    echo 'メールの送信に失敗しました。お手数ですが、後ほど再度お試しください。';
  }
}
?>
