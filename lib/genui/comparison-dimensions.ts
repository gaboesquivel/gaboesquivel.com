import type { Project } from "gaboesquivel";

export const missingComparisonValue = "Not recorded";

export const comparisonDimensions = [
  "year",
  "role",
  "categories",
  "technologies",
] as const;

export type ComparisonDimension = (typeof comparisonDimensions)[number];

const labels: Record<ComparisonDimension, string> = {
  categories: "Categories",
  role: "Role",
  technologies: "Technologies",
  year: "Year",
};

export const comparisonRows = ({ project }: { project: Project }) =>
  comparisonDimensions.map((dimension) => {
    const value =
      dimension === "year"
        ? project.year
          ? String(project.year)
          : null
        : dimension === "role"
          ? project.role?.trim() || null
          : dimension === "categories"
            ? project.type.length
              ? project.type.join(", ")
              : null
            : project.tech.length
              ? project.tech.join(", ")
              : null;
    return {
      dimension,
      label: labels[dimension],
      value,
    };
  });
