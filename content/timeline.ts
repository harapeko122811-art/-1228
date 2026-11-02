import type { ClaimKind } from "@/lib/types";

export interface TimelineItem {
  date: string;
  title: string;
  k: ClaimKind;
  src: string[];
}

/** 最新の政策・制度変更（新しい順）。国家情報局設置前後の区分を明示する。 */
export const timeline: TimelineItem[] = [
  { date: "2026-10-26", title: "有識者会議 第2回会合。スパイ防止関連法制の第1弾として外国代理人登録制度の検討に着手", k: "report", src: ["jiji-fara"] },
  { date: "2026-09-28", title: "「インテリジェンス機能の強化に関する有識者会議」初会合。首相が国家情報戦略の策定を指示", k: "report", src: ["txbiz-yushiki"] },
  { date: "2026-08-28", title: "警察庁、2027年度組織改正要求で「外事情報局」（仮称）新設を要求", k: "report", src: ["kyodo-gaiji"] },
  { date: "2026-08-26", title: "公安調査庁、2027年度概算要求で定員104人増・情報収集費約1.8倍を要求", k: "report", src: ["jiji-psia-budget"] },
  { date: "2026-07-31", title: "国家情報会議設置法施行。国家情報局発足、国家情報会議初会合", k: "fact", src: ["law-nic", "nikkei-0731"] },
  { date: "2026-07-31", title: "日本弁護士連合会が会長声明（第三者機関による監督を要求）", k: "official", src: ["nichibenren-260731"] },
  { date: "2026-07-24", title: "施行日を定める政令と初代国家情報局長（原和也氏）の人事を閣議決定", k: "report", src: ["nikkei-0724", "nhk-0724"] },
  { date: "2026-07-02", title: "参議院情報監視審査会が年次報告書を議長に提出", k: "fact", src: ["sangiin-jyouhoukanshi-r8"] },
  { date: "2026-06-03", title: "国家情報会議設置法公布（令和8年法律第28号）", k: "fact", src: ["sangiin-bill"] },
  { date: "2026-05-27", title: "国家情報会議設置法、参議院本会議で可決・成立", k: "fact", src: ["sangiin-bill", "kantei-0527"] },
  { date: "2026-04", title: "衆議院で可決（附帯決議でプライバシー保護・政治的中立性への配慮を要請）", k: "fact", src: ["shugiin-bill"] },
  { date: "2026-03", title: "国家情報会議設置法案を閣議決定・国会提出", k: "fact", src: ["cas-bill-gaiyou", "nikkei-cabinet"] },
  { date: "2025-12-24", title: "公安調査庁『内外情勢の回顧と展望 令和8年』公表", k: "official", src: ["psia-kaiko-r8"] },
  { date: "2025-10", title: "自民・維新の連立合意で内閣情報調査室の「国家情報局」への格上げ方針", k: "report", src: ["sangiin-prism-252"] },
];
