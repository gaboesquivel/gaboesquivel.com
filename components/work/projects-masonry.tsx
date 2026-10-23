import { CardGrid } from "components/shared/card-grid";
import { EditorialProjectList } from "components/work/editorial-project-list";
import { ProjectCard } from "components/work/project-card";
import type { Project } from "gaboesquivel";

export function ProjectsMasonry({
  projects,
  identifier = "projects",
  preserveOrder = false,
  variant = "editorial",
}: {
  projects: Project[];
  identifier?: string;
  preserveOrder?: boolean;
  variant?: "card" | "editorial";
}) {
  const sortedProjects = preserveOrder
    ? projects
    : [...projects].sort(
        (a, b) =>
          (a.order ?? Number.POSITIVE_INFINITY) -
          (b.order ?? Number.POSITIVE_INFINITY)
      );

  if (variant === "editorial") {
    return <EditorialProjectList projects={sortedProjects} className="mt-8" />;
  }

  return (
    <CardGrid
      items={sortedProjects}
      identifier={identifier}
      getKey={(project) => project.slug}
      renderItem={(project) => <ProjectCard project={project} />}
    />
  );
}
