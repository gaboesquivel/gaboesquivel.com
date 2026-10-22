import type { CapStore } from "../connect/caps";
import { normalizeRetryPayload, retryKeyFor } from "./retry";
import type { WriteOutcome } from "./types";

const receiptPrefix = "capability:receipt:";

export interface StoredReceipt {
  operation: string;
  payloadHash: string;
  providerRef?: string;
  status: WriteOutcome;
}

export const loadReceipt = async ({
  operation,
  payload,
  store,
}: {
  operation: string;
  payload: unknown;
  store: CapStore;
}) => {
  const key = `${receiptPrefix}${retryKeyFor({ operation, payload })}`;
  const raw = await store.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredReceipt;
  } catch {
    return null;
  }
};

export const saveReceipt = async ({
  operation,
  payload,
  providerRef,
  status,
  store,
}: {
  operation: string;
  payload: unknown;
  providerRef?: string;
  status: WriteOutcome;
  store: CapStore;
}) => {
  const key = `${receiptPrefix}${retryKeyFor({ operation, payload })}`;
  const record: StoredReceipt = {
    operation,
    payloadHash: normalizeRetryPayload(payload),
    providerRef,
    status,
  };
  await store.set(key, JSON.stringify(record));
  return record;
};

export const rejectChangedPayload = async ({
  operation,
  payload,
  retryIdentity,
  store,
}: {
  operation: string;
  payload: unknown;
  retryIdentity: string;
  store: CapStore;
}) => {
  const identityKey = `capability:identity:${retryIdentity}`;
  const bound = await store.get(identityKey);
  const payloadHash = normalizeRetryPayload(payload);
  if (bound && bound !== payloadHash) {
    return { ok: false as const, reason: "identity-mismatch" as const };
  }
  if (!bound) await store.set(identityKey, payloadHash);
  const existing = await loadReceipt({ operation, payload, store });
  if (existing?.status === "confirmed") {
    return { existing, ok: true as const, replay: true as const };
  }
  if (existing?.status === "pending") {
    return { existing, ok: true as const, replay: true as const };
  }
  return { ok: true as const, replay: false as const };
};
