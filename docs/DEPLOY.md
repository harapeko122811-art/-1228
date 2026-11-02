# サイト公開手順書

本サイトは `next build` で `out/` に完全な静的ファイルを書き出す。サーバー側の処理やデータベースは不要で、任意の静的ホスティングで公開できる。

## 0. 公開前チェックリスト（必須）

- [ ] `docs/TODO.md` の「公開前に必須」の原文照合を完了し、`content/sources.ts` の `verification` を更新した
- [ ] `lib/site.ts` の `contactEmail` に問い合わせ窓口（運営用アドレス）を設定した（個人アドレスの直書きは避け、運営専用アドレスを用意する）
- [ ] 運営者表示（運営者名または団体名）を `/about/` に追記した
- [ ] `NEXT_PUBLIC_SITE_URL` を本番URLに設定した
- [ ] `npm run deliver` が成功し、リンク切れ0件を確認した
- [ ] 主要ページをスマートフォン実機で確認した

## 1. GitHub Pages で公開する（推奨・無料）

1. GitHub のリポジトリで **Settings → Pages → Build and deployment → Source** を「GitHub Actions」に設定する。
2. デプロイ対象ブランチ（既定は `main`）に変更をマージする。`.github/workflows/deploy.yml` が自動で次を行う。
   - `npm ci` → `npm run build`（`NEXT_PUBLIC_BASE_PATH=/<リポジトリ名>` を自動設定）
   - 内部リンク検査
   - `out/` を Pages にデプロイ
3. 公開URL：`https://<ユーザー名>.github.io/<リポジトリ名>/`

> 注：リポジトリ名が `-1228` のように記号で始まる場合もそのまま動作するが、独自ドメインの利用を推奨する。

### 独自ドメインを使う場合

1. `public/CNAME` にドメイン名（例：`www.example.jp`）を1行で記載する。
2. DNS で `CNAME www → <ユーザー名>.github.io` を設定する。
3. ワークフローの `NEXT_PUBLIC_BASE_PATH` を空にし、`NEXT_PUBLIC_SITE_URL` を `https://www.example.jp` に変更する。
4. Settings → Pages で Custom domain を設定し、「Enforce HTTPS」を有効にする。

## 2. Vercel で公開する

1. Vercel で「Add New Project」からリポジトリをインポートする。
2. Framework Preset は Next.js（自動検出）。`output: "export"` のため静的サイトとして配信される。
3. Environment Variables に `NEXT_PUBLIC_SITE_URL` を設定する（`NEXT_PUBLIC_BASE_PATH` は空）。
4. デプロイ後、独自ドメインを設定する。

## 3. その他の静的ホスティング（Cloudflare Pages / Netlify 等）

- ビルドコマンド：`npm run build`
- 出力ディレクトリ：`out`
- Node.js：22 以上

## 4. 論文PDFの更新

論文本文（`content/paper/*.md`）を修正した場合は、ローカルで次を実行して PDF を再生成し、`public/downloads/paper.pdf` と `deliverables/` をコミットする（CI では PDF を生成しない）。

```bash
npm run deliver
```

## 5. 公開後の作業

1. Google Search Console にサイトを登録し、`sitemap.xml` を送信する。
2. 誤りの指摘を受けた場合は `/about/` の訂正履歴に記録する。
3. 情報基準日（`lib/site.ts` の `asOf`、各機関データの `asOf`）を内容更新時に更新する。
