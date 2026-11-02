import path from "node:path";

import {
  portraitHeight,
  portraitSrc,
  portraitWidth,
} from "lib/portrait-overlay";
import sharp from "sharp";

import { ogColors, ogHeight, ogWidth } from "./constants";
import { landingTextSvg, portraitOverlaySvg, wrapSvg } from "./svg";

/** Portrait height on the card; the frame is right-aligned and vertically centered. */
const portraitOgHeight = 560;

/** Homepage H1 (`app/page.tsx`); the personal card at `/og`. */
export const homeHeadline = "Software for humans and agents.";

/** Portrait card: page headline on the left, homepage portrait on the right. */
export const landingOgPng = async ({
  root,
  headline,
}: {
  root: string;
  headline: string;
}) => {
  const height = portraitOgHeight;
  const width = Math.round((height * portraitWidth) / portraitHeight);
  const left = ogWidth - width;
  const top = Math.round((ogHeight - height) / 2);

  const portrait = await sharp(path.join(root, "public", portraitSrc))
    .resize({ width, height, fit: "fill" })
    .toBuffer();
  const overlay = Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${portraitWidth} ${portraitHeight}" xmlns="http://www.w3.org/2000/svg">${portraitOverlaySvg()}</svg>`
  );
  const base = await sharp(Buffer.from(wrapSvg(landingTextSvg(headline))))
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
