import { cvKeys } from "gaboesquivel";
import type { CvKey } from "gaboesquivel";

const SITE = "https://gaboesquivel.com";

export const cvSectionTitles: Record<CvKey, string> = {
  ai: "AI Product Engineering CV",
  full: "Curriculum Vitae",
  fullstack: "Full-Stack Product Engineering CV",
  web3: "Web3 Product Engineering CV",
};

const cvPath = (key: CvKey) => (key === "full" ? "/cv" : `/cv?focus=${key}`);

const cvPdfFile = (key: CvKey) =>
  key === "full" ? "gaboesquivel-cv.pdf" : `gaboesquivel-cv-${key}.pdf`;

export const normalizeCvFocus = (focus?: string | null) => {
  if (!focus || focus === "full") return "full" satisfies CvKey;
  if ((cvKeys as readonly string[]).includes(focus)) return focus as CvKey;
  return "full" satisfies CvKey;
};

export interface CvDownloadPayload {
  filename: string;
  pageUrl: string;
  pdfUrl: string;
  title: string;
  variant: CvKey;
}

export const cvDownloadPayload = ({
  focus,
}: {
  focus?: string | null;
} = {}): CvDownloadPayload => {
  const variant = normalizeCvFocus(focus);
  const filename = cvPdfFile(variant);
  const path = cvPath(variant);
  return {
    filename,
    pageUrl: `${SITE}${path}`,
    pdfUrl: `${SITE}/${filename}`,
    title: cvSectionTitles[variant],
    variant,
  };
};
