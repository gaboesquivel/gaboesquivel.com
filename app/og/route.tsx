import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const png = await readFile(
    path.join(process.cwd(), "app/opengraph-image.png")
  );

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
}
