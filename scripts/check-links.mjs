// out/ 内の全HTMLについて、内部リンク（パスとページ内アンカー）の存在を検査する
import fs from "node:fs";
import path from "node:path";
const OUT = path.join(process.cwd(), "out");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) files.push(p);
  }
})(OUT);
const idsOf = new Map();
const ids = (file) => {
  if (!idsOf.has(file)) {
    const h = fs.readFileSync(file, "utf8");
    idsOf.set(file, new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsOf.get(file);
};
const resolve = (urlPath) => {
  let p = decodeURIComponent(urlPath.replace(base, "") || "/");
  const cands = [path.join(OUT, p), path.join(OUT, p, "index.html"), path.join(OUT, p + ".html")];
  return cands.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};
let broken = 0, checked = 0, external = new Set();
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^(https?:|mailto:)/.test(href)) { external.add(href); continue; }
    if (href.startsWith("/_next/")) continue;
    checked++;
    const [p, frag] = href.split("#");
    const target = p === "" ? f : resolve(p.split("?")[0]);
    if (!target) { console.log(`✗ ${path.relative(OUT, f)} → ${href}（ページなし）`); broken++; continue; }
    if (frag && target.endsWith(".html") && !ids(target).has(frag)) { console.log(`✗ ${path.relative(OUT, f)} → ${href}（アンカーなし）`); broken++; }
  }
}
console.log(`HTML ${files.length}件／内部リンク ${checked}件を検査：リンク切れ ${broken}件。外部リンク ${external.size}種（作業環境のネットワーク制限により未検査）`);
process.exit(broken ? 1 : 0);
