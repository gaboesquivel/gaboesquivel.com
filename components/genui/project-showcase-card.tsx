"use client";

import {
  editorialLink,
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import type { ProjectCompositionRole } from "lib/genui/composition-plan";
import { cn } from "lib/utils";
import { resolveProjectImage } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

const roleMediaClass = ({ role }: { role: ProjectCompositionRole }) => {
  if (role === "lead" || role === "closing-feature") {
    return "aspect-[4/5] @min-[64rem]/project-showcase:aspect-auto @min-[64rem]/project-showcase:min-h-[22rem]";
  }
  if (role === "right-feature") {
    return "aspect-[16/10] @min-[64rem]/project-showcase:min-h-[16rem]";
  }
  if (role === "top-right") {
    return "aspect-[16/10]";
  }
  return "aspect-video";
};

export const ProjectShowcaseCard = ({
  project,
  role,
  sizes,
  priority = false,
}: {
  project: Project;
  role: ProjectCompositionRole;
  sizes: string;
  priority?: boolean;
}) => {
  const image = resolveProjectImage({ project });
  const lead = role === "lead";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-hairline bg-black p-4 motion-safe:transition-colors motion-safe:duration-300 motion-reduce:transition-none",
        "focus-within:border-neutral-500 hover:border-neutral-600"
      )}
    >
      <Link
        href={`/project/${project.slug}`}
        className={cn("group flex h-full flex-col", editorialLink)}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-md bg-neutral-950",
            roleMediaClass({ role })
          )}
        >
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full min-h-[8rem] items-end p-4">
              <span className="text-2xl font-semibold tracking-tight text-white">
                {project.title}
              </span>
            </div>
          )}
        </div>
        <h3
          className={cn(
            "mt-4 font-semibold tracking-tight text-white",
            lead ? "text-2xl @min-[64rem]/project-showcase:text-3xl" : "text-xl"
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
      </Link>
    </article>
  );
};
