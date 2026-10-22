import { cvDownloadPayload } from "../connect/cv-download";
import { readResult } from "./result";
import { getCvInput } from "./schemas";
import type { CapabilityContext } from "./types";

export const getCv = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = getCvInput.safeParse(input);
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid CV focus.",
      operation: "get_cv",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const data = cvDownloadPayload({ focus: parsed.data.focus });
  return readResult({
    data,
    message: `${data.title} ready.`,
    operation: "get_cv",
    requestId: context.correlationId,
  });
};
