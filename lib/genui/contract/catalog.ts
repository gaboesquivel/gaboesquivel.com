import type { CompositeName } from "../composites";
import { compositeNames } from "../composites";
import type { ExperienceName } from "../experience-contract";
import { experienceNames } from "../experience-contract";

/** Composites with distinct rendering for each experience (no silent fallback). */
export const projectComposites: readonly CompositeName[] = [
  "editorial-grid",
  "work-gallery",
  "featured-pair",
  "wide-lead",
  "evidence-grid",
  "case-study",
  "project-bento",
  "project-feature-grid",
  "project-asymmetric-closing",
  "project-compact-list",
  "project-comparison",
];

export const writingComposites: readonly CompositeName[] = [
  "dated-row",
  "featured-writing",
];

export const contactComposites: readonly CompositeName[] = ["hire-split"];

export const bookingComposites: readonly CompositeName[] = ["hire-split"];

export const cvComposites: readonly CompositeName[] = ["cv-document"];

export const experienceCompositeAllowlist: Partial<
  Record<ExperienceName, readonly CompositeName[]>
> = {
  TimelineExperience: ["chapter-stack"],
  BookingExperience: bookingComposites,
  ContactExperience: contactComposites,
  CVExperience: cvComposites,
  ProjectExperience: projectComposites,
  WritingExperience: writingComposites,
};

/** Not supported for production nested composition (renders segment strings only). */
export const productionBlockedExperiences: readonly ExperienceName[] = [
  "ExperienceStack",
];

export const GENUI_MAX_DOCUMENT_BYTES = 64 * 1024;

export const GENUI_MAX_STATEMENT_COUNT = 1;

export const supportedExperienceSet = new Set<string>(experienceNames);

export const supportedCompositeSet = new Set<string>(compositeNames);
