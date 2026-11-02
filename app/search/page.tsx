import type { Metadata } from "next";
import { Breadcrumb, PageHeader } from "@/components/Content";
import { SearchBox } from "@/components/SearchBox";

export const metadata: Metadata = { title: "サイト内検索", description: "JAPAN INTELLIGENCE REVIEW のサイト内検索。" };

export default function SearchPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "サイト内検索" }]} />
      <PageHeader kicker="SEARCH" title="サイト内検索" lead="情報機関の解説、組織間関係、課題、国際比較、将来展望、研究記事の本文を段落単位で検索できる。" />
      <div className="mx-auto max-w-prose px-4">
        <SearchBox />
      </div>
    </>
  );
}
