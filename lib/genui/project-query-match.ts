import { projects } from "gaboesquivel";

import { normalizeGenuiQuery } from "./normalize-query";

export const projectsMatchingQuery = (query: string) => {
  const normalized = normalizeGenuiQuery(query);
  return projects.filter(
    (project) =>
      normalized.includes(project.slug.replace(/-/g, " ")) ||
      normalized.includes(project.title.toLowerCase()) ||
      normalized.includes(project.slug)
  );
};
