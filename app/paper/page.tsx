import type { Metadata } from "next";
import { loadPaper } from "@/lib/paper";
import { Breadcrumb } from "@/components/Content";
import { VERIFICATION_LABEL } from "@/lib/types";
import { withBase } from "@/lib/site";

export const metadata: Metadata = {
  title: "研究論文：国家情報局設置後の日本のインテリジェンス体制の現状と展望",
  description:
    "組織間連携、対外情報機能及び民主的統制の観点から、国家情報局設置後の日本のインテリジェンス体制の制度的意義と課題を分析し、4つの制度的選択肢を比較する研究論文。",
};

export default function PaperPage() {
  const { meta, chapters, bibliography } = loadPaper();
  return (
    <>
      <Breadcrumb items={[{ label: "研究論文" }]} />
      <div className="mx-auto max-w-6xl px-4">
        <header className="mt-8 border-b border-paper-line pb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-accent">RESEARCH PAPER ／ {meta.version}</p>
          <h1 className="mt-3 font-serif text-2xl font-bold leading-snug text-navy-950 sm:text-3xl">{meta.title}</h1>
          <p className="mt-2 font-serif text-lg text-navy-800">{meta.subtitle}</p>
          <p className="mt-4 text-sm text-ink-muted">
            {meta.author}　公開日 {meta.date}
          </p>
          <div className="no-print mt-5 flex flex-wrap gap-3 text-sm">
            <a href={withBase("/downloads/paper.pdf")} className="rounded bg-navy-900 px-4 py-2 font-bold text-white no-underline hover:no-underline">
              PDF版をダウンロード
            </a>
            <a href={withBase("/downloads/paper.md")} className="rounded border border-navy-900 px-4 py-2 font-bold text-navy-900 no-underline hover:no-underline">
              Markdown版
            </a>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
          <article className="min-w-0">
            <section className="mt-8 rounded border border-paper-line bg-paper-alt p-6" aria-labelledby="abstract">
              <h2 id="abstract" className="font-bold text-navy-900">要旨</h2>
              <p className="mt-3 text-[0.95rem] leading-[1.95]">{meta.abstract}</p>
              <p className="mt-3 text-sm">
                <span className="font-bold">キーワード：</span>
                {meta.keywords.join("、")}
              </p>
            </section>
            <p className="mt-6 text-xs text-ink-muted">
              本稿は公開情報に基づく研究である。本文中の [n] は末尾の参考文献番号を示す。「要確認」は原資料での確認が完了していない記述を示す。本稿の主張・数値・出典は本サイトの各解説ページと共通の出典台帳に基づく。
            </p>
            {chapters.map((c) => (
              <section key={c.id} id={c.id} className="prose-ja font-serif [&_sup.cite]:text-[0.7rem] [&_sup.cite_a]:no-underline" dangerouslySetInnerHTML={{ __html: c.html }} />
            ))}
            <section id="bibliography" className="prose-ja">
              <h2>参考文献</h2>
              <ol className="!list-none !pl-0 text-sm">
                {bibliography.map((b) => (
                  <li key={b.id} id={`bib-${b.id}`} className="my-2 flex gap-2">
                    <span className="shrink-0 font-bold">[{b.n}]</span>
                    <span>
                      {b.source.publisher}「{b.source.url ? <a href={b.source.url} target="_blank" rel="noopener noreferrer">{b.source.title}</a> : b.source.title}」
                      {b.source.date && `（${b.source.date}）`}
                      <span className="text-ink-muted">　確認日 {b.source.accessed}／{VERIFICATION_LABEL[b.source.verification]}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </article>
          <aside className="no-print hidden lg:block">
            <nav aria-label="論文目次" className="sticky top-24 mt-8 rounded border border-paper-line bg-paper-alt p-4 text-sm">
              <p className="mb-2 font-bold text-navy-900">目次</p>
              <ol className="space-y-1">
                <li><a href="#abstract" className="text-ink no-underline hover:underline">要旨</a></li>
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="text-ink no-underline hover:underline">{c.title}</a>
                  </li>
                ))}
                <li><a href="#bibliography" className="text-ink no-underline hover:underline">参考文献</a></li>
              </ol>
            </nav>
          </aside>
        </div>
      </div>
    </>
  );
}
