import { createHash } from "node:crypto";

import { digest } from "../connect/caps";

export const normalizeRetryPayload = (value: unknown) =>
  JSON.stringify(value, Object.keys(value as object).sort());

export const retryKeyFor = ({
  operation,
  payload,
}: {
  operation: string;
  payload: unknown;
}) =>
  `capability:retry:${digest(`${operation}|${normalizeRetryPayload(payload)}`)}`;

export const calendarEventIdFromRetry = (retryIdentity: string) => {
  const hex = createHash("sha256").update(retryIdentity).digest("hex");
  return hex.replace(/[^a-v0-9]/g, "a").slice(0, 32);
};
