import type { Metadata } from "next";
import Link from "next/link";
import { timeline } from "@/content/timeline";
import { Breadcrumb, KindBadge, PageHeader } from "@/components/Content";
import { getSource } from "@/content/sources";

export const metadata: Metadata = {
  title: "政策・制度の動き（年表）",
  description: "国家情報会議設置法の成立・施行、国家情報局の発足、有識者会議、各機関の組織改正要求など、日本のインテリジェンス政策の最新動向を時系列で整理。",
};

const NIB_DAY = "2026-07-31";

export default function UpdatesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "政策・制度の動き" }]} />
      <PageHeader
        kicker="TIMELINE"
        title="政策・制度の動き"
        lead="国家情報局の設置前後の資料を混在させないよう、2026年7月31日を境に区分して表示する。"
      />
      <div className="mx-auto max-w-prose px-4">
        {(["after", "before"] as const).map((phase) => (
          <section key={phase} className="mt-10">
            <h2 className="border-b border-navy-900 pb-2 text-lg font-bold text-navy-950">
              {phase === "after" ? "国家情報局設置後（2026年7月31日〜）" : "国家情報局設置前（〜2026年7月30日）"}
            </h2>
            <ol className="mt-4 border-l-2 border-paper-line">
              {timeline
                .filter((t) => (phase === "after" ? t.date >= NIB_DAY : t.date < NIB_DAY))
                .map((t, i) => (
                  <li key={i} className="relative py-4 pl-6">
                    <span className="absolute -left-[7px] top-6 h-3 w-3 rounded-full border-2 border-white bg-accent" aria-hidden />
                    <time className="font-mono text-xs text-ink-faint">{t.date}</time>
                    <p className="mt-1">
                      <KindBadge k={t.k} /> {t.title}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      出典：
                      {t.src.map((id, j) => (
                        <span key={id}>
                          {j > 0 && "、"}
                          <Link href={`/sources/#src-${id}`}>{getSource(id).publisher}</Link>
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
