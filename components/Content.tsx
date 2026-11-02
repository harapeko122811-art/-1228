import Link from "next/link";
import type { ReactNode } from "react";
import { CLAIM_LABEL, VERIFICATION_LABEL, type ClaimKind, type OrgSection, type Para } from "@/lib/types";
import type { CiteIndex } from "@/lib/cite";
import { getSource } from "@/content/sources";

const KIND_STYLE: Record<ClaimKind, string> = {
  fact: "border-navy-700 text-navy-700 bg-white",
  official: "border-accent text-accent bg-accent-soft",
  report: "border-slate-500 text-slate-600 bg-paper-alt",
  analysis: "border-amber-700 text-amber-800 bg-amber-50",
};

export function KindBadge({ k }: { k: ClaimKind }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-sm border px-1.5 py-0 text-[0.68rem] font-bold leading-5 ${KIND_STYLE[k]}`}>
      {CLAIM_LABEL[k]}
    </span>
  );
}

export function KindLegend() {
  return (
    <div className="my-6 rounded border border-paper-line bg-paper-alt p-4 text-sm">
      <p className="mb-2 font-bold text-navy-900">情報の区分について</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        <li><KindBadge k="fact" /> 法令・公式資料で確認できる制度上の事実</li>
        <li><KindBadge k="official" /> 政府機関の公式発表・公表資料の記載</li>
        <li><KindBadge k="report" /> 報道機関の報道に基づく情報</li>
        <li><KindBadge k="analysis" /> 本サイト編集部による分析・推論・予測</li>
      </ul>
      <p className="mt-3 text-xs text-ink-muted">
        「要確認」は原資料での確認が完了していない記述、「非公表」は政府が公表していない事項を示します。
      </p>
    </div>
  );
}

/** 本文中の「要確認」「非公表」を強調表示する */
function highlight(text: string): ReactNode[] {
  const parts = text.split(/(要確認|非公表)/);
  return parts.map((p, i) =>
    p === "要確認" || p === "非公表" ? (
      <mark key={i} className="rounded-sm bg-amber-100 px-0.5 text-amber-900">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function Cites({ ids, cite }: { ids?: string[]; cite: CiteIndex }) {
  if (!ids?.length) return null;
  return (
    <sup className="ml-0.5 whitespace-nowrap text-[0.7rem]">
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && ","}
          <a href={`#ref-${id}`} className="no-underline hover:underline" title={getSource(id).title}>
            [{cite.index.get(id)}]
          </a>
        </span>
      ))}
    </sup>
  );
}

export function ParaView({ p, cite }: { p: Para; cite: CiteIndex }) {
  return (
    <div className="my-5">
      <div className="mb-1">
        <KindBadge k={p.k} />
      </div>
      <p className="leading-[1.95]">
        {highlight(p.t)}
        <Cites ids={p.src} cite={cite} />
      </p>
    </div>
  );
}

export function DataTable({ table }: { table: NonNullable<OrgSection["table"]> }) {
  return (
    <figure className="my-8">
      <figcaption className="mb-2 text-sm font-bold text-navy-900">{table.caption}</figcaption>
      <div className="table-wrap">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <thead>
            <tr>
              {table.head.map((h) => (
                <th key={h} className="border border-paper-line bg-paper-alt px-3 py-2 text-left font-bold text-navy-900">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className="even:bg-paper-alt/40">
                {r.map((c, j) => (
                  <td key={j} className="border border-paper-line px-3 py-2 align-top">
                    {highlight(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-muted">出典：{table.source}</p>
    </figure>
  );
}

export function SectionView({ s, cite, num }: { s: OrgSection; cite: CiteIndex; num?: number }) {
  return (
    <section id={s.id} className="mt-12">
      <h2 className="border-b border-paper-line pb-2 text-xl font-bold text-navy-900">
        {num !== undefined && <span className="mr-2 text-accent">{num}.</span>}
        {s.title}
      </h2>
      {s.paras.map((p, i) => (
        <ParaView key={i} p={p} cite={cite} />
      ))}
      {s.table && <DataTable table={s.table} />}
    </section>
  );
}

export function RefList({ cite }: { cite: CiteIndex }) {
  return (
    <ol className="space-y-3 text-sm">
      {cite.order.map((id) => {
        const s = getSource(id);
        return (
          <li key={id} id={`ref-${id}`} className="flex gap-2">
            <span className="shrink-0 font-bold text-navy-700">[{cite.index.get(id)}]</span>
            <span>
              {s.publisher}「{s.url ? <a href={s.url} rel="noopener noreferrer" target="_blank">{s.title}</a> : s.title}」
              {s.date && <>（{s.date}）</>}
              <span className="text-ink-muted">。確認日 {s.accessed}／{VERIFICATION_LABEL[s.verification]}</span>
              {" "}
              <Link href={`/sources/#src-${id}`} className="text-xs">
                出典台帳
              </Link>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function Toc({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav aria-label="目次" className="rounded border border-paper-line bg-paper-alt p-4 text-sm">
      <p className="mb-2 font-bold text-navy-900">目次</p>
      <ol className="space-y-1">
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="text-ink no-underline hover:text-accent hover:underline">
              {i + 1}. {it.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({ kicker, title, lead, asOf }: { kicker?: string; title: string; lead?: string; asOf?: string }) {
  return (
    <div className="border-b border-paper-line bg-gradient-to-b from-paper-alt to-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {kicker && <p className="text-xs font-bold tracking-[0.2em] text-accent">{kicker}</p>}
        <h1 className="mt-2 text-2xl font-bold leading-snug text-navy-950 sm:text-3xl">{title}</h1>
        {lead && <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-ink-muted">{lead}</p>}
        {asOf && <p className="mt-4 text-xs text-ink-faint">情報基準日：{asOf}</p>}
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="パンくずリスト" className="mx-auto max-w-6xl px-4 pt-4 text-xs text-ink-muted">
      <ol className="flex flex-wrap gap-1">
        <li>
          <Link href="/">トップ</Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="before:mx-1 before:content-['/']">
            {it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** 広告枠。現時点では広告を配信せず、枠のみ確保する（表示ラベル付き）。 */
export function AdSlot({ id }: { id: string }) {
  return (
    <aside aria-label="広告枠" data-ad-slot={id} className="no-print my-10 rounded border border-dashed border-paper-line bg-paper-alt px-4 py-6 text-center text-xs text-ink-faint">
      広告枠（現在、広告は掲載していません）
    </aside>
  );
}
