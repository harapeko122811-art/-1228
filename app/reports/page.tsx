import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/Prose";

export const metadata: Metadata = {
  title: "調査レポート（準備中）",
  description: "日本の情報機関の詳細な組織比較資料、月次の政策動向分析など、今後提供予定の調査レポートの紹介。",
};

const PLANNED = [
  { name: "日本の情報機関 組織比較資料（詳細版）", body: "7区分の法的根拠・所掌・組織・予算・定員を年度別に比較する資料。一次資料との照合を完了した版として提供予定。" },
  { name: "インテリジェンス政策 月次レポート", body: "国家情報会議、有識者会議、関連法案、各機関の組織改正等を月次で整理・分析するレポート。" },
  { name: "国際比較ハンドブック", body: "米・英・仏・独・韓・豪等の情報機関の法制度と監督制度を比較する資料。" },
  { name: "情報分析の学習教材", body: "公開情報（OSINT）の調べ方、出典評価、構造化分析手法の基礎を学ぶ教材。" },
];

export default function ReportsPage() {
  return (
    <ProsePage
      kicker="REPORTS"
      title="調査レポート（準備中）"
      lead="以下は今後提供を予定しているレポートの構想である。現時点で販売・決済・会員機能は提供しておらず、価格・提供時期も未定である。"
    >
      {PLANNED.map((p) => (
        <section key={p.name}>
          <h2>{p.name}</h2>
          <p>{p.body}</p>
          <p className="text-sm text-ink-muted">提供形態：未定（準備中）</p>
        </section>
      ))}
      <h2>ニュースレター（準備中）</h2>
      <p>更新情報と月次分析を届けるメールマガジンを準備中です。登録受付の開始時に本ページでお知らせします。</p>
      <p className="text-sm">
        有料レポートの内容も、本サイトの<Link href="/about/#editorial">編集方針</Link>に従って作成します。
      </p>
    </ProsePage>
  );
}
