import path from "node:path";

import { portraitHeight, portraitWidth } from "lib/portrait-overlay";
import sharp from "sharp";

import { ogColors, ogHeight, ogWidth, personalPortraitPath } from "./constants";
import { personalTextSvg, portraitOverlaySvg, wrapSvg } from "./svg";

/** Portrait height on the card; the frame is right-aligned and vertically centered. */
const portraitOgHeight = 560;

export const buildPersonalOgSvg = () => wrapSvg(personalTextSvg());

export const compositePersonalOgPng = async ({
  root,
  portraitRelativePath = personalPortraitPath,
}: {
  root: string;
  portraitRelativePath?: string;
}) => {
  const height = portraitOgHeight;
  const width = Math.round((height * portraitWidth) / portraitHeight);
  const left = ogWidth - width;
  const top = Math.round((ogHeight - height) / 2);

  const portrait = await sharp(path.join(root, portraitRelativePath))
    .resize({ width, height, fit: "fill" })
    .toBuffer();
  const overlay = Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${portraitWidth} ${portraitHeight}" xmlns="http://www.w3.org/2000/svg">${portraitOverlaySvg()}</svg>`
  );
  const base = await sharp(Buffer.from(buildPersonalOgSvg()))
    .flatten({ background: ogColors.black })
    .png()
    .toBuffer();

  return sharp(base)
    .composite([
      // Lighten keeps the portrait's black backdrop from covering the headline.
      { input: portrait, left, top, blend: "lighten" },
      { input: overlay, left, top },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
};
