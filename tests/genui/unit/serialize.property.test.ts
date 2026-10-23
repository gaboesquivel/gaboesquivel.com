import { describe, expect, test } from "bun:test";

import { createParser } from "@openuidev/lang-core";
import * as fc from "fast-check";
import { genuiLibraryJsonSchema } from "lib/genui/contract/library";
import {
  escapeOpenUiString,
  openUiStringLiteral,
} from "lib/genui/contract/serialize";

const parser = createParser(genuiLibraryJsonSchema(), "CVExperience");

describe("OpenUI string serialization", () => {
  test("property: escaped literals parse back", () => {
    fc.assert(
      fc.property(fc.string({ maxLength: 200 }), (value) => {
        const document = `root = Answer(${openUiStringLiteral(value)}, [])`;
        const parsed = parser.parse(document);
        expect(parsed.meta.errors.length).toBe(0);
        expect(parsed.root?.props.body).toBe(value);
      }),
      { seed: 42, numRuns: 80 }
    );
  });

  test("escapeOpenUiString is idempotent on safe strings", () => {
    expect(escapeOpenUiString("plain")).toBe("plain");
    expect(escapeOpenUiString('a"b')).toBe('a\\"b');
  });
});
