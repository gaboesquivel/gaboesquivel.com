import { portraitOverlay } from "lib/portrait-overlay";
import { siteBrandRole } from "lib/site-identity";

import { ogColors, ogHeight, ogWidth } from "./constants";
import {
  loadIbmPlexMono,
  measureTextWidth,
  pathData,
  pickTitleLayout,
  textToPath,
} from "./typography";

export const ogPadding = 72;
export const accentBarHeight = 8;

interface TextLine {
  text: string;
  x: number;
  top: number;
  fontSize: number;
  lineHeight: number;
  fill: string;
}

const textPath = (line: TextLine) =>
  `<path d="${textToPath(line)}" fill="${line.fill}"/>`;

const accentBarSvg = () =>
  `<rect width="${ogWidth}" height="${accentBarHeight}" fill="${ogColors.accent}"/>`;

/** Headline sizes for the portrait cards; the column stops short of the portrait. */
const headlineSpecs = [
  { fontSize: 72, lineHeight: 84, maxLines: 2 },
  { fontSize: 60, lineHeight: 72, maxLines: 3 },
  { fontSize: 48, lineHeight: 58, maxLines: 3 },
  { fontSize: 40, lineHeight: 50, maxLines: 3 },
];
const headlineTop = 112;
const headlineMaxWidth = 440;

/** Left column of the portrait cards: headline, name, role, and domain. */
export const landingTextSvg = (headline: string) => {
  const layout = pickTitleLayout({
    title: headline,
    maxWidth: headlineMaxWidth,
    specs: headlineSpecs,
  });
  const nameTop = headlineTop + layout.lines.length * layout.lineHeight + 32;
  const lines: TextLine[] = [
    ...layout.lines.map((text, index) => ({
      text,
      x: ogPadding,
      top: headlineTop + index * layout.lineHeight,
      fontSize: layout.fontSize,
      lineHeight: layout.lineHeight,
      fill: ogColors.white,
    })),
    {
      text: "Gabo Esquivel",
      x: ogPadding,
      top: nameTop,
      fontSize: 28,
      lineHeight: 38,
      fill: ogColors.gray,
    },
    {
      text: siteBrandRole,
      x: ogPadding,
      top: nameTop + 40,
      fontSize: 24,
      lineHeight: 34,
      fill: ogColors.accent,
    },
    {
      text: "gaboesquivel.com",
      x: ogPadding,
      top: 532,
      fontSize: 20,
      lineHeight: 28,
      fill: ogColors.gray,
    },
  ];
  return [accentBarSvg(), ...lines.map(textPath)].join("\n  ");
};

/** Portrait linework as SVG markup in portrait coordinates, labels outlined. */
export const portraitOverlaySvg = () => {
  const font = loadIbmPlexMono();
  const { dots, label, labels, strokeGroups } = portraitOverlay;
  const groups = strokeGroups.map(
    (group) =>
      `<g stroke="${ogColors.accent}" stroke-width="${group.strokeWidth}" opacity="${group.opacity}" fill="none">${group.paths
        .map(
          (path) =>
            `<path d="${path.d}"${"strokeWidth" in path ? ` stroke-width="${path.strokeWidth}"` : ""}${"opacity" in path ? ` opacity="${path.opacity}"` : ""}/>`
        )
        .join("")}</g>`
  );
  const dotMarkup = `<g fill="${ogColors.accent}" opacity="${dots.opacity}">${dots.points
    .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="${dots.r}"/>`)
    .join("")}</g>`;
  const labelMarkup = labels.map(
    (item) =>
      `<path d="${item.tick}" stroke="${ogColors.accent}" opacity="${label.tickOpacity}" stroke-width="${label.strokeWidth}" fill="none"/>` +
      `<circle cx="${item.marker.cx}" cy="${item.marker.cy}" r="${item.marker.r}" fill="${ogColors.accent}" opacity="${label.markerOpacity}"/>` +
      `<path d="${pathData(
        font.getPath(item.text, item.textX, item.baselineY, label.fontSize)
      )}" fill="${ogColors.gray}"/>`
  );
  return [...groups, dotMarkup, ...labelMarkup].join("\n  ");
};

export const articleSvg = ({
  titleLines,
  titleFontSize,
  titleLineHeight,
  summaryLines,
  summaryFontSize,
  summaryLineHeight,
  titleTop,
  summaryTop,
  footerTop,
}: {
  titleLines: string[];
  titleFontSize: number;
  titleLineHeight: number;
  summaryLines: string[];
  summaryFontSize: number;
  summaryLineHeight: number;
  titleTop: number;
  summaryTop: number;
  footerTop: number;
}) => {
  const footerFontSize = 22;
  const domain = "gaboesquivel.com";
  const lines: TextLine[] = [
    ...titleLines.map((text, index) => ({
      text,
      x: ogPadding,
      top: titleTop + index * titleLineHeight,
      fontSize: titleFontSize,
      lineHeight: titleLineHeight,
      fill: ogColors.white,
    })),
    ...summaryLines.map((text, index) => ({
      text,
      x: ogPadding,
      top: summaryTop + index * summaryLineHeight,
      fontSize: summaryFontSize,
      lineHeight: summaryLineHeight,
      fill: ogColors.gray,
    })),
    {
      text: "Gabo Esquivel",
      x: ogPadding,
      top: footerTop,
      fontSize: footerFontSize,
      lineHeight: 30,
      fill: ogColors.gray,
    },
    {
      text: domain,
      x:
        ogWidth -
        ogPadding -
        measureTextWidth({ text: domain, fontSize: footerFontSize }),
      top: footerTop,
      fontSize: footerFontSize,
      lineHeight: 30,
      fill: ogColors.accent,
    },
  ];
  return [accentBarSvg(), ...lines.map(textPath)].join("\n  ");
};

export const wrapSvg = (body: string) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${ogWidth}" height="${ogHeight}" fill="${ogColors.black}"/>
  ${body}
</svg>
`;
