import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function FullBleedMedia({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("my-10 w-full max-w-[min(72rem,100%)] lg:my-14", className)}
    >
      {children}
    </div>
  );
}
