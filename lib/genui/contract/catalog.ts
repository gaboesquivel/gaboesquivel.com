import type { CompositeName } from "../composites";
import type { ExperienceName } from "../experience-contract";

/** Composites with distinct rendering for each experience (no silent fallback). */
const projectComposites: readonly CompositeName[] = [
  "editorial-grid",
  "work-gallery",
  "featured-pair",
  "wide-lead",
  "evidence-grid",
  "case-study",
  "project-timeline",
  "project-bento",
  "project-feature-grid",
  "project-asymmetric-closing",
  "project-compact-list",
  "project-comparison",
];

const writingComposites: readonly CompositeName[] = [
  "dated-row",
  "featured-writing",
];

const contactComposites: readonly CompositeName[] = ["hire-split"];

const bookingComposites: readonly CompositeName[] = ["hire-split"];

const cvComposites: readonly CompositeName[] = ["cv-document", "cv-preview"];

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

export const GENUI_MAX_STACK_CHILDREN = 6;

export const GENUI_MAX_DOCUMENT_BYTES = 64 * 1024;

export const GENUI_MAX_STATEMENT_COUNT = 1;
