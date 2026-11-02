import type { Metadata } from "next";
import { comparison } from "@/content/topics";
import { TopicView } from "@/components/TopicView";


export const metadata: Metadata = {
  title: comparison.title,
  description: "米国・英国・フランス・ドイツ・韓国の情報機関（CIA、FBI、NSA、MI5、MI6、DGSE、BND、国家情報院等）を、制度・歴史・法的制約・監督の観点から日本と比較。",
};

export default function Page() {
  return <TopicView page={comparison} kicker="COMPARISON" />;
}
