import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";
import { projectsFromSlugs } from "lib/work/projects-from-slugs";

import type { PublicRecord } from "./envelope";

export const featuredProjectRecords = (): PublicRecord[] =>
  projectsFromSlugs(featuredProjectSlugs).map((project) => ({
    description: project.description,
    id: `/project/${project.slug}`,
    kind: "project" as const,
    slug: project.slug,
    title: project.title,
    url: `${siteOrigin}/project/${project.slug}`,
  }));
