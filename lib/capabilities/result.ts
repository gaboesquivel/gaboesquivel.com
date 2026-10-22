import { CAPABILITY_VERSION } from "./types";
import type { CapabilityResult, ReadOutcome, WriteOutcome } from "./types";

export const readResult = <T>({
  data,
  message,
  operation,
  requestId,
  status = "ok",
}: {
  data: T;
  message: string;
  operation: string;
  requestId: string;
  status?: ReadOutcome;
}): CapabilityResult<T> => ({
  data,
  message,
  operation,
  requestId,
  status,
  version: CAPABILITY_VERSION,
});

export const writeResult = <T>({
  data,
  message,
  operation,
  requestId,
  retryGuidance,
  status,
}: {
  data: T;
  message: string;
  operation: string;
  requestId: string;
  retryGuidance?: string;
  status: WriteOutcome;
}): CapabilityResult<T> => ({
  data,
  message,
  operation,
  requestId,
  retryGuidance,
  status,
  version: CAPABILITY_VERSION,
});
