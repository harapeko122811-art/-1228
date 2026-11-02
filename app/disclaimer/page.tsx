import type { Metadata } from "next";
import { ProsePage } from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "免責事項", description: "JAPAN INTELLIGENCE REVIEW の免責事項。" };

export default function DisclaimerPage() {
  return (
    <ProsePage kicker="DISCLAIMER" title="免責事項" updated={SITE.asOf}>
      <ol>
        <li>本サイトの内容は公開情報に基づく研究・分析であり、政府機関の公式見解ではありません。</li>
        <li>本サイトは情報の正確性に最大限努めていますが、制度・組織は頻繁に変更されます。各ページの情報基準日を確認し、重要な判断を行う際は必ず法令・公式資料の原文をご確認ください。</li>
        <li>「独自分析」と表示した記述、および将来予測は編集部の見解であり、その実現を保証するものではありません。</li>
        <li>本サイトの情報を利用したことにより生じた損害について、本サイトは責任を負いかねます。</li>
        <li>外部サイトへのリンク先の内容について、本サイトは責任を負いません。リンク先のURLは変更される場合があります。</li>
        <li>本サイトの文章・図表の著作権は本サイトに帰属します。引用の際は出典（サイト名・ページURL）を明記してください。法令・公的資料の引用部分の権利は各発行主体に帰属します。</li>
      </ol>
    </ProsePage>
  );
}
