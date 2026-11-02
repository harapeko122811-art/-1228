"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SearchDoc } from "@/lib/search-index";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

function snippet(text: string, terms: string[]) {
  const i = Math.max(0, ...terms.map((t) => text.indexOf(t)).filter((x) => x >= 0).slice(0, 1));
  const start = Math.max(0, i - 40);
  return (start > 0 ? "…" : "") + text.slice(start, start + 140) + (start + 140 < text.length ? "…" : "");
}

export function SearchBox() {
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [error, setError] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQ(initial);
    fetch(`${BASE}/search-index.json`)
      .then((r) => r.json())
      .then(setDocs)
      .catch(() => setError(true));
  }, []);

  const results = useMemo(() => {
    const terms = q.trim().split(/\s+/).filter(Boolean);
    if (!docs || terms.length === 0) return [];
    return docs
      .map((d) => {
        const hay = `${d.title} ${d.section} ${d.text}`;
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = terms.reduce((n, t) => n + (d.title.includes(t) ? 5 : 0) + (d.section.includes(t) ? 3 : 0) + hay.split(t).length - 1, 0);
        return { d, score, terms };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
  }, [docs, q]);

  return (
    <div className="mt-8">
      <label htmlFor="q" className="text-sm font-bold text-navy-900">
        キーワード（スペース区切りでAND検索）
      </label>
      <input
        id="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="例：国家情報局　附帯決議"
        className="mt-2 w-full rounded border border-paper-line px-4 py-3 text-base outline-none focus:border-accent"
        autoComplete="off"
      />
      {error && <p className="mt-4 text-sm text-amber-800">検索インデックスを読み込めませんでした。</p>}
      {!docs && !error && <p className="mt-4 text-sm text-ink-muted">読み込み中…</p>}
      {q && docs && (
        <p className="mt-4 text-sm text-ink-muted" aria-live="polite">
          {results.length}件
        </p>
      )}
      <ul className="mt-2 divide-y divide-paper-line">
        {results.map(({ d, terms }) => (
          <li key={d.url} className="py-4">
            <Link href={d.url} className="font-bold">
              {d.title}
              <span className="ml-2 text-sm font-normal text-ink-muted">／{d.section}</span>
            </Link>
            <p className="mt-1 text-sm text-ink-muted">{snippet(d.text, terms)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
