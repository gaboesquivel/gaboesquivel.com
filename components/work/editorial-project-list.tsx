import { editorialContainer, editorialGrid } from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { editorialCoverSizes } from "lib/work/project-cover";

import { EditorialProjectCard } from "./editorial-project-card";

export function EditorialProjectList({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  return (
    <div className={cn(editorialContainer, className)}>
      <ul className={editorialGrid}>
        {projects.map((project) => (
          <li key={project.slug}>
            <EditorialProjectCard
              project={project}
              showRole
              sizes={editorialCoverSizes}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
