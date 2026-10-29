import type { Project } from "gaboesquivel";

export const missingComparisonValue = "Not recorded";

/**
 * Dimensions a comparison can show. Each maps to one package field; nothing
 * is synthesized. "work" quotes the case-study paragraphs after the opening
 * context, which is the closest recorded source for "technical challenges".
 */
export const comparisonDimensions = [
  "role",
  "work",
  "shipped",
  "technologies",
  "categories",
  "year",
] as const;

export type ComparisonDimension = (typeof comparisonDimensions)[number];

export const isComparisonDimension = (
  value: unknown
): value is ComparisonDimension =>
  typeof value === "string" &&
  (comparisonDimensions as readonly string[]).includes(value);

export const defaultComparisonDimensions: ComparisonDimension[] = [
  "role",
  "shipped",
  "technologies",
];

const labels: Record<ComparisonDimension, string> = {
  categories: "Categories",
  role: "Role",
  shipped: "What shipped",
  technologies: "Stack",
  work: "Technical work",
  year: "Year",
};

const dimensionPatterns: [ComparisonDimension, RegExp][] = [
  ["role", /\b(role|position|title|responsibilit\w*|what did (?:i|you) do)\b/i],
  [
    "work",
    /\b(technical (?:challenges?|work|problems?)|challenges?|hard parts?|problems?|architecture|how (?:it|they) (?:was|were) built)\b/i,
  ],
  [
    "shipped",
    /\b(shipped|delivered|outcomes?|results?|achievements?|impact|what (?:i|you|was) built|launch(?:ed)?)\b/i,
  ],
  ["technologies", /\b(stack|tech(?:nolog(?:y|ies))?|tools?|languages?)\b/i],
  ["categories", /\b(categor(?:y|ies)|types?|domains?)\b/i],
  ["year", /\b(years?|when|dates?|timeline)\b/i],
];

/** Dimensions a request names explicitly, in canonical order. */
export const namedComparisonDimensions = (text: string) => {
  const found = new Set(
    dimensionPatterns
      .filter(([, pattern]) => pattern.test(text))
      .map(([dimension]) => dimension)
  );
  return comparisonDimensions.filter((dimension) => found.has(dimension));
};

/** Dimensions named in a request; defaults when none are named. */
export const comparisonDimensionsInText = (text: string) => {
  const found = namedComparisonDimensions(text);
  return found.length ? found : defaultComparisonDimensions;
};

export const comparisonDimensionLabel = (dimension: ComparisonDimension) =>
  labels[dimension];

export type ComparisonValue = string | string[] | null;

export const comparisonValue = ({
  dimension,
  project,
}: {
  dimension: ComparisonDimension;
  project: Project;
}): ComparisonValue => {
  if (dimension === "year") return project.year ? String(project.year) : null;
  if (dimension === "role") {
    const role = project.role?.trim();
    if (!role) return null;
    return project.year ? `${role}, ${project.year}` : role;
  }
  if (dimension === "categories") {
    const types = project.type.filter((type) => type !== "featured");
    return types.length ? types.join(", ") : null;
  }
  if (dimension === "technologies") {
    return project.tech.length ? project.tech.join(", ") : null;
  }
  if (dimension === "shipped") {
    return project.achievements?.length ? project.achievements : null;
  }
  const story = project.story ?? [];
  const work = story.length > 1 ? story.slice(1) : story;
  return work.length ? work : null;
};

export const comparisonRows = ({
  dimensions = comparisonDimensions,
  project,
}: {
  dimensions?: readonly ComparisonDimension[];
  project: Project;
}) =>
  dimensions.map((dimension) => ({
    dimension,
    label: labels[dimension],
    value: comparisonValue({ dimension, project }),
  }));
