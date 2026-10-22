import path from "node:path";

import sharp from "sharp";

import { ogColors, ogHeight, ogWidth, personalPortraitPath } from "./constants";
import { personalCopy, personalTextSvg, wrapSvg } from "./svg";
import { measureTextWidth } from "./typography";

const marginRight = 32;
const copyGap = 40;

export const buildPersonalOgSvg = () => wrapSvg(personalTextSvg());

const personalCopyRight = () =>
  Math.max(
    ...personalCopy.map(
      (line) =>
        line.x + measureTextWidth({ text: line.text, fontSize: line.fontSize })
    )
  );

export const compositePersonalOgPng = async ({
  root,
  portraitRelativePath = personalPortraitPath,
}: {
  root: string;
  portraitRelativePath?: string;
}) => {
  const svg = buildPersonalOgSvg();
  const base = await sharp(Buffer.from(svg))
    .flatten({ background: ogColors.black })
    .png()
    .toBuffer();

  const portraitPath = path.join(root, portraitRelativePath);
  const source = await sharp(portraitPath).metadata();
  const sourceWidth = source.width ?? ogWidth;
  const sourceHeight = source.height ?? ogHeight;
  const maxWidth =
    ogWidth - Math.ceil(personalCopyRight()) - copyGap - marginRight;
  const widthLimit = Math.max(
    1,
    Math.floor(Math.min(maxWidth, (ogHeight * sourceWidth) / sourceHeight))
  );
  const resized = await sharp(portraitPath)
    .resize({ width: widthLimit, withoutEnlargement: false })
    .toBuffer();
  const resizedMeta = await sharp(resized).metadata();
  const width = resizedMeta.width ?? widthLimit;
  const height = resizedMeta.height ?? ogHeight;

  return sharp(base)
    .composite([
      {
        input: resized,
        left: ogWidth - width - marginRight,
        top: Math.round((ogHeight - height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
};
