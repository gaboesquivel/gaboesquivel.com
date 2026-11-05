"use client";

import { imageHover } from "components/shared/motion";
import {
  editorialLink,
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import { CoverMorph } from "components/work/cover-morph";
import type { Project } from "gaboesquivel";
import type { ProjectCompositionRole } from "lib/genui/composition-plan";
import { cn } from "lib/utils";
import { resolveProjectImage } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

export const ProjectShowcaseCard = ({
  project,
  role,
  sizes,
  priority = false,
  index = 0,
  wide = false,
}: {
  project: Project;
  role: ProjectCompositionRole;
  sizes: string;
  priority?: boolean;
  /** Position in the result, for the entrance stagger (capped in CSS). */
  index?: number;
  /** Full-row card: cover and text sit side by side once the card is wide. */
  wide?: boolean;
}) => {
  const image = resolveProjectImage({ project });
  const lead = role === "lead";

  return (
    <article
      data-showcase-card=""
      style={{ "--card-index": Math.min(index, 8) } as React.CSSProperties}
      className={cn(
        "@container/showcase-card h-full min-w-0 rounded-lg border border-hairline bg-black p-4 motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none",
        "focus-within:border-neutral-500 hover:border-neutral-600"
      )}
    >
      <Link
        href={`/project/${project.slug}`}
        className={cn(
          "group flex h-full flex-col",
          wide &&
            "@min-[44rem]/showcase-card:grid @min-[44rem]/showcase-card:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] @min-[44rem]/showcase-card:items-center @min-[44rem]/showcase-card:gap-8",
          editorialLink
        )}
      >
        <CoverMorph slug={project.slug}>
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-neutral-950">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                preload={priority}
                fetchPriority={priority ? "high" : undefined}
                className={cn("object-cover", imageHover)}
              />
            ) : (
              <div className="flex h-full min-h-[8rem] items-end p-4">
                <span className="text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </span>
              </div>
            )}
          </div>
        </CoverMorph>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3
            className={cn(
              "mt-4 font-semibold tracking-tight [overflow-wrap:anywhere] text-white",
              wide && "@min-[44rem]/showcase-card:mt-0",
              lead || wide
                ? "text-2xl @min-[64rem]/project-showcase:text-3xl"
                : "text-xl"
            )}
          >
            {project.title}
          </h3>
          {project.role ? (
            <p className={projectRoleInCard}>{project.role}</p>
          ) : null}
          <p className={cn(projectCardDescription, "line-clamp-3")}>
            {project.description}
          </p>
          <span className="mt-4 text-sm text-accent">View project ↗</span>
        </div>
      </Link>
    </article>
  );
};
