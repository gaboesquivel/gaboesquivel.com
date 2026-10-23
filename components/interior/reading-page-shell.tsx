import { readingMeasure } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function ReadingPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full min-w-0", readingMeasure, className)}>
      {children}
    </div>
  );
}
