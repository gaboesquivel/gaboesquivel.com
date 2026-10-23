import { describe, expect, test } from "bun:test";

import { emitComposeSpan, onComposeSpan } from "./telemetry";

describe("compose telemetry", () => {
  test("emits in-memory span events", () => {
    const events: string[] = [];
    const unsubscribe = onComposeSpan((event) => {
      events.push(event.name);
    });
    emitComposeSpan({
      correlationId: "c1",
      name: "composition.validate",
    });
    unsubscribe();
    expect(events).toEqual(["composition.validate"]);
  });
});
