import { describe, expect, test } from "bun:test";
import { once } from "node:events";

import { errorFromEvent } from "lib/search/compose-outcome";

import { armComposeDeadline, timedOutEvent } from "./compose-deadline";

describe("compose deadline", () => {
  test("writes an explicit timed_out error before aborting compose", async () => {
    const controller = new AbortController();
    const written: ReturnType<typeof timedOutEvent>[] = [];
    armComposeDeadline({
      controller,
      ms: 5,
      onTimeout: () => {
        expect(controller.signal.aborted).toBe(false);
        written.push(timedOutEvent("req-1"));
      },
    });
    await once(controller.signal, "abort");
    expect(written).toEqual([
      expect.objectContaining({ code: "timed_out", type: "error" }),
    ]);
    expect(errorFromEvent(written[0] ?? {}).message).toBe(
      "That took too long. Try again."
    );
  });

  test("disarming before the deadline writes nothing", async () => {
    const controller = new AbortController();
    let fired = false;
    const disarm = armComposeDeadline({
      controller,
      ms: 5,
      onTimeout: () => {
        fired = true;
      },
    });
    disarm();
    await Bun.sleep(20);
    expect(fired).toBe(false);
    expect(controller.signal.aborted).toBe(false);
  });
});
