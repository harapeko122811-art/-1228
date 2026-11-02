import type { Metadata } from "next";
import { ProsePage } from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "広告掲載方針", description: "JAPAN INTELLIGENCE REVIEW の広告・アフィリエイト掲載方針。" };

export default function AdPolicyPage() {
  return (
    <ProsePage kicker="AD POLICY" title="広告掲載方針" updated={SITE.asOf}>
      <h2>基本方針</h2>
      <ol>
        <li>広告・アフィリエイトリンク・スポンサー記事は、「広告」「PR」「スポンサー」等の表示により編集コンテンツと明確に区別します（景品表示法のステルスマーケティング規制を遵守します）。</li>
        <li>広告主・提携先の意向により、記事の内容・評価・出典の選択を変更することはありません。</li>
        <li>書籍・教材の紹介は編集部の判断で選定し、アフィリエイト報酬の有無によって選定や評価を変えません。</li>
        <li>収益は研究活動の継続（資料購入、調査、サイト運営）に充てます。</li>
      </ol>
      <h2>掲載しない広告</h2>
      <ul>
        <li>違法な情報収集・監視・追跡を目的とする製品・サービス</li>
        <li>個人の特定や身辺調査を主目的とするサービス</li>
        <li>根拠のない陰謀論や誤情報を流布する媒体・商品</li>
        <li>政治的な意見広告</li>
        <li>その他、本サイトの編集方針・信頼性を損なうと判断したもの</li>
      </ul>
      <h2>現在の状況</h2>
      <p>現時点で、本サイトは広告・アフィリエイトリンクを掲載していません。ページ内の「広告枠」は将来の掲載位置を示すもので、広告は配信されていません。広告の審査合格や収益の発生を前提とした運営は行っていません。</p>
    </ProsePage>
  );
}
