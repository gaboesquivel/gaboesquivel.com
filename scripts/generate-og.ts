import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { projects } from "gaboesquivel";

import { blogs } from "#velite";

import { articleOgPngBuffer } from "../lib/og/generate-article";
import { homeHeadline, landingOgPng } from "../lib/og/generate-landing";
import { projectOgPngBuffer } from "../lib/og/generate-project";
import { landingOgDir, landingOgFile, landingOgPages } from "../lib/og/landing";
import { projectOgPublicSourcePath } from "../lib/og/resolve";
import { siteOrigin } from "../lib/site-path";

const root = path.join(import.meta.dir, "..");

const writePersonal = async () => {
  const pngOut = path.join(root, "app/opengraph-image.png");
  await writeFile(pngOut, await landingOgPng({ root, headline: homeHeadline }));
  console.log(`Wrote ${path.relative(root, pngOut)}`);
};

const writeLandingImages = async () => {
  const outDir = path.join(root, "public", landingOgDir);
  await mkdir(outDir, { recursive: true });

  const pages = landingOgPages();
  for (const [pagePath, headline] of pages) {
    const buffer = await landingOgPng({ root, headline });
    await writeFile(path.join(outDir, landingOgFile(pagePath)), buffer);
  }
  console.log(`Wrote ${pages.size} landing OG images`);
};

const writeBlogImages = async () => {
  const outDir = path.join(root, "public/images/og/blog");
  await mkdir(outDir, { recursive: true });

  for (const post of blogs) {
    if (post.ogImage) continue;
    const buffer = await articleOgPngBuffer({
      title: post.title,
      summary: post.summary,
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
await writeLandingImages();
await writeBlogImages();
await writeProjectImages();
