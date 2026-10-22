import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { projects } from "gaboesquivel";

import { blogs } from "#velite";

import { articleOgPngBuffer } from "../lib/og/generate-article";
import {
  buildPersonalOgSvg,
  compositePersonalOgPng,
} from "../lib/og/generate-personal";
import { projectOgPngBuffer } from "../lib/og/generate-project";
import { projectOgPublicSourcePath } from "../lib/og/resolve";
import { siteOrigin } from "../lib/site-path";

const root = path.join(import.meta.dir, "..");

const writePersonal = async () => {
  const svgOut = path.join(root, "public/images/og/home.svg");
  const pngOut = path.join(root, "app/opengraph-image.png");
  const svg = buildPersonalOgSvg();
  const png = await compositePersonalOgPng({ root });

  await mkdir(path.dirname(svgOut), { recursive: true });
  await writeFile(svgOut, svg, "utf-8");
  await writeFile(pngOut, png);
  console.log(`Wrote ${path.relative(root, svgOut)}`);
  console.log(`Wrote ${path.relative(root, pngOut)}`);
};

const writeBlogImages = async () => {
  const outDir = path.join(root, "public/images/og/blog");
  await mkdir(outDir, { recursive: true });

  for (const post of blogs) {
    if (post.ogImage) continue;
    const buffer = await articleOgPngBuffer({
      title: post.title,
      slug: post.slug,
    });
    const out = path.join(outDir, `${post.slug}.png`);
    await writeFile(out, buffer);
  }
  console.log(`Wrote ${blogs.filter((p) => !p.ogImage).length} blog OG images`);
};

const writeProjectImages = async () => {
  const outDir = path.join(root, "public/images/og/projects");
  await mkdir(outDir, { recursive: true });

  let count = 0;
  for (const project of projects) {
    if (!project.image) continue;
    const sourcePath = path.join(
      root,
      projectOgPublicSourcePath({ image: project.image, siteOrigin })
    );
    const buffer = await projectOgPngBuffer({ sourcePath });
    await writeFile(path.join(outDir, `${project.slug}.png`), buffer);
    count += 1;
  }
  console.log(`Wrote ${count} project OG images`);
};

await writePersonal();
await writeBlogImages();
await writeProjectImages();
