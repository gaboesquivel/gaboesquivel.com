import { SiteCardLink } from "components/shared/site-card-link";
import { proseClass } from "components/shared/spacing";
import { Card } from "components/ui/card";
import type { Project } from "gaboesquivel";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import Image from "next/image";

const projectCardSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), (max-width: 896px) calc((100vw - 3rem - 1rem) / 2), 416px";

const wideProjectCardSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), calc(min(100vw, 56rem) - 3rem)";

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
          <div className="overflow-hidden">
            <Image
              src={src}
              alt={project.title}
              width={1600}
              height={1067}
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes={wideProjectCardSizes}
              className="h-auto w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110"
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
          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
            {project.role}
          </p>
        ) : null}
        <p className={cn(proseClass, "line-clamp-3")}>{project.description}</p>
      </div>
    </SiteCardLink>
  );
}
