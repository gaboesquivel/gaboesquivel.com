import { describe, expect, test } from "bun:test";

import {
  bookingDocument,
  capabilityShowcaseDocument,
  contactDocument,
  cvDocument,
  projectDocument,
  writingDocument,
} from "lib/genui/builders";
import { compileExperience } from "lib/genui/contract/compiler";
import { GENUI_LIBRARY_VERSION } from "lib/genui/envelope";
import {
  sampleCvRecord,
  samplePostRecord,
  sampleProfileRecord,
  sampleProjectRecord,
} from "lib/genui/fixtures/sample-records";

const compileEnvelope = (envelope: {
  libraryVersion: number;
  openuiText: string;
  records: Parameters<typeof compileExperience>[0]["records"];
}) =>
  compileExperience({
    document: envelope.openuiText,
    libraryVersion: envelope.libraryVersion,
    records: envelope.records,
  });

describe("compileExperience acceptance", () => {
  test("valid deterministic CV", () => {
    const envelope = cvDocument({ record: sampleCvRecord, requestId: "r1" });
    expect(compileEnvelope(envelope).ok).toBe(true);
  });

  test("valid project gallery", () => {
    const records = [
      sampleProjectRecord("wink", "Wink"),
      sampleProjectRecord("legal-agent", "LegalAgent"),
    ];
    const envelope = projectDocument({
      composite: "work-gallery",
      projectIds: records.map((r) => r.id),
      records,
      requestId: "r1",
    });
    expect(compileEnvelope(envelope).ok).toBe(true);
  });

  test("valid case study", () => {
    const records = [sampleProjectRecord("wink", "Wink")];
    const envelope = projectDocument({
      composite: "case-study",
      projectIds: [records[0].id],
      records,
      requestId: "r1",
    });
    expect(compileEnvelope(envelope).ok).toBe(true);
  });

  test("valid writing experience", () => {
    const records = [samplePostRecord("post-a", "Post A")];
    const envelope = writingDocument({
      composite: "dated-row",
      postIds: [records[0].id],
      records,
      requestId: "r1",
    });
    expect(compileEnvelope(envelope).ok).toBe(true);
  });

  test("valid contact and booking", () => {
    expect(
      compileEnvelope(
        contactDocument({ records: [sampleProfileRecord], requestId: "r1" })
      ).ok
    ).toBe(true);
    expect(
      compileEnvelope(
        bookingDocument({ records: [sampleProfileRecord], requestId: "r1" })
      ).ok
    ).toBe(true);
  });

  test("valid AI showcase", () => {
    const records = [sampleProjectRecord("legal-agent", "LegalAgent")];
    const envelope = capabilityShowcaseDocument({
      domain: "ai",
      projectIds: [records[0].id],
      records,
      requestId: "r1",
    });
    expect(compileEnvelope(envelope).ok).toBe(true);
  });

  test("rejects unknown root component", () => {
    const result = compileExperience({
      document: 'root = AdminPanel("x")',
      libraryVersion: GENUI_LIBRARY_VERSION,
      records: [],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("unknown_component");
  });

  test("rejects incompatible composite", () => {
    const records = [sampleProjectRecord("wink", "Wink")];
    const envelope = projectDocument({
      composite: "dated-row",
      projectIds: [records[0].id],
      records,
      requestId: "r1",
    });
    const result = compileEnvelope(envelope);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("composite_incompatible");
  });

  test("rejects ExperienceStack", () => {
    const result = compileExperience({
      document: 'root = ExperienceStack(["a"])',
      libraryVersion: GENUI_LIBRARY_VERSION,
      records: [],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("unsupported_experience");
  });

  test("rejects missing record", () => {
    const result = compileExperience({
      document: 'root = ProjectExperience("case-study", ["/project/missing"])',
      libraryVersion: GENUI_LIBRARY_VERSION,
      records: [sampleProjectRecord("wink", "Wink")],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("missing_record");
  });

  test("rejects duplicate record ids", () => {
    const record = sampleProjectRecord("wink", "Wink");
    const result = compileExperience({
      document: `root = ProjectExperience("case-study", ["${record.id}"])`,
      libraryVersion: GENUI_LIBRARY_VERSION,
      records: [record, record],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("duplicate_record_id");
  });

  test("rejects HTML injection in Answer body", () => {
    const result = compileExperience({
      document: 'root = Answer("<script>alert(1)</script>", [])',
      libraryVersion: GENUI_LIBRARY_VERSION,
      records: [],
    });
    expect(result.ok).toBe(false);
  });

  test("rejects trailing statements", () => {
    const result = compileExperience({
      document: 'evil = Answer("x", [])\nroot = Answer("ok", [])',
      libraryVersion: GENUI_LIBRARY_VERSION,
      records: [],
    });
    expect(result.ok).toBe(false);
  });

  test("rejects unsupported library version", () => {
    const envelope = cvDocument({ record: sampleCvRecord, requestId: "r1" });
    const result = compileExperience({
      document: envelope.openuiText,
      libraryVersion: 999,
      records: envelope.records,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("unsupported_library_version");
  });
});
