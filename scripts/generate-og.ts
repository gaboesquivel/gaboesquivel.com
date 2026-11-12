import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { projects } from "gaboesquivel";

import { blogs } from "#velite";

import { articleOgPngBuffer } from "../lib/og/generate-article";
import { homeHeadline, landingOgPng } from "../lib/og/generate-landing";
import { projectOgPngBuffer } from "../lib/og/generate-project";
import { landingOgDir, landingOgFile, landingOgPages } from "../lib/og/landing";
import { projectOgPublicSourcePath } from "../lib/og/resolve";

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
  await Promise.all(
    [...pages].map(async ([pagePath, headline]) => {
      const buffer = await landingOgPng({ root, headline });
      await writeFile(path.join(outDir, landingOgFile(pagePath)), buffer);
    })
  );
  console.log(`Wrote ${pages.size} landing OG images`);
};

const writeBlogImages = async () => {
  const outDir = path.join(root, "public/images/og/blog");
  await mkdir(outDir, { recursive: true });

  const posts = blogs.filter((post) => !post.ogImage);
  await Promise.all(
    posts.map(async (post) => {
      const buffer = await articleOgPngBuffer({
        title: post.title,
        summary: post.summary,
      });
      await writeFile(path.join(outDir, `${post.slug}.png`), buffer);
    })
  );
  console.log(`Wrote ${posts.length} blog OG images`);
};

const writeProjectImages = async () => {
  const outDir = path.join(root, "public/images/og/projects");
  await mkdir(outDir, { recursive: true });

  const withImage = projects.flatMap((project) =>
    project.image ? [{ image: project.image, slug: project.slug }] : []
  );
  await Promise.all(
    withImage.map(async ({ image, slug }) => {
      const sourcePath = path.join(root, projectOgPublicSourcePath({ image }));
      const buffer = await projectOgPngBuffer({ sourcePath });
      await writeFile(path.join(outDir, `${slug}.png`), buffer);
    })
  );
  console.log(`Wrote ${withImage.length} project OG images`);
};

await Promise.all([
  writePersonal(),
  writeLandingImages(),
  writeBlogImages(),
  writeProjectImages(),
]);
