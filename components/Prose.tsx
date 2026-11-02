import type { ReactNode } from "react";
import { Breadcrumb, PageHeader } from "./Content";

export function ProsePage({ kicker, title, lead, children, updated }: { kicker: string; title: string; lead?: string; children: ReactNode; updated?: string }) {
  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <PageHeader kicker={kicker} title={title} lead={lead} />
      <div className="mx-auto max-w-6xl px-4">
        <div className="prose-ja">{children}</div>
        {updated && <p className="mt-10 text-xs text-ink-faint">制定・最終更新：{updated}</p>}
      </div>
    </>
  );
}
