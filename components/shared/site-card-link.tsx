import { siteCardInteractive } from "components/shared/spacing";
import { Card } from "components/ui/card";
import { cn } from "lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export const SiteCardLink = ({
  cardClassName,
  className,
  children,
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & {
  cardClassName?: string;
  className?: string;
  children: ReactNode;
}) => (
  <Link
    className={cn(
      siteCardInteractive,
      "block h-full rounded-lg focus-visible:outline-none",
      className
    )}
    href={href}
    {...props}
  >
    <Card className={cn("h-full gap-2 p-4", cardClassName)}>{children}</Card>
  </Link>
);

export const SiteCardAnchor = ({
  cardClassName,
  className,
  children,
  ...props
}: ComponentProps<"a"> & {
  cardClassName?: string;
  children: ReactNode;
}) => (
  <a
    className={cn(
      siteCardInteractive,
      "block rounded-lg focus-visible:outline-none",
      className
    )}
    {...props}
  >
    <Card className={cn("gap-2", cardClassName)}>{children}</Card>
  </a>
);
