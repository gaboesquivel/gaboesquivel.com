"use client";

import { GenuiSessionProvider } from "components/genui/genui-session";
import { labCapabilityCaller } from "lib/genui/fixtures/write-scenarios";
import type { GenuiWriteScenario } from "lib/genui/fixtures/write-scenarios";
import { useMemo } from "react";

declare global {
  interface Window {
    __genuiLabCalls?: { input: Record<string, unknown>; operation: string }[];
  }
}

const recordLabCall = (entry: {
  input: Record<string, unknown>;
  operation: string;
}) => {
  window.__genuiLabCalls = [...(window.__genuiLabCalls ?? []), entry];
};

const labDraft = {
  description: "Fixture lab agenda.",
  email: "lab@example.com",
  name: "Lab Visitor",
};

/**
 * Fixture-lab session: without a scenario writes stay disabled (read-only
 * fixtures). With one, a scripted caller drives each write state and drafts
 * start filled, so pending, failure and receipt are one click away.
 */
export const GenuiLabSession = ({
  children,
  scenario,
}: {
  children: React.ReactNode;
  scenario: GenuiWriteScenario | null;
}) => {
  const callCapability = useMemo(
    () => (scenario ? labCapabilityCaller(scenario, recordLabCall) : undefined),
    [scenario]
  );
  if (!scenario) {
    return (
      <GenuiSessionProvider writesEnabled={false}>
        {children}
      </GenuiSessionProvider>
    );
  }
  return (
    <GenuiSessionProvider
      callCapability={callCapability}
      initialBooking={{ ...labDraft, duration: 30, reviewed: true }}
      initialNote={labDraft}
      writesEnabled
    >
      {children}
    </GenuiSessionProvider>
  );
};
