import { sources } from "@/content/sources";
import { VERIFICATION_LABEL } from "@/lib/types";

export const dynamic = "force-static";

const TIER = { 1: "第一優先（政府・国会・法令）", 2: "第二優先（研究・学術・海外公式・声明）", 3: "第三優先（報道）" } as const;

export function GET() {
  const lines = [
    "# 参考文献・出典一覧（JAPAN INTELLIGENCE REVIEW）",
    "",
    "サイト及び研究論文が共通して参照する出典台帳（content/sources.ts）から自動生成。",
    "確認日はすべて調査日。確認状況：「要旨確認」は検索エンジン経由で要旨を確認し原文の直接閲覧は未了、「書誌情報のみ」は本文未確認、「要確認」は存在・内容とも要確認。",
    "",
  ];
  for (const t of [1, 2, 3] as const) {
    lines.push(`## ${TIER[t]}`, "");
    for (const s of sources.filter((x) => x.tier === t)) {
      lines.push(
        `- **${s.title}**｜${s.publisher}｜${s.kind}${s.date ? `｜${s.date}` : ""}  `,
        `  ${s.url ?? "URL未確認"}  `,
        `  確認日：${s.accessed}／${VERIFICATION_LABEL[s.verification]}${s.note ? `／${s.note}` : ""}`,
      );
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
