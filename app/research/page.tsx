import type { Metadata } from "next";
import { articles, ARTICLE_CATEGORIES } from "@/content/articles";
import { Breadcrumb, PageHeader } from "@/components/Content";
import { ArticleFilter } from "@/components/ArticleFilter";

export const metadata: Metadata = {
  title: "研究記事",
  description: "国家情報会議設置法、外事情報局構想、国家情報戦略、情報監視審査会など、日本のインテリジェンス政策に関する研究記事。カテゴリ別に表示。",
};

export default function ResearchPage() {
  const list = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, date, category, lead }) => ({ slug, title, date, category, lead }));
  return (
    <>
      <Breadcrumb items={[{ label: "研究記事" }]} />
      <PageHeader kicker="RESEARCH" title="研究記事" lead="制度改正・政策動向を個別のテーマで掘り下げる研究記事。各記事の段落には情報の区分（事実・公式発表・報道・分析）を表示している。" />
      <div className="mx-auto max-w-6xl px-4">
        <ArticleFilter articles={list} categories={[...ARTICLE_CATEGORIES]} />
      </div>
    </>
  );
}
