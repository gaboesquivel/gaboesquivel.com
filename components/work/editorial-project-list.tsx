import { editorialContainer, editorialGrid } from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { editorialCoverSizes } from "lib/work/project-cover";

import { EditorialProjectCard } from "./editorial-project-card";

export function EditorialProjectList({
  projects,
  className,
  priorityFirst = false,
}: {
  projects: Project[];
  className?: string;
  /** Load the first cover eagerly when the list leads the page (LCP). */
  priorityFirst?: boolean;
}) {
  return (
    <div className={cn(editorialContainer, className)}>
      <ul className={editorialGrid}>
        {projects.map((project, index) => (
          <li key={project.slug}>
            <EditorialProjectCard
              priority={priorityFirst && index === 0}
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
