// 論文本文の文字数（空白・Markdown記号・出典トークン・表を除く概数）を数える
import fs from "node:fs";
import path from "node:path";
const dir = path.join(process.cwd(), "content", "paper");
let total = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
  const md = fs.readFileSync(path.join(dir, f), "utf8");
  const body = md
    .replace(/\{\{cite:[^}]+\}\}/g, "")
    .split("\n")
    .filter((l) => !l.startsWith("|"))
    .join("")
    .replace(/[#*>\-\s]/g, "");
  const tables = md.split("\n").filter((l) => l.startsWith("|") && !/^\|[-|]+\|$/.test(l)).join("").replace(/[|\s-]/g, "");
  console.log(`${f}: 本文 ${body.length} 字（表 ${tables.length} 字）`);
  total += body.length;
}
console.log(`合計（表を除く本文）: ${total} 字`);
