"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { homepageGenuiSearchInputId } from "components/search/search-ids";
import { SiteSearchProvider } from "components/search/site-search-context";
import { SiteSearchPanel } from "components/search/site-search-panel";
import type { SearchRecord } from "components/search/types";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "components/ui/dialog";
import { searchCopy } from "lib/search/copy";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Call-site overrides (vendor `components/ui` stays untouched). Overlay: solid
 * scrim, no blur. Panel: the site column (`max-w-6xl` less gutters),
 * `rounded-lg`, hairline, solid black; full height with safe-area padding
 * below 640px. Motion: 150ms from the top on the site curve, none under
 * reduced motion.
 */
const searchOverlay =
  "bg-black/60 duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] supports-backdrop-filter:backdrop-blur-none motion-reduce:animate-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none";

const searchPanel = [
  "fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-y-auto overscroll-contain bg-black px-4 text-sm text-white outline-none",
  "sm:inset-auto sm:top-4 sm:left-1/2 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-3rem)] sm:max-w-[68rem] sm:-translate-x-1/2 sm:rounded-lg sm:border sm:border-hairline lg:w-[calc(100%-4rem)]",
  "origin-top duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:animate-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none",
].join(" ");

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
    // Safari does not focus buttons on click, so fall back to the nav trigger.
    returnFocusRef.current =
      active instanceof HTMLElement && active !== document.body
        ? active
        : document.querySelector<HTMLElement>("[data-site-search-trigger]");
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
        <DialogPortal>
          <DialogOverlay className={searchOverlay} />
          <DialogPrimitive.Popup
            className={searchPanel}
            data-slot="dialog-content"
            finalFocus={returnFocusRef}
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
          </DialogPrimitive.Popup>
        </DialogPortal>
      </Dialog>
    </SiteSearchProvider>
  );
}
