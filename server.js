const express = require('express');
const app = express();
const port = 3000;

// EJSをテンプレートエンジンとして設定
app.set('view engine', 'ejs');

// 静的ファイルを提供するためのディレクトリを設定
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.get('/company', (req, res) => {
  res.render('company');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
