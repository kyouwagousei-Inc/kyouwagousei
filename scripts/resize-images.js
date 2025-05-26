// scripts/resize-images.js
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

// リサイズしたい元画像フォルダと、出力先フォルダを指定
const INPUT_DIR  = path.join(__dirname, '../img/original');
const OUTPUT_DIR = path.join(__dirname, '../img/optimized');

// 出力サイズとフォーマット定義
const targets = [
  { width:  480, suffix: '480', fmt: 'jpg' },
  { width:  768, suffix: '768', fmt: 'jpg' },
  { width: 1024, suffix: '1024', fmt: 'jpg' },
  { width: 1920, suffix: '1920', fmt: 'jpg' },
  // WebP も同時に出す例
  { width:  768, suffix: '768', fmt: 'webp' },
  { width: 1024, suffix: '1024', fmt: 'webp' },
];

async function processImage(file) {
  const ext = path.extname(file);       // 例: ".jpg"
  const base = path.basename(file, ext); // 例: "factory"

  for (const t of targets) {
    const outName = `${base}-${t.suffix}.${t.fmt}`;
    const outPath = path.join(OUTPUT_DIR, outName);

    await sharp(path.join(INPUT_DIR, file))
      .resize({ width: t.width })
      .toFormat(t.fmt, t.fmt === 'jpg' ? { quality: 80 } : {})
      .toFile(outPath);
    console.log(`生成: ${outName}`);
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const files = await fs.promises.readdir(INPUT_DIR);
  const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const img of images) {
    await processImage(img);
  }
  console.log('すべての画像処理が完了しました。');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
