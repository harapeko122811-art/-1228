import type { Metadata } from "next";
import { sources } from "@/content/sources";
import { Breadcrumb, PageHeader } from "@/components/Content";
import { VERIFICATION_LABEL, type Source } from "@/lib/types";

export const metadata: Metadata = {
  title: "参考資料・出典",
  description: "本サイトと研究論文が参照する法令、公式資料、国会資料、白書、研究、報道資料の出典台帳。発行主体、公開日、確認日、確認状況を掲載。",
};

const TIER_LABEL = { 1: "第一優先（政府・国会・法令）", 2: "第二優先（研究・学術・海外公式・声明）", 3: "第三優先（報道）" } as const;

export default function SourcesPage() {
  const tiers = [1, 2, 3] as const;
  const count = (v: Source["verification"]) => sources.filter((s) => s.verification === v).length;
  return (
    <>
      <Breadcrumb items={[{ label: "参考資料・出典" }]} />
      <PageHeader
        kicker="SOURCES"
        title="参考資料・出典台帳"
        lead="本サイトと研究論文が参照する全ての資料を一元管理する台帳。各ページの出典番号はこの台帳を参照している。"
      />
      <div className="mx-auto max-w-6xl px-4">
        <section className="mt-8 rounded border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed">
          <p className="font-bold text-amber-900">確認状況についての注記</p>
          <p className="mt-2">
            本サイトの初版作成時（2026年11月2日）、作業環境のネットワーク制限により、多くの政府系サイト（e-Gov法令検索、内閣官房、国会等）の原文を直接閲覧できなかった。そのため一部の資料は検索エンジンを通じて要旨を確認するにとどまっている。確認状況を以下の区分で明示し、公開前及び公開後に原文照合を進める。
          </p>
          <ul className="mt-3 grid gap-1 sm:grid-cols-3">
            <li>「{VERIFICATION_LABEL.search}」：{count("search")}件</li>
            <li>「{VERIFICATION_LABEL.bibliographic}」：{count("bibliographic")}件</li>
            <li>「{VERIFICATION_LABEL.unverified}」：{count("unverified")}件</li>
          </ul>
        </section>
        {tiers.map((t) => (
          <section key={t} className="mt-12">
            <h2 className="border-b border-navy-900 pb-2 text-lg font-bold text-navy-950">{TIER_LABEL[t]}</h2>
            <div className="table-wrap">
              <table className="mt-4 w-full min-w-[44rem] border-collapse text-sm">
                <thead>
                  <tr className="bg-paper-alt text-left">
                    <th className="border border-paper-line px-3 py-2">資料名</th>
                    <th className="border border-paper-line px-3 py-2">発行主体</th>
                    <th className="border border-paper-line px-3 py-2">種別</th>
                    <th className="border border-paper-line px-3 py-2">公開・更新日</th>
                    <th className="border border-paper-line px-3 py-2">確認日／状況</th>
                  </tr>
                </thead>
                <tbody>
                  {sources
                    .filter((s) => s.tier === t)
                    .map((s) => (
                      <tr key={s.id} id={`src-${s.id}`} className="align-top target:bg-accent-soft">
                        <td className="border border-paper-line px-3 py-2">
                          {s.url ? (
                            <a href={s.url} target="_blank" rel="noopener noreferrer">
                              {s.title}
                            </a>
                          ) : (
                            s.title
                          )}
                          {s.note && <p className="mt-1 text-xs text-ink-muted">{s.note}</p>}
                          {s.url && <p className="mt-1 break-all font-mono text-[0.65rem] text-ink-faint">{s.url}</p>}
                        </td>
                        <td className="border border-paper-line px-3 py-2">{s.publisher}</td>
                        <td className="border border-paper-line px-3 py-2 whitespace-nowrap">{s.kind}</td>
                        <td className="border border-paper-line px-3 py-2">{s.date ?? "―"}</td>
                        <td className="border border-paper-line px-3 py-2 text-xs">
                          {s.accessed}
                          <br />
                          <span className={s.verification === "unverified" ? "font-bold text-amber-800" : "text-ink-muted"}>{VERIFICATION_LABEL[s.verification]}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
        <p className="mt-10 text-sm text-ink-muted">
          匿名掲示板、SNSの未確認情報、出所不明のブログ等は事実確認の根拠として使用していない。政府機関の公式SNSアカウントの投稿は公式資料として扱う。
        </p>
      </div>
    </>
  );
}
