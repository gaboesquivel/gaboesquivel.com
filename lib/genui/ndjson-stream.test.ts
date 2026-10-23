import { describe, expect, test } from "bun:test";

import { parseNdjsonText } from "./ndjson-stream";

describe("parseNdjsonText", () => {
  test("parses multiple lines", () => {
    const result = parseNdjsonText('{"type":"start"}\n{"type":"complete"}\n');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.events).toHaveLength(2);
  });

  test("rejects malformed lines", () => {
    expect(parseNdjsonText("{not json}").ok).toBe(false);
  });
});
