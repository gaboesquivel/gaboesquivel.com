import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

import { press } from "./motion";
import {
  blockSpacing,
  indexTitle,
  pageTitle,
  proseClass,
  readingMeasure,
  sectionHeadingRow,
  sectionSpacing,
  sectionTitle,
} from "./spacing";

export {
  blockGrid,
  blockSpacing,
  cardArrow,
  ctaLink,
  headingSpacing,
  proseLink,
  readingMeasure,
  indexTitle,
  pageTitle,
  projectMedia,
  proseClass,
  sectionAction,
  sectionHeadingRow,
  sectionHeadingSpacing,
  sectionSpacing,
  sectionTitle,
  singleColGrid,
  subHeading,
  subHeadingSm,
  titleSpacing,
  twoColGrid,
} from "./spacing";

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn(proseClass, readingMeasure, blockSpacing, className)}>
      {children}
    </p>
  );
}

export function IndexHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn(indexTitle, "text-balance", className)}>{children}</h1>
  );
}

export function PageTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h1 className={cn(pageTitle, className)}>{children}</h1>;
}

export function PageSection({
  title,
  action,
  children,
  className,
  headingRowClassName,
}: {
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  headingRowClassName?: string;
}) {
  return (
    <section className={cn(sectionSpacing, className)}>
      <div className={cn(sectionHeadingRow, headingRowClassName)}>
        <h2 className={sectionTitle}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function FilterNav({
  label,
  current,
  items,
  className,
}: {
  label: string;
  current: string;
  items: { id: string; href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex flex-wrap gap-1 rounded-lg border border-hairline p-1",
        blockSpacing,
        className
      )}
    >
      {items.map((item) => (
        <Button
          key={item.id}
          nativeButton={false}
          render={<Link href={item.href} />}
          aria-current={current === item.id ? "page" : undefined}
          variant="ghost"
          className={cn(
            press,
            "h-auto min-h-11 rounded-md px-3 py-2 text-sm hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-accent",
            current === item.id
              ? "bg-neutral-800 text-accent"
              : "text-neutral-300 hover:text-white"
          )}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
