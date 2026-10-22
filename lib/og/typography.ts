import { readFileSync } from "node:fs";
import path from "node:path";

import { parse as parseFont } from "opentype.js";
import type { Font } from "opentype.js";

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

  return font.getPath(text, x, baseline, fontSize).toPathData(2);
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

export const wrapTitleLines = ({
  title,
  maxWidth,
  fontSize,
  maxLines,
  font = loadIbmPlexMono(),
}: {
  title: string;
  maxWidth: number;
  fontSize: number;
  maxLines: number;
  font?: Font;
}) => {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureTextWidth({ text: candidate, fontSize, font }) <= maxWidth) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    if (lines.length >= maxLines - 1) break;
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) return lines.slice(0, maxLines);

  const usedWords = lines.join(" ").split(/\s+/).length;
  if (usedWords < words.length && lines.length === maxLines) {
    const last = lines.at(-1) ?? "";
    let trimmed = last;
    while (
      trimmed.length > 1 &&
      measureTextWidth({ text: `${trimmed}…`, fontSize, font }) > maxWidth
    )
      trimmed = trimmed.slice(0, -1);
    lines[lines.length - 1] = `${trimmed}…`;
  }

  return lines;
};

export const pickTitleLayout = ({
  title,
  maxWidth,
  font = loadIbmPlexMono(),
}: {
  title: string;
  maxWidth: number;
  font?: Font;
}) => {
  const specs = [
    { fontSize: 52, lineHeight: 64, maxLines: 4 },
    { fontSize: 44, lineHeight: 54, maxLines: 5 },
    { fontSize: 36, lineHeight: 46, maxLines: 6 },
    { fontSize: 30, lineHeight: 40, maxLines: 7 },
    { fontSize: 26, lineHeight: 34, maxLines: 8 },
  ];

  for (const spec of specs) {
    const lines = wrapTitleLines({
      title,
      maxWidth,
      fontSize: spec.fontSize,
      maxLines: spec.maxLines,
      font,
    });
    const joined = lines.join(" ");
    const normalizedTitle = title.trim().replace(/\s+/g, " ");
    const fits =
      joined === normalizedTitle ||
      joined.endsWith("…") ||
      lines.every(
        (line, index) =>
          measureTextWidth({
            text: line,
            fontSize: spec.fontSize,
            font,
          }) <= maxWidth || index === lines.length - 1
      );
    if (fits && lines.length <= spec.maxLines) return { ...spec, lines };
  }

  const fallback = specs.at(-1) ?? {
    fontSize: 26,
    lineHeight: 34,
    maxLines: 8,
  };
  return {
    fontSize: fallback.fontSize,
    lineHeight: fallback.lineHeight,
    maxLines: fallback.maxLines,
    lines: wrapTitleLines({
      title,
      maxWidth,
      fontSize: fallback.fontSize,
      maxLines: fallback.maxLines,
      font,
    }),
  };
};
