import { SiteCardLink } from "components/shared/site-card-link";
import {
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import Image from "next/image";

export const projectCardSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc((100vw - 4rem) / 2), (max-width: 1151px) calc((100vw - 5rem) / 2), 536px";

export const wideProjectCardSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), calc(min(100vw, 72rem) - 4rem)";

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
  const src = project.image ? siteRelativePath(project.image) : undefined;

  return (
    <SiteCardLink
      cardClassName="h-full gap-0 overflow-hidden p-0"
      className="group overflow-hidden"
      href={`/project/${project.slug}`}
    >
      {src ? (
        wide ? (
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[21/9]">
            <Image
              src={src}
              alt={project.title}
              fill
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes={wideProjectCardSizes}
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={src}
              alt={project.title}
              fill
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes={projectCardSizes}
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110"
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
