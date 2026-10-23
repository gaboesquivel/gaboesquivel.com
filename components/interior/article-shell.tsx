import {
  articleLayoutRegion,
  articleProseColumn,
} from "components/shared/spacing";
import type { BlogTocItem } from "lib/blog-headings";
import { showBlogToc } from "lib/blog-headings";
import { cn } from "lib/utils";
import type { ReactNode } from "react";

import { ArticleTocNav } from "./article-toc-nav";
import { InteriorPageShell } from "./interior-page-shell";

export function ArticleShell({
  header,
  children,
  toc,
  className,
}: {
  header: ReactNode;
  children: ReactNode;
  toc: readonly BlogTocItem[];
  className?: string;
}) {
  const hasToc = showBlogToc(toc);

  return (
    <InteriorPageShell className={className}>
      <div
        className={cn(
          articleLayoutRegion,
          hasToc
            ? "article-layout-with-toc"
            : cn("article-layout-centered mx-auto", articleProseColumn)
        )}
      >
        <div className="article-layout-main min-w-0">
          {header}
          {children}
        </div>
        {hasToc ? <ArticleTocNav items={toc} /> : null}
      </div>
    </InteriorPageShell>
  );
}
