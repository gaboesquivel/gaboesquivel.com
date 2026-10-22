import sharp from "sharp";

import { ogAspect, ogColors, ogHeight, ogWidth } from "./constants";

const aspectTolerance = 0.04;

export const projectOgPngBuffer = async ({
  sourcePath,
}: {
  sourcePath: string;
}) => {
  const image = sharp(sourcePath);
  const meta = await image.metadata();
  const width = meta.width ?? ogWidth;
  const height = meta.height ?? ogHeight;
  const sourceAspect = width / height;

  if (
    Math.abs(sourceAspect - ogAspect) <= aspectTolerance &&
    width >= ogWidth - 2 &&
    height >= ogHeight - 2
  )
    return image
      .resize(ogWidth, ogHeight, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toBuffer();

  if (Math.abs(sourceAspect - ogAspect) <= aspectTolerance)
    return image
      .resize(ogWidth, ogHeight, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toBuffer();

  return image
    .resize(ogWidth, ogHeight, {
      fit: "contain",
      background: ogColors.black,
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
};
