import { cvKeys, resolveCv as resolveCvBase } from "gaboesquivel";
import type { CvExperience, CvKey } from "gaboesquivel";
import { cvPath, cvPdfFile } from "lib/cv-paths";

import { cvPageBreaks } from "./page-breaks";

export { cvPath, cvPdfFile };

export type CvEntry = CvExperience & { pageBreak?: boolean };

const withPageBreaks = ({
  key,
  entries,
}: {
  key: CvKey;
  entries: CvExperience[];
}): CvEntry[] => {
  const breaks = new Set(cvPageBreaks[key]);
  return entries.map((entry) => ({
    ...entry,
    pageBreak: breaks.has(entry.company),
  }));
};

export { type CvKey, cvKeys };

export const cvSectionBreak = ({ key, id }: { key: CvKey; id: string }) =>
  cvPageBreaks[key].includes(id) ? "page-break-before " : "";

export const resolveCv = ({ focus }: { focus?: string | string[] }) => {
  const resolved = resolveCvBase({ focus });
  return {
    ...resolved,
    entries: withPageBreaks({
      entries: resolved.entries,
      key: resolved.key,
    }),
  };
};
