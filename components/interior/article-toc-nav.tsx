"use client";

import type { BlogTocItem } from "lib/blog-headings";
import { cn } from "lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function ArticleTocNav({ items }: { items: readonly BlogTocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  // While a TOC click scrolls the page, the clicked item stays current.
  const clickLock = useRef(false);
  const releaseTimer = useRef<number | undefined>();

  useEffect(() => {
    const headings = items.flatMap((item) => {
      const el = document.querySelector<HTMLElement>(`#${CSS.escape(item.id)}`);
      return el ? [{ id: item.id, el }] : [];
    });

    if (headings.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (clickLock.current) return;
        // Topmost heading inside the upper band of the viewport wins.
        const first = headings.find(({ id }) => visible.has(id));
        if (first) setActiveId(first.id);
      },
      { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    for (const { el } of headings) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const onItemClick = (id: string) => {
    setActiveId(id);
    clickLock.current = true;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      clickLock.current = false;
      window.clearTimeout(releaseTimer.current);
      window.removeEventListener("scrollend", release);
    };
    window.clearTimeout(releaseTimer.current);
    window.addEventListener("scrollend", release, { once: true });
    // Fallback when the target is already in place or scrollend is unsupported.
    releaseTimer.current = window.setTimeout(release, 1000);
  };

  return (
    <nav
      aria-label="Table of contents"
      className="article-toc-rail hidden xl:block"
    >
      <p className="mb-4 text-sm text-neutral-400">On this page</p>
      <ol className="space-y-2 text-sm leading-snug">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "border-l border-hairline pl-3")}
          >
            <Link
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              onClick={() => onItemClick(item.id)}
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
