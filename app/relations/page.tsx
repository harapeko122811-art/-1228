import type { Metadata } from "next";
import { relations } from "@/content/topics";
import { TopicView } from "@/components/TopicView";
import { RelationsDiagram } from "@/components/RelationsDiagram";

export const metadata: Metadata = {
  title: relations.title,
  description: "国家情報局を中心とする政府全体の情報調整、警察庁と都道府県警察、公安調査庁と警察、防衛省情報本部と陸上自衛隊、外務省と他機関の関係を、指揮監督・情報提供義務・政策調整・協力に区別して図解。",
};

export default function Page() {
  return <TopicView page={relations} kicker="RELATIONS" before={<RelationsDiagram />} />;
}
