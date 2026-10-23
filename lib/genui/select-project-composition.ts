import type { Project } from "gaboesquivel";
import { resolveProjectImage } from "lib/work/project-cover";

import type { CompositeName } from "./composites";
import type { GenuiTaskIntent } from "./task-intent";

export const mediaBackedProjectCount = (projects: Project[]) =>
  projects.filter((project) => resolveProjectImage({ project })).length;

export const selectProjectComposition = ({
  intent,
  projects,
}: {
  intent: GenuiTaskIntent;
  projects: Project[];
}): CompositeName => {
  const count = projects.length;
  const mediaCount = mediaBackedProjectCount(projects);

  if (intent === "compare-projects" && count >= 2 && count <= 3) {
    return "project-comparison";
  }
  if (intent === "project-detail" || count === 1) {
    return "case-study";
  }
  if (mediaCount < 2) {
    return "project-compact-list";
  }
  if (count === 2) {
    return "featured-pair";
  }
  if (count === 3) {
    return "project-feature-grid";
  }
  if (count === 4) {
    return "project-bento";
  }
  if (count >= 5 && count <= 8) {
    return "project-asymmetric-closing";
  }
  return "project-compact-list";
};
