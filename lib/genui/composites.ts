import { featuredProjectSlugs } from "lib/work-types";

export const compositeNames = [
  "editorial-grid",
  "work-gallery",
  "featured-pair",
  "wide-lead",
  "evidence-grid",
  "diagram-band",
  "dated-row",
  "featured-writing",
  "case-study",
  "chapter-stack",
  "text-card-grid",
  "focus-pair",
  "hire-split",
  "cv-document",
  "cv-preview",
  "capability-showcase",
  "project-bento",
  "project-feature-grid",
  "project-asymmetric-closing",
  "project-compact-list",
  "project-comparison",
] as const;

export type CompositeName = (typeof compositeNames)[number];

const compositeSet = new Set<string>(compositeNames);

export const isCompositeName = (value: string): value is CompositeName =>
  compositeSet.has(value);

const featuredIdSet = new Set(
  featuredProjectSlugs.map((slug) => `/project/${slug}`)
);

export const chooseProjectComposite = ({
  projectIds,
}: {
  projectIds: string[];
}): CompositeName => {
  if (projectIds.length === 1) return "case-study";
  if (projectIds.length === 2) return "featured-pair";
  const allFeatured =
    projectIds.length === featuredProjectSlugs.length &&
    projectIds.every((id) => featuredIdSet.has(id));
  if (allFeatured) return "work-gallery";
  if (projectIds.length <= 4) return "editorial-grid";
  return "editorial-grid";
};

export const chooseWritingComposite = ({
  leadPostId,
  featuredSlug,
}: {
  leadPostId?: string;
  featuredSlug?: string;
}): CompositeName => {
  if (leadPostId && featuredSlug && leadPostId === `/blog/${featuredSlug}`) {
    return "featured-writing";
  }
  return "dated-row";
};
