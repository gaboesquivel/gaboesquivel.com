import sharp from "sharp";

import { articleOgVisualBySlug, articleVisualSvg } from "./article-visuals";
import type { ArticleOgVisualKey } from "./article-visuals";
import { ogColors, ogHeight, ogWidth } from "./constants";
import { articleBrandingSvg, wrapSvg } from "./svg";
import { pickTitleLayout } from "./typography";

export const buildArticleOgSvg = ({
  title,
  visualKey,
}: {
  title: string;
  visualKey: ArticleOgVisualKey | null;
}) => {
  const withVisual = visualKey !== null;
  const titleMaxWidth = withVisual ? 620 : 1000;
  const titleX = 72;
  const layout = pickTitleLayout({ title, maxWidth: titleMaxWidth });
  const titleTop = withVisual ? 96 : 120;

  const visualMarkup =
    visualKey === null
      ? ""
      : articleVisualSvg({ visualKey, offsetX: 720, offsetY: 100 });

  const titleBlockBottom =
    titleTop + layout.lines.length * layout.lineHeight + 24;
  const authorTop = Math.min(Math.max(titleBlockBottom, 440), 520);

  const body = `${articleBrandingSvg({
    titleX,
    titleTop,
    titleLines: layout.lines,
    fontSize: layout.fontSize,
    lineHeight: layout.lineHeight,
    authorTop,
  })}
  ${visualMarkup}`;

  return wrapSvg(body);
};

export const articleOgPngBuffer = async ({
  title,
  slug,
  visualKey = articleOgVisualBySlug[slug] ?? null,
}: {
  title: string;
  slug: string;
  visualKey?: ArticleOgVisualKey | null;
}) => {
  const svg = buildArticleOgSvg({ title, visualKey });
  return sharp(Buffer.from(svg))
    .flatten({ background: ogColors.black })
    .png({ compressionLevel: 9 })
    .toBuffer();
};

export const articleOgDimensions = () => ({
  width: ogWidth,
  height: ogHeight,
});
