import { EditorialProjectList } from "components/work/editorial-project-list";
import type { Project } from "gaboesquivel";

export function ProjectsMasonry({
  projects,
  preserveOrder = false,
  priorityFirst = false,
}: {
  projects: Project[];
  preserveOrder?: boolean;
  priorityFirst?: boolean;
}) {
  const sortedProjects = preserveOrder
    ? projects
    : [...projects].sort(
        (a, b) =>
          (a.order ?? Number.POSITIVE_INFINITY) -
          (b.order ?? Number.POSITIVE_INFINITY)
      );

  return (
    <EditorialProjectList
      className="mt-8"
      priorityFirst={priorityFirst}
      projects={sortedProjects}
    />
  );
}
