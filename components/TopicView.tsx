import type { ReactNode } from "react";
import type { TopicPage } from "@/content/topics";
import { buildCiteIndex } from "@/lib/cite";
import { SITE } from "@/lib/site";
import { AdSlot, Breadcrumb, KindLegend, PageHeader, RefList, SectionView, Toc } from "./Content";

export function TopicView({ page, kicker, before }: { page: TopicPage; kicker: string; before?: ReactNode }) {
  const cite = buildCiteIndex(page.sections.map((s) => s.paras), page.refs);
  return (
    <>
      <Breadcrumb items={[{ label: page.title }]} />
      <PageHeader kicker={kicker} title={page.title} lead={page.lead} asOf={SITE.asOf} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_16rem]">
        <article className="min-w-0 max-w-prose">
          <KindLegend />
          {before}
          {page.sections.map((s, i) => (
            <div key={s.id}>
              <SectionView s={s} cite={cite} />
              {i === 1 && <AdSlot id={`${page.slug}-mid`} />}
            </div>
          ))}
          <section id="refs" className="mt-14">
            <h2 className="border-b border-paper-line pb-2 text-xl font-bold text-navy-900">参考資料</h2>
            <div className="mt-4">
              <RefList cite={cite} />
            </div>
          </section>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 mt-6">
            <Toc items={[...page.sections.map((s) => ({ id: s.id, title: s.title })), { id: "refs", title: "参考資料" }]} />
          </div>
        </aside>
      </div>
    </>
  );
}
