"use client";

import { homeSearchInputId } from "components/search/search-copy";
import { SiteSearchProvider } from "components/search/site-search-context";
import { SiteSearchPanel } from "components/search/site-search-panel";
import type { SearchRecord } from "components/search/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { cn } from "lib/utils";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      "input, textarea, select, [contenteditable=''], [contenteditable='true']"
    )
  );
};

const focusHomeSearchField = () => {
  const field = document.querySelector<HTMLInputElement>(
    `#${homeSearchInputId}`
  );
  if (!field) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  field.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "center",
  });
  field.focus();
};

export function SiteSearchShell({
  records,
  children,
}: {
  records: SearchRecord[];
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const requestSearch = useCallback(() => {
    if (pathname === "/") focusHomeSearchField();
    else setOpen(true);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k")
        return;
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      requestSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestSearch]);

  return (
    <SiteSearchProvider value={{ records, requestSearch }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "top-[12%] max-w-6xl translate-y-0 gap-0 border-hairline bg-black p-4 shadow-none ring-hairline motion-reduce:transition-none sm:max-w-[calc(100%-2rem)]"
          )}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Search this site</DialogTitle>
            <DialogDescription>
              Keyword search over projects, writing, career, and contact.
            </DialogDescription>
          </DialogHeader>
          {open ? (
            <SiteSearchPanel
              records={records}
              variant="dialog"
              onNavigate={() => setOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </SiteSearchProvider>
  );
}
