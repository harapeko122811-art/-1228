import { organizations } from "@/content/orgs";
import { articles } from "@/content/articles";
import { topics } from "@/content/topics";
import { paperMeta } from "@/content/paper-meta";

export interface SearchDoc {
  url: string;
  title: string;
  section: string;
  text: string;
}

/** 静的書き出し時に生成する検索インデックス（段落単位） */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const o of organizations) {
    docs.push({ url: `/agencies/${o.slug}/`, title: o.name, section: "概要", text: o.summary + " " + o.basic.map((b) => `${b.label} ${b.value}`).join(" ") });
    for (const s of o.sections) {
      docs.push({ url: `/agencies/${o.slug}/#${s.id}`, title: o.name, section: s.title, text: s.paras.map((p) => p.t).join(" ") });
    }
  }
  for (const t of Object.values(topics)) {
    for (const s of t.sections) {
      docs.push({ url: `/${t.slug}/#${s.id}`, title: t.title, section: s.title, text: s.paras.map((p) => p.t).join(" ") + (s.table ? " " + s.table.rows.flat().join(" ") : "") });
    }
  }
  for (const a of articles) {
    docs.push({ url: `/research/${a.slug}/`, title: a.title, section: a.category, text: a.lead + " " + a.body.map((p) => p.t).join(" ") });
  }
  docs.push({ url: "/paper/", title: paperMeta.title, section: "研究論文", text: paperMeta.abstract + " " + paperMeta.keywords.join(" ") });
  return docs;
}
