import { siteOrigin } from "lib/site-path";

import { getProfile } from "./get-profile";
import { readResult } from "./result";
import { contactGaboInput } from "./schemas";
import type { CapabilityContext } from "./types";

export const contactGabo = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = contactGaboInput.safeParse(input ?? {});
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid contact focus.",
      operation: "contact_gabo",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const profileResult = getProfile({
    context,
    input: { focus: parsed.data.focus },
  });
  if (profileResult.status === "error") return profileResult;
  return readResult({
    data: {
      context: profileResult.data,
      formPath: `${siteOrigin}/contact`,
      requiredFields: ["name", "email", "description"],
    },
    message: "Contact descriptor ready. No email was sent.",
    operation: "contact_gabo",
    requestId: context.correlationId,
  });
};
