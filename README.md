# JAPAN INTELLIGENCE REVIEW

**日本の情報機関とインテリジェンス政策を読み解く。**

日本の情報機関に関する公開情報を体系的に整理し、組織の実態、制度上の課題、国際比較、将来展望を分析する独立研究メディアのソースコード一式と、研究論文「国家情報局設置後の日本のインテリジェンス体制の現状と展望―組織間連携、対外情報機能及び民主的統制の観点から―」を収録する。

- 情報基準日：2026-11-02（国家情報会議設置法施行〔2026-07-31〕後の状況）
- 技術構成：Next.js 15（App Router, 静的書き出し）/ TypeScript / Tailwind CSS / marked

## 成果物

| 成果物 | 場所 |
|---|---|
| Webサイトのソースコード | このリポジトリ一式（`app/`, `components/`, `content/`, `lib/`） |
| 研究論文 Markdown版 | `deliverables/paper.md`（`content/paper/*.md` から生成） |
| 研究論文 PDF版 | `deliverables/paper.pdf`（サイトでは `/downloads/paper.pdf`） |
| 参考文献一覧 | `deliverables/references.md`（出典台帳 `content/sources.ts` から生成） |
| サイト公開手順書 | `docs/DEPLOY.md` |
| 収益化計画書 | `docs/MONETIZATION.md` |
| 未完了事項・追加調査事項一覧 | `docs/TODO.md` |
| 自己評価 | `docs/SELF_EVALUATION.md` |

## ページ構成

| パス | 内容 |
|---|---|
| `/` | トップ（理念、最新記事、機関一覧、全体像の図、注目テーマ、最新の制度変更、論文導線、運営方針） |
| `/agencies/` | 情報機関一覧（7区分） |
| `/agencies/[slug]/` | 各機関の詳細（統一10項目構成）×7 |
| `/relations/` | 組織間関係の解説（関係類型を線種で区別した図解） |
| `/issues/` | 日本のインテリジェンス体制の課題 |
| `/comparison/` | 国際比較（米・英・仏・独・韓） |
| `/outlook/` | 将来展望（2026–2036、シナリオ比較） |
| `/research/`, `/research/[slug]/` | 研究記事（カテゴリ別表示）×4 |
| `/paper/` | 研究論文（要旨・全文・参考文献、PDF/Markdownダウンロード） |
| `/sources/` | 参考資料・出典台帳（確認日・確認状況つき） |
| `/updates/` | 政策・制度の動き（国家情報局設置前後で区分した年表） |
| `/search/` | サイト内検索（段落単位、AND検索） |
| `/about/` | 運営目的・編集方針・訂正方針・問い合わせ・広告表示 |
| `/reports/`, `/books/` | 調査レポート紹介（準備中）、推薦文献（アフィリエイト追加可能な構造） |
| `/privacy/`, `/ad-policy/`, `/disclaimer/` | プライバシーポリシー、広告掲載方針、免責事項 |
| `404`, `sitemap.xml`, `robots.txt`, `search-index.json` | 付帯ファイル |

## 開発

```bash
npm install
npm run dev          # 開発サーバー http://localhost:3000
npm run build        # 静的書き出し → out/
npm run start        # out/ を簡易配信 http://localhost:4173
npm run check:links  # 内部リンク・アンカーの検査
npm run paper:count  # 論文本文の文字数
npm run deliver      # ビルド＋論文PDF生成＋リンク検査＋参考文献一覧の出力
```

PDF生成とOGP画像生成（`npm run og`）には Playwright と Chromium が必要。

## データと表示の分離

コンテンツはすべて `content/` に型付きデータとして置き、表示は `app/`・`components/` が担う。

- `content/sources.ts` … **出典台帳**。サイト・論文・年表の全ての出典がここを参照する（ID指定）。確認状況（要旨確認／書誌情報のみ／要確認）を保持
- `content/orgs/*.ts` … 各機関のデータ（基本情報＋8セクション＋参考資料）
- `content/topics.ts` … 組織間関係・課題・国際比較・将来展望
- `content/articles.ts` … 研究記事
- `content/timeline.ts` … 政策・制度の動き
- `content/paper/*.md` … 論文本文。`{{cite:出典ID}}` を書くとビルド時に出現順の文献番号へ置換され、参考文献一覧が自動生成される
- `content/books.ts` … 推薦文献（`affiliateUrl` を設定すると PR 表示つきでリンクが出る）

各段落は `{ k: "fact" | "official" | "report" | "analysis", t: 本文, src: [出典ID] }` の形で、画面上に「制度上の事実／公式発表／報道情報／独自分析」のラベルが付く。本文中の「要確認」「非公表」は自動的に強調表示される。

### 記事を追加するには

1. 新しい出典を `content/sources.ts` に追加（ID・発行主体・URL・日付・確認状況）
2. `content/articles.ts` に記事オブジェクトを追加（段落ごとに区分と出典IDを付与）
3. `npm run build && npm run check:links`

未登録の出典IDを論文で使うとビルドが失敗するため、出典の付け忘れ・誤記を検出できる。

## 環境変数

`.env.example` を参照。APIキーや個人のメールアドレスはソースに直書きしない。

| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | sitemap・OGP の絶対URL |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages のプロジェクトページで公開する場合のサブパス |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | 将来の広告導入用（現在未使用） |

## 注意事項

- 本サイトは公開情報に基づく研究を目的とし、機密情報の取得、個人・監視対象者の特定、情報機関の活動の妨害に関する情報は扱わない。
- 初版作成時の作業環境では多くの政府系サイトに直接アクセスできず、一次資料の一部は検索エンジン経由で要旨を確認した。各出典の確認状況は `/sources/` と `deliverables/references.md` に明示している。公開前に `docs/TODO.md` の原文照合を行うこと。
