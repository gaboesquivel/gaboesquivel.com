import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm tracking-wide text-accent uppercase", className)}>
      {children}
    </p>
  );
}
