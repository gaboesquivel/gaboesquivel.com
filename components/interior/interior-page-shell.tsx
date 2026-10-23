import { cn } from "lib/utils";
import type { ReactNode } from "react";

/** Editorial interior pages share the same `siteColumn` shell as home (via root `SiteWidth`). */
export function InteriorPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full min-w-0", className)}>{children}</div>;
}
