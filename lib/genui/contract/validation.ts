import type { PublicRecord } from "../envelope";
import type { ExperienceName } from "../experience-contract";
import {
  checkExperienceDocument,
  forbiddenExperienceKeys,
} from "../experience-contract";
import {
  experienceCompositeAllowlist,
  productionBlockedExperiences,
} from "./catalog";

const recordKindForId = ({
  experience,
  props,
}: {
  experience: ExperienceName;
  props: Record<string, unknown>;
}): { ids: string[]; kind: PublicRecord["kind"] | "any" } => {
  if (experience === "CVExperience") {
    return {
      ids: [String(props.sourceId ?? "")],
      kind: "cv",
    };
  }
  if (experience === "ProjectExperience") {
    return {
      ids: Array.isArray(props.projectIds) ? props.projectIds.map(String) : [],
      kind: "project",
    };
  }
  if (experience === "WritingExperience") {
    return {
      ids: Array.isArray(props.postIds) ? props.postIds.map(String) : [],
      kind: "post",
    };
  }
  if (experience === "CapabilityShowcaseExperience") {
    return {
      ids: Array.isArray(props.projectIds) ? props.projectIds.map(String) : [],
      kind: "project",
    };
  }
  if (experience === "ContactExperience") {
    return {
      ids: [String(props.contextId ?? "")],
      kind: "profile",
    };
  }
  if (experience === "AboutExperience") {
    return { ids: [String(props.sourceId ?? "")], kind: "any" };
  }
  if (experience === "Answer") {
    return {
      ids: Array.isArray(props.sourceIds) ? props.sourceIds.map(String) : [],
      kind: "any",
    };
  }
  return { ids: [], kind: "any" };
};

export const validatePublicRecords = ({
  records,
}: {
  records: PublicRecord[];
}) => {
  const seen = new Set<string>();
  for (const record of records) {
    if (seen.has(record.id)) {
      return { ok: false as const, code: "duplicate_record_id" as const };
    }
    seen.add(record.id);
  }
  return { ok: true as const, byId: new Map(records.map((r) => [r.id, r])) };
};

export const validateCompositeForExperience = ({
  composite,
  experience,
}: {
  composite: string | null;
  experience: ExperienceName;
}) => {
  if (
    productionBlockedExperiences.includes(experience) &&
    experience === "ExperienceStack"
  ) {
    return { ok: false as const, code: "unsupported_experience" as const };
  }
  const allowlist = experienceCompositeAllowlist[experience];
  if (!allowlist) return { ok: true as const };
  const effective =
    composite ??
    (experience === "ContactExperience" || experience === "BookingExperience"
      ? "hire-split"
      : null);
  if (!effective) {
    return { ok: false as const, code: "missing_required_property" as const };
  }
  if (!allowlist.includes(effective as (typeof allowlist)[number])) {
    return { ok: false as const, code: "composite_incompatible" as const };
  }
  return { ok: true as const };
};

export const validateRecordReferences = ({
  experience,
  props,
  records,
}: {
  experience: ExperienceName;
  props: Record<string, unknown>;
  records: PublicRecord[];
}) => {
  const catalog = validatePublicRecords({ records });
  if (!catalog.ok) return catalog;

  const { ids, kind } = recordKindForId({ experience, props });
  for (const id of ids) {
    if (!id) continue;
    const record = catalog.byId.get(id);
    if (!record) {
      return { ok: false as const, code: "missing_record" as const, id };
    }
    if (kind !== "any" && record.kind !== kind) {
      return {
        ok: false as const,
        code: "record_kind_mismatch" as const,
        id,
      };
    }
  }
  return { ok: true as const, referencedRecordIds: ids.filter(Boolean) };
};

export const validateExperiencePropsPolicy = ({
  name,
  props,
}: {
  name: string;
  props: Record<string, unknown>;
}) => {
  const policy = checkExperienceDocument({ name, props });
  if (!policy.ok) {
    const reason = policy.reason;
    if (reason === "component") {
      return { ok: false as const, code: "unknown_component" as const };
    }
    if (
      (forbiddenExperienceKeys as readonly string[]).includes(reason) ||
      reason === "html" ||
      reason === "css" ||
      reason === "endpoint"
    ) {
      return { ok: false as const, code: "forbidden_value" as const };
    }
    return { ok: false as const, code: "forbidden_property" as const };
  }
  return { ok: true as const, name: policy.name };
};
