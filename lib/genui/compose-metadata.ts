import { compileCompositionEnvelope } from "./contract/compiler";
import type { CompiledExperience } from "./contract/errors";
import type { CompositionEnvelope } from "./envelope";
import { projectsFromPublicIds } from "./project-from-id";
import { mediaBackedProjectCount } from "./select-project-composition";
import type { GenuiTaskIntent } from "./task-intent";
import { classifyTaskIntent } from "./task-intent";
import { assessTaskCoverage, planTasks } from "./task-plan";

export interface ComposeResultMetadata {
  taskCoverage?: ReturnType<typeof assessTaskCoverage>;
  composite?: string;
  domain?: string;
  experience?: string;
  mediaBackedProjectCount?: number;
  projectCount?: number;
  taskIntent?: GenuiTaskIntent;
  validationOutcome?: "ok" | "failed";
}

export const metadataFromEnvelope = ({
  compiled,
  envelope,
  query,
  taskIntent,
  validationOk,
}: {
  compiled?: CompiledExperience;
  envelope: CompositionEnvelope | null;
  query: string;
  taskIntent?: GenuiTaskIntent;
  validationOk?: boolean;
}): ComposeResultMetadata => {
  const base: ComposeResultMetadata = {
    taskIntent: taskIntent ?? classifyTaskIntent(query),
    validationOutcome: validationOk === false ? "failed" : "ok",
  };
  if (!envelope) return base;

  const resolved = compiled ?? compileCompositionEnvelope({ envelope });
  if (!resolved.ok) {
    return { ...base, validationOutcome: "failed" };
  }

  const experience = resolved.experience;
  const composite = resolved.composite ?? undefined;
  const domain =
    typeof resolved.props.domain === "string"
      ? resolved.props.domain
      : undefined;

  let projectCount: number | undefined;
  let mediaBacked: number | undefined;
  if (
    experience === "ProjectExperience" &&
    Array.isArray(resolved.props.projectIds)
  ) {
    const ids = resolved.props.projectIds.map(String);
    projectCount = ids.length;
    mediaBacked = mediaBackedProjectCount(projectsFromPublicIds(ids));
  }

  return {
    ...base,
    taskCoverage: assessTaskCoverage(planTasks(query), resolved),
    composite,
    domain,
    experience,
    mediaBackedProjectCount: mediaBacked,
    projectCount,
  };
};
