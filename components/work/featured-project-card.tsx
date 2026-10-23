import {
  cardArrow,
  editorialLink,
  projectCardDescription,
  projectRoleInCard,
} from "components/shared/spacing";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import { resolveProjectImage, workCoverSizes } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

export function FeaturedProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const image = resolveProjectImage({ project });

  return (
    <article>
      <p className="text-sm text-neutral-400">Featured work</p>
      <Link
        href={`/project/${project.slug}`}
        className={cn("group mt-4 block", editorialLink)}
      >
        {image ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black sm:aspect-video">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={workCoverSizes}
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </div>
        ) : null}
        <div className="mt-6 flex items-start justify-between gap-4 border-t border-hairline pt-6">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h2>
            {project.role ? (
              <p className={projectRoleInCard}>{project.role}</p>
            ) : null}
            <p className={projectCardDescription}>{project.description}</p>
          </div>
          <span
            aria-hidden="true"
            className={cn(cardArrow, "mt-2 text-2xl leading-none")}
          >
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
