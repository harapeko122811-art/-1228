import type { Metadata } from "next";
import { issues } from "@/content/topics";
import { TopicView } from "@/components/TopicView";


export const metadata: Metadata = {
  title: issues.title,
  description: "情報の縦割り、情報共有、対外情報収集能力、分析人材、民主的統制、情報保全と国民の権利など、日本のインテリジェンス体制の課題を解説。",
};

export default function Page() {
  return <TopicView page={issues} kicker="ISSUES" />;
}
