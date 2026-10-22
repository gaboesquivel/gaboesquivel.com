import { readingMeasure } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

import { InteriorPageShell } from "./interior-page-shell";

export function ReadingPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <InteriorPageShell>
      <div className={cn(readingMeasure, "min-w-0", className)}>{children}</div>
    </InteriorPageShell>
  );
}
