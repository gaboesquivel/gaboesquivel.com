export interface ComposeTelemetry {
  cancellation?: string;
  correlationId: string;
  jevCalls: number;
  modelCalls: number;
  parseErrors: number;
  tier: 0 | 1 | 2;
  timingMs: number;
}

export const logComposeTelemetry = (event: ComposeTelemetry) => {
  if (process.env.NODE_ENV === "test") return;
  console.info(
    JSON.stringify({
      event: "genui.compose",
      ...event,
    })
  );
};
