import { projects } from "gaboesquivel";
import type { Project } from "gaboesquivel";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const surfacesFor = (project: Project) =>
  [
    project.title,
    project.slug,
    project.slug.replace(/-/g, " "),
    ...(project.aliases ?? []),
  ].filter((surface) => surface.trim().length > 0);

const shortTokenAllowed = ({
  surface,
  text,
}: {
  surface: string;
  text: string;
}) => {
  if (surface.length >= 4) return true;
  if (text.includes(surface.toUpperCase())) return true;
  const cue = new RegExp(
    `\\b(?:excluding|except|without|compare|versus|vs\\.?|project|called)\\s+${escapeRegExp(surface)}\\b`,
    "i"
  );
  return cue.test(text);
};

const surfaceMatches = ({
  surface,
  text,
}: {
  surface: string;
  text: string;
}) => {
  if (!shortTokenAllowed({ surface, text })) return false;
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}])${escapeRegExp(surface)}(?![\\p{L}\\p{N}])`,
    "iu"
  );
  return pattern.test(text);
};

/** Whole-token project identity. Short names do not match ordinary English words. */
export const namedProjectsInText = ({ text }: { text: string }): Project[] => {
  const matched = projects.filter((project) =>
    surfacesFor(project).some((surface) => surfaceMatches({ surface, text }))
  );
  const ids = new Set<string>();
  return matched.filter((project) => {
    if (ids.has(project.slug)) return false;
    ids.add(project.slug);
    return true;
  });
};
