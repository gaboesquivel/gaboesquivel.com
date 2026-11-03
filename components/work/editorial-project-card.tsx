import { imageHover } from "components/shared/motion";
import {
  editorialLink,
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import { CoverMorph } from "components/work/cover-morph";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import {
  projectCoverPosition,
  resolveProjectImage,
} from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

/** Package hero image in a cover-filled frame, plus name, role, and description. */
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
        <CoverMorph slug={project.slug}>
          <div
            className={cn(
              "relative overflow-hidden rounded-lg bg-black",
              wide ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-video"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              preload={priority}
              loading={priority ? "eager" : undefined}
              fetchPriority={priority ? "high" : undefined}
              className={cn("bg-neutral-900 object-cover", imageHover)}
              style={{ objectPosition: projectCoverPosition(project) }}
            />
          </div>
        </CoverMorph>
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
