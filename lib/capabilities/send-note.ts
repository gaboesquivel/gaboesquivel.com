import { denverDay, digest } from "../connect/caps";
import {
  EMAIL_FAILED,
  NOTE_CAP,
  STORE_UNAVAILABLE_NOTE,
} from "../connect/copy";
import { noteSchema } from "../connect/schema";
import {
  loadReceipt,
  rejectChangedPayload,
  saveReceipt,
} from "./action-receipts";
import { writeResult } from "./result";
import { sendNoteInput } from "./schemas";
import type { CapabilityContext } from "./types";

export const sendNoteCapability = async ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = sendNoteInput.safeParse(input);
  if (!parsed.success) {
    return writeResult({
      data: { receiptId: null },
      message: parsed.error.issues[0]?.message ?? "Invalid note.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  if (!context.store) {
    return writeResult({
      data: { receiptId: null },
      message: STORE_UNAVAILABLE_NOTE,
      operation: "send_note",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  const store = context.store;
  const payload = {
    description: parsed.data.description,
    email: parsed.data.email,
    name: parsed.data.name,
  };
  const admission = await rejectChangedPayload({
    operation: "send_note",
    payload,
    retryIdentity: parsed.data.retryIdentity,
    store,
  });
  if (!admission.ok) {
    return writeResult({
      data: { receiptId: null },
      message: "Retry identity does not match the original payload.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "failed",
    });
  }
  if (admission.replay && admission.existing?.status === "confirmed") {
    return writeResult({
      data: { receiptId: admission.existing.providerRef ?? null },
      message: "That note was already sent.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "confirmed",
    });
  }
  if (admission.replay && admission.existing?.status === "pending") {
    return writeResult({
      data: { receiptId: null },
      message: "That note is still sending.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "pending",
    });
  }

  const note = noteSchema.parse(payload);
  const key = `connect:noted:${digest(`${note.email}|${note.description}`)}`;
  const existing = await store.get(key);
  if (existing && existing !== "pending" && existing !== "sent") {
    return writeResult({
      data: { receiptId: existing },
      message: "That note was already sent.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "confirmed",
    });
  }
  if (existing === "pending" || !(await store.claim(key))) {
    return writeResult({
      data: { receiptId: null },
      message: "That note is still sending.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "pending",
    });
  }

  const day = denverDay(context.clock);
  const emailKey = `connect:notes:email:${note.email.toLowerCase()}:${day}`;
  const ipKey = `connect:notes:ip:${context.ip}:${day}`;
  const release = async () => {
    if (context.rateLimitEnforced) {
      await store.decr(emailKey);
      await store.decr(ipKey);
    }
    await store.del(key);
  };

  if (context.rateLimitEnforced) {
    const emailCount = await store.incr(emailKey);
    if (emailCount > 5) {
      await store.decr(emailKey);
      await store.del(key);
      return writeResult({
        data: { receiptId: null },
        message: NOTE_CAP,
        operation: "send_note",
        requestId: context.correlationId,
        status: "failed",
      });
    }
    const ipCount = await store.incr(ipKey);
    if (ipCount > 5) {
      await release();
      return writeResult({
        data: { receiptId: null },
        message: NOTE_CAP,
        operation: "send_note",
        requestId: context.correlationId,
        status: "failed",
      });
    }
  }

  await saveReceipt({
    operation: "send_note",
    payload,
    status: "pending",
    store,
  });

  try {
    const sent = await context.mailer({
      ...note,
      idempotencyKey: parsed.data.retryIdentity,
    });
    await store.set(key, sent.providerId ?? "sent");
    await saveReceipt({
      operation: "send_note",
      payload,
      providerRef: sent.providerId,
      status: "confirmed",
      store,
    });
    return writeResult({
      data: { receiptId: sent.providerId ?? null },
      message: "Sent the note.",
      operation: "send_note",
      requestId: context.correlationId,
      status: "confirmed",
    });
  } catch (error) {
    await release();
    const prior = await loadReceipt({
      operation: "send_note",
      payload,
      store,
    });
    if (prior?.status === "pending") {
      await saveReceipt({
        operation: "send_note",
        payload,
        status: "uncertain",
        store,
      });
      return writeResult({
        data: { receiptId: null },
        message: EMAIL_FAILED,
        operation: "send_note",
        requestId: context.correlationId,
        retryGuidance: "Check your inbox or contact page before resending.",
        status: "uncertain",
      });
    }
    const detail = error instanceof Error ? error.message.trim() : "";
    const message =
      detail && detail !== "email-failed"
        ? `${EMAIL_FAILED} ${detail}`
        : EMAIL_FAILED;
    return writeResult({
      data: { receiptId: null },
      message,
      operation: "send_note",
      requestId: context.correlationId,
      status: "failed",
    });
  }
};
