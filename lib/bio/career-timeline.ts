/** GenUI summaries derived from `lib/bio/chapters.ts` (canonical career narrative). */
import { bioChapters, bioProjectSlugs } from "lib/bio/chapters";

export const careerChapters = bioChapters.map((chapter) => ({
  id: chapter.id,
  year: chapter.startYear,
  period: chapter.period,
  label: chapter.navLabel,
  title: chapter.title,
  summary: chapter.summaryParagraphs
    .map((paragraph) =>
      paragraph
        .map((segment) =>
          typeof segment === "string" ? segment : segment.label
        )
        .join("")
    )
    .join(" "),
  detail: chapter.expandedParagraphs
    .map((paragraph) =>
      paragraph
        .map((segment) =>
          typeof segment === "string" ? segment : segment.label
        )
        .join("")
    )
    .join(" "),
  projectSlugs: chapter.projectSlugs,
}));

export type CareerChapter = (typeof careerChapters)[number];
export const careerProjectSlugs = bioProjectSlugs;
