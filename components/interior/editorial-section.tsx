import {
  interiorSectionGap,
  sectionHeadingSpacing,
  sectionTitle,
} from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function EditorialSection({
  title,
  children,
  className,
  titleClassName,
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={cn(interiorSectionGap, className)}>
      {title ? (
        <h2
          className={cn(
            sectionTitle,
            sectionHeadingSpacing,
            "text-balance",
            titleClassName
          )}
        >
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
