import type { CatalogExecution } from "./catalog-operation";
import { compileCompositionEnvelope } from "./contract/compiler";
import type { CompiledExperience } from "./contract/errors";
import type { CompositionEnvelope } from "./envelope";
import { projectsFromPublicIds } from "./project-from-id";
import { mediaBackedProjectCount } from "./select-project-composition";
import type { GenuiTaskIntent } from "./task-intent";
import { classifyTaskIntent } from "./task-intent";
import { assessTaskCoverage, planTasks } from "./task-plan";
import type { PlannedTask } from "./task-plan";

export interface ComposeResultMetadata {
  catalogOperationTypes?: string[];
  composite?: string;
  displayedCount?: number;
  domain?: string;
  experience?: string;
  matchedCount?: number;
  mediaBackedProjectCount?: number;
  planningPath?: "deterministic" | "semantic" | "fast-path";
  projectCount?: number;
  recoveryReason?: string;
  taskCount?: number;
  taskCoverage?: ReturnType<typeof assessTaskCoverage>;
  taskIntent?: GenuiTaskIntent;
  taskStatuses?: string[];
  validationOutcome?: "ok" | "failed";
}

export const metadataFromEnvelope = ({
  compiled,
  envelope,
  executions = [],
  planningPath,
  query,
  recoveryReason,
  taskCount,
  taskIntent,
  tasks,
  validationOk,
}: {
  compiled?: CompiledExperience;
  envelope: CompositionEnvelope | null;
  executions?: CatalogExecution[];
  planningPath?: ComposeResultMetadata["planningPath"];
  query: string;
  recoveryReason?: string;
  taskCount?: number;
  taskIntent?: GenuiTaskIntent;
  tasks?: PlannedTask[];
  validationOk?: boolean;
}): ComposeResultMetadata => {
  const base: ComposeResultMetadata = {
    catalogOperationTypes: executions.map(
      (execution) => execution.operationType
    ),
    displayedCount: executions.reduce(
      (sum, execution) => sum + execution.displayedCount,
      0
    ),
    matchedCount: executions.reduce(
      (sum, execution) => sum + execution.matchedCount,
      0
    ),
    planningPath,
    recoveryReason,
    taskCount,
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

  const taskCoverage = assessTaskCoverage(tasks ?? planTasks(query), resolved);
  return {
    ...base,
    composite,
    domain,
    experience,
    mediaBackedProjectCount: mediaBacked,
    projectCount,
    taskCoverage,
    taskStatuses: taskCoverage.map((task) => task.status),
  };
};
