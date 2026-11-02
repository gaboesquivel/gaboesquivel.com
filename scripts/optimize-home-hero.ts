import sharp from "sharp";

const source = "assets/homepage/v2/gabo-portrait.png";
const output = "public/images/gabo-portrait.webp";

await sharp(source).webp({ quality: 90, effort: 6 }).toFile(output);
const { width, height } = await sharp(output).metadata();
const kb = Math.round(Bun.file(output).size / 1024);
console.log(`${output} ${width}×${height} ${kb} KB`);
