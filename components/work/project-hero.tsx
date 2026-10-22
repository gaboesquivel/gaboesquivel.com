import type { Project } from "gaboesquivel";
import { resolveProjectImage, workCoverSizes } from "lib/work/project-cover";
import { projectViewTransitionName } from "lib/work/project-view-transition";
import Image from "next/image";
import Link from "next/link";

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

  const image = (
    <div
      className="relative aspect-video overflow-hidden rounded-lg bg-black"
      style={{ viewTransitionName: projectViewTransitionName(project.slug) }}
    >
      <Image
        src={resolved.src}
        alt={resolved.alt}
        fill
        sizes={workCoverSizes}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
      />
    </div>
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="group block"
      {...(href.startsWith("http")
        ? {
            "aria-label": `Open ${project.title} website`,
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : {})}
    >
      {image}
    </Link>
  );
}
