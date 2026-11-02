import type { Metadata } from "next";

import { markdownSiblingPath } from "./markdown-sibling";
import { personalOgImage } from "./og/constants";
import { landingOgImages } from "./og/landing";

export const pageMetadata = ({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path?: string;
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
}): Metadata => {
  // Explicit images, then the page's landing card, then the personal card, so
  // every page unfurls with a 1200 × 630 PNG.
  const ogImages = images ??
    (path ? landingOgImages(path) : undefined) ?? [personalOgImage];
  return {
    title,
    description,
    ...(path
      ? {
          alternates: {
            canonical: path,
            types: { "text/markdown": markdownSiblingPath(path) },
          },
        }
      : {}),
    openGraph: {
      description,
      title,
      type: "website",
      ...(path ? { url: path } : {}),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      description,
      title,
      images: ogImages,
    },
  };
};

export const metadataWithMarkdownAlternate = ({
  metadata,
  path,
}: {
  metadata: Metadata;
  path: string;
}): Metadata => ({
  ...metadata,
  alternates: {
    ...metadata.alternates,
    types: {
      ...metadata.alternates?.types,
      "text/markdown": markdownSiblingPath(path),
    },
  },
});
