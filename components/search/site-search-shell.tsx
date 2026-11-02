"use client";

import { homepageGenuiSearchInputId } from "components/search/search-ids";
import { SiteSearchProvider } from "components/search/site-search-context";
import { SiteSearchPanel } from "components/search/site-search-panel";
import type { SearchRecord } from "components/search/types";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { searchCopy } from "lib/search/copy";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const focusHomeSearchField = () => {
  const field = document.querySelector<HTMLInputElement>(
    `#${homepageGenuiSearchInputId}`
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
  /** The element that opened the dialog gets focus back when it closes. */
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openDialog = useCallback(() => {
    const active = document.activeElement;
    returnFocusRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null;
    setOpen(true);
  }, []);

  const requestSearch = useCallback(() => {
    if (pathname === "/") focusHomeSearchField();
    else openDialog();
  }, [openDialog, pathname]);

  useEffect(() => {
    // Cmd/Ctrl+K works everywhere, including inside inputs, and toggles the
    // dialog closed when it is open.
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k")
        return;
      event.preventDefault();
      if (open) setOpen(false);
      else requestSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, requestSearch]);

  return (
    <SiteSearchProvider value={{ records, requestSearch }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          finalFocus={returnFocusRef}
          showCloseButton={false}
          className="top-4 max-w-6xl translate-y-0 gap-0 border-hairline bg-black p-4 pt-0 shadow-none ring-hairline motion-reduce:transition-none sm:max-w-[calc(100%-2rem)]"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{searchCopy.dialogTitle}</DialogTitle>
            <DialogDescription>
              {searchCopy.dialogDescription}
            </DialogDescription>
          </DialogHeader>
          {open ? (
            <SiteSearchPanel
              closeControl={
                <DialogClose
                  render={
                    <Button
                      className="mt-1.5 size-11 shrink-0 text-neutral-300 hover:text-accent focus-visible:ring-accent"
                      size="icon"
                      variant="ghost"
                    />
                  }
                >
                  <XIcon aria-hidden="true" strokeWidth={1.5} />
                  <span className="sr-only">{searchCopy.close}</span>
                </DialogClose>
              }
              onNavigate={() => setOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </SiteSearchProvider>
  );
}
