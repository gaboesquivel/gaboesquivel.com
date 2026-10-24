import { siteOrigin } from "lib/site-path";

import { executeCatalogOperation } from "./catalog-operation";
import type { CatalogExecution } from "./catalog-operation";
import { postRecord, profileRecord, publishedPosts } from "./content-records";
import type { PublicRecord } from "./envelope";
import { namedProjectsInText } from "./named-projects";
import { cvPublicRecord } from "./public-records";
import {
  classifyTaskIntent,
  wantsBooking,
  wantsCareerTimeline,
  wantsContactForm,
  wantsCv,
  wantsWritingBrowse,
} from "./task-intent";
import type { PlannedTask } from "./task-plan";
import { planTasks } from "./task-plan";

const supportedTypeScriptFilter = (query: string) =>
  /\btypescript\b/i.test(query) &&
  /\bonly\b/i.test(query) &&
  /\bprojects?\b/i.test(query) &&
  namedProjectsInText({ text: query }).length === 0 &&
  !/\b(excluding|except|without|and|also|plus|then|compare|explain|describe|count|how many)\b/i.test(
    query
  );

const simpleTask = (task: PlannedTask) =>
  task.unsupported.length === 0 &&
  task.ambiguous.length === 0 &&
  task.filter.unresolved.length === 0 &&
  task.filter.technologies.length === 0 &&
  task.filter.excludeTechnologies.length === 0 &&
  task.filter.excludeDomains.length === 0 &&
  task.filter.excludeProjectIds.length === 0 &&
  !task.filter.excludeWeb3Family &&
  task.filter.types.length === 0 &&
  task.filter.limit === undefined &&
  task.filter.domains.length <= 1 &&
  task.filter.namedProjectIds.length <= 1 &&
  task.kind !== "count" &&
  task.kind !== "compare" &&
  task.kind !== "explain";

const existingRouterCovers = ({
  query,
  task,
}: {
  query: string;
  task: PlannedTask;
}) => {
  if (supportedTypeScriptFilter(query)) return true;
  if (task.kind === "booking") return wantsBooking(query);
  if (task.kind === "contact") {
    return wantsContactForm(query) || classifyTaskIntent(query) === "contact";
  }
  if (task.kind === "timeline") return wantsCareerTimeline(query);
  if (task.kind === "cv") return wantsCv(query);
  if (task.kind === "writing") return wantsWritingBrowse(query);
  if (task.kind === "projects") return true;
  return false;
};

export const buildRequestPlan = (query: string) => {
  const tasks = planTasks(query);
  const fastPath =
    tasks.length === 0 ||
    (tasks.length === 1 &&
      tasks[0] &&
      simpleTask(tasks[0]) &&
      existingRouterCovers({ query, task: tasks[0] }));
  const needsSemanticPlanning = tasks.some(
    (task) => task.kind === "explain" && !task.closedLimitation
  );
  const namedProjectIds = [
    ...new Set(tasks.flatMap((task) => task.filter.namedProjectIds)),
  ];
  return {
    catalogOperation: fastPath ? executeCatalogOperation(query) : null,
    clauses: tasks.map((task) => task.purpose),
    constraints: tasks
      .filter(
        (task) =>
          task.filter.limit !== undefined ||
          task.filter.excludeProjectIds.length > 0 ||
          task.filter.excludeTechnologies.length > 0 ||
          task.filter.excludeWeb3Family ||
          task.filter.technologies.length > 0 ||
          task.filter.unresolved.length > 0
      )
      .map((task) => task.purpose),
    disposition: fastPath ? ("fast-path" as const) : ("compose" as const),
    namedProjectIds,
    needsSemanticPlanning,
    originalRequestAuthoritative: true as const,
    query,
    requiresSynthesis: !fastPath,
    tasks,
  };
};

export type RequestPlan = ReturnType<typeof buildRequestPlan>;

const taskRecords = (task: PlannedTask): PublicRecord[] => {
  if (task.kind === "cv") return [cvPublicRecord()];
  if (task.kind === "contact") {
    return [
      profileRecord({
        id: "/contact",
        title: "Contact",
        url: `${siteOrigin}/contact`,
      }),
    ];
  }
  if (task.kind === "writing") {
    return publishedPosts().slice(0, 4).map(postRecord);
  }
  return task.filter.namedProjectIds.flatMap((id) => {
    const record = namedProjectsInText({
      text: id.replace("/project/", "").replace(/-/g, " "),
    })[0];
    if (!record) return [];
    return [
      {
        description: record.description,
        id: `/project/${record.slug}`,
        kind: "project" as const,
        slug: record.slug,
        title: record.title,
        url: `/project/${record.slug}`,
      },
    ];
  });
};

/** Named entities and task records. The full catalog is not copied into the prompt. */
export const retrievePlanEvidence = (plan: RequestPlan): PublicRecord[] => {
  const records = plan.tasks.flatMap(taskRecords);
  return [
    ...new Map(records.map((record) => [record.id, record])).values(),
  ].slice(0, 12);
};

export const executionSummary = (execution: CatalogExecution) => ({
  displayedCount: execution.displayedCount,
  displayedIds: execution.displayedIds.slice(0, 12),
  exclusion: execution.exclusion,
  matchedCount: execution.matchedCount,
  omittedIds: execution.omittedIds.slice(0, 12),
  operationType: execution.operationType,
  scope: execution.scope,
  systemOfRecord: execution.systemOfRecord,
  unresolved: execution.unresolved,
});
