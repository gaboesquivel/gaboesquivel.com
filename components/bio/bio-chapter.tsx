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
      <div className="grid gap-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-10 lg:gap-x-12">
        <p className="text-sm text-accent md:pt-1">{year}</p>
        <div className="min-w-0">
          <h2 className={cn(sectionTitle, sectionHeadingSpacing)}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
