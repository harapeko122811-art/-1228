import Link from "next/link";
import { organizations } from "@/content/orgs";
import { articles } from "@/content/articles";
import { timeline } from "@/content/timeline";
import { KindBadge, AdSlot } from "@/components/Content";
import { RelationsDiagram } from "@/components/RelationsDiagram";
import { SITE } from "@/lib/site";
import { paperMeta } from "@/content/paper-meta";

const THEMES = [
  { href: "/agencies/national-intelligence-bureau/", title: "国家情報局は「司令塔」になれるか", text: "閣僚級会議と情報提供義務がもたらす変化と、指揮権を持たない調整機関の限界。" },
  { href: "/issues/#foreign", title: "対外情報機能の空白", text: "専門の対外人的情報機関を持たない日本は、海外情報をどう補ってきたのか。" },
  { href: "/issues/#control", title: "強化と統制の両立", text: "情報監視審査会の射程、第三者機関論、附帯決議の実効性。" },
  { href: "/comparison/", title: "5か国との制度比較", text: "米・英・仏・独・韓の調整機関と議会監督から日本の特徴を読む。" },
];

export default function Home() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  return (
    <>
      {/* ヒーロー */}
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-xs font-bold tracking-[0.3em] text-accent-light">INDEPENDENT RESEARCH ON JAPANESE INTELLIGENCE</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-wider sm:text-5xl">{SITE.name}</h1>
          <p className="mt-4 text-lg text-slate-200 sm:text-xl">{SITE.tagline}</p>
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-300">
            2026年7月31日、国家情報会議設置法が施行され、内閣情報調査室を改組した国家情報局が発足した。本サイトは、公開情報に基づいて日本の情報機関の組織・権限・連携・課題を体系的に整理し、制度の背景と将来の選択肢を分析する独立研究メディアである。
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/agencies/" className="rounded bg-accent px-5 py-2.5 font-bold text-white no-underline hover:bg-accent-light hover:no-underline">
              情報機関一覧を見る
            </Link>
            <Link href="/paper/" className="rounded border border-slate-400 px-5 py-2.5 font-bold text-white no-underline hover:border-white hover:no-underline">
              研究論文を読む
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* 理念 */}
        <section className="mt-14 grid gap-6 md:grid-cols-3" aria-labelledby="mission">
          <h2 id="mission" className="sr-only">サイトの理念</h2>
          {[
            ["正確性を最優先する", "法令・白書・国会資料などの一次資料を優先し、全ての重要な記述に出典を付ける。確認できない事項は「要確認」「非公表」と明記する。"],
            ["事実と分析を区別する", "各段落に「制度上の事実」「公式発表」「報道情報」「独自分析」の区分を表示し、読者が根拠の性質を判断できるようにする。"],
            ["強化と統制を同時に問う", "情報機能の強化を無条件に肯定せず、民主的統制、法的根拠、プライバシー保護との両立を分析の軸とする。"],
          ].map(([t, d]) => (
            <div key={t} className="rounded border border-paper-line p-6">
              <p className="font-bold text-navy-900">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d}</p>
            </div>
          ))}
        </section>

        {/* 最新の研究記事 */}
        <section className="mt-16" aria-labelledby="latest">
          <div className="flex items-end justify-between border-b border-navy-900 pb-2">
            <h2 id="latest" className="text-xl font-bold text-navy-950">最新の研究記事</h2>
            <Link href="/research/" className="text-sm">すべて見る →</Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {latest.map((a) => (
              <article key={a.slug} className="border-b border-paper-line pb-6">
                <p className="text-xs text-ink-faint">
                  <span className="mr-2 font-bold text-accent">{a.category}</span>
                  {a.date}
                </p>
                <h3 className="mt-1 font-bold leading-snug">
                  <Link href={`/research/${a.slug}/`} className="text-navy-950">{a.title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.lead}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 情報機関一覧 */}
        <section className="mt-16" aria-labelledby="agencies">
          <div className="flex items-end justify-between border-b border-navy-900 pb-2">
            <h2 id="agencies" className="text-xl font-bold text-navy-950">情報機関の一覧（7区分）</h2>
            <Link href="/agencies/" className="text-sm">一覧へ →</Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {organizations.map((o) => (
              <li key={o.slug}>
                <Link href={`/agencies/${o.slug}/`} className="block h-full rounded border border-paper-line p-4 no-underline hover:border-accent hover:no-underline">
                  <span className="text-xs text-ink-faint">{o.parent}</span>
                  <span className="mt-1 block font-bold text-navy-950">{o.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/relations/" className="flex h-full items-center justify-center rounded border border-dashed border-accent p-4 text-sm font-bold no-underline hover:bg-accent-soft hover:no-underline">
                組織間の関係を見る →
              </Link>
            </li>
          </ul>
        </section>

        {/* 全体像 */}
        <section className="mt-16" aria-labelledby="overview">
          <h2 id="overview" className="border-b border-navy-900 pb-2 text-xl font-bold text-navy-950">日本の情報コミュニティの全体像</h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
            国家情報局は各省庁の情報機関を指揮する組織ではない。各機関はそれぞれの大臣の指揮監督の下にあり、国家情報会議設置法に基づく情報提供義務と、会議を通じた政策調整によって結ばれている。
          </p>
          <RelationsDiagram />
        </section>

        <AdSlot id="home-mid" />

        {/* 注目テーマ & 最新の制度変更 */}
        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="themes">
            <h2 id="themes" className="border-b border-navy-900 pb-2 text-xl font-bold text-navy-950">注目テーマ</h2>
            <ul className="mt-4 divide-y divide-paper-line">
              {THEMES.map((t) => (
                <li key={t.href} className="py-4">
                  <Link href={t.href} className="font-bold text-navy-950">{t.title}</Link>
                  <p className="mt-1 text-sm text-ink-muted">{t.text}</p>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="updates">
            <div className="flex items-end justify-between border-b border-navy-900 pb-2">
              <h2 id="updates" className="text-xl font-bold text-navy-950">最新の政策・制度変更</h2>
              <Link href="/updates/" className="text-sm">年表へ →</Link>
            </div>
            <ol className="mt-4 space-y-3 text-sm">
              {timeline.slice(0, 7).map((t, i) => (
                <li key={i} className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <time className="font-mono text-xs text-ink-faint">{t.date}</time>
                  <span>
                    <KindBadge k={t.k} /> {t.title}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* 研究論文への導線 */}
        <section className="mt-16 rounded bg-navy-900 p-8 text-white sm:p-10" aria-labelledby="paper">
          <p className="text-xs font-bold tracking-[0.25em] text-accent-light">RESEARCH PAPER</p>
          <h2 id="paper" className="mt-3 text-xl font-bold leading-snug sm:text-2xl">{paperMeta.title}</h2>
          <p className="mt-1 text-slate-300">{paperMeta.subtitle}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">{paperMeta.abstract.slice(0, 180)}…</p>
          <Link href="/paper/" className="mt-6 inline-block rounded bg-white px-5 py-2.5 text-sm font-bold text-navy-950 no-underline hover:no-underline">
            論文を読む →
          </Link>
        </section>

        {/* 運営方針 */}
        <section className="mt-16" aria-labelledby="policy">
          <h2 id="policy" className="border-b border-navy-900 pb-2 text-xl font-bold text-navy-950">運営方針</h2>
          <ul className="mt-4 grid gap-4 text-sm text-ink-muted md:grid-cols-2">
            <li>本サイトは公開情報のみに基づく研究を目的とし、機密情報の取得、個人や監視対象の特定、情報機関の活動の妨害に関する情報は扱いません。</li>
            <li>政府機関・情報機関・政党とは関係のない独立した運営です。誤りの指摘は<Link href="/about/#corrections">訂正方針</Link>に従い速やかに対応します。</li>
            <li>広告・アフィリエイトを掲載する場合は明確に表示し、編集内容に影響させません（<Link href="/ad-policy/">広告掲載方針</Link>）。</li>
            <li>出典は<Link href="/sources/">参考資料・出典</Link>ページで一覧化し、確認日と確認状況を記録しています。</li>
          </ul>
        </section>
      </div>
    </>
  );
}
