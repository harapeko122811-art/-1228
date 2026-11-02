import type { Para } from "@/lib/types";

/**
 * ページ内の引用番号を出現順に採番する。
 * 本文に出てこないが参考資料に挙げる出典（extra）は末尾に追加する。
 */
export function buildCiteIndex(paraGroups: Para[][], extra: string[] = []) {
  const order: string[] = [];
  const push = (id: string) => {
    if (!order.includes(id)) order.push(id);
  };
  for (const group of paraGroups) for (const p of group) for (const id of p.src ?? []) push(id);
  for (const id of extra) push(id);
  const index = new Map(order.map((id, i) => [id, i + 1]));
  return { order, index };
}

export type CiteIndex = ReturnType<typeof buildCiteIndex>;
