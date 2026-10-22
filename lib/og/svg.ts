import { siteBrandRole } from "lib/site-identity";

import { ogColors, ogHeight, ogWidth } from "./constants";
import { textToPath } from "./typography";

export const personalCopy = [
  {
    text: "Gabo Esquivel",
    x: 72,
    top: 180,
    fontSize: 48,
    lineHeight: 60,
    fill: ogColors.white,
  },
  {
    text: siteBrandRole,
    x: 72,
    top: 256,
    fontSize: 24,
    lineHeight: 34,
    fill: ogColors.gray,
  },
  {
    text: "gaboesquivel.com",
    x: 72,
    top: 496,
    fontSize: 20,
    lineHeight: 28,
    fill: ogColors.accent,
  },
] as const;

export const personalTextSvg = () =>
  personalCopy
    .map(
      (lineSpec) =>
        `<path d="${textToPath(lineSpec)}" fill="${lineSpec.fill}"/>`
    )
    .join("\n  ");

export const articleBrandingSvg = ({
  titleX,
  titleTop,
  titleLines,
  fontSize,
  lineHeight,
  authorTop,
}: {
  titleX: number;
  titleTop: number;
  titleLines: string[];
  fontSize: number;
  lineHeight: number;
  authorTop: number;
}) => {
  const titlePaths = titleLines
    .map((line, index) => {
      const top = titleTop + index * lineHeight;
      return `<path d="${textToPath({
        text: line,
        x: titleX,
        top,
        fontSize,
        lineHeight,
      })}" fill="${ogColors.white}"/>`;
    })
    .join("\n  ");
  const authorPath = `<path d="${textToPath({
    text: "Gabo Esquivel",
    x: titleX,
    top: authorTop,
    fontSize: 18,
    lineHeight: 26,
  })}" fill="${ogColors.gray}"/>`;

  const domainPath = `<path d="${textToPath({
    text: "gaboesquivel.com",
    x: titleX,
    top: 552,
    fontSize: 16,
    lineHeight: 22,
  })}" fill="${ogColors.accent}"/>`;

  return `${titlePaths}\n  ${authorPath}\n  ${domainPath}`;
};

export const wrapSvg = (body: string) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${ogWidth}" height="${ogHeight}" fill="${ogColors.black}"/>
  ${body}
</svg>
`;
