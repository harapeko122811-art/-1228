import type { Metadata } from "next";
import { ProsePage } from "@/components/Prose";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "プライバシーポリシー", description: "JAPAN INTELLIGENCE REVIEW のプライバシーポリシー。" };

export default function PrivacyPage() {
  return (
    <ProsePage kicker="PRIVACY" title="プライバシーポリシー" updated={SITE.asOf}>
      <p>
        {SITE.name}（以下「本サイト」）は、利用者の個人情報の取扱いについて以下のとおり定めます。本ポリシーは、広告・アクセス解析等の導入時に改定し、改定内容を本ページに掲載します。
      </p>
      <h2>1. 取得する情報</h2>
      <p>
        本サイトは現時点で、会員登録、コメント、問い合わせフォームその他の個人情報を入力する機能を提供していません。また、現時点でアクセス解析ツール、広告配信サービス、Cookieを用いた追跡は導入していません。ただし、ホスティング事業者がサーバーのアクセスログ（IPアドレス、閲覧日時、ブラウザ情報等）を記録する場合があります。
      </p>
      <h2>2. 将来導入する可能性のあるサービス</h2>
      <p>
        今後、Google AdSense等の第三者配信の広告サービス、Google Analytics等のアクセス解析ツール、メールマガジン配信サービスを導入する場合があります。導入時には、利用するサービス名、Cookie等の利用目的、無効化の方法（オプトアウト）を本ページに明記します。
      </p>
      <h2>3. お問い合わせで取得する情報</h2>
      <p>お問い合わせ窓口を開設した場合、いただいた氏名・連絡先等は、回答および記事の訂正確認の目的にのみ利用し、法令に基づく場合を除き第三者に提供しません。</p>
      <h2>4. 本サイトが扱わない情報</h2>
      <p>本サイトは、特定の個人を識別・監視する目的での情報収集を行わず、そのような情報の提供も受け付けません。</p>
      <h2>5. 改定</h2>
      <p>本ポリシーは必要に応じて改定します。重要な変更は本ページで告知します。</p>
    </ProsePage>
  );
}
