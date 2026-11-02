/**
 * 図1 日本の情報コミュニティの関係図。
 * 指揮監督・情報提供義務・政策調整・協力を線種で区別し、単純な上下関係として描かない。
 */
type Box = { id: string; x: number; y: number; w: number; h: number; label: string[]; tone: "core" | "org" | "minister" | "oversight" };

const BOXES: Box[] = [
  { id: "diet", x: 340, y: 10, w: 220, h: 50, label: ["国会", "情報監視審査会（衆・参）"], tone: "oversight" },
  { id: "nic", x: 320, y: 100, w: 260, h: 56, label: ["国家情報会議", "議長：内閣総理大臣／関係閣僚"], tone: "core" },
  { id: "nib", x: 320, y: 186, w: 260, h: 56, label: ["国家情報局（内閣官房）", "事務局・総合分析・総合調整"], tone: "core" },
  { id: "nss", x: 640, y: 186, w: 200, h: 56, label: ["国家安全保障局", "（政策部門）"], tone: "minister" },

  { id: "npsc", x: 20, y: 300, w: 180, h: 46, label: ["国家公安委員会"], tone: "minister" },
  { id: "npa", x: 20, y: 390, w: 180, h: 56, label: ["警察庁警備局", "（外事情報部ほか）"], tone: "org" },
  { id: "pref", x: 20, y: 500, w: 180, h: 66, label: ["都道府県警察", "警視庁公安部／", "道府県警察警備部"], tone: "org" },

  { id: "moj", x: 240, y: 300, w: 160, h: 46, label: ["法務大臣"], tone: "minister" },
  { id: "psia", x: 240, y: 390, w: 160, h: 56, label: ["公安調査庁"], tone: "org" },

  { id: "mofaM", x: 440, y: 300, w: 180, h: 46, label: ["外務大臣"], tone: "minister" },
  { id: "mofa", x: 440, y: 390, w: 180, h: 56, label: ["外務省", "国際情報統括官組織"], tone: "org" },

  { id: "modM", x: 660, y: 300, w: 200, h: 46, label: ["防衛大臣"], tone: "minister" },
  { id: "dih", x: 660, y: 390, w: 200, h: 56, label: ["防衛省情報本部"], tone: "org" },
  { id: "gsdf", x: 660, y: 500, w: 200, h: 66, label: ["陸上自衛隊", "情報科（職種）・", "情報部隊"], tone: "org" },
];

const TONE: Record<Box["tone"], { fill: string; stroke: string; text: string }> = {
  core: { fill: "#0f1d33", stroke: "#0f1d33", text: "#ffffff" },
  org: { fill: "#ffffff", stroke: "#203a5f", text: "#0f1d33" },
  minister: { fill: "#f5f6f8", stroke: "#8a93a0", text: "#1f2733" },
  oversight: { fill: "#fff7e6", stroke: "#b45309", text: "#78350f" },
};

function b(id: string) {
  return BOXES.find((x) => x.id === id)!;
}
const top = (id: string) => ({ x: b(id).x + b(id).w / 2, y: b(id).y });
const bottom = (id: string) => ({ x: b(id).x + b(id).w / 2, y: b(id).y + b(id).h });

type Pt = { x: number; y: number };
type Edge = { pts: Pt[]; kind: "command" | "duty" | "policy" | "coop" | "oversight" };
const seg = (from: Pt, to: Pt, kind: Edge["kind"]): Edge => ({ pts: [from, to], kind });

const BUS_Y = 272;

const EDGES: Edge[] = [
  // 指揮監督（実線）
  seg(bottom("npsc"), top("npa"), "command"),
  seg(bottom("npa"), top("pref"), "command"),
  seg(bottom("moj"), top("psia"), "command"),
  seg(bottom("mofaM"), top("mofa"), "command"),
  seg(bottom("modM"), top("dih"), "command"),
  // 情報提供義務（破線）：関係行政機関の長 → 共通線 → 国家情報会議（国家情報局を経由しない描き方）
  ...["npsc", "moj", "mofaM", "modM"].map((id) => seg(top(id), { x: top(id).x, y: BUS_Y }, "duty")),
  seg({ x: top("npsc").x, y: BUS_Y }, { x: top("modM").x, y: BUS_Y }, "duty"),
  { pts: [{ x: 290, y: BUS_Y }, { x: 290, y: 128 }, { x: 320, y: 128 }], kind: "duty" },
  // 会議と事務局
  seg(bottom("nic"), top("nib"), "policy"),
  // 政策部門との関係
  seg({ x: 580, y: 214 }, { x: 640, y: 214 }, "policy"),
  // 協力（点線）
  seg({ x: 200, y: 418 }, { x: 240, y: 418 }, "coop"),
  seg({ x: 760, y: 446 }, { x: 760, y: 500 }, "coop"),
  seg({ x: 620, y: 418 }, { x: 660, y: 418 }, "coop"),
  // 国会による監督（特定秘密に限定）
  seg(bottom("diet"), top("nic"), "oversight"),
];

