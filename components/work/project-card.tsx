import { proseClass, siteCardInteractive } from "components/shared/spacing";
import { Card } from "components/ui/card";
import type { Project } from "gaboesquivel";
import { siteRelativePath } from "lib/site-path";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

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
    <Link
      href={`/project/${project.slug}`}
      className={cn(
        siteCardInteractive,
        "group block h-full overflow-hidden rounded-lg focus-visible:outline-none"
      )}
    >
      <Card className="h-full gap-0 overflow-hidden p-0">
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
                sizes="(max-width: 768px) 100vw, 896px"
                className="h-auto w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110"
                style={{ height: "auto", width: "100%" }}
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
                sizes="(max-width: 768px) 100vw, 448px"
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
          <p className={cn(proseClass, "line-clamp-3")}>
            {project.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
