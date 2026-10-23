export type ComposeSpanName =
  | "composition.request"
  | "composition.route"
  | "composition.retrieve"
  | "composition.generate"
  | "composition.validate"
  | "composition.complete"
  | "composition.error"
  | "composition.cancel";

export interface ComposeSpanEvent {
  attributes?: Record<string, string | number | boolean | undefined>;
  correlationId: string;
  durationMs?: number;
  name: ComposeSpanName;
  surface?: string;
}

const spanListeners: ((event: ComposeSpanEvent) => void)[] = [];

export const onComposeSpan = (listener: (event: ComposeSpanEvent) => void) => {
  spanListeners.push(listener);
  return () => {
    const index = spanListeners.indexOf(listener);
    if (index !== -1) spanListeners.splice(index, 1);
  };
};

export const emitComposeSpan = (event: ComposeSpanEvent) => {
  for (const listener of spanListeners) listener(event);
  if (process.env.LANGFUSE_PUBLIC_KEY && process.env.LANGFUSE_SECRET_KEY) {
    // Optional export: failures must not affect composition.
    void import("./telemetry-langfuse")
      .then((module) => module.exportSpan(event))
      .catch(() => {});
  }
};

export interface ComposeTelemetry {
  cancellation?: string;
  correlationId: string;
  composite?: string;
  domain?: string;
  experience?: string;
  jevCalls: number;
  mediaBackedProjectCount?: number;
  modelCalls: number;
  parseErrors: number;
  projectCount?: number;
  taskIntent?: string;
  tier: 0 | 1 | 2;
  timingMs: number;
  validationOutcome?: "ok" | "failed";
}

export const logComposeTelemetry = (event: ComposeTelemetry) => {
  emitComposeSpan({
    attributes: {
      composite: event.composite,
      domain: event.domain,
      experience: event.experience,
      jevCalls: event.jevCalls,
      mediaBackedProjectCount: event.mediaBackedProjectCount,
      modelCalls: event.modelCalls,
      parseErrors: event.parseErrors,
      projectCount: event.projectCount,
      taskIntent: event.taskIntent,
      tier: event.tier,
      timingMs: event.timingMs,
      validationOutcome: event.validationOutcome,
    },
    correlationId: event.correlationId,
    durationMs: event.timingMs,
    name: event.cancellation ? "composition.cancel" : "composition.complete",
  });
  if (process.env.NODE_ENV === "test") return;
  console.info(
    JSON.stringify({
      event: "genui.compose",
      ...event,
    })
  );
};
