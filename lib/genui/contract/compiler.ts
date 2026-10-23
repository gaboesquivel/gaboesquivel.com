import { createParser } from "@openuidev/lang-core";

import { GENUI_LIBRARY_VERSION } from "../envelope";
import type { PublicRecord } from "../envelope";
import type { ExperienceName } from "../experience-contract";
import {
  GENUI_MAX_DOCUMENT_BYTES,
  GENUI_MAX_STATEMENT_COUNT,
  productionBlockedExperiences,
} from "./catalog";
import type { CompileExperienceResult } from "./errors";
import { genuiContractLibrary, genuiLibraryJsonSchema } from "./library";
import {
  validateCompositeForExperience,
  validateExperiencePropsPolicy,
  validatePublicRecords,
  validateRecordReferences,
} from "./validation";

const parser = createParser(
  genuiLibraryJsonSchema(),
  genuiContractLibrary.root ?? "CVExperience"
);

const rootAssignmentPattern = /^\s*root\s*=\s*/;

const trailingContentAfterRoot = (document: string) => {
  const trimmed = document.trim();
  if (!rootAssignmentPattern.test(trimmed)) return true;
  const lines = trimmed.split("\n");
  if (lines.length > 1) {
    const afterFirst = lines.slice(1).join("\n").trim();
    if (afterFirst.length > 0) return true;
  }
  if (/\broot\s*=\s*[\s\S]+\broot\s*=/.test(trimmed)) return true;
  return false;
};

const mapParserError = (code: string): CompileExperienceResult | null => {
  if (code === "unknown-component") {
    return { ok: false, code: "unknown_component" };
  }
  if (code === "missing-required" || code === "null-required") {
    return { ok: false, code: "missing_required_property" };
  }
  if (code === "type-mismatch") {
    return { ok: false, code: "invalid_property_type" };
  }
  if (code === "excess-args") {
    return { ok: false, code: "unknown_property" };
  }
  return null;
};

const compositeFromProps = (
  experience: ExperienceName,
  props: Record<string, unknown>
) => {
  if (experience === "CapabilityShowcaseExperience") return null;
  if (experience === "Answer" || experience === "AboutExperience") return null;
  const composite = props.composite;
  return typeof composite === "string" ? composite : null;
};

export const compileExperience = ({
  document,
  libraryVersion,
  records,
}: {
  document: unknown;
  libraryVersion: number;
  records: PublicRecord[];
}): CompileExperienceResult => {
  if (typeof document !== "string") {
    return { ok: false, code: "malformed_grammar" };
  }
  const text = document;
  if (!text.trim()) {
    return { ok: false, code: "empty_document" };
  }
  const bytes = new TextEncoder().encode(text).length;
  if (bytes > GENUI_MAX_DOCUMENT_BYTES) {
    return { ok: false, code: "oversized_document" };
  }
  if (libraryVersion !== GENUI_LIBRARY_VERSION) {
    return { ok: false, code: "unsupported_library_version" };
  }

  const recordCatalog = validatePublicRecords({ records });
  if (!recordCatalog.ok) {
    return { ok: false, code: recordCatalog.code };
  }

  if (!rootAssignmentPattern.test(text.trim())) {
    return { ok: false, code: "invalid_root" };
  }
  if (trailingContentAfterRoot(text)) {
    return { ok: false, code: "unexpected_trailing_content" };
  }

  const parsed = parser.parse(text);
  if (parsed.meta.incomplete) {
    return { ok: false, code: "truncated_document" };
  }
  if (parsed.meta.statementCount > GENUI_MAX_STATEMENT_COUNT) {
    return { ok: false, code: "excessive_complexity" };
  }
  if (parsed.meta.orphaned.length > 0) {
    return { ok: false, code: "unexpected_trailing_content" };
  }
  if (
    parsed.mutationStatements.length > 0 ||
    parsed.queryStatements.length > 0
  ) {
    return { ok: false, code: "unauthorized_executable" };
  }
  if (parsed.rootExpression) {
    return { ok: false, code: "unauthorized_executable" };
  }
  if (!parsed.root) {
    if (parsed.meta.errors.length > 0) {
      const mapped = mapParserError(parsed.meta.errors[0]?.code ?? "");
      if (mapped) return mapped;
    }
    return { ok: false, code: "malformed_grammar" };
  }

  if (parsed.meta.errors.length > 0) {
    const first = parsed.meta.errors[0];
    const mapped = mapParserError(first?.code ?? "");
    if (mapped) return mapped;
    return { ok: false, code: "parse", detail: first?.message };
  }

  const experience = parsed.root.typeName;
  const props = parsed.root.props;

  if (productionBlockedExperiences.includes(experience as ExperienceName)) {
    return { ok: false, code: "unsupported_experience" };
  }

  const policy = validateExperiencePropsPolicy({ name: experience, props });
  if (!policy.ok) {
    return { ok: false, code: policy.code };
  }

  const composite = compositeFromProps(policy.name, props);
  const compositeCheck = validateCompositeForExperience({
    composite,
    experience: policy.name,
  });
  if (!compositeCheck.ok) {
    return { ok: false, code: compositeCheck.code };
  }

  const refs = validateRecordReferences({
    experience: policy.name,
    props,
    records,
  });
  if (!refs.ok) {
    return { ok: false, code: refs.code };
  }

  return {
    ok: true,
    composite,
    experience,
    props,
    referencedRecordIds: refs.referencedRecordIds,
  };
};

export const compileCompositionEnvelope = ({
  envelope,
}: {
  envelope: {
    libraryVersion: number;
    openuiText: string;
    records: PublicRecord[];
  };
}) =>
  compileExperience({
    document: envelope.openuiText,
    libraryVersion: envelope.libraryVersion,
    records: envelope.records,
  });
