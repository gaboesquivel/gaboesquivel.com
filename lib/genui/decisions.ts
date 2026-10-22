export interface JevDecision {
  domain?: string;
  domainConfidence?: number;
  intents: string[];
  needsSynthesis: boolean;
}

const YES = 0.82;
const NO = 0.18;

export const thresholds = { domain: YES, no: NO, yes: YES };

export const decisionFromScores = ({
  domain,
  domainConfidence,
  intent,
  intentProbability,
}: {
  domain?: string;
  domainConfidence?: number;
  intent: string;
  intentProbability: number;
}): JevDecision => {
  if (intentProbability <= NO || intentProbability >= YES) {
    const selected = intentProbability >= YES ? [intent] : ([] as string[]);
    const domainOk =
      !domain || (domainConfidence !== undefined && domainConfidence >= YES);
    return {
      domain,
      domainConfidence,
      intents: selected,
      needsSynthesis: !domainOk || selected.length === 0,
    };
  }
  return {
    domain,
    domainConfidence,
    intents: [],
    needsSynthesis: true,
  };
};

export const evaluateWithJev = async ({
  query,
}: {
  query: string;
}): Promise<JevDecision | null> => {
  if (!process.env.TYPESAFE_API_KEY?.trim()) return null;
  try {
    const { TypeSafeClient, choice, noul } = await import("@typesafe-ai/sdk");
    const client = new TypeSafeClient();
    const response = await client.systemOne({
      questions: {
        domain: choice("Which domain fits best?", {
          ai: null,
          contact: null,
          cv: null,
          projects: null,
          writing: null,
        }),
        wantsProjects: noul("Is the visitor asking about shipped projects?"),
      },
      state: { query },
    });
    const projects = response.answers.wantsProjects?.noul ?? 0;
    const domain = response.answers.domain?.choice ?? undefined;
    const domainConfidence = response.answers.domain?.confidence;
    return decisionFromScores({
      domain,
      domainConfidence,
      intent: "projects",
      intentProbability: projects,
    });
  } catch {
    return null;
  }
};
