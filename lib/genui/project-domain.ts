import { getProjectBySlug, projects } from "gaboesquivel";
import type { Project } from "gaboesquivel";

import { fintechProjectSlugs } from "./fintech-projects";

export type GenuiProjectDomain = "ai" | "web3" | "fintech" | "all";

export const filterProjectsByDomain = ({
  domain,
}: {
  domain: GenuiProjectDomain;
}): Project[] => {
  if (domain === "all") return [...projects];
  if (domain === "ai" || domain === "web3") {
    return projects.filter((project) => project.type.includes(domain));
  }
  if (domain === "fintech") {
    return fintechProjectSlugs.flatMap((slug) => {
      const project = getProjectBySlug(slug);
      return project ? [project] : [];
    });
  }
  return [];
};
