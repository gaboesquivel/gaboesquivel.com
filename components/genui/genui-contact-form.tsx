"use client";

import {
  identityForAttempt,
  isSettledWrite,
  newRetryIdentity,
  settleAttempt,
  writeErrorMessage,
} from "lib/genui/write-flow";
import { useRef, useState } from "react";

import { useGenuiDraft } from "./genui-draft-context";
import { useGenuiInteraction } from "./genui-interaction-context";
import {
  WriteError,
  WriteReceiptCard,
  inputClass,
  primaryButtonClass,
} from "./genui-write-status";

const NOTE_FAILED = "Could not send the note.";

/** Contact note: details, send, then a receipt in place of the form. */
export const GenuiContactForm = () => {
  const { attempts, note, receipts, setAttempt, setNote, setReceipt } =
    useGenuiDraft();
  const { callCapability, writesEnabled } = useGenuiInteraction();
  const [failure, setFailure] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const receipt = receipts.note;

  if (receipt) return <WriteReceiptCard receipt={receipt} />;

  const submit = async () => {
    if (inFlight.current || !writesEnabled) return;
    inFlight.current = true;
    setPending(true);
    setFailure(null);
    const input = {
      description: note.description,
      email: note.email,
      name: note.name,
    };
    const attempt = identityForAttempt({
      create: newRetryIdentity,
      payload: input,
      state: attempts.note,
    });
    setAttempt("note", attempt);
    try {
      const payload = await callCapability({
        input: { ...input, retryIdentity: attempt.identity },
        operation: "send_note",
      });
      setAttempt("note", settleAttempt({ state: attempt }));
      if (isSettledWrite(payload)) {
        setReceipt("note", {
          lines: [`${input.name} · ${input.email}`],
          summary: `Note sent from ${input.email}`,
          message: `Note sent. Gabo will reply to ${input.email}.`,
        });
        return;
      }
      setFailure(payload.message ?? NOTE_FAILED);
    } catch (error) {
      setAttempt("note", settleAttempt({ error, state: attempt }));
      setFailure(writeErrorMessage(error));
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  };

  const locked = !writesEnabled || pending;
  // After a network failure the note may have been sent: edits wait for an
  // answer so a retry cannot become a second, different note.
  const editLocked = locked || Boolean(attempts.note.unresolved);

  return (
    <form
      aria-busy={pending}
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit().catch(() => {});
      }}
      ref={formRef}
    >
      <label className="block space-y-2 text-sm">
        <span>Name</span>
        <input
          autoComplete="name"
          className={inputClass}
          disabled={editLocked}
          onChange={(event) => setNote({ name: event.target.value })}
          required
          value={note.name}
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span>Email</span>
        <input
          autoComplete="email"
          className={inputClass}
          disabled={editLocked}
          onChange={(event) => setNote({ email: event.target.value })}
          required
          type="email"
          value={note.email}
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span>What should we discuss?</span>
        <textarea
          className={`min-h-28 ${inputClass}`}
          disabled={editLocked}
          onChange={(event) => setNote({ description: event.target.value })}
          required
          value={note.description}
        />
      </label>
      <button className={primaryButtonClass} disabled={locked} type="submit">
        {pending ? "Sending…" : "Send email"}
      </button>
      {failure ? (
        <WriteError
          message={failure}
          onRetry={() => formRef.current?.requestSubmit()}
        />
      ) : null}
    </form>
  );
};
