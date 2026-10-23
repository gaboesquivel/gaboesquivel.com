import { setTimeout as sleep } from "node:timers/promises";

import type { GenuiTaskIntent } from "./task-intent";

export interface JevDecision {
  domain?: string;
  domainConfidence?: number;
  intents: string[];
  needsSynthesis: boolean;
  taskIntent?: GenuiTaskIntent;
  taskIntentConfidence?: number;
}

const YES = 0.82;
const NO = 0.18;

export const thresholds = { domain: YES, no: NO, yes: YES };

export const decisionFromScores = ({
  domain,
  domainConfidence,
  intent,
  intentProbability,
  taskIntent,
  taskIntentConfidence,
}: {
  domain?: string;
  domainConfidence?: number;
  intent: string;
  intentProbability: number;
  taskIntent?: GenuiTaskIntent;
  taskIntentConfidence?: number;
}): JevDecision => {
  if (intentProbability <= NO || intentProbability >= YES) {
    const selected = intentProbability >= YES ? [intent] : ([] as string[]);
    const domainOk =
      !domain || (domainConfidence !== undefined && domainConfidence >= YES);
    const taskOk =
      !taskIntent ||
      (taskIntentConfidence !== undefined && taskIntentConfidence >= YES);
    return {
      domain,
      domainConfidence,
      intents: selected,
      needsSynthesis: !domainOk || !taskOk || selected.length === 0,
      taskIntent:
        taskOk &&
        taskIntentConfidence !== undefined &&
        taskIntentConfidence >= YES
          ? taskIntent
          : undefined,
      taskIntentConfidence,
    };
  }
  return {
    domain,
    domainConfidence,
    intents: [],
    needsSynthesis: true,
    taskIntent,
    taskIntentConfidence,
  };
};

const JEV_DEADLINE_MS = 2000;

const withDeadline = async <T>({
  fallback,
  ms,
  task,
}: {
  fallback: T;
  ms: number;
  task: () => Promise<T>;
}) => Promise.race([task(), sleep(ms).then(() => fallback)]);

export const evaluateWithJev = async ({
  query,
  signal,
}: {
  query: string;
  signal?: AbortSignal;
}): Promise<JevDecision | null> => {
  if (!process.env.TYPESAFE_API_KEY?.trim()) return null;
  if (signal?.aborted) return null;
  try {
    const { TypeSafeClient, choice, noul } = await import("@typesafe-ai/sdk");
    const client = new TypeSafeClient();
    const response = await withDeadline({
      fallback: null,
      ms: JEV_DEADLINE_MS,
      task: async () =>
        client.systemOne({
          questions: {
            domain: choice("Which domain fits best?", {
              ai: null,
              contact: null,
              cv: null,
              projects: null,
              writing: null,
            }),
            taskArchitecture: noul(
              "Is the visitor asking to inspect architecture or a system diagram?"
            ),
            taskBrowseProjects: noul(
              "Is the visitor asking to browse or list shipped projects?"
            ),
            taskExplain: noul(
              "Is the visitor asking for an evidence-backed explanation of experience?"
            ),
          },
          state: { query },
        }),
    });
    if (!response) return null;
    const browse = response.answers.taskBrowseProjects?.noul ?? 0;
    const explain = response.answers.taskExplain?.noul ?? 0;
    const architecture = response.answers.taskArchitecture?.noul ?? 0;
    const domain = response.answers.domain?.choice ?? undefined;
    const domainConfidence = response.answers.domain?.confidence;

    let taskIntent: GenuiTaskIntent = "unknown";
    let taskIntentConfidence = browse;
    let legacyIntent = "projects";
    let legacyProbability = browse;

    if (
      architecture >= browse &&
      architecture >= explain &&
      architecture >= YES
    ) {
      taskIntent = "explain-architecture";
      taskIntentConfidence = architecture;
      legacyIntent = "architecture";
      legacyProbability = architecture;
    } else if (explain >= browse && explain >= YES) {
      taskIntent = "explain-experience";
      taskIntentConfidence = explain;
      legacyIntent = "explain";
      legacyProbability = explain;
    } else if (browse >= YES) {
      taskIntent = "browse-projects";
      taskIntentConfidence = browse;
      legacyIntent = "projects";
      legacyProbability = browse;
    }

    return decisionFromScores({
      domain,
      domainConfidence,
      intent: legacyIntent,
      intentProbability: legacyProbability,
      taskIntent,
      taskIntentConfidence,
    });
  } catch {
    return null;
  }
};
