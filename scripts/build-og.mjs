// OGP画像（1200x630）を生成して public/og.png に保存する
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1200px;height:630px;background:#0a1424;color:#fff;font-family:"IPAGothic",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box}
.k{color:#6f9bd0;letter-spacing:.3em;font-size:22px;font-weight:700}
h1{font-size:76px;letter-spacing:.08em;margin:24px 0 18px;font-family:Georgia,serif}
p{font-size:34px;color:#d6dce5;margin:0}
.bar{width:160px;height:6px;background:#3b6ea8;margin-top:48px}
</style></head><body><div class="k">INDEPENDENT RESEARCH ON JAPANESE INTELLIGENCE</div><h1>JAPAN INTELLIGENCE REVIEW</h1><p>日本の情報機関とインテリジェンス政策を読み解く。</p><div class="bar"></div></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: "public/og.png" });
await b.close();
console.log("public/og.png 生成");
