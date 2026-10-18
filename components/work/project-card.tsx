import { proseClass } from "components/shared/spacing";
import type { Project } from "gaboesquivel";
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
  const src = project.image?.replace("https://gaboesquivel.com", "");

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-neutral-200 transition-all duration-300 dark:border-hairline"
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
              sizes="(max-width: 768px) 100vw, 896px"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-110"
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
              className="object-cover transition-transform duration-500 group-hover:scale-110"
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
    </Link>
  );
}
