import { featuredProjectSlugs } from "lib/work-types";
import { projectsFromSlugs } from "lib/work/projects-from-slugs";

import type { PublicRecord } from "./envelope";
import { projectToPublicRecord } from "./public-records";

export const featuredProjectRecords = (): PublicRecord[] =>
  projectsFromSlugs(featuredProjectSlugs).map(projectToPublicRecord);