const EDGE_STYLE: Record<Edge["kind"], { stroke: string; dash?: string; width: number; marker?: string }> = {
  command: { stroke: "#0f1d33", width: 2, marker: "url(#arrow-dark)" },
  duty: { stroke: "#3b6ea8", dash: "7 5", width: 2, marker: "url(#arrow-blue)" },
  policy: { stroke: "#203a5f", dash: "2 0", width: 4 },
  coop: { stroke: "#8a93a0", dash: "2 4", width: 2 },
  oversight: { stroke: "#b45309", dash: "6 3", width: 2, marker: "url(#arrow-amber)" },
};

export function RelationsDiagram() {
  return (
    <figure className="my-8">
      <figcaption className="mb-3 text-sm font-bold text-navy-900">図1 日本の情報コミュニティにおける関係の類型（2026年11月時点）</figcaption>
      <div className="table-wrap">
        <svg viewBox="0 0 880 590" role="img" aria-labelledby="rel-title rel-desc" className="h-auto w-full min-w-[640px] rounded border border-paper-line bg-white">
          <title id="rel-title">日本の情報コミュニティ関係図</title>
          <desc id="rel-desc">
            国家情報会議と事務局の国家情報局を中心に、関係行政機関の長からの情報提供義務、各大臣による指揮監督、機関間の協力、国会による監督を線種で区別して示す。
          </desc>
          <defs>
            {[
              ["arrow-dark", "#0f1d33"],
              ["arrow-blue", "#3b6ea8"],
              ["arrow-amber", "#b45309"],
            ].map(([id, c]) => (
              <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
              </marker>
            ))}
          </defs>
          {EDGES.map((e, i) => {
            const st = EDGE_STYLE[e.kind];
            const last = i === EDGES.length - 1 || e.kind !== "duty" || e.pts.length > 2;
            const showMarker = e.kind !== "duty" ? st.marker : e.pts.length > 2 ? st.marker : undefined;
            return (
              <polyline
                key={i}
                points={e.pts.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke={st.stroke}
                strokeWidth={st.width}
                strokeDasharray={st.dash}
                markerEnd={last ? showMarker : undefined}
              />
            );
          })}
          <text x={300} y={BUS_Y - 6} fontSize={11} fill="#3b6ea8">関係行政機関の長による資料・情報の提供義務</text>
          {BOXES.map((bx) => {
            const t = TONE[bx.tone];
            const lh = 17;
            const startY = bx.y + bx.h / 2 - ((bx.label.length - 1) * lh) / 2 + 5;
            return (
              <g key={bx.id}>
                <rect x={bx.x} y={bx.y} width={bx.w} height={bx.h} rx={4} fill={t.fill} stroke={t.stroke} strokeWidth={1.5} />
                {bx.label.map((l, i) => (
                  <text
                    key={i}
                    x={bx.x + bx.w / 2}
                    y={startY + i * lh}
                    textAnchor="middle"
                    fontSize={i === 0 ? 14 : 11.5}
                    fontWeight={i === 0 ? 700 : 400}
                    fill={t.text}
                  >
                    {l}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="mt-3 grid gap-2 text-xs text-ink-muted sm:grid-cols-2 lg:grid-cols-5">
        <li><Legend kind="command" /> 指揮監督（法令上の命令関係）</li>
        <li><Legend kind="duty" /> 情報提供義務（設置法）</li>
        <li><Legend kind="policy" /> 会議・政策調整</li>
        <li><Legend kind="coop" /> 協力・情報共有（任意）</li>
        <li><Legend kind="oversight" /> 国会による監督（特定秘密に限定）</li>
      </ul>
      <p className="mt-2 text-xs text-ink-muted">
        出典：国家情報会議設置法、警察法、公安調査庁設置法、防衛省設置法、外務省組織令、国会法等を基に本サイト作成。国家情報局から各機関への指揮関係は存在しないため描いていない。財務・経産・国交大臣等の議員と所管機関は簡略化のため省略。
      </p>
    </figure>
  );
}

function Legend({ kind }: { kind: Edge["kind"] }) {
  const s = EDGE_STYLE[kind];
  return (
    <svg width="34" height="10" className="mr-1 inline-block align-middle" aria-hidden>
      <line x1="0" y1="5" x2="34" y2="5" stroke={s.stroke} strokeWidth={s.width} strokeDasharray={s.dash} />
    </svg>
  );
}
