"use client";

import { useState } from "react";

import { useGenuiDraft } from "./genui-draft-context";

export const GenuiContactForm = ({ contextId }: { contextId: string }) => {
  const { note, setNote } = useGenuiDraft();
  const [status, setStatus] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setPending(true);
    setStatus(null);
    const retryIdentity = crypto.randomUUID();
    const response = await fetch("/api/capabilities", {
      body: JSON.stringify({
        input: { ...note, retryIdentity },
        operation: "send_note",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const payload = await response.json();
    setPending(false);
    if (payload.status === "confirmed") {
      setReceiptId(payload.data?.receiptId ?? "sent");
      setStatus(payload.message);
      return;
    }
    setStatus(payload.message ?? "Could not send the note.");
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <p className="text-xs text-neutral-500">Context: {contextId}</p>
      <label className="block space-y-2 text-sm">
        <span>Name</span>
        <input
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) => setNote({ name: event.target.value })}
          required
          value={note.name}
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span>Email</span>
        <input
          className="w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) => setNote({ email: event.target.value })}
          required
          type="email"
          value={note.email}
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span>What should we discuss?</span>
        <textarea
          className="min-h-28 w-full rounded-md border border-hairline bg-black px-3 py-2"
          onChange={(event) => setNote({ description: event.target.value })}
          required
          value={note.description}
        />
      </label>
      <button
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        Send email
      </button>
      {status && (
        <p className="text-sm text-neutral-300" role="status">
          {status}
          {receiptId ? ` (${receiptId})` : ""}
        </p>
      )}
    </form>
  );
};
