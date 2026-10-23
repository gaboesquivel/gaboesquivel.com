import { describe, expect, test } from "bun:test";

import {
  bookingDocument,
  contactDocument,
  cvDocument,
  projectDocument,
  writingDocument,
} from "lib/genui/builders";
import { compileCompositionEnvelope } from "lib/genui/contract/compiler";
import { tierZeroDocument } from "lib/genui/deterministic";
import {
  sampleCvRecord,
  sampleProfileRecord,
  sampleProjectRecord,
} from "lib/genui/fixtures/sample-records";

const assertValid = (envelope: ReturnType<typeof cvDocument>) => {
  const result = compileCompositionEnvelope({ envelope });
  expect(result.ok).toBe(true);
};

describe("deterministic builders compile", () => {
  test("cvDocument", () => {
    assertValid(cvDocument({ record: sampleCvRecord, requestId: "r" }));
  });

  test("projectDocument", () => {
    const records = [sampleProjectRecord("wink", "Wink")];
    assertValid(
      projectDocument({
        composite: "case-study",
        projectIds: [records[0].id],
        records,
        requestId: "r",
      })
    );
  });

  test("writingDocument", () => {
    assertValid(
      writingDocument({
        composite: "dated-row",
        postIds: [],
        records: [],
        requestId: "r",
      })
    );
  });

  test("contact and booking", () => {
    assertValid(
      contactDocument({ records: [sampleProfileRecord], requestId: "r" })
    );
    assertValid(
      bookingDocument({ records: [sampleProfileRecord], requestId: "r" })
    );
  });

  for (const query of [
    "cv",
    "download cv",
    "book a call",
    "send email",
    "explore my work",
  ]) {
    test(`tier zero ${query}`, () => {
      const envelope = tierZeroDocument({ query, requestId: "r" });
      expect(envelope).not.toBeNull();
      if (envelope) assertValid(envelope);
    });
  }
});
