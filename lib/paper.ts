import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { paperMeta } from "@/content/paper-meta";
import { getSource, sourceMap } from "@/content/sources";
import { VERIFICATION_LABEL } from "@/lib/types";

const PAPER_DIR = path.join(process.cwd(), "content", "paper");
const CITE_RE = /\{\{cite:([a-z0-9-]+)\}\}/g;

/** 全章を読み込み、出現順に文献番号を採番して [n] に置換する。 */
export function loadPaper() {
  const order: string[] = [];
  const raw = paperMeta.chapters.map((c) => ({
    ...c,
    md: fs.readFileSync(path.join(PAPER_DIR, c.file), "utf8"),
  }));
  for (const c of raw) {
    for (const m of c.md.matchAll(CITE_RE)) {
      const id = m[1];
      if (!sourceMap[id]) throw new Error(`論文中の未登録出典: ${id}（${c.file}）`);
      if (!order.includes(id)) order.push(id);
    }
  }
  const num = new Map(order.map((id, i) => [id, i + 1]));
  const resolve = (md: string, mode: "html" | "md") =>
    md.replace(CITE_RE, (_, id: string) =>
      mode === "html" ? `<sup class="cite"><a href="#bib-${id}">[${num.get(id)}]</a></sup>` : `[${num.get(id)}]`,
    );

  const chapters = raw.map((c) => ({
    id: c.id,
    title: c.title,
    markdown: resolve(c.md, "md"),
    html: marked.parse(resolve(c.md, "html"), { async: false }) as string,
  }));

  const bibliography = order.map((id) => {
    const s = getSource(id);
    return { id, n: num.get(id)!, source: s };
  });

  return { meta: paperMeta, chapters, bibliography };
}

export function bibEntryText(n: number, id: string) {
  const s = getSource(id);
  const parts = [`[${n}] ${s.publisher}「${s.title}」`];
  if (s.date) parts.push(`（${s.date}）`);
  if (s.url) parts.push(` <${s.url}> `);
  parts.push(`（確認日：${s.accessed}／${VERIFICATION_LABEL[s.verification]}）`);
  return parts.join("");
}

/** Markdown 版論文（納品用）を生成する */
export function paperToMarkdown() {
  const { meta, chapters, bibliography } = loadPaper();
  const lines = [
    `# ${meta.title}`,
    ``,
    `## ${meta.subtitle}`,
    ``,
    `${meta.author}　${meta.version}（${meta.date}）`,
    ``,
    `### 要旨`,
    ``,
    meta.abstract,
    ``,
    `キーワード：${meta.keywords.join("、")}`,
    ``,
    `> 本稿は公開情報に基づく研究である。本文中の [n] は末尾の参考文献番号を示す。「要確認」は原資料での確認が完了していない記述を示す。`,
    ``,
    ...chapters.map((c) => c.markdown),
    ``,
    `## 参考文献`,
    ``,
    ...bibliography.map((b) => `${bibEntryText(b.n, b.id)}  `),
    ``,
  ];
  return lines.join("\n");
}
