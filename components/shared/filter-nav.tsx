"use client";

import { cn } from "lib/utils";
import Link from "next/link";
import { useRef } from "react";

import { press } from "./motion";
import { requestSubnavScroll, useSubnavScroll } from "./scroll-to-subnav";
import { blockSpacing } from "./spacing";

export function FilterNav({
  label,
  current,
  items,
  className,
}: {
  label: string;
  current: string;
  items: { id: string; href: string; label: string }[];
  className?: string;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  useSubnavScroll(anchorRef, current);

  return (
    <>
      <div ref={anchorRef} aria-hidden="true" />
      <nav
        aria-label={label}
        className={cn(
          "sticky top-0 z-10 flex flex-wrap gap-1 rounded-lg border border-hairline bg-black p-1",
          blockSpacing,
          className
        )}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            scroll={false}
            onNavigate={requestSubnavScroll}
            aria-current={current === item.id ? "page" : undefined}
            className={cn(
              press,
              "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
              current === item.id
                ? "bg-neutral-800 text-accent"
                : "text-neutral-300 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
