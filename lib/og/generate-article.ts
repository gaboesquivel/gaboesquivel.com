import sharp from "sharp";

import { ogColors, ogWidth } from "./constants";
import { accentBarHeight, articleSvg, ogPadding, wrapSvg } from "./svg";
import { pickTitleLayout, wrapTextLines } from "./typography";

const textWidth = ogWidth - ogPadding * 2;
const titleTop = accentBarHeight + 72;
const footerTop = 548;
const summaryGap = 28;
const summaryFontSize = 28;
const summaryLineHeight = 40;
const summaryMaxLines = 3;

export const buildArticleOgSvg = ({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) => {
  const layout = pickTitleLayout({ title, maxWidth: textWidth });
  const summaryTop =
    titleTop + layout.lines.length * layout.lineHeight + summaryGap;
  const summaryRoom = Math.floor(
    (footerTop - summaryGap - summaryTop) / summaryLineHeight
  );
  const summaryLines = wrapTextLines({
    text: summary,
    maxWidth: textWidth,
    fontSize: summaryFontSize,
    maxLines: Math.max(0, Math.min(summaryMaxLines, summaryRoom)),
  });

  return wrapSvg(
    articleSvg({
      titleLines: layout.lines,
      titleFontSize: layout.fontSize,
      titleLineHeight: layout.lineHeight,
      summaryLines,
      summaryFontSize,
      summaryLineHeight,
      titleTop,
      summaryTop,
      footerTop,
    })
  );
};

export const articleOgPngBuffer = async ({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) => {
  const svg = buildArticleOgSvg({ title, summary });
  return sharp(Buffer.from(svg))
    .flatten({ background: ogColors.black })
    .png({ compressionLevel: 9 })
    .toBuffer();
};
