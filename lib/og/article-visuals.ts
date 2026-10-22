import { ogColors } from "./constants";

const { accent, black, darkGray, gray, white } = ogColors;

const line = ({
  x1,
  y1,
  x2,
  y2,
  stroke,
  strokeWidth,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;

const roundedRect = ({
  x,
  y,
  w,
  h,
  radius,
  fill,
  stroke,
  strokeWidth,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  radius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;

/** Editorial diagram snippets for article-visual OG (right column, ~360×400). */
export const articleOgVisuals = {
  "generative-ui": () => `
  ${roundedRect({ x: 40, y: 60, w: 200, h: 140, radius: 12, fill: black, stroke: white, strokeWidth: 3 })}
  ${line({ x1: 60, y1: 100, x2: 140, y2: 100, stroke: gray, strokeWidth: 2 })}
  ${line({ x1: 60, y1: 120, x2: 180, y2: 120, stroke: gray, strokeWidth: 2 })}
  ${roundedRect({ x: 70, y: 140, w: 140, h: 44, radius: 6, fill: black, stroke: accent, strokeWidth: 2 })}
  ${line({ x1: 260, y1: 130, x2: 300, y2: 130, stroke: accent, strokeWidth: 3 })}
  ${roundedRect({ x: 300, y: 90, w: 72, h: 72, radius: 12, fill: black, stroke: gray, strokeWidth: 3 })}
  <circle cx="336" cy="126" r="4" fill="${accent}"/>
`,
  mcp: () => `
  ${roundedRect({ x: 120, y: 70, w: 88, h: 88, radius: 12, fill: black, stroke: white, strokeWidth: 3 })}
  ${line({ x1: 208, y1: 114, x2: 248, y2: 114, stroke: accent, strokeWidth: 3 })}
  ${roundedRect({ x: 248, y: 50, w: 72, h: 56, radius: 10, fill: black, stroke: gray, strokeWidth: 2 })}
  ${roundedRect({ x: 248, y: 122, w: 72, h: 56, radius: 10, fill: black, stroke: gray, strokeWidth: 2 })}
  <circle cx="208" cy="114" r="4" fill="${accent}"/>
  <circle cx="248" cy="78" r="4" fill="${accent}"/>
`,
  "agent-orchestration": () => `
  ${roundedRect({ x: 60, y: 100, w: 72, h: 72, radius: 12, fill: black, stroke: gray, strokeWidth: 3 })}
  ${roundedRect({ x: 168, y: 80, w: 88, h: 88, radius: 12, fill: black, stroke: white, strokeWidth: 3 })}
  ${roundedRect({ x: 292, y: 100, w: 72, h: 72, radius: 12, fill: black, stroke: gray, strokeWidth: 3 })}
  ${line({ x1: 132, y1: 136, x2: 168, y2: 124, stroke: accent, strokeWidth: 3 })}
  ${line({ x1: 256, y1: 124, x2: 292, y2: 136, stroke: gray, strokeWidth: 3 })}
  <circle cx="168" cy="124" r="4" fill="${accent}"/>
`,
} as const;

export type ArticleOgVisualKey = keyof typeof articleOgVisuals;

export const articleOgVisualBySlug: Partial<
  Record<string, ArticleOgVisualKey>
> = {
  "2026-10-generative-interfaces": "generative-ui",
  "2025-05-model-context-protocol": "mcp",
  "2026-10-domain-driven-design": "agent-orchestration",
};

export const articleVisualSvg = ({
  visualKey,
  offsetX,
  offsetY,
}: {
  visualKey: ArticleOgVisualKey;
  offsetX: number;
  offsetY: number;
}) =>
  `<g transform="translate(${offsetX} ${offsetY})">${articleOgVisuals[visualKey]()}</g>`;
