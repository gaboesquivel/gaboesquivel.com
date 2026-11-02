import { describe, expect, test } from "bun:test";
import { readdirSync } from "node:fs";
import path from "node:path";

import { pageMetadata } from "lib/page-metadata";

import { landingOgFile, landingOgImages, landingOgPages } from "./landing";

/** Routes that keep their own OG image or are not public landing pages. */
const excluded = new Set(["/", "/ask"]);

const staticRoutes = () =>
  readdirSync(path.join(import.meta.dir, "../../app"), {
    recursive: true,
    encoding: "utf-8",
  })
    .filter((file) => file.endsWith("page.tsx") && !file.includes("["))
    .map((file) => `/${path.dirname(file)}`.replace(/\/\.$/, "/"))
    .filter((route) => !route.startsWith("/genui-lab") && !excluded.has(route));

describe("landing OG", () => {
  test("every static page has a card", () => {
    const pages = landingOgPages();
    expect(staticRoutes().filter((route) => !pages.has(route))).toEqual([]);
  });

  test("card files are unique per path", () => {
    const files = [...landingOgPages().keys()].map(landingOgFile);
    expect(new Set(files).size).toBe(files.length);
  });

  test("pageMetadata defaults to the page card", () => {
    const metadata = pageMetadata({
      title: "Writing | Gabo Esquivel",
      description: "Writing",
      path: "/blog",
    });
    expect(metadata.openGraph?.images).toEqual(landingOgImages("/blog"));
    expect(landingOgImages("/blog")?.[0]?.url).toBe(
      "/images/og/pages/blog.png"
    );
  });

  test("explicit images win and unknown paths fall back to the layout", () => {
    const images = [{ url: "/custom.png" }];
    expect(
      pageMetadata({ title: "t", description: "d", path: "/blog", images })
        .openGraph?.images
    ).toEqual(images);
    expect(
      pageMetadata({ title: "t", description: "d", path: "/nope" }).openGraph
        ?.images
    ).toBeUndefined();
  });
});
