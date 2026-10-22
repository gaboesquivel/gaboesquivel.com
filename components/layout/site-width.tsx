import { siteColumn } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

export function SiteWidth({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "main";
}) {
  return <Tag className={cn(siteColumn, className)}>{children}</Tag>;
}
