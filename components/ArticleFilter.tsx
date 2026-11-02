"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { slug: string; title: string; date: string; category: string; lead: string };

/** カテゴリ別表示（URLの ?cat= と同期。静的書き出しでも動作する） */
export function ArticleFilter({ articles, categories }: { articles: Item[]; categories: string[] }) {
  const [cat, setCat] = useState<string>("すべて");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    if (c && categories.includes(c)) setCat(c);
  }, [categories]);

  const select = (c: string) => {
    setCat(c);
    const url = new URL(window.location.href);
    if (c === "すべて") url.searchParams.delete("cat");
    else url.searchParams.set("cat", c);
    window.history.replaceState(null, "", url.toString());
  };

  const shown = cat === "すべて" ? articles : articles.filter((a) => a.category === cat);
  const counts = (c: string) => articles.filter((a) => a.category === c).length;

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="カテゴリ" className="flex flex-wrap gap-2 text-sm">
        {["すべて", ...categories].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => select(c)}
            className={`rounded-full border px-3 py-1 ${cat === c ? "border-navy-900 bg-navy-900 text-white" : "border-paper-line text-ink hover:border-accent"}`}
          >
            {c}
            {c !== "すべて" && <span className="ml-1 text-xs opacity-70">({counts(c)})</span>}
          </button>
        ))}
      </div>
      <ul className="mt-8 divide-y divide-paper-line">
        {shown.map((a) => (
          <li key={a.slug} className="py-6">
            <p className="text-xs text-ink-faint">
              <span className="mr-2 font-bold text-accent">{a.category}</span>
              {a.date}
            </p>
            <h2 className="mt-1 text-lg font-bold">
              <Link href={`/research/${a.slug}/`} className="text-navy-950">
                {a.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.lead}</p>
          </li>
        ))}
        {shown.length === 0 && <li className="py-6 text-sm text-ink-muted">このカテゴリの記事は準備中です。</li>}
      </ul>
    </div>
  );
}
