import { projects } from "gaboesquivel";
import { featuredProjectSlugs, isWorkType } from "lib/work-types";

import { paginate } from "./pagination";
import { readResult } from "./result";
import { listProjectsInput } from "./schemas";
import type { CapabilityContext } from "./types";

const projectRecord = (project: (typeof projects)[number]) => ({
  description: project.description,
  slug: project.slug,
  title: project.title,
  url: `/project/${project.slug}`,
  year: project.year,
});

export const listProjects = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = listProjectsInput.safeParse(input ?? {});
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid project filters.",
      operation: "list_projects",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const { cursor, domain, limit } = parsed.data;
  if (domain && !isWorkType(domain)) {
    return readResult({
      data: null,
      message: "Unknown project domain.",
      operation: "list_projects",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const filtered =
    domain === undefined
      ? projects
      : domain === "featured"
        ? featuredProjectSlugs.flatMap((slug) => {
            const project = projects.find((item) => item.slug === slug);
            return project ? [project] : [];
          })
        : domain === "all"
          ? projects
          : projects.filter((project) => project.type.includes(domain));
  const page = paginate({ cursor, items: filtered, limit });
  if ("error" in page) {
    return readResult({
      data: null,
      message: page.error ?? "Invalid cursor.",
      operation: "list_projects",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const records = page.items.map(projectRecord);
  return readResult({
    data: { nextCursor: page.nextCursor, projects: records },
    message: records.length ? "Projects listed." : "No projects matched.",
    operation: "list_projects",
    requestId: context.correlationId,
    status: records.length ? "ok" : "empty",
  });
};
