"use client";

import type { BlogTocItem } from "lib/blog-headings";
import { cn } from "lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ArticleTocNav({ items }: { items: readonly BlogTocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items.flatMap((item) => {
      const el = document.querySelector<HTMLElement>(`#${CSS.escape(item.id)}`);
      return el ? [{ id: item.id, el }] : [];
    });

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    for (const { el } of headings) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="article-toc-rail hidden xl:block"
    >
      <p className="mb-4 text-xs tracking-wide text-neutral-500 uppercase">
        On this page
      </p>
      <ol className="space-y-2 text-sm leading-snug">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "border-l border-hairline pl-3")}
          >
            <Link
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "block rounded-sm py-0.5 text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                activeId === item.id && "font-medium text-white"
              )}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
