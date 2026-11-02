import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ORG_SECTION_ORDER, getOrganization, organizations } from "@/content/orgs";
import { buildCiteIndex } from "@/lib/cite";
import { AdSlot, Breadcrumb, KindLegend, PageHeader, RefList, SectionView, Toc } from "@/components/Content";

export function generateStaticParams() {
  return organizations.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = getOrganization(slug);
  if (!o) return {};
  return {
    title: `${o.name}――設立経緯・法的根拠・組織・任務`,
    description: o.summary,
    openGraph: { title: o.name, description: o.summary },
  };
}

export default async function OrgPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = getOrganization(slug);
  if (!o) notFound();
  const cite = buildCiteIndex(o.sections.map((s) => s.paras), o.refs);
  const idx = organizations.findIndex((x) => x.slug === o.slug);
  const prev = organizations[idx - 1];
  const next = organizations[idx + 1];

  return (
    <>
      <Breadcrumb items={[{ href: "/agencies/", label: "情報機関一覧" }, { label: o.name }]} />
      <PageHeader kicker={`AGENCY ${String(o.order).padStart(2, "0")} ／ ${o.parent}`} title={o.name} lead={o.summary} asOf={o.asOf} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_16rem]">
        <article className="min-w-0 max-w-prose">
          <p className="mt-6 text-sm text-ink-muted">{o.nameEn}</p>
          <div className="lg:hidden">
            <div className="mt-6">
              <Toc items={ORG_SECTION_ORDER.map((s) => ({ id: s.id, title: s.title }))} />
            </div>
          </div>
          <section id="basic" className="mt-10">
            <h2 className="border-b border-paper-line pb-2 text-xl font-bold text-navy-900">
              <span className="mr-2 text-accent">1.</span>基本情報
            </h2>
            <dl className="mt-4 divide-y divide-paper-line rounded border border-paper-line text-sm">
              {o.basic.map((b) => (
                <div key={b.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-bold text-navy-800">{b.label}</dt>
                  <dd>{b.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <KindLegend />
          {o.sections.map((s, i) => (
            <div key={s.id}>
              <SectionView s={s} cite={cite} num={i + 2} />
              {i === 3 && <AdSlot id={`org-${o.slug}`} />}
            </div>
          ))}
          <section id="refs" className="mt-14">
            <h2 className="border-b border-paper-line pb-2 text-xl font-bold text-navy-900">
              <span className="mr-2 text-accent">10.</span>参考資料
            </h2>
            <div className="mt-4">
              <RefList cite={cite} />
            </div>
          </section>
          <nav className="mt-14 grid gap-3 border-t border-paper-line pt-6 text-sm sm:grid-cols-2" aria-label="前後の機関">
            {prev ? (
              <Link href={`/agencies/${prev.slug}/`} className="rounded border border-paper-line p-3 no-underline hover:border-accent">
                ← {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/agencies/${next.slug}/`} className="rounded border border-paper-line p-3 text-right no-underline hover:border-accent">
                {next.name} →
              </Link>
            )}
          </nav>
          <p className="mt-6 text-sm">
            関連：<Link href="/relations/">組織間関係の解説</Link>／<Link href="/issues/">日本のインテリジェンス体制の課題</Link>
          </p>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 mt-6">
            <Toc items={ORG_SECTION_ORDER.map((s) => ({ id: s.id, title: s.title }))} />
          </div>
        </aside>
      </div>
    </>
  );
}
