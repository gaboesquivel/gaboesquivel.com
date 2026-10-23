import { imageHover } from "components/shared/motion";
import { cardArrow, editorialLink } from "components/shared/spacing";
import { getProjectBySlug } from "gaboesquivel";
import { cn } from "lib/utils";
import { resolveProjectImage } from "lib/work/project-cover";
import Image from "next/image";
import Link from "next/link";

const featureSizes =
  "(max-width: 1023px) calc(100vw - 2rem), calc((min(100vw, 72rem) - 4rem) * 0.6)";

const landscapeSizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 4rem) / 2), 520px";

const frameClass = {
  banner: "aspect-[16/9]",
  feature:
    "order-1 aspect-[16/9] lg:order-2 lg:aspect-auto lg:h-full lg:min-h-[400px]",
  landscape: "aspect-[16/10]",
} as const;

export function EditorialWorkCard({
  layout,
  slug,
  title,
  description,
  supporting,
  action,
  priority = false,
  objectClassName = "object-center",
}: {
  layout: "feature" | "landscape" | "banner";
  slug: string;
  title: string;
  description?: string;
  supporting?: string;
  action: string;
  priority?: boolean;
  objectClassName?: string;
}) {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  const image = resolveProjectImage({ project });
  const Heading = layout === "feature" ? "h2" : "h3";
  const sizes = layout === "landscape" ? landscapeSizes : featureSizes;

  return (
    <article className={layout === "landscape" ? "h-full" : undefined}>
      <Link
        href={`/project/${slug}`}
        aria-label={action}
        className={cn(
          editorialLink,
          "group h-full overflow-hidden rounded-lg border border-hairline",
          layout === "landscape" && "flex flex-col",
          layout === "feature" &&
            "grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
          layout === "banner" &&
            "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto]"
        )}
      >
        {image ? (
          <div className={cn("relative shrink-0 bg-black", frameClass[layout])}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              className={cn("object-cover", imageHover, objectClassName)}
            />
          </div>
        ) : null}
        <div
          className={cn(
            "flex min-w-0 flex-col",
            layout === "feature" &&
              "order-2 justify-center px-5 py-6 sm:px-8 sm:py-8 lg:order-1 lg:px-10 lg:py-10",
            layout === "banner" &&
              "justify-center px-5 py-5 sm:px-8 lg:w-64 lg:px-8 lg:py-8",
            layout === "landscape" && "flex-1 px-5 py-5 sm:px-6 sm:py-6"
          )}
        >
          {layout === "feature" ? (
            <p className="text-sm text-neutral-400">Featured work</p>
          ) : null}
          <Heading
            className={cn(
              "font-semibold tracking-tight text-balance",
              layout === "feature" ? "mt-4 text-3xl sm:text-4xl" : "text-2xl"
            )}
          >
            {title}
          </Heading>
          {description ? (
            <p
              className={cn(
                "text-base leading-relaxed text-neutral-300",
                layout === "feature" ? "mt-4" : "mt-3"
              )}
            >
              {description}
            </p>
          ) : null}
          {supporting ? (
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              {supporting}
            </p>
          ) : null}
          <p
            className={cn(
              "text-sm text-accent",
              layout === "landscape" ? "mt-auto pt-5" : "mt-6"
            )}
          >
            {action}{" "}
            <span aria-hidden="true" className={cardArrow}>
              →
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}

/** Registry cover in a frame the page sizes. Does not repeat the project description. */
export function ProjectCover({
  slug,
  className,
  objectClassName = "object-center",
  sizes,
  priority = false,
}: {
  slug: string;
  className?: string;
  objectClassName?: string;
  sizes: string;
  priority?: boolean;
}) {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  const image = resolveProjectImage({ project });
  if (!image) return null;

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-black", className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        className={cn("object-cover", objectClassName)}
      />
    </div>
  );
}
