import { blockSpacing } from "components/shared/spacing";
import { EditorialProjectCard } from "components/work/editorial-project-card";
import { EditorialProjectList } from "components/work/editorial-project-list";
import { FeaturedProjectCard } from "components/work/featured-project-card";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { workCoverSizes } from "lib/work/project-cover";

export function WorkProjectGallery({ projects }: { projects: Project[] }) {
  const [flagship, ...gallery] = projects;
  if (!flagship) return null;

  const [pairA, pairB, wide, pairC, pairD] = gallery;

  return (
    <div className={cn(blockSpacing, "space-y-12 lg:space-y-16")}>
      <FeaturedProjectCard project={flagship} priority />
      {pairA && pairB ? (
        <EditorialProjectList projects={[pairA, pairB]} />
      ) : null}
      {wide ? (
        <EditorialProjectCard
          project={wide}
          showRole
          frame="wide"
          sizes={workCoverSizes}
        />
      ) : null}
      {pairC && pairD ? (
        <EditorialProjectList projects={[pairC, pairD]} />
      ) : null}
    </div>
  );
}
