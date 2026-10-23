export type CompileErrorCode =
  | "empty_document"
  | "oversized_document"
  | "excessive_complexity"
  | "malformed_grammar"
  | "invalid_root"
  | "unsupported_library_version"
  | "unknown_component"
  | "unknown_property"
  | "invalid_property_type"
  | "missing_required_property"
  | "unknown_composite"
  | "composite_incompatible"
  | "unsupported_experience"
  | "missing_record"
  | "duplicate_record_id"
  | "duplicate_project_ids"
  | "invalid_recipe_cardinality"
  | "record_kind_mismatch"
  | "forbidden_property"
  | "forbidden_value"
  | "unauthorized_executable"
  | "unauthorized_endpoint"
  | "truncated_document"
  | "unexpected_trailing_content"
  | "parse";

export interface CompileExperienceFailure {
  ok: false;
  code: CompileErrorCode;
  detail?: string;
}

export interface CompiledExperience {
  ok: true;
  experience: string;
  composite: string | null;
  props: Record<string, unknown>;
  referencedRecordIds: string[];
}

export type CompileExperienceResult =
  | CompileExperienceFailure
  | CompiledExperience;
