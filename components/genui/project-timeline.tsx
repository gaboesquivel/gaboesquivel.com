"use client";

import { imageHover } from "components/shared/motion";
import {
  editorialLink,
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import { CoverMorph } from "components/work/cover-morph";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { resolveProjectImage } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

const coverSizes = "(max-width: 35.99rem) 6rem, 12rem";

/** Newest first; equal years keep the order the result arrived in. */
const newestFirst = (projects: Project[]) =>
  projects
    .map((project, order) => ({ order, project }))
    .sort((a, b) => b.project.year - a.project.year || a.order - b.order)
    .map(({ project }) => project);

const TimelineCard = ({
  index,
  priority,
  project,
}: {
  index: number;
  priority: boolean;
  project: Project;
}) => {
  const image = resolveProjectImage({ project });
  return (
    <article
      data-showcase-card=""
      style={{ "--card-index": Math.min(index, 8) } as React.CSSProperties}
      className={cn(
        "@container/showcase-card min-w-0 rounded-lg border border-hairline bg-black p-3 motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none",
        "focus-within:border-neutral-500 hover:border-neutral-600"
      )}
    >
      <Link
        href={`/project/${project.slug}`}
        className={cn(
          "group grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-4 @min-[36rem]/showcase-card:grid-cols-[12rem_minmax(0,1fr)] @min-[36rem]/showcase-card:items-center",
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
                sizes={coverSizes}
                preload={priority}
                fetchPriority={priority ? "high" : undefined}
                className={cn("object-cover", imageHover)}
              />
            ) : null}
          </div>
        </CoverMorph>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight [overflow-wrap:anywhere] text-white">
            {project.title}
          </h3>
          {project.role ? (
            <p className={cn(projectRoleInCard, "mt-1")}>{project.role}</p>
          ) : null}
          <p
            className={cn(
              projectCardDescription,
              "line-clamp-3 @min-[36rem]/showcase-card:line-clamp-2"
            )}
          >
            {project.description}
          </p>
          <span className="mt-2 inline-block text-sm text-accent">
            View project ↗
          </span>
        </div>
      </Link>
    </article>
  );
};

/** Projects as a single dated column, newest first, the year in the margin. */
export const ProjectTimeline = ({ projects }: { projects: Project[] }) => {
  const sorted = newestFirst(projects);
  return (
    <div className="@container/project-showcase min-w-0">
      <ol className="space-y-4">
        {sorted.map((project, index) => {
          const newYear = project.year !== sorted[index - 1]?.year;
          return (
            <li
              className="grid grid-cols-1 gap-2 @min-[36rem]/project-showcase:grid-cols-[4rem_minmax(0,1fr)] @min-[36rem]/project-showcase:gap-6"
              key={project.slug}
            >
              <time
                className={cn(
                  "text-sm font-semibold text-neutral-400 tabular-nums @min-[36rem]/project-showcase:pt-4",
                  !newYear && "@min-[36rem]/project-showcase:invisible"
                )}
                dateTime={String(project.year)}
              >
                {project.year}
              </time>
              <TimelineCard
                index={index}
                priority={index === 0}
                project={project}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};
