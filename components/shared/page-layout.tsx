import { cn } from "lib/utils";
import type { ReactNode } from "react";

import {
  blockSpacing,
  heroTitle,
  introText,
  pageEyebrow,
  pageLead,
  pageTitle,
  proseClass,
  readingMeasure,
  sectionHeadingRow,
  sectionSpacing,
  sectionTitle,
} from "./spacing";
import { TitleLead } from "./title-lead";

export { FilterNav } from "./filter-nav";

export {
  blockGrid,
  blockSpacing,
  cardArrow,
  ctaLink,
  headingSpacing,
  introText,
  pageLead,
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
 * A page introduction. Every paragraph renders at the intro size, so a
 * two-paragraph introduction reads as one group.
 */
export function PageLead({
  paragraphs,
  className,
}: {
  paragraphs: string | readonly string[];
  className?: string;
}) {
  const list = typeof paragraphs === "string" ? [paragraphs] : paragraphs;
  return (
    <div className={cn(pageLead, className)}>
      {list.map((paragraph, index) => (
        <p
          key={`${index}-${paragraph}`}
          className={cn(introText, readingMeasure, "m-0 text-pretty")}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * The empty row above every page title. Fixed height, so every h1 starts at
 * the same y.
 */
export function PageEyebrow() {
  return <div aria-hidden="true" className={pageEyebrow} />;
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
