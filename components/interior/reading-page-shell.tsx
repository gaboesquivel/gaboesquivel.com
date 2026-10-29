import { readingMeasure } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

/** Utility reading pages (`/docs`, `/privacy`, `/about`): one left-aligned measure inside `siteColumn`, same left edge as the nav. */
export function ReadingPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full min-w-0", readingMeasure, className)}>
      {children}
    </div>
  );
}
