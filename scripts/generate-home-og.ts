import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseFont } from "opentype.js";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const fontPath = path.join(
  root,
  "assets/fonts/ibm-plex-mono/IBMPlexMono-Regular.otf"
);
const svgOut = path.join(root, "public/images/og/home.svg");
const pngOut = path.join(root, "app/opengraph-image.png");

const width = 1200;
const height = 630;

const colors = {
  black: "#000000",
  white: "#ffffff",
  gray: "#a3a3a3",
  darkGray: "#404040",
  mint: "#54e8b3",
} as const;

const textLines = [
  {
    text: "Gabo Esquivel",
    x: 72,
    top: 180,
    fontSize: 48,
    lineHeight: 60,
    fill: colors.white,
  },
  {
    text: "Agentic Product Engineer",
    x: 72,
    top: 256,
    fontSize: 24,
    lineHeight: 34,
    fill: colors.gray,
  },
  {
    text: "gaboesquivel.com",
    x: 72,
    top: 496,
    fontSize: 20,
    lineHeight: 28,
    fill: colors.mint,
  },
] as const;

const font = parseFont(readFileSync(fontPath));

const baselineFromTop = ({
  top,
  fontSize,
  lineHeight,
}: {
  top: number;
  fontSize: number;
  lineHeight: number;
}) => {
  const scale = fontSize / font.unitsPerEm;
  const ascent = font.ascender * scale;
  const descent = Math.abs(font.descender * scale);
  const contentHeight = ascent + descent;
  const leading = lineHeight - contentHeight;
  return top + leading / 2 + ascent;
};

const textToPath = ({
  text,
  x,
  top,
  fontSize,
  lineHeight,
}: {
  text: string;
  x: number;
  top: number;
  fontSize: number;
  lineHeight: number;
}) =>
  font
    .getPath(text, x, baselineFromTop({ top, fontSize, lineHeight }), fontSize)
    .toPathData(2);

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

const buildSvg = () => {
  const textPaths = textLines
    .map(
      (lineSpec) =>
        `<path d="${textToPath(lineSpec)}" fill="${lineSpec.fill}"/>`
    )
    .join("\n  ");

  const innerSquare = (cx: number, cy: number) => {
    const s = 24;
    const x = cx - s / 2;
    const y = cy - s / 2;
    return roundedRect({
      x,
      y,
      w: s,
      h: s,
      radius: 4,
      fill: colors.black,
      stroke: colors.darkGray,
      strokeWidth: 2,
    });
  };

  const upperCenter = { x: 1024 + 40, y: 210 + 40 };
  const lowerCenter = { x: 1024 + 40, y: 340 + 40 };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${colors.black}"/>
  <path d="M904 350 H964 V380 H1024" fill="none" stroke="${colors.gray}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M904 284 H964 V250 H1024" fill="none" stroke="${colors.mint}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  ${roundedRect({ x: 720, y: 194, w: 184, h: 228, radius: 12, fill: colors.black, stroke: colors.white, strokeWidth: 3 })}
  ${line({ x1: 720, y1: 238, x2: 904, y2: 238, stroke: colors.gray, strokeWidth: 2 })}
  ${line({ x1: 740, y1: 216, x2: 790, y2: 216, stroke: colors.gray, strokeWidth: 2 })}
  ${roundedRect({ x: 740, y: 262, w: 144, h: 64, radius: 6, fill: colors.black, stroke: colors.darkGray, strokeWidth: 2 })}
  ${line({ x1: 756, y1: 284, x2: 826, y2: 284, stroke: colors.gray, strokeWidth: 2 })}
  ${line({ x1: 756, y1: 300, x2: 856, y2: 300, stroke: colors.gray, strokeWidth: 2 })}
  ${line({ x1: 740, y1: 350, x2: 854, y2: 350, stroke: colors.gray, strokeWidth: 2 })}
  ${line({ x1: 740, y1: 370, x2: 818, y2: 370, stroke: colors.gray, strokeWidth: 2 })}
  ${roundedRect({ x: 1024, y: 210, w: 80, h: 80, radius: 12, fill: colors.black, stroke: colors.gray, strokeWidth: 3 })}
  ${roundedRect({ x: 1024, y: 340, w: 80, h: 80, radius: 12, fill: colors.black, stroke: colors.gray, strokeWidth: 3 })}
  ${innerSquare(upperCenter.x, upperCenter.y)}
  ${innerSquare(lowerCenter.x, lowerCenter.y)}
  <circle cx="904" cy="284" r="4" fill="${colors.mint}"/>
  <circle cx="1024" cy="250" r="4" fill="${colors.mint}"/>
  ${textPaths}
</svg>
`;
};

const svg = buildSvg();

await mkdir(path.dirname(svgOut), { recursive: true });
await writeFile(svgOut, svg, "utf-8");

await sharp(Buffer.from(svg))
  .flatten({ background: colors.black })
  .png({ compressionLevel: 9 })
  .toFile(pngOut);

console.log(`Wrote ${path.relative(root, svgOut)}`);
console.log(`Wrote ${path.relative(root, pngOut)}`);
