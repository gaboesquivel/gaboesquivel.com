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

  if (intent === "compare-projects" && count >= 2 && count <= 3) {
    return "project-comparison";
  }
  if (intent === "project-detail" || count === 1) {
    return "case-study";
  }
  const mediaCount = mediaBackedProjectCount(projects);
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
  if (count >= 5) {
    return "project-asymmetric-closing";
  }
  return "project-compact-list";
};

const leadVisualCount = (total: number) => {
  if (total <= 8) return total;
  return 8;
};

export const splitLeadAndRemainderProjects = (projects: Project[]) => {
  const leadCount = leadVisualCount(projects.length);
  const lead = projects.slice(0, leadCount);
  const remainder = projects.slice(leadCount);
  const leadComposite = selectProjectComposition({
    intent: "browse-projects",
    projects: lead,
  });
  return { lead, leadComposite, remainder };
};
