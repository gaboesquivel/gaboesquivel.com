import { resolveCv } from "gaboesquivel";
import type { CvKey } from "gaboesquivel";
import { cvPath, cvPdfFile, cvSectionTitles } from "lib/cv-paths";
import { siteOrigin } from "lib/site-path";

export const normalizeCvFocus = (focus?: string | null): CvKey =>
  resolveCv({
    focus:
      focus === null || focus === undefined || focus === "" ? undefined : focus,
  }).key;

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
