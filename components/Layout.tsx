import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-800 bg-navy-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex flex-col leading-tight text-white no-underline hover:no-underline">
          <span className="text-[0.95rem] font-bold tracking-[0.18em] sm:text-base">{SITE.name}</span>
          <span className="hidden text-[0.7rem] tracking-wider text-slate-300 sm:block">{SITE.tagline}</span>
        </Link>
        <nav aria-label="メインナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-slate-200 no-underline hover:text-white hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/search/" className="rounded border border-slate-500 px-2 py-1 text-slate-200 no-underline hover:border-white hover:text-white">
                検索
              </Link>
            </li>
          </ul>
        </nav>
        {/* モバイル：JS不要の開閉メニュー */}
        <details className="relative shrink-0 lg:hidden">
          <summary className="cursor-pointer list-none whitespace-nowrap rounded border border-slate-500 px-3 py-1 text-sm text-slate-100 [&::-webkit-details-marker]:hidden">
            メニュー
          </summary>
          <nav aria-label="モバイルナビゲーション" className="absolute right-0 mt-2 w-60 rounded border border-navy-700 bg-navy-900 p-2 shadow-xl">
            <ul className="text-sm">
              {[...NAV, { href: "/search/", label: "サイト内検索" }, { href: "/about/", label: "運営・お問い合わせ" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded px-3 py-2 text-slate-100 no-underline hover:bg-navy-800">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  const groups = [
    {
      title: "解説",
      links: [
        ["/agencies/", "情報機関一覧"],
        ["/relations/", "組織間関係"],
        ["/issues/", "課題"],
        ["/comparison/", "国際比較"],
        ["/outlook/", "将来展望"],
        ["/updates/", "政策・制度の動き"],
      ],
    },
    {
      title: "研究",
      links: [
        ["/research/", "研究記事"],
        ["/paper/", "研究論文"],
        ["/sources/", "参考資料・出典"],
        ["/books/", "推薦文献"],
        ["/reports/", "調査レポート（準備中）"],
      ],
    },
    {
      title: "運営",
      links: [
        ["/about/", "運営・編集方針・お問い合わせ"],
        ["/privacy/", "プライバシーポリシー"],
        ["/ad-policy/", "広告掲載方針"],
        ["/disclaimer/", "免責事項"],
      ],
    },
  ];
  return (
    <footer className="mt-20 border-t border-navy-800 bg-navy-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-bold tracking-[0.18em] text-white">{SITE.name}</p>
          <p className="mt-2 text-sm leading-relaxed">
            公開情報に基づく独立研究メディア。政府機関・情報機関とは一切関係がありません。
          </p>
          <p className="mt-3 text-xs text-slate-400">情報基準日：{SITE.asOf}</p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-3 text-sm font-bold text-white">{g.title}</p>
            <ul className="space-y-2 text-sm">
              {g.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-300 no-underline hover:text-white hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-slate-400">
        © {new Date(SITE.asOf).getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}
