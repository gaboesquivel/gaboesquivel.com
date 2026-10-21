import { cvKeys } from "gaboesquivel";
import type { CvKey } from "gaboesquivel";
import { cvPath, cvPdfFile, cvSectionTitles } from "lib/cv-paths";
import { siteOrigin } from "lib/site-path";

export { cvSectionTitles };

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
  const filename = cvPdfFile({ key: variant });
  const path = cvPath({ key: variant });
  return {
    filename,
    pageUrl: `${siteOrigin}${path}`,
    pdfUrl: `${siteOrigin}/${filename}`,
    title: cvSectionTitles[variant],
    variant,
  };
};
