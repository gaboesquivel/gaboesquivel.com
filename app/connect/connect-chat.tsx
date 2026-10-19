"use client";

import { pageTitle } from "components/shared/spacing";
import { cn } from "lib/utils";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion } from "@/components/ai-elements/suggestion";

import {
  affirmativeBookingReply,
  assistantOfferedCall,
  channelMessage,
  noteOpener,
  typedNoteIntent,
} from "../../lib/connect/intent";
import {
  CONNECT_SUGGESTIONS,
  connectSuggestionMessage,
} from "../../lib/connect/suggestions";
import { press } from "./chat-styles";
import type { ThreadApi } from "./eve-thread";
import { writeSession } from "./session-cookie";

const EveThread = dynamic(
  () => import("./eve-thread").then((mod) => mod.EveThread),
  { ssr: false }
);

const APPROVE = /^(yes|book it|send it|that works)[.!]?$/i;

const chipButton =
  "h-11 min-h-11 rounded-md border-hairline bg-transparent px-3 text-base font-normal whitespace-normal text-white hover:bg-neutral-800 active:translate-y-0";

const emptyHeading = "What would you like to build?";
const emptyLead =
  "I'm Gabo's AI assistant. Ask about his work, tell me about your project, or book a call.";

export function ConnectChat() {
  const apiRef = useRef<ThreadApi | null>(null);
  const [mode, setMode] = useState<"book" | "note" | null>(null);
  const [started, setStarted] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [hasInputText, setHasInputText] = useState(false);
  const [composerKey, setComposerKey] = useState(0);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("ready");
  const [next, setNext] = useState<("book" | "pass" | "send")[]>([]);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const [threadVisible, setThreadVisible] = useState(false);
  const [assistantReply, setAssistantReply] = useState("");
  const eveOn = started;
  const streaming = status === "streaming";
  const sending = status === "submitted" || status === "resuming";
  const isBusy = streaming || sending;
  const showStarters = (!eveOn || (!threadVisible && !isBusy)) && !engaged;
  const resuming = status === "resuming";

  useLayoutEffect(() => {
    writeSession(null);
  }, []);

  const handleInitialSendFailed = (text: string) => {
    setPending(null);
    setStatus("ready");
    setDraft(text);
    setComposerKey((key) => key + 1);
  };

  const bookAffirmativeTurn = (trimmed: string) =>
    affirmativeBookingReply(trimmed) &&
    (next.includes("book") || assistantOfferedCall(assistantReply));

  const beginTurn = (text: string) => {
    let trimmed = text.trim();
    if (!trimmed || resuming) return;
    if (pendingId && APPROVE.test(trimmed)) {
      apiRef.current
        ?.respond({
          optionId: "approve",
          requestId: pendingId,
        })
        .catch(() => null);
      return;
    }
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (bookAffirmativeTurn(trimmed)) {
      setMode("book");
      trimmed = channelMessage({
        mode: "book",
        text: connectSuggestionMessage("book"),
        timeZone: zone,
      });
    } else if (noteOpener(trimmed)) {
      setMode("note");
      setEngaged(true);
      setStarted(true);
      setDraft("");
      return;
    } else if (typedNoteIntent(trimmed)) {
      setMode("note");
      trimmed = channelMessage({
        mode: "note",
        text: trimmed,
        timeZone: zone,
      });
    } else if (eveOn) setMode(null);
    if (!eveOn) {
      setEngaged(true);
      setPending(trimmed);
      setStarted(true);
      setDraft("");
      return;
    }
    setDraft("");
    apiRef.current?.send(trimmed).catch(() => null);
  };

  const sendSuggestion = (id: "book" | "experience" | "fit" | "note") => {
    setEngaged(true);
    if (id === "book") setMode("book");
    else if (id === "note") setMode("note");
    else setMode(null);
    beginTurn(connectSuggestionMessage(id));
  };

  const handleSubmit = (message: PromptInputMessage) => {
    const text = message.text.trim();
    if (!text.length || resuming) return;
    setHasInputText(false);
    beginTurn(text);
  };

  interface FollowUpChip {
    id: "book" | "note";
    label: string;
  }

  const followUpChips: FollowUpChip[] =
    status === "ready"
      ? next
          .flatMap((item): FollowUpChip[] => {
            if (item === "book") {
              return [{ id: "book", label: "Book a call" }];
            }
            if (item === "send" || item === "pass") {
              return [
                {
                  id: "note",
                  label: item === "pass" ? "Pass it along" : "Send email",
                },
              ];
            }
            return [];
          })
          .slice(0, 2)
      : [];

  const composer = (
    <PromptInput
      className="bg-transparent"
      key={composerKey}
      onSubmit={handleSubmit}
    >
      <PromptInputTextarea
        className="min-h-14 py-4 pr-14 text-base leading-6 md:text-base"
        defaultValue={draft}
        onChange={(event) =>
          setHasInputText(event.currentTarget.value.trim().length > 0)
        }
        placeholder="Ask a question or share what you're working on…"
        rows={1}
      />
      <PromptInputSubmit
        className={`absolute right-1.5 bottom-1.5 size-11 rounded-lg bg-accent text-black hover:bg-accent/80 ${press}`}
        disabled={resuming}
        onStop={() => apiRef.current?.cancel().catch(() => null)}
        status={isBusy && !hasInputText ? "streaming" : "ready"}
      />
    </PromptInput>
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col text-foreground">
      <Conversation className="relative min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto overscroll-contain">
        <ConversationContent className="w-full min-w-0 gap-6 px-0 pe-1 pb-4">
          {showStarters ? null : (
            <h1 className="sr-only">Work with Gabo Esquivel</h1>
          )}
          {showStarters ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className={cn(pageTitle, "mb-0 text-balance")}>
                  {emptyHeading}
                </h1>
                <p className="text-sm text-neutral-400">{emptyLead}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-center">
                {CONNECT_SUGGESTIONS.map((item) => (
                  <Suggestion
                    className={`${chipButton} ${press}`}
                    key={item.id}
                    onClick={() => sendSuggestion(item.id)}
                    suggestion={item.label}
                    type="button"
                  >
                    {item.label}
                  </Suggestion>
                ))}
              </div>
            </div>
          ) : null}

          {followUpChips.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {followUpChips.map((chip) => (
                <Suggestion
                  className={`${chipButton} ${press}`}
                  key={chip.label}
                  onClick={() => sendSuggestion(chip.id)}
                  suggestion={chip.label}
                  type="button"
                >
                  {chip.label}
                </Suggestion>
              ))}
            </div>
          ) : null}

          {resuming && !threadVisible ? (
            <Shimmer className="text-sm text-muted-foreground" duration={1}>
              Resuming conversation
            </Shimmer>
          ) : null}

          {eveOn ? (
            <EveThread
              apiRef={apiRef}
              initialSession={null}
              initialText={pending}
              mode={mode}
              onContinue={() => setMode(null)}
              onInitialSendFailed={handleInitialSendFailed}
              onState={(state) => {
                setAssistantReply((current) =>
                  current === state.assistant ? current : state.assistant
                );
                setStatus((current) =>
                  current === state.status ? current : state.status
                );
                setPendingId((current) =>
                  current === state.pendingId ? current : state.pendingId
                );
                setNext((current) =>
                  current.join(" ") === state.next.join(" ")
                    ? current
                    : state.next
                );
              }}
              onVisibleChange={setThreadVisible}
              resume={false}
            />
          ) : null}
        </ConversationContent>
        <ConversationScrollButton className="bottom-3 rounded-lg border-hairline bg-black text-white hover:bg-neutral-800" />
      </Conversation>

      <div
        className="w-full min-w-0 shrink-0 pt-2"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {composer}
      </div>
    </div>
  );
}
