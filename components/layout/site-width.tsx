import { siteColumn } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function SiteWidth({
  children,
  className,
  as: Tag = "div",
  id,
  tabIndex,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "main";
  id?: string;
  tabIndex?: number;
}) {
  return (
    <Tag id={id} tabIndex={tabIndex} className={cn(siteColumn, className)}>
      {children}
    </Tag>
  );
}
