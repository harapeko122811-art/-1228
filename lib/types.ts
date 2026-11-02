/**
 * 情報の区分。サイト全体で「制度上の事実」「公式発表」「報道」「独自分析」を区別して表示する。
 */
export type ClaimKind = "fact" | "official" | "report" | "analysis";

export const CLAIM_LABEL: Record<ClaimKind, string> = {
  fact: "制度上の事実",
  official: "公式発表",
  report: "報道情報",
  analysis: "独自分析",
};

/** 本文の段落。src は sources.ts の id を参照する。 */
export interface Para {
  k: ClaimKind;
  t: string;
  src?: string[];
}

export type SourceTier = 1 | 2 | 3;

/**
 * 確認状況
 * - search: 検索エンジン経由で内容（要旨）を確認。原文の直接閲覧は未了
 * - bibliographic: 書誌情報のみ記載（本文は本プロジェクトの作業環境で未確認）
 * - unverified: 存在・内容とも要確認
 */
export type Verification = "search" | "bibliographic" | "unverified";

export const VERIFICATION_LABEL: Record<Verification, string> = {
  search: "要旨確認（原文直接閲覧は未了）",
  bibliographic: "書誌情報のみ（本文未確認）",
  unverified: "要確認",
};

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  /** 公開・更新日（判明分のみ） */
  date?: string;
  /** 確認日 */
  accessed: string;
  tier: SourceTier;
  kind: "法令" | "公式資料" | "国会資料" | "研究・調査" | "報道" | "書籍" | "声明" | "海外公式";
  verification: Verification;
  note?: string;
}

export interface OrgSection {
  id: string;
  title: string;
  paras: Para[];
  table?: { caption: string; head: string[]; rows: string[][]; source: string };
}

export interface Organization {
  slug: string;
  order: number;
  name: string;
  nameEn: string;
  parent: string;
  /** 一覧カード用の要約 */
  summary: string;
  /** 重要度（詳細度の目安） */
  priority: "core" | "standard";
  basic: { label: string; value: string }[];
  sections: OrgSection[];
  refs: string[];
  /** 情報の基準日 */
  asOf: string;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: ArticleCategory;
  lead: string;
  body: Para[];
  refs: string[];
}

export type ArticleCategory = "制度解説" | "政策動向" | "民主的統制" | "国際比較" | "組織分析";
