import { getProjectBySlug } from "gaboesquivel";
import { resolveProjectImage } from "lib/work/project-cover";

import { compileCompositionEnvelope } from "./contract/compiler";
import type { CompositionEnvelope } from "./envelope";
import type { GenuiTaskIntent } from "./task-intent";
import { classifyTaskIntent } from "./task-intent";

export interface ComposeResultMetadata {
  composite?: string;
  domain?: string;
  experience?: string;
  fallbackReason?: string;
  mediaBackedProjectCount?: number;
  projectCount?: number;
  taskIntent?: GenuiTaskIntent;
  validationOutcome?: "ok" | "failed";
}

export const metadataFromEnvelope = ({
  envelope,
  query,
  validationOk,
}: {
  envelope: CompositionEnvelope | null;
  query: string;
  validationOk?: boolean;
}): ComposeResultMetadata => {
  const base: ComposeResultMetadata = {
    taskIntent: classifyTaskIntent(query),
    validationOutcome: validationOk === false ? "failed" : "ok",
  };
  if (!envelope) return base;

  const compiled = compileCompositionEnvelope({ envelope });
  if (!compiled.ok) {
    return { ...base, validationOutcome: "failed" };
  }

  const experience = compiled.experience;
  const composite = compiled.composite ?? undefined;
  const domain =
    typeof compiled.props.domain === "string"
      ? compiled.props.domain
      : undefined;

  let projectCount: number | undefined;
  let mediaBackedProjectCount: number | undefined;
  if (
    experience === "ProjectExperience" &&
    Array.isArray(compiled.props.projectIds)
  ) {
    const ids = compiled.props.projectIds.map(String);
    projectCount = ids.length;
    const projects = ids.flatMap((id) => {
      const slug = id.replace(/^\/project\//, "");
      const project = getProjectBySlug(slug);
      return project ? [project] : [];
    });
    mediaBackedProjectCount = projects.filter((project) =>
      resolveProjectImage({ project })
    ).length;
  }

  return {
    ...base,
    composite,
    domain,
    experience,
    mediaBackedProjectCount,
    projectCount,
  };
};
