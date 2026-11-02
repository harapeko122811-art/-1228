// 論文PDFを生成する。前提：`npm run build` 済み（out/downloads/paper.md が存在すること）
// 出力：public/downloads/paper.pdf, out/downloads/paper.pdf, deliverables/paper.pdf, deliverables/paper.md
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const root = process.cwd();
const mdPath = path.join(root, "out", "downloads", "paper.md");
if (!fs.existsSync(mdPath)) {
  console.error("out/downloads/paper.md がありません。先に npm run build を実行してください。");
  process.exit(1);
}
const md = fs.readFileSync(mdPath, "utf8");
const body = marked.parse(md);

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>国家情報局設置後の日本のインテリジェンス体制の現状と展望</title><style>
@page { size: A4; margin: 22mm 20mm 22mm 20mm; }
body { font-family: "IPAGothic", "IPAPGothic", "Noto Sans CJK JP", sans-serif; font-size: 10.5pt; line-height: 1.85; color: #111; text-align: justify; }
h1 { font-size: 18pt; text-align: center; margin: 30mm 0 4mm; line-height: 1.5; }
h1 + h2 { font-size: 13pt; text-align: center; border: none; margin: 0 0 10mm; page-break-before: avoid; }
h1 + h2 + p { text-align: center; margin-bottom: 14mm; }
h2 { font-size: 13.5pt; margin: 0 0 4mm; padding-bottom: 2mm; border-bottom: 1px solid #333; page-break-before: always; }
h3 { font-size: 11.5pt; margin: 7mm 0 2mm; page-break-after: avoid; }
p { margin: 0 0 3mm; text-indent: 1em; }
blockquote p, li p { text-indent: 0; }
blockquote { margin: 4mm 0; padding: 2mm 4mm; border-left: 3px solid #888; color: #444; font-size: 9.5pt; }
table { border-collapse: collapse; width: 100%; font-size: 8.8pt; margin: 3mm 0 2mm; page-break-inside: avoid; }
th, td { border: 1px solid #666; padding: 1.5mm 2mm; vertical-align: top; text-align: left; }
th { background: #eee; }
p > strong:only-child { display: block; text-indent: 0; margin-top: 5mm; }
ol, ul { margin: 2mm 0 3mm; }
</style></head><body>${body}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
const pdf = await page.pdf({
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate: '<div style="font-size:8pt;width:100%;text-align:center;color:#666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  margin: { top: "22mm", bottom: "22mm", left: "20mm", right: "20mm" },
});
await browser.close();

for (const dir of ["public/downloads", "out/downloads", "deliverables"]) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
  fs.writeFileSync(path.join(root, dir, "paper.pdf"), pdf);
}
fs.copyFileSync(mdPath, path.join(root, "deliverables", "paper.md"));
console.log(`PDF生成: ${(pdf.length / 1024).toFixed(0)} KB`);
