import { interiorSectionGap, sectionTitle } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

import { SectionLabel } from "./section-label";

export function EditorialSection({
  label,
  title,
  children,
  className,
  titleClassName,
}: {
  label?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={cn(interiorSectionGap, className)}>
      {label ? <SectionLabel className="mb-3">{label}</SectionLabel> : null}
      {title ? (
        <h2 className={cn(sectionTitle, "mb-8 text-balance", titleClassName)}>
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
