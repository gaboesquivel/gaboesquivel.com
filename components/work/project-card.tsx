import { imageHover } from "components/shared/motion";
import { SiteCardLink } from "components/shared/site-card-link";
import {
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { resolveProjectImage, workCoverSizes } from "lib/work/project-cover";
import Image from "next/image";

export const projectCardSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc((100vw - 4rem) / 2), (max-width: 1151px) calc((100vw - 5rem) / 2), 536px";

export const wideProjectCardSizes = workCoverSizes;

export function ProjectCard({
  project,
  priority = false,
  showRole = false,
  wide = false,
}: {
  project: Project;
  priority?: boolean;
  showRole?: boolean;
  wide?: boolean;
}) {
  const image = resolveProjectImage({ project });

  return (
    <SiteCardLink
      cardClassName="h-full gap-0 overflow-hidden p-0"
      className="group overflow-hidden"
      href={`/project/${project.slug}`}
    >
      {image ? (
        wide ? (
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[21/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes={wideProjectCardSizes}
              className={cn("object-cover", imageHover)}
            />
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes={projectCardSizes}
              className={cn("object-cover", imageHover)}
            />
          </div>
        )
      ) : null}
      <div className="flex-grow p-4">
        <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        {showRole && project.role ? (
          <p className={cn(projectRoleInCard, "mb-2")}>{project.role}</p>
        ) : null}
        <p className={projectCardDescription}>{project.description}</p>
      </div>
    </SiteCardLink>
  );
}
