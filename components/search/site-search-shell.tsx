"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  GenuiSessionProvider,
  genuiWritesEnabled,
} from "components/genui/genui-session";
import { useGenuiComposition } from "components/genui/use-genui-composition";
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
import { CoverMorphScoped } from "components/work/cover-morph";
import { searchCopy } from "lib/search/copy";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Call-site overrides (vendor `components/ui` stays untouched). One full-screen
 * overlay on every route: solid black, no blur. Motion: the scrim fades in over
 * 200ms on the site curve while the field bar glides up from its trigger (see
 * `SiteSearchPanel`); closing fades out in 150ms. None under reduced motion.
 */
const searchOverlay =
  "bg-black/60 duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] supports-backdrop-filter:backdrop-blur-none motion-reduce:animate-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none";

const searchPanel = [
  "fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-y-auto overscroll-contain bg-black px-4 text-sm text-white outline-none sm:px-6 lg:px-8",
  "duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 data-closed:duration-150 motion-reduce:animate-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none",
].join(" ");

export function SiteSearchShell({
  records,
  children,
}: {
  records: SearchRecord[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // The dialog is open only on the route it was opened from. Following a link
  // changes the route, so it closes in the same commit as the new page: the
  // cover morph then runs from the result card to the project hero instead of
  // the overlay lingering over the destination.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenPath(next ? pathname : null),
    [pathname]
  );
  // Above the dialog, so closing it (which unmounts the panel) keeps the last
  // result, drafts and receipts for the session (S-P1).
  const genui = useGenuiComposition();
  /** The element that opened the dialog gets focus back when it closes. */
  const returnFocusRef = useRef<HTMLElement | null>(null);

  /** Where the field animates from: the clicked trigger's rect. */
  const originRef = useRef<DOMRect | null>(null);

  const requestSearch = useCallback(
    (origin?: DOMRect) => {
      const active = document.activeElement;
      // Safari does not focus buttons on click, so fall back to the nav trigger.
      returnFocusRef.current =
        active instanceof HTMLElement && active !== document.body
          ? active
          : document.querySelector<HTMLElement>(
              "[data-site-search-trigger], [data-home-search-trigger]"
            );
      originRef.current = origin ?? null;
      setOpen(true);
    },
    [setOpen]
  );

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
  }, [open, requestSearch, setOpen]);

  return (
    <SiteSearchProvider value={{ records, requestSearch }}>
      <CoverMorphScoped suffix={open ? "-page" : ""}>
        {children}
      </CoverMorphScoped>
      <GenuiSessionProvider writesEnabled={genuiWritesEnabled(genui)}>
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
                  originRef={originRef}
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
                  genui={genui}
                  onNavigate={() => setOpen(false)}
                />
              ) : null}
            </DialogPrimitive.Popup>
          </DialogPortal>
        </Dialog>
      </GenuiSessionProvider>
    </SiteSearchProvider>
  );
}
