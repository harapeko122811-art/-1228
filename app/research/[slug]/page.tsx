import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/articles";
import { buildCiteIndex } from "@/lib/cite";
import { AdSlot, Breadcrumb, KindLegend, ParaView, RefList } from "@/components/Content";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.lead, openGraph: { type: "article", title: a.title, description: a.lead } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const cite = buildCiteIndex([a.body], a.refs);
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <Breadcrumb items={[{ href: "/research/", label: "研究記事" }, { label: a.title }]} />
      <article className="mx-auto max-w-prose px-4">
        <header className="mt-8 border-b border-paper-line pb-6">
          <p className="text-xs text-ink-faint">
            <Link href={`/research/?cat=${encodeURIComponent(a.category)}`} className="mr-2 font-bold">
              {a.category}
            </Link>
            <time dateTime={a.date}>{a.date}</time>
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug text-navy-950">{a.title}</h1>
          <p className="mt-4 leading-relaxed text-ink-muted">{a.lead}</p>
        </header>
        <KindLegend />
        {a.body.map((p, i) => (
          <div key={i}>
            <ParaView p={p} cite={cite} />
            {i === 2 && <AdSlot id={`article-${a.slug}`} />}
          </div>
        ))}
        <section className="mt-12">
          <h2 className="border-b border-paper-line pb-2 text-lg font-bold text-navy-900">参考資料</h2>
          <div className="mt-4">
            <RefList cite={cite} />
          </div>
        </section>
        <section className="mt-12 rounded bg-paper-alt p-6">
          <h2 className="text-sm font-bold text-navy-900">関連する研究記事</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/research/${o.slug}/`}>{o.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
