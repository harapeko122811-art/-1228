import type { Metadata } from "next";
import Link from "next/link";
import { organizations } from "@/content/orgs";
import { Breadcrumb, PageHeader } from "@/components/Content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "情報機関一覧",
  description: "国家情報局、公安調査庁、警察庁警備局、都道府県警察の公安・警備部門、防衛省情報本部、陸上自衛隊情報科、外務省国際情報統括官組織の7区分を一覧で解説。",
};

export default function AgenciesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "情報機関一覧" }]} />
      <PageHeader
        kicker="AGENCIES"
        title="日本の情報機関一覧"
        lead="本サイトは日本の情報機能を7区分で整理する。このうち陸上自衛隊情報科は独立した情報機関ではなく陸上自衛隊の職種であり、都道府県警察の公安・警備部門は都道府県の機関である点に注意されたい。"
        asOf={SITE.asOf}
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {organizations.map((o) => (
            <article key={o.slug} className="flex flex-col rounded border border-paper-line bg-white p-6 transition hover:border-accent">
              <p className="text-xs font-bold tracking-widest text-accent">
                {String(o.order).padStart(2, "0")} ／ {o.parent}
              </p>
              <h2 className="mt-2 text-lg font-bold text-navy-950">
                <Link href={`/agencies/${o.slug}/`} className="text-navy-950">
                  {o.name}
                </Link>
              </h2>
              <p className="text-xs text-ink-faint">{o.nameEn}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{o.summary}</p>
              <dl className="mt-4 space-y-1 text-xs">
                {o.basic.slice(0, 3).map((b) => (
                  <div key={b.label} className="flex gap-2">
                    <dt className="w-20 shrink-0 font-bold text-navy-800">{b.label}</dt>
                    <dd className="text-ink-muted">{b.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/agencies/${o.slug}/`} className="mt-4 text-sm font-bold">
                詳細を読む →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-muted">
          各機関の関係は<Link href="/relations/">組織間関係の解説</Link>で図解しています。
        </p>
      </div>
    </>
  );
}
