import type { Metadata } from "next";
import { outlook } from "@/content/topics";
import { TopicView } from "@/components/TopicView";


export const metadata: Metadata = {
  title: outlook.title,
  description: "国家情報局の機能強化、対外情報機能、再編可能性、AI・OSINT、サイバー、経済安全保障、国際協力、人材育成について、今後10年の見通しを根拠と不確実性とともに分析。",
};

export default function Page() {
  return <TopicView page={outlook} kicker="OUTLOOK 2026–2036" />;
}
