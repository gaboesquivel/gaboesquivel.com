import {
  sectionHeadingSpacing,
  sectionSpacing,
  sectionTitle,
} from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function BioChapter({
  year,
  title,
  children,
  className,
}: {
  year: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        sectionSpacing,
        "border-t border-hairline pt-12 first:border-t-0 first:pt-0",
        className
      )}
    >
      <p className="mb-4 text-sm text-accent">{year}</p>
      <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>{title}</h2>
      {children}
    </section>
  );
}
