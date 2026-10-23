import type { Project } from "gaboesquivel";
import { getProjectBySlug } from "gaboesquivel";

export const projectSlugFromPublicId = (id: string) =>
  id.replace(/^\/project\//, "");

export const projectsFromPublicIds = (ids: string[]): Project[] =>
  ids.flatMap((id) => {
    const project = getProjectBySlug(projectSlugFromPublicId(id));
    return project ? [project] : [];
  });
