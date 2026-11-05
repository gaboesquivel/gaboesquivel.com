import { articleColumn } from "components/shared/spacing";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

import { InteriorPageShell } from "./interior-page-shell";

export function ArticleShell({
  header,
  children,
  className,
}: {
  header: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <InteriorPageShell className={className}>
      <div className={cn("article-layout-centered mx-auto", articleColumn)}>
        {header}
        {children}
      </div>
    </InteriorPageShell>
  );
}
