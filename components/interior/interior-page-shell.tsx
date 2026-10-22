import { interiorBreakout } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function InteriorPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(interiorBreakout, className)}>{children}</div>;
}
