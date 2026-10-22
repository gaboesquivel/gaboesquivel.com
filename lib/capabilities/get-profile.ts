import { generatedProfile } from "lib/api/generated/profile";
import { siteOrigin } from "lib/site-path";

import { readResult } from "./result";
import { getProfileInput } from "./schemas";
import type { CapabilityContext } from "./types";

const focusPages: Record<string, string> = {
  ai: "/ai",
  fullstack: "/fullstack",
  web3: "/web3",
};

export const getProfile = ({
  context,
  input,
}: {
  context: CapabilityContext;
  input: unknown;
}) => {
  const parsed = getProfileInput.safeParse(input);
  if (!parsed.success) {
    return readResult({
      data: null,
      message: parsed.error.issues[0]?.message ?? "Invalid profile focus.",
      operation: "get_profile",
      requestId: context.correlationId,
      status: "error",
    });
  }
  const profile = generatedProfile();
  const focus = parsed.data.focus;
  const focusUrl = focus ? `${siteOrigin}${focusPages[focus]}` : undefined;
  return readResult({
    data: {
      focus: focus ?? null,
      focusUrl,
      profile,
      sourceUrl: `${siteOrigin}/about`,
    },
    message: "Profile loaded.",
    operation: "get_profile",
    requestId: context.correlationId,
  });
};
