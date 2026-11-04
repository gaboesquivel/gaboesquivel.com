import { cn } from "lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

import { press } from "./motion";
import { PageTrail } from "./page-trail";
import type { PageTrailSegment } from "./page-trail";
import {
  blockSpacing,
  heroTitle,
  pageEyebrow,
  pageTitle,
  proseClass,
  readingMeasure,
  sectionHeadingRow,
  sectionSpacing,
  sectionTitle,
} from "./spacing";
import { TitleLead } from "./title-lead";

export {
  blockGrid,
  blockSpacing,
  cardArrow,
  ctaLink,
  headingSpacing,
  proseLink,
  readingMeasure,
  pageEyebrow,
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

/**
 * The row above every page title: the breadcrumb, or an empty spacer. Fixed
 * height, so every h1 starts at the same y.
 */
export function PageEyebrow({ trail }: { trail?: PageTrailSegment[] }) {
  return (
    <div className={pageEyebrow}>
      {trail?.length ? <PageTrail segments={trail} /> : null}
    </div>
  );
}

const splitLead = (children: ReactNode): [string, ReactNode] | null => {
  const [first, ...rest] = Array.isArray(children) ? children : [children];
  if (typeof first !== "string") return null;
  const space = first.indexOf(" ");
  if (space === -1) return [first, rest.length ? rest : null];
  return [first.slice(0, space), [first.slice(space), ...rest]];
};

/**
 * The page h1. One scale on every page (`heroTitle`, or the smaller
 * `document` size for the print-stable CV). The opening word is a shared
 * view-transition element so a matching word never moves or flickers.
 */
export function PageTitle({
  children,
  className,
  variant = "display",
}: {
  children: ReactNode;
  className?: string;
  variant?: "display" | "document";
}) {
  if (variant === "document") {
    return <h1 className={cn(pageTitle, className)}>{children}</h1>;
  }
  const split = splitLead(children);
  return (
    <h1 className={cn(heroTitle, "mb-0 max-w-none", className)}>
      {split ? (
        <>
          <TitleLead word={split[0]} />
          {split[1]}
        </>
      ) : (
        children
      )}
    </h1>
  );
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
        <Link
          key={item.id}
          href={item.href}
          aria-current={current === item.id ? "page" : undefined}
          className={cn(
            press,
            "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
            current === item.id
              ? "bg-neutral-800 text-accent"
              : "text-neutral-300 hover:text-white"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
