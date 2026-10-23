import { blockSpacing, singleColGrid } from "components/shared/spacing";
import { getProjectBySlug } from "gaboesquivel";
import { cn } from "lib/utils";
import { evidenceUsesEditorial } from "lib/work/project-cover";

import { EditorialProjectCard } from "./editorial-project-card";
import {
  ProjectCard,
  projectCardSizes,
  wideProjectCardSizes,
} from "./project-card";

export function ProjectEvidence({
  slugs,
  columns = 2,
  presentation = "card",
  imageSizes,
}: {
  slugs: string[];
  columns?: 1 | 2;
  presentation?: "card" | "registry" | "editorial";
  imageSizes?: string;
}) {
  const evidence = slugs.flatMap((slug) => {
    const project = getProjectBySlug(slug);

    return project ? [project] : [];
  });
  const twoColumn = columns === 2 && evidence.length > 1;
  const editorial = evidenceUsesEditorial({ presentation, slugs });

  const editorialSizes =
    imageSizes ??
    (columns === 1 || !twoColumn ? wideProjectCardSizes : projectCardSizes);

  return (
    <ul
      className={cn(blockSpacing, singleColGrid, twoColumn && "md:grid-cols-2")}
    >
      {evidence.map((project, index) => {
        const isLastOdd =
          index === evidence.length - 1 && evidence.length % 2 === 1;
        const wide = !editorial && (!twoColumn || isLastOdd);

        return (
          <li
            key={project.slug}
            className={cn(
              twoColumn && isLastOdd && !editorial && "md:col-span-2"
            )}
          >
            {editorial ? (
              <EditorialProjectCard
                project={project}
                showRole
                sizes={editorialSizes}
              />
            ) : (
              <ProjectCard project={project} showRole wide={wide} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
