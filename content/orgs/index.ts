import type { Organization } from "@/lib/types";
import { nib } from "./nib";
import { psia } from "./psia";
import { npa } from "./npa";
import { prefectural } from "./prefectural";
import { dih } from "./dih";
import { gsdf } from "./gsdf";
import { mofa } from "./mofa";

export const organizations: Organization[] = [nib, psia, npa, prefectural, dih, gsdf, mofa].sort(
  (a, b) => a.order - b.order,
);

export function getOrganization(slug: string): Organization | undefined {
  return organizations.find((o) => o.slug === slug);
}

/** 詳細ページで用いる統一構成（10項目） */
export const ORG_SECTION_ORDER = [
  { id: "basic", title: "基本情報" },
  { id: "history", title: "設立経緯" },
  { id: "legal", title: "法的根拠" },
  { id: "structure", title: "組織構造" },
  { id: "missions", title: "主な任務" },
  { id: "functions", title: "情報収集・分析機能" },
  { id: "cooperation", title: "他機関との連携" },
  { id: "issues", title: "現在の課題" },
  { id: "outlook", title: "今後の展望" },
  { id: "refs", title: "参考資料" },
] as const;
