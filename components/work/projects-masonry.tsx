import { EditorialProjectList } from "components/work/editorial-project-list";
import type { Project } from "gaboesquivel";

export function ProjectsMasonry({
  projects,
  preserveOrder = false,
}: {
  projects: Project[];
  preserveOrder?: boolean;
}) {
  const sortedProjects = preserveOrder
    ? projects
    : [...projects].sort(
        (a, b) =>
          (a.order ?? Number.POSITIVE_INFINITY) -
          (b.order ?? Number.POSITIVE_INFINITY)
      );

  return <EditorialProjectList projects={sortedProjects} className="mt-8" />;
}
