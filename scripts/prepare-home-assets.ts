import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import sharp from "sharp";

import { homepageEditorialSlugs } from "../lib/work/project-cover";

const fail = (message: string) => {
  console.error(`prepare-home-assets: ${message}`);
  process.exit(1);
};

const hashFile = async (path: string) =>
  createHash("sha256")
    .update(await readFile(path))
    .digest("hex");

const blackCanvas = async (sourcePath: string) => {
  const trimmed = await sharp(sourcePath)
    .trim({ threshold: 12 })
    .resize(1600, 900, { fit: "inside" })
    .toBuffer();
  return sharp({
    create: { width: 1600, height: 900, channels: 3, background: "#000000" },
  }).composite([{ input: trimmed, gravity: "center" }]);
};

const containBlack = (sourcePath: string) =>
  sharp(sourcePath).resize(1600, 900, {
    fit: "contain",
    background: "#000000",
  });

const coverConfigs: Record<
  (typeof homepageEditorialSlugs)[number],
  {
    source: string;
    mode: "trim" | "contain";
    transform: string;
    status: string;
  }
> = {
  "legal-agent": {
    source: "public/images/work/legalagent.png",
    mode: "trim",
    transform:
      "trim near-background mat, center on 1600×900 #000 canvas, no UI retouch",
    status: "Existing product imagery",
  },
  wink: {
    source: "public/images/work/wink2.png",
    mode: "trim",
    transform:
      "trim white field, center phones on 1600×900 #000 canvas, no UI retouch",
    status: "Existing product imagery",
  },
  ztx: {
    source: "public/images/work/ztx.png",
    mode: "contain",
    transform: "contain centered, 1600×900 black canvas, no source retouch",
    status: "Truthful fallback; approved purple character source pending",
  },
  bitlauncher: {
    source: "public/images/work/bitlauncher.png",
    mode: "contain",
    transform: "contain centered, 1600×900 black canvas, no source retouch",
    status: "Existing product imagery",
  },
};

try {
  await mkdir("public/images/work/covers", { recursive: true });
  const records = await Promise.all(
    homepageEditorialSlugs.map(async (slug) => {
      const { source, mode, transform, status } = coverConfigs[slug];
      const output = `public/images/work/covers/${slug}.webp`;
      const pipeline =
        mode === "trim" ? await blackCanvas(source) : containBlack(source);
      await pipeline.webp({ quality: 88, effort: 6 }).toFile(output);
      return {
        slug,
        source,
        output,
        sha256: await hashFile(source),
        transform,
        provenance:
          "Existing portfolio project evidence supplied in repository",
        status,
      };
    })
  );

  await writeFile(
    "assets/work/covers/manifest.json",
    `${JSON.stringify(records, null, 2)}\n`
  );
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
