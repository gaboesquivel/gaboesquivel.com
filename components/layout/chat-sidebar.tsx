"use client";

import { ctaLink } from "components/shared/spacing";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "components/ui/sheet";
import { cn } from "lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/** Nav sheet entry point for homepage GenUI search (`/ask` redirects to `/`). */
export function ChatSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open chat"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-neutral-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
      >
        <MessageSquare
          aria-hidden="true"
          className="size-5"
          strokeWidth={1.5}
        />
      </SheetTrigger>
      <SheetContent className="border-hairline bg-black p-4 shadow-none data-[side=right]:w-full motion-reduce:transition-none data-[side=right]:sm:max-w-md">
        <SheetHeader className="mt-10">
          <SheetTitle className="text-2xl text-white">
            Chat with Gabo’s assistant
          </SheetTitle>
          <SheetDescription className="mt-4 leading-relaxed text-neutral-300">
            Ask about my work, leave a note, or find a time to talk.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4 text-sm text-neutral-300">
          <p>
            Use the homepage search to explore work, leave a note, or book time.
          </p>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(ctaLink, "inline-flex min-h-11 items-center")}
          >
            Go to homepage search
          </Link>
          <p>
            Prefer to write directly?{" "}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={ctaLink}
            >
              Contact me
            </Link>
            .
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
