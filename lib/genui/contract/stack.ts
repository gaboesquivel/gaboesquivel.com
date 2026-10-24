import type { ExperienceName } from "../experience-contract";
import { GENUI_MAX_STACK_CHILDREN } from "./catalog";

export interface ParsedExperienceChild {
  props: Record<string, unknown>;
  typeName: ExperienceName;
}

export const isParsedExperienceChild = (
  value: unknown
): value is ParsedExperienceChild =>
  Boolean(
    value &&
    typeof value === "object" &&
    (value as { type?: string }).type === "element" &&
    typeof (value as { typeName?: string }).typeName === "string"
  );

export const parseStackChildren = (
  raw: unknown
): { ok: true; children: ParsedExperienceChild[] } | { ok: false } => {
  if (!Array.isArray(raw)) return { ok: false };
  if (raw.length < 1 || raw.length > GENUI_MAX_STACK_CHILDREN) {
    return { ok: false };
  }
  const children: ParsedExperienceChild[] = [];
  for (const item of raw) {
    if (!isParsedExperienceChild(item)) return { ok: false };
    if (item.typeName === "ExperienceStack") return { ok: false };
    children.push({
      props: item.props,
      typeName: item.typeName as ExperienceName,
    });
  }
  return { ok: true, children };
};
