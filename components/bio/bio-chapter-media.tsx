"use client";

import { editorialLink } from "components/shared/spacing";
import { ProjectCover } from "components/work/editorial-work-card";
import type { BioChapterMedia } from "lib/bio/chapters";
import { cn } from "lib/utils";
import { editorialCoverSizes } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

const timelineMediaSizes =
  "(max-width: 1023px) calc(100vw - 2rem), (max-width: 1151px) calc((min(100vw, 72rem) - 5rem) * 0.38), 420px";

export function BioChapterMediaBlock({
  media,
  priority = false,
  className,
}: {
  media: BioChapterMedia;
  priority?: boolean;
  className?: string;
}) {
  if (media.kind === "project") {
    const href = media.href ?? `/project/${media.slug}`;
    return (
      <Link
        aria-label={`View project: ${media.slug}`}
        className={cn(editorialLink, "block min-w-0", className)}
        href={href}
      >
        <ProjectCover
          className="aspect-[4/3] w-full sm:aspect-[16/10]"
          objectClassName="object-center"
          priority={priority}
          sizes={timelineMediaSizes}
          slug={media.slug}
        />
      </Link>
    );
  }

  return (
    <figure className={cn("min-w-0", className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:aspect-[16/10]">
        <Image
          alt={media.alt}
          className="object-cover object-center"
          fetchPriority={priority ? "high" : undefined}
          fill={true}
          preload={priority}
          sizes={priority ? editorialCoverSizes : timelineMediaSizes}
          src={media.src}
        />
      </div>
      {media.caption ? (
        <figcaption className="mt-3">
          <p className="m-0 text-sm text-neutral-400">{media.caption}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}
