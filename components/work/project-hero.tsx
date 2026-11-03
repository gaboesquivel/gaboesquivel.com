import { imageHover } from "components/shared/motion";
import { newTabProps } from "components/shared/new-tab-cue";
import type { Project } from "gaboesquivel";
import { cn } from "lib/utils";
import {
  projectCoverMaxWidth,
  projectCoverPosition,
  resolveProjectImage,
  workCoverSizes,
} from "lib/work/project-cover";
import { projectViewTransitionName } from "lib/work/project-view-transition";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

export function ProjectHero({
  project,
  href,
  preload = false,
}: {
  project: Project;
  href: string | null;
  preload?: boolean;
}) {
  const resolved = resolveProjectImage({ project });

  if (!resolved) return null;

  const maxWidth = projectCoverMaxWidth({ src: resolved.src });

  const image = (
    <ViewTransition
      name={projectViewTransitionName(project.slug)}
      share="morph"
      default="none"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <Image
          src={resolved.src}
          alt={resolved.alt}
          fill
          sizes={workCoverSizes}
          preload={preload}
          loading={preload ? "eager" : undefined}
          fetchPriority={preload ? "high" : undefined}
          className={cn("bg-neutral-900 object-cover", imageHover)}
          style={{ objectPosition: projectCoverPosition(project) }}
        />
      </div>
    </ViewTransition>
  );

  // Small legacy sources never stretch past their intrinsic width.
  const media = maxWidth ? <div style={{ maxWidth }}>{image}</div> : image;

  if (!href) return media;

  return (
    <Link
      href={href}
      className="group block"
      {...(href.startsWith("http")
        ? {
            "aria-label": `Open ${project.title} website (opens in new tab)`,
            ...newTabProps,
          }
        : {})}
    >
      {media}
    </Link>
  );
}
