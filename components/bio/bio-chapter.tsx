import { narrativeSectionGap } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

/** Career chapter spacing. Composition stays with the page so chapters are not forced into one split. */
export function BioChapter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(narrativeSectionGap, className)}>{children}</section>
  );
}
