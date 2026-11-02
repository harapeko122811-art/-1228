import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose px-4 py-24 text-center">
      <p className="text-xs font-bold tracking-[0.3em] text-accent">404 NOT FOUND</p>
      <h1 className="mt-3 text-2xl font-bold text-navy-950">ページが見つかりません</h1>
      <p className="mt-4 text-ink-muted">お探しのページは移動または削除された可能性があります。</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/">トップページ</Link>
        <Link href="/agencies/">情報機関一覧</Link>
        <Link href="/search/">サイト内検索</Link>
      </div>
    </div>
  );
}
