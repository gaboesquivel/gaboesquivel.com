/** Homepage portrait linework, shared by the hero (`PortraitMedia`) and the personal OG image. */
export const portraitWidth = 1433;
export const portraitHeight = 1098;
export const portraitSrc = "/images/gabo-portrait.webp";

/** Linework was tuned on the former left crop; full-frame raster keeps the same offsets. */
const geometryX = 220;
const axisX = 858 + geometryX;
const labelStartY = 268;
const labelStep = 72;

interface OverlayPath {
  d: string;
  opacity?: number;
  strokeWidth?: number;
}

/** Geometry in full portrait coordinates (1433×1098); strokes stay off facial pixels. */
export const portraitOverlay = {
  strokeGroups: [
    {
      opacity: 0.28,
      strokeWidth: 1.5,
      paths: [
        {
          d: "M 1148 96 A 520 520 0 0 1 1172 712",
          strokeWidth: 2,
          opacity: 0.32,
        },
        { d: "M 1232 148 V 628", opacity: 0.22 },
        {
          d: "M 1188 200 H 1408 M 1188 272 H 1408 M 1188 344 H 1408 M 1188 416 H 1408",
        },
      ],
    },
    {
      opacity: 0.4,
      strokeWidth: 1.5,
      paths: [{ d: "M 1288 168 H 1368 M 1328 128 V 208" }],
    },
    { opacity: 0.45, strokeWidth: 2, paths: [{ d: `M ${axisX} 208 V 548` }] },
    {
      opacity: 0.5,
      strokeWidth: 2,
      paths: [{ d: "M 1218 768 H 1242 M 1230 756 V 780" }],
    },
  ] satisfies { opacity: number; strokeWidth: number; paths: OverlayPath[] }[],
  dots: {
    opacity: 0.35,
    r: 2,
    points: [
      [1048, 118],
      [1070, 118],
      [1092, 118],
      [1048, 140],
      [1070, 140],
      [1092, 140],
      [1048, 162],
      [1070, 162],
      [1092, 162],
    ].map(([cx, cy]) => [cx + geometryX, cy] as const),
  },
  labels: ["PRODUCT", "DESIGN", "ENGINEERING", "DELIVERY"].map((text, i) => {
    const y = labelStartY + i * labelStep;
    return {
      text,
      tick: `M ${axisX} ${y} H ${axisX + 48}`,
      marker: { cx: axisX, cy: y, r: 4 },
      textX: axisX + 62,
      baselineY: y + 7,
    };
  }),
  label: {
    fontSize: 22,
    tickOpacity: 0.55,
    markerOpacity: 0.7,
    strokeWidth: 2,
  },
} as const;
