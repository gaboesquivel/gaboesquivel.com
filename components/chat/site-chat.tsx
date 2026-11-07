"use client";

import { press } from "components/shared/motion";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import { MessageCircle, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// The chat client (streaming markdown, AI SDK) loads on first open only.
const ChatPanel = dynamic(
  () => import("./chat-panel").then((module) => module.ChatPanel),
  { ssr: false }
);

interface SiteChatContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const SiteChatContext = createContext<SiteChatContextValue | null>(null);

/**
 * Docked chat, not a modal: from `md` up the page keeps its place and the
 * body reserves the dock's width (`pr-[28rem]` keyed off `html[data-chat-open]` in
 * the root layout), so the site stays usable beside it. Below `md` the dock
 * covers the screen. Mounted after the first open so the transcript survives
 * closing.
 */
export function SiteChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleToggle = useCallback(() => {
    setMounted(true);
    setOpen((value) => !value);
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.setAttribute("data-chat-open", "");
    else root.removeAttribute("data-chat-open");
    return () => root.removeAttribute("data-chat-open");
  }, [open]);

  const value = useMemo(
    () => ({ close: handleClose, open, toggle: handleToggle }),
    [handleClose, open, handleToggle]
  );

  return (
    <SiteChatContext.Provider value={value}>
      {children}
      <aside
        aria-label="AI Assistant"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex w-full flex-col border-l border-neutral-800 bg-black text-sm text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none md:w-[28rem] print:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between gap-2 border-b border-neutral-800 p-4">
          <h2 className="font-medium">AI Assistant</h2>
          <Button
            aria-label="Close chat"
            onClick={handleClose}
            size="icon-sm"
            variant="ghost"
          >
            <XIcon />
          </Button>
        </header>
        {mounted ? <ChatPanel /> : null}
      </aside>
    </SiteChatContext.Provider>
  );
}

export function SiteChatTrigger() {
  const chat = useContext(SiteChatContext);
  if (!chat) return null;
  const handleToggle = chat.toggle;

  return (
    <button
      type="button"
      aria-label="Open AI chat"
      aria-expanded={chat.open}
      data-site-chat-trigger=""
      onClick={handleToggle}
      className={cn(
        "hidden size-11 shrink-0 items-center justify-center rounded-md text-neutral-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent print:hidden",
        chat.open && "text-accent",
        press
      )}
    >
      <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.5} />
    </button>
  );
}
