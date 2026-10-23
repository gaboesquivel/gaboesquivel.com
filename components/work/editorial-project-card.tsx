import {
  editorialLink,
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { resolveProjectImage } from "lib/work/project-cover";
import { projectViewTransitionName } from "lib/work/project-view-transition";
import Image from "next/image";
import Link from "next/link";

/** Cover-filled frame, name, role, and description. A missing registry cover keeps the package image in this same frame. */
export function EditorialProjectCard({
  project,
  sizes,
  showRole = true,
  priority = false,
  frame = "video",
}: {
  project: Project;
  sizes: string;
  showRole?: boolean;
  priority?: boolean;
  frame?: "video" | "wide";
}) {
  const image = resolveProjectImage({ project });
  const wide = frame === "wide";

  return (
    <Link
      href={`/project/${project.slug}`}
      className={cn("group block h-full", editorialLink)}
    >
      {image ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-black",
            wide ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-video"
          )}
          style={{
            viewTransitionName: projectViewTransitionName(project.slug),
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            preload={priority}
            fetchPriority={priority ? "high" : undefined}
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      ) : null}
      <h3 className="mt-4 text-2xl font-semibold tracking-tight">
        {project.title}
      </h3>
      {showRole && project.role ? (
        <p className={projectRoleInCard}>{project.role}</p>
      ) : null}
      <p className={projectCardDescription}>{project.description}</p>
    </Link>
  );
}
