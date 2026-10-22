export const experienceNames = [
  "Answer",
  "AboutExperience",
  "ProjectExperience",
  "WritingExperience",
  "ContactExperience",
  "BookingExperience",
  "CVExperience",
  "ExperienceStack",
] as const;

export type ExperienceName = (typeof experienceNames)[number];

export const forbiddenExperienceKeys = [
  "presentation",
  "variant",
  "layout",
  "frame",
  "html",
  "css",
  "tool",
  "toolName",
  "endpoint",
] as const;

export type ForbiddenExperienceKey = (typeof forbiddenExperienceKeys)[number];

const experienceNameSet = new Set<string>(experienceNames);

const forbiddenKeySet = new Set<string>(forbiddenExperienceKeys);

const stringValues = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(stringValues)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(stringValues)
        : [];

const valueReason = (value: string) =>
  /<[a-z][^>]*>/i.test(value)
    ? "html"
    : /\{[^}]*:[^}]*\}/.test(value)
      ? "css"
      : /^https?:\/\//.test(value)
        ? "endpoint"
        : null;

export const checkExperienceDocument = ({
  name,
  props,
}: {
  name: string;
  props: Record<string, unknown>;
}) => {
  if (!experienceNameSet.has(name))
    return { ok: false as const, reason: "component" as const };
  const forbidden = Object.keys(props).find((key) => forbiddenKeySet.has(key));
  if (forbidden)
    return {
      ok: false as const,
      reason: forbidden as ForbiddenExperienceKey,
    };
  const reason = stringValues(props)
    .map(valueReason)
    .find((item) => item !== null);
  if (reason) return { ok: false as const, reason };
  return { ok: true as const, name: name as ExperienceName };
};
