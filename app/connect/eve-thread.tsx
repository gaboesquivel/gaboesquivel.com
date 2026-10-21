"use client";

import type { Spec } from "@json-render/core";
import { openConversationInputs, useEveAgent } from "eve/react";
import { siteOrigin, siteRelativePath } from "lib/site-path";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { ProjectMediaStack } from "@/components/work/project-media";

import {
  bookFormMessage,
  fixedNoteSpec,
  noteFormMessage,
  noteFormVisible,
  parseBookTimeZone,
} from "../../lib/connect/compose";
import type { NoteFormState } from "../../lib/connect/compose";
import { STREAM_FAILED } from "../../lib/connect/copy";
import type { CvDownloadPayload } from "../../lib/connect/cv-download";
import {
  browserTimeZone,
  channelMessage,
  stripMarker,
} from "../../lib/connect/intent";
import { splitNext } from "../../lib/connect/next-step";
import {
  assistantFollowsConnectForm,
  bookFormPayloadFromMessage,
  bookPartAfterMessage,
  bookReceiptStatus,
  messageHasBookFormPayload,
  messageHasNoteFormPayload,
  noteFormPayloadFromMessage,
  noteReceiptStatus,
  sendPartAfterMessage,
  threadHasNoteFormPayload,
} from "../../lib/connect/note-receipt";
import { lockedPickerSummaries } from "../../lib/connect/picker-lock";
import { formatSlotSelectionLine } from "../../lib/connect/slot-display";
import { visitorFacingAssistantText } from "../../lib/connect/visitor-facing";
import {
  featuredWorkCardProjects,
  precedingUserText,
  shouldShowWorkCards,
} from "../../lib/connect/work-cards";
import { BookReceipt } from "./book-receipt";
import { enter } from "./chat-styles";
import { CvDownloadCard } from "./cv-download-card";
import { NoteReceipt } from "./note-receipt";
import type { SessionCursor } from "./session-cookie";
import { writeSession } from "./session-cookie";

const SlotPicker = dynamic(
  () => import("./slot-picker").then((mod) => mod.SlotPicker),
  { ssr: false }
);

const NoteForm = dynamic(
  () => import("./note-form").then((mod) => mod.NoteForm),
  { ssr: false }
);

const ConnectApprovalForm = dynamic(
  () =>
    import("./connect-approval-form").then((mod) => mod.ConnectApprovalForm),
  { ssr: false }
);

const EMPTY_NEXT: ("book" | "pass" | "send")[] = [];

export interface ThreadApi {
  cancel: () => Promise<void>;
  reset: () => void;
  respond: (input: { optionId: string; requestId: string }) => Promise<void>;
  send: (text: string) => Promise<void>;
}

const formatSlot = ({ iso, timeZone }: { iso: string; timeZone: string }) => {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone,
  }).format(date);
  return `${day} ${time}`;
};

const zoneName = ({ iso, timeZone }: { iso: string; timeZone: string }) =>
  new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
    .formatToParts(new Date(iso))
    .find((part) => part.type === "timeZoneName")?.value ?? timeZone;

