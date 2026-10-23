import { editorialLink } from "components/shared/spacing";
import { getProjectBySlug } from "gaboesquivel";
import { cn } from "lib/utils";
import {
  editorialCoverSizes,
  resolveProjectImage,
} from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

/** Evidence beside a narrative, without repeating the project's card description. */
export function ProjectFigure({
  slug,
  priority = false,
  objectClassName,
}: {
  slug: string;
  priority?: boolean;
  objectClassName?: string;
}) {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  const image = resolveProjectImage({ project });

  return (
    <figure className="min-w-0">
      {image ? (
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
          <Image
            alt={image.alt}
            src={image.src}
            fill
            preload={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes={editorialCoverSizes}
            className={cn("object-contain", objectClassName)}
          />
        </div>
      ) : null}
      <figcaption className="mt-4 text-sm text-neutral-400">
        <Link href={`/project/${slug}`} className={editorialLink}>
          Explore {project.title}
        </Link>
      </figcaption>
    </figure>
  );
}
