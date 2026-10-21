import sharp from "sharp";

const master = "assets/homepage/gaboesquivel-homepage-master.webp";

const outputs = [
  {
    path: "public/images/gaboesquivel-homepage-mobile.webp",
    width: 896,
  },
  {
    path: "public/images/gaboesquivel-homepage-desktop.webp",
    width: 700,
  },
] as const;

for (const { path, width } of outputs) {
  await sharp(master)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path);
  const meta = await sharp(path).metadata();
  console.log(`${path} ${meta.width}×${meta.height}`);
}