const renderText = (text: string) => {
  const nodes: (string | { href: string; label: string })[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push({ href: match[2] ?? "", label: match[1] ?? "" });
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.map((node, index) => {
    if (typeof node === "string") return node;
    const internal =
      node.href.startsWith("/") || node.href.startsWith(siteOrigin);
    const href = siteRelativePath(node.href) || "/";
    if (internal) {
      return (
        <Link className="prose-link" href={href} key={index}>
          {node.label}
        </Link>
      );
    }
    return (
      <a className="prose-link" href={node.href} key={index} rel="noreferrer">
        {node.label}
      </a>
    );
  });
};

const PickerSkeleton = () => (
  <div aria-hidden="true" className="flex flex-col gap-3">
    <div className="h-11 rounded-lg border border-hairline" />
    <div className="h-11 rounded-lg border border-hairline" />
    <div className="h-11 rounded-lg border border-hairline" />
  </div>
);

const contactMatches = ({
  contact,
  input,
}: {
  contact: NoteFormState;
  input: Record<string, unknown>;
}) =>
  (typeof input.name === "string" ? input.name.trim() : "") === contact.name &&
  (typeof input.email === "string" ? input.email.trim() : "") ===
    contact.email &&
  (typeof input.description === "string" ? input.description.trim() : "") ===
    contact.description;

export function EveThread({
  apiRef,
  initialSession,
  initialText,
  mode,
  onContinue,
  onInitialSendFailed,
  onState,
  onVisibleChange,
  resume,
}: {
  apiRef: { current: ThreadApi | null };
  initialSession?: SessionCursor | null;
  initialText?: string | null;
  mode: "book" | "note" | null;
  onContinue?: () => void;
  onInitialSendFailed?: (text: string) => void;
  onState: (state: {
    assistant: string;
    error: string;
    next: ("book" | "pass" | "send")[];
    pendingId: string | null;
    status: string;
  }) => void;
  onVisibleChange?: (hasVisible: boolean) => void;
  resume?: boolean;
}) {
  const agent = useEveAgent({
    initialSession: initialSession ?? undefined,
    onSessionChange: (session) => {
      if (!session) {
        writeSession(null);
        return;
      }
      writeSession({
        sessionId: session.sessionId,
        streamIndex: session.streamIndex,
      });
    },
    prepareSend: (input) => ({
      ...input,
      clientContext: {
        timeZone: browserTimeZone(),
      },
    }),
    resume: Boolean(resume && initialSession),
  });
  const sent = useRef(false);
  const [noteFormDisabled, setNoteFormDisabled] = useState(false);
  const [optimisticNote, setOptimisticNote] = useState<NoteFormState | null>(
    null
  );
  const [pendingPickerLocks, setPendingPickerLocks] = useState<
    Record<string, string>
  >({});
  const noteSpec = useMemo(() => fixedNoteSpec(), []);
  const pickerLocks = useMemo(
    () => ({
      ...lockedPickerSummaries(agent.data.messages),
      ...pendingPickerLocks,
    }),
    [agent.data.messages, pendingPickerLocks]
  );
  const previousMode = useRef(mode);
  const onStateRef = useRef(onState);
  const onInitialSendFailedRef = useRef(onInitialSendFailed);
  const agentRef = useRef(agent);

  useEffect(() => {
    if (previousMode.current !== "note" && mode === "note") {
      setNoteFormDisabled(false);
      setOptimisticNote(null);
    }
    previousMode.current = mode;
  }, [mode]);

  useEffect(() => {
    agentRef.current = agent;
    onStateRef.current = onState;
    onInitialSendFailedRef.current = onInitialSendFailed;
    apiRef.current = {
      cancel: async () => {
        await agentRef.current.cancel();
      },
      reset: () => agentRef.current.reset(),
      respond: ({ optionId, requestId }) =>
        agentRef.current.respond([{ optionId, requestId }]),
      send: (text) => agentRef.current.send(text),
    };
  });

  useEffect(() => {
    if (!initialText || sent.current) return;
    let cancelled = false;
    const zone = browserTimeZone();
    const message =
      mode === "book" || mode === "note"
        ? channelMessage({ mode, text: initialText, timeZone: zone })
        : initialText;

    const run = () => {
      if (cancelled || sent.current) return;
      sent.current = true;
      void agentRef.current.send(message).catch(() => {
        if (cancelled) return;
        sent.current = false;
        onInitialSendFailedRef.current?.(initialText);
      });
    };

    const id = window.requestAnimationFrame(run);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, [initialText, mode]);

  const pending = openConversationInputs(agent.data)[0]?.request;
  const assistant = [...agent.data.messages]
    .toReversed()
    .find((message) => message.role === "assistant");
  const finished = splitNext(
    assistant?.parts
      .flatMap((part) => (part.type === "text" ? [part.text] : []))
      .join("\n") ?? ""
  );
  const lastUserMessage = [...agent.data.messages]
    .toReversed()
    .find((message) => message.role === "user");
  const hideAssistantForFormNote = Boolean(
    lastUserMessage && messageHasNoteFormPayload(lastUserMessage)
  );
  const visibleAssistantText = hideAssistantForFormNote
    ? ""
    : visitorFacingAssistantText(finished.text);
  const leakedAssistant =
    !hideAssistantForFormNote &&
    finished.text.trim().length > 0 &&
    visibleAssistantText.trim().length === 0;
  const errorText =
    agent.error instanceof Error
      ? agent.error.message
      : agent.error
        ? String(agent.error)
        : "";
  const nextSteps = agent.status === "ready" ? finished.next : EMPTY_NEXT;
  const pendingRequestId = pending?.requestId ?? null;

  useEffect(() => {
    onStateRef.current({
      assistant: visibleAssistantText,
      error: errorText,
      next: nextSteps,
      pendingId: pendingRequestId,
      status: agent.status,
    });
  }, [
    agent.status,
    visibleAssistantText,
    errorText,
    nextSteps,
    pendingRequestId,
  ]);

  const waiting = agent.status === "submitted" || agent.status === "streaming";

  const optimisticReceipt = useMemo(() => {
    if (!optimisticNote) return null;
    const inTranscript = agent.data.messages.some((message) => {
      const payload = noteFormPayloadFromMessage(message);
      return (
        payload?.email === optimisticNote.email &&
        payload.description === optimisticNote.description &&
        payload.name === optimisticNote.name
      );
    });
    return inTranscript ? null : optimisticNote;
  }, [agent.data.messages, optimisticNote]);

  const visibleMessages = useMemo(
    () =>
      agent.data.messages.filter((message) => {
        if (messageHasNoteFormPayload(message)) return true;
        if (messageHasBookFormPayload(message)) return true;
        return message.parts.some((part) => {
          if (part.type === "text") {
            const visible =
              message.role === "user"
                ? stripMarker(part.text)
                : visitorFacingAssistantText(splitNext(part.text).text);
            if (message.role === "assistant") {
              if (
                assistantFollowsConnectForm({
                  messageId: message.id,
                  messages: agent.data.messages,
                })
              ) {
                return false;
              }
              return visible.trim().length > 0;
            }
            return visible.trim().length > 0;
          }
          if (part.type !== "dynamic-tool") return false;
          if (part.toolName === "list_slots")
            return part.state !== "output-error";
          return part.state === "approval-requested";
        });
      }),
    [agent.data.messages]
  );

  const hasSendApproval = agent.data.messages.some((message) =>
    message.parts.some(
      (part) =>
        part.type === "dynamic-tool" &&
        part.toolName === "send" &&
        part.state === "approval-requested"
    )
  );
  const showNoteForm = noteFormVisible({
    formDisabled: noteFormDisabled,
    hasSendApproval,
    mode,
  });
  const showReplying =
    waiting &&
    visibleAssistantText.trim().length === 0 &&
    !showNoteForm &&
    !optimisticReceipt &&
    !hideAssistantForFormNote;

  const hasPendingConnectUi = agent.data.messages.some((message) =>
    message.parts.some((part) => {
      if (part.type !== "dynamic-tool") return false;
      if (part.toolName === "list_slots") return part.state !== "output-error";
      if (part.toolName === "book") return part.state === "approval-requested";
      if (part.toolName === "send") {
        if (part.state === "approval-requested") return true;
        return (
          part.state !== "output-available" && part.state !== "output-error"
        );
      }
      return false;
    })
  );

  const noteReceiptOnScreen =
    Boolean(optimisticReceipt) || threadHasNoteFormPayload(agent.data.messages);
  const showFailure =
    !noteReceiptOnScreen &&
    (agent.status === "error" ||
      (!leakedAssistant &&
        !showNoteForm &&
        !waiting &&
        visibleAssistantText.trim().length === 0 &&
        agent.data.messages.some((message) => message.role === "user") &&
        !hasPendingConnectUi));

  useEffect(() => {
    onVisibleChange?.(
      visibleMessages.length > 0 ||
        showReplying ||
        Boolean(showFailure) ||
        showNoteForm ||
        Boolean(optimisticReceipt)
    );
  }, [
    onVisibleChange,
    optimisticReceipt,
    showFailure,
    showNoteForm,
    showReplying,
    visibleMessages.length,
  ]);

  const lastVisibleId = visibleMessages.at(-1)?.id;
  const visitorZone = browserTimeZone();

  return (
    <div aria-busy={waiting} className="flex flex-col gap-6">
      {visibleMessages.map((message) => {
        const bookPayload = bookFormPayloadFromMessage(message);
        if (bookPayload) {
          const bookPart = bookPartAfterMessage(
            agent.data.messages,
            message.id
          );
          const output = bookPart?.output as
            | { inserted?: boolean; message?: string; ok?: boolean }
            | undefined;
          const timeZone =
            message.parts
              .flatMap((part) =>
                part.type === "text" ? [part.text ?? ""] : []
              )
              .map(parseBookTimeZone)
              .find(Boolean) ?? visitorZone;
          return (
            <Message from="assistant" key={message.id}>
              <BookReceipt
                description={bookPayload.description}
                duration={bookPayload.duration}
                email={bookPayload.email}
                name={bookPayload.name}
                start={bookPayload.start}
                status={bookReceiptStatus({
                  fallback: errorText,
                  output,
                  settled: !waiting,
                  state: bookPart?.state ?? "pending",
                })}
                timeZone={timeZone}
              />
            </Message>
          );
        }
        const notePayload = noteFormPayloadFromMessage(message);
        if (notePayload) {
          const sendPart = sendPartAfterMessage(
            agent.data.messages,
            message.id
          );
          const output = sendPart?.output as
            | { message?: string; sent?: boolean }
            | undefined;
          return (
            <Message from="assistant" key={message.id}>
              <NoteReceipt
                description={notePayload.description}
                email={notePayload.email}
                name={notePayload.name}
                status={noteReceiptStatus({
                  fallback: errorText,
                  output,
                  settled: !waiting,
                  state: sendPart?.state ?? "pending",
                })}
              />
            </Message>
          );
        }
        return (
          <Message from={message.role} key={message.id}>
            {message.parts.map((part, index) => {
              if (part.type === "text") {
                if (
                  message.role === "assistant" &&
                  assistantFollowsConnectForm({
                    messageId: message.id,
                    messages: agent.data.messages,
                  })
                ) {
                  return null;
                }
                if (
                  message.role === "user" &&
                  messageHasBookFormPayload(message)
                ) {
                  return null;
                }
                const visible =
                  message.role === "user"
                    ? stripMarker(part.text)
                    : visitorFacingAssistantText(splitNext(part.text).text);
                if (!visible) return null;
                const streaming =
                  waiting &&
                  message.role === "assistant" &&
                  message.id === lastVisibleId;
                return (
                  <MessageContent key={part.id ?? index}>
                    {message.role === "user" ? (
                      <span className="whitespace-pre-wrap">
                        {renderText(visible)}
                      </span>
                    ) : (
                      <MessageResponse isAnimating={streaming}>
                        {visible}
                      </MessageResponse>
                    )}
                  </MessageContent>
                );
              }
              if (part.type !== "dynamic-tool") return null;
              if (part.toolName === "cv" && part.state === "output-available") {
                const output = part.output as CvDownloadPayload | undefined;
                if (!output?.pdfUrl) return null;
                return <CvDownloadCard key={part.toolCallId} {...output} />;
              }
              if (part.toolName === "list_slots") {
                if (part.state === "output-available") {
                  const spec = (part.output as { spec?: unknown } | undefined)
                    ?.spec;
                  if (!spec || typeof spec !== "object") return null;
                  return (
                    <div className={enter} key={part.toolCallId}>
                      <SlotPicker
                        lockedSummary={pickerLocks[part.toolCallId] ?? null}
                        onPick={(values) => {
                          const summary = formatSlotSelectionLine({
                            duration: values.duration,
                            start: values.start,
                            timeZone: values.timeZone,
                          });
                          setPendingPickerLocks((current) => ({
                            ...current,
                            [part.toolCallId]: summary,
                          }));
                          void agent
                            .send(
                              bookFormMessage({
                                description: values.description,
                                duration: values.duration,
                                email: values.email,
                                name: values.name,
                                start: values.start,
                                timeZone: values.timeZone,
                              })
                            )
                            .then(() => {
                              setPendingPickerLocks((current) => {
                                const { [part.toolCallId]: _, ...rest } =
                                  current;
                                return rest;
                              });
                              onContinue?.();
                            })
                            .catch(() => {
                              setPendingPickerLocks((current) => {
                                const { [part.toolCallId]: _, ...rest } =
                                  current;
                                return rest;
                              });
                            });
                        }}
                        spec={spec as Spec}
                      />
                    </div>
                  );
                }
                if (part.state === "output-error") return null;
                return <PickerSkeleton key={part.toolCallId} />;
              }
              if (
                (part.toolName === "book" || part.toolName === "send") &&
                part.state === "approval-requested"
              ) {
                const input =
                  part.input && typeof part.input === "object"
                    ? (part.input as Record<string, unknown>)
                    : {};
                const booking = part.toolName === "book";
                const start =
                  typeof input.start === "string" ? input.start : "";
                const timeZone =
                  typeof input.timeZone === "string"
                    ? input.timeZone
                    : browserTimeZone();
                const label = booking
                  ? start
                    ? `Book ${formatSlot({ iso: start, timeZone })}`
                    : "Book call"
                  : "Send email";
                const requestId = part.approval.id;
                const bookingSummary =
                  booking &&
                  start &&
                  (input.duration === 15 || input.duration === 30)
                    ? `${input.duration} minutes · ${formatSlot({ iso: start, timeZone })} ${zoneName({ iso: start, timeZone })}`
                    : undefined;
                const settleApproval = (contact: NoteFormState) => {
                  const matches = contactMatches({ contact, input });
                  const run = async () => {
                    if (
                      matches &&
                      (!booking ||
                        ((input.duration === 15 || input.duration === 30) &&
                          typeof input.start === "string"))
                    ) {
                      await agent.respond([{ optionId: "approve", requestId }]);
                      return;
                    }
                    await agent.respond([{ optionId: "cancel", requestId }]);
                    const zone = browserTimeZone();
                    if (
                      booking &&
                      (input.duration === 15 || input.duration === 30) &&
                      typeof input.start === "string"
                    ) {
                      await agent.send(
                        bookFormMessage({
                          ...contact,
                          duration: input.duration,
                          start: input.start,
                          timeZone,
                        })
                      );
                      return;
                    }
                    await agent.send(
                      noteFormMessage({ ...contact, timeZone: zone })
                    );
                  };
                  void run().catch(() => null);
                };
                return (
                  <section className={enter} key={part.toolCallId}>
                    <ConnectApprovalForm
                      booking={booking}
                      bookingSummary={bookingSummary}
                      input={input}
                      onApprove={settleApproval}
                      onCancel={() =>
                        agent
                          .respond([{ optionId: "cancel", requestId }])
                          .catch(() => null)
                      }
                      primaryLabel={label}
                      secondaryLabel={booking ? "Don't book" : "Don't send"}
                    />
                  </section>
                );
              }
              return null;
            })}
            {message.role === "assistant" &&
            !assistantFollowsConnectForm({
              messageId: message.id,
              messages: agent.data.messages,
            }) &&
            shouldShowWorkCards(
              precedingUserText({
                messageId: message.id,
                messages: agent.data.messages,
              })
            ) ? (
              <div className={enter}>
                <ProjectMediaStack projects={featuredWorkCardProjects()} />
              </div>
            ) : null}
          </Message>
        );
      })}
      {showNoteForm ? (
        <div className={enter}>
          <NoteForm
            onSubmit={(values) => {
              const zone = browserTimeZone();
              setOptimisticNote(values);
              setNoteFormDisabled(true);
              void agent
                .send(noteFormMessage({ ...values, timeZone: zone }))
                .then(() => {
                  onContinue?.();
                })
                .catch(() => {
                  setNoteFormDisabled(false);
                  setOptimisticNote(null);
                });
            }}
            spec={noteSpec}
          />
        </div>
      ) : null}
      {optimisticReceipt ? (
        <Message from="assistant">
          <NoteReceipt
            description={optimisticReceipt.description}
            email={optimisticReceipt.email}
            name={optimisticReceipt.name}
            status={{ error: false, text: "Sending the note." }}
          />
        </Message>
      ) : null}
      {showReplying ? (
        <Message aria-live="polite" from="assistant">
          <MessageContent>
            <Shimmer className="text-sm text-muted-foreground" duration={1}>
              Replying
            </Shimmer>
          </MessageContent>
        </Message>
      ) : null}
      {showFailure ? (
        <Message from="assistant">
          <MessageContent>
            <p className="text-sm text-red-400">
              {errorText.includes("30 messages today")
                ? errorText
                : STREAM_FAILED}
            </p>
          </MessageContent>
        </Message>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {agent.status === "ready" ? visibleAssistantText : ""}
      </p>
    </div>
  );
}
