import type { Metadata } from "next";
import { books } from "@/content/books";
import { Breadcrumb, PageHeader } from "@/components/Content";

export const metadata: Metadata = {
  title: "推薦文献",
  description: "日本の情報史、インテリジェンス理論、分析手法を学ぶための推薦文献。",
};

export default function BooksPage() {
  const cats = [...new Set(books.map((b) => b.category))];
  return (
    <>
      <Breadcrumb items={[{ label: "推薦文献" }]} />
      <PageHeader kicker="BOOKS" title="推薦文献" lead="編集部が研究に用いた、または学習に有益と判断した文献。選定は編集上の判断によるもので、広告主の意向は反映していない。" />
      <div className="mx-auto max-w-prose px-4">
        <p className="mt-6 rounded border border-paper-line bg-paper-alt p-4 text-xs text-ink-muted">
          表示について：現在、本ページにアフィリエイトリンクは含まれていない。将来リンクを設置する場合は、該当箇所に「PR（アフィリエイトリンク）」と明示する。
        </p>
        {cats.map((c) => (
          <section key={c} className="mt-10">
            <h2 className="border-b border-navy-900 pb-2 text-lg font-bold text-navy-950">{c}</h2>
            <ul className="mt-4 space-y-6">
              {books
                .filter((b) => b.category === c)
                .map((b) => (
                  <li key={b.title}>
                    <p className="font-bold text-navy-950">{b.title}</p>
                    <p className="text-sm text-ink-muted">
                      {b.author}／{b.publisher}／{b.year}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{b.comment}</p>
                    {b.affiliateUrl && (
                      <p className="mt-2 text-sm">
                        <a href={b.affiliateUrl} rel="sponsored noopener noreferrer" target="_blank">
                          書籍の詳細を見る
                        </a>
                        <span className="ml-2 rounded-sm border border-slate-400 px-1 text-[0.65rem] text-slate-600">PR（アフィリエイトリンク）</span>
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
