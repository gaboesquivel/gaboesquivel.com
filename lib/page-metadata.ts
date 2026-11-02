import type { Metadata } from "next";

import { markdownSiblingPath } from "./markdown-sibling";
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
  const ogImages = images ?? (path ? landingOgImages(path) : undefined);
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
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      description,
      title,
      ...(ogImages ? { images: ogImages } : {}),
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
