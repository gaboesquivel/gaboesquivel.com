import { readFileSync } from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js";
import type { Font, Path } from "opentype.js";

const root = path.join(import.meta.dir, "../..");

let cachedFont: Font | undefined;

export const loadIbmPlexMono = () => {
  if (cachedFont) return cachedFont;
  const fontPath = path.join(
    root,
    "assets/fonts/ibm-plex-mono/IBMPlexMono-Regular.otf"
  );
  cachedFont = parseFont(readFileSync(fontPath));
  return cachedFont;
};

const n = (value: number) => value.toFixed(2);

/** Serializes glyph outlines; opentype.js 2.0 `toPathData` emits NaN for some coordinates. */
export const pathData = (path: Path) =>
  path.commands
    .map((c) => {
      if (c.type === "M" || c.type === "L")
        return `${c.type}${n(c.x)} ${n(c.y)}`;
      if (c.type === "C")
        return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      if (c.type === "Q") return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      return "Z";
    })
    .join("");

export const textToPath = ({
  text,
  x,
  top,
  fontSize,
  lineHeight,
  font = loadIbmPlexMono(),
}: {
  text: string;
  x: number;
  top: number;
  fontSize: number;
  lineHeight: number;
  font?: Font;
}) => {
  const scale = fontSize / font.unitsPerEm;
  const ascent = font.ascender * scale;
  const descent = Math.abs(font.descender * scale);
  const leading = lineHeight - (ascent + descent);
  const baseline = top + leading / 2 + ascent;

  return pathData(font.getPath(text, x, baseline, fontSize));
};

export const measureTextWidth = ({
  text,
  fontSize,
  font = loadIbmPlexMono(),
}: {
  text: string;
  fontSize: number;
  font?: Font;
}) => font.getAdvanceWidth(text, fontSize);

export const wrapTextLines = ({
  text,
  maxWidth,
  fontSize,
  maxLines,
  font = loadIbmPlexMono(),
}: {
  text: string;
  maxWidth: number;
  fontSize: number;
  maxLines: number;
  font?: Font;
}) => {
  if (maxLines < 1) return [];
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  let used = 0;

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureTextWidth({ text: candidate, fontSize, font }) <= maxWidth) {
      current = candidate;
      used += 1;
      continue;
    }
    if (lines.length === maxLines - 1) break;
    if (current) lines.push(current);
    current = word;
    used += 1;
  }
  if (current) lines.push(current);

  if (used < words.length) {
    let last = lines.at(-1) ?? "";
    while (
      last.length > 1 &&
      measureTextWidth({ text: `${last}…`, fontSize, font }) > maxWidth
    )
      last = last.slice(
        0,
        last.lastIndexOf(" ") > 0 ? last.lastIndexOf(" ") : -1
      );
    lines[lines.length - 1] = `${last.replace(/[\s,.;:—-]+$/, "")}…`;
  }

  return lines;
};

const titleSpecs = [
  { fontSize: 84, lineHeight: 96, maxLines: 2 },
  { fontSize: 72, lineHeight: 84, maxLines: 3 },
  { fontSize: 60, lineHeight: 72, maxLines: 3 },
  { fontSize: 52, lineHeight: 62, maxLines: 3 },
];

/** Largest title size that fits without truncation; the smallest size truncates. */
export const pickTitleLayout = ({
  title,
  maxWidth,
  font = loadIbmPlexMono(),
}: {
  title: string;
  maxWidth: number;
  font?: Font;
}) => {
  const normalized = title.trim().replace(/\s+/g, " ");
  for (const spec of titleSpecs) {
    const lines = wrapTextLines({ text: normalized, maxWidth, font, ...spec });
    if (lines.join(" ") === normalized) return { ...spec, lines };
  }
  const smallest = titleSpecs.at(-1) ?? titleSpecs[0];
  return {
    ...smallest,
    lines: wrapTextLines({ text: normalized, maxWidth, font, ...smallest }),
  };
};
