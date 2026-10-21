import { SiteCardLink } from "components/shared/site-card-link";
import { cardArrow, proseClass } from "components/shared/spacing";
import { cn } from "lib/utils";

export function PathLink({
  href,
  title,
  note,
}: {
  href: string;
  title: string;
  note?: string;
}) {
  return (
    <SiteCardLink className="group h-auto" href={href}>
      <div className="mb-1 flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-neutral-400">{href}</span>
        <span aria-hidden className={cardArrow}>
          →
        </span>
      </div>
      <span className="font-medium">{title}</span>
      {note ? (
        <p className={cn(proseClass, "mt-2 flex-grow text-sm")}>{note}</p>
      ) : null}
    </SiteCardLink>
  );
}
