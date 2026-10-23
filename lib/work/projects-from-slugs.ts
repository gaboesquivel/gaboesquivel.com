import type { Project } from "gaboesquivel";
import { getProjectBySlug } from "gaboesquivel";

export const projectsFromSlugs = (slugs: readonly string[]): Project[] =>
  slugs.flatMap((slug) => {
    const project = getProjectBySlug(slug);
    return project ? [project] : [];
  });
