import { getProjectBySlug } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";

import type { PublicRecord } from "./envelope";

export const featuredProjectRecords = (): PublicRecord[] =>
  featuredProjectSlugs.flatMap((slug) => {
    const project = getProjectBySlug(slug);
    if (!project) return [];
    return [
      {
        description: project.description,
        id: `/project/${slug}`,
        kind: "project" as const,
        slug,
        title: project.title,
        url: `${siteOrigin}/project/${slug}`,
      },
    ];
  });
