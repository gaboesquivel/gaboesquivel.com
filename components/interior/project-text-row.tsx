import { cardArrow, editorialLink } from "components/shared/spacing";
import { cn } from "lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

export function ProjectTextRow({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          editorialLink,
          "group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2 py-5 sm:grid-cols-[12.5rem_minmax(0,1fr)_auto] sm:gap-x-8 sm:py-6"
        )}
      >
        <span className="font-semibold tracking-tight">{title}</span>
        <span className="col-span-2 text-sm leading-relaxed text-neutral-300 sm:col-span-1 sm:col-start-2 sm:text-base">
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(cardArrow, "col-start-2 row-start-1 sm:col-start-3")}
        >
          →
        </span>
      </Link>
    </li>
  );
}
