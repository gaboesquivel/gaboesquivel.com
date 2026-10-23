import type { PublicRecord } from "../envelope";

export const sampleCvRecord: PublicRecord = {
  id: "/cv",
  kind: "cv",
  pdfUrl: "https://gaboesquivel.com/gaboesquivel-cv.pdf",
  title: "Curriculum Vitae",
  url: "https://gaboesquivel.com/cv",
  variant: "full",
};

export const sampleProjectRecord = (
  slug: string,
  title: string
): PublicRecord => ({
  description: `${title} description`,
  id: `/project/${slug}`,
  kind: "project",
  slug,
  title,
  url: `https://gaboesquivel.com/project/${slug}`,
});

export const samplePostRecord = (
  slug: string,
  title: string
): PublicRecord => ({
  excerpt: `${title} excerpt`,
  id: `/blog/${slug}`,
  kind: "post",
  slug,
  title,
  url: `https://gaboesquivel.com/blog/${slug}`,
});

export const sampleProfileRecord: PublicRecord = {
  id: "profile",
  kind: "profile",
  title: "Gabo Esquivel",
  url: "https://gaboesquivel.com/about",
};
