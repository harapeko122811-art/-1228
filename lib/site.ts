export const SITE = {
  name: "JAPAN INTELLIGENCE REVIEW",
  tagline: "日本の情報機関とインテリジェンス政策を読み解く。",
  description:
    "日本の情報機関に関する公開情報を体系的に整理し、組織の実態、制度上の課題、国際比較、将来展望を分析する独立研究メディア。国家情報局・公安調査庁・警察庁警備局・防衛省情報本部ほか7区分を解説。",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  /** サイト全体の情報基準日 */
  asOf: "2026-11-02",
  contactEmail: "", // 公開前に運営者が設定（ソースへ個人アドレスを直書きしない）
};

export const NAV = [
  { href: "/agencies/", label: "情報機関" },
  { href: "/relations/", label: "組織間関係" },
  { href: "/issues/", label: "課題" },
  { href: "/comparison/", label: "国際比較" },
  { href: "/outlook/", label: "将来展望" },
  { href: "/research/", label: "研究記事" },
  { href: "/paper/", label: "研究論文" },
  { href: "/sources/", label: "出典" },
];

/** basePath を付与した絶対パス（OGP画像など、Link 以外で使う） */
export function withBase(path: string) {
  return `${SITE.basePath}${path}`;
}
