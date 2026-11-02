/**
 * 推薦文献。affiliateUrl は将来アフィリエイトリンクを設定するための欄。
 * 設定した場合、ページ上に「PR（アフィリエイトリンク）」と自動表示される。
 * 書誌情報は公開前に版・ISBNを確認すること。
 */
export interface Book {
  title: string;
  author: string;
  publisher: string;
  year: string;
  category: "日本の情報史" | "インテリジェンス理論" | "分析手法・学習" | "海外の情報機関";
  comment: string;
  affiliateUrl?: string;
}

export const books: Book[] = [
  {
    title: "日本インテリジェンス史―旧日本軍から公安、内調、NSCまで",
    author: "小谷賢",
    publisher: "中央公論新社（中公新書）",
    year: "2022",
    category: "日本の情報史",
    comment: "戦後日本の情報機関の成立と発展を通史として整理した入門書。本サイトの歴史記述の基本文献。",
  },
  {
    title: "Special Duty: A History of the Japanese Intelligence Community",
    author: "Richard J. Samuels",
    publisher: "Cornell University Press",
    year: "2019",
    category: "日本の情報史",
    comment: "日本の情報コミュニティの歴史を外部の視点から分析した英語文献。縦割りと統制の問題を考える上で有益。",
  },
  {
    title: "日本のインテリジェンス機関",
    author: "大森義夫",
    publisher: "文藝春秋（文春新書）",
    year: "2005",
    category: "日本の情報史",
    comment: "元内閣情報調査室長による論考。当時の内閣の情報機能の実情を知る資料。",
  },
  {
    title: "インテリジェンス入門―利益を実現する知識の創造",
    author: "北岡元",
    publisher: "慶應義塾大学出版会",
    year: "2003",
    category: "インテリジェンス理論",
    comment: "情報サイクル、情報と政策の関係など、インテリジェンスの基本概念を日本語で学べる入門書。",
  },
  {
    title: "Intelligence: From Secrets to Policy",
    author: "Mark M. Lowenthal",
    publisher: "CQ Press / SAGE",
    year: "各版",
    category: "インテリジェンス理論",
    comment: "米国の大学で広く使われる標準的教科書。情報の政治化、監督など本サイトの分析枠組みの参照文献。",
  },
];
