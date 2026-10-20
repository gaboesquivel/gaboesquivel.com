import { SiteCardLink } from "components/shared/site-card-link";
import { proseClass } from "components/shared/spacing";
import { cn } from "lib/utils";

export function PageCard({
  href,
  title,
  description,
  featured = false,
}: {
  href: string;
  title: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <SiteCardLink
      cardClassName={featured ? "gap-3 p-5" : "gap-3"}
      className="group"
      href={href}
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3
          className={cn(
            "font-medium",
            featured ? "text-lg font-semibold" : "text-base"
          )}
        >
          {title}
        </h3>
        <span
          aria-hidden
          className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
      <p className="mb-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
        {href}
      </p>
      <p className={cn(proseClass, "line-clamp-3 flex-grow text-sm")}>
        {description}
      </p>
    </SiteCardLink>
  );
}
