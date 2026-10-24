import { evidenceAnswerDocument } from "./builders";
import type { CompositionEnvelope } from "./envelope";
import { orderBrowseProjects } from "./project-browse";
import { filterProjectsByDomain } from "./project-domain";
import { projectToPublicRecord } from "./public-records";
import { selectProjectComposition } from "./select-project-composition";

const agentExperienceBody =
  "Production AI assistants on this site include LegalAgent (voice and chat for legal workflows) and Masterbots (domain-specific assistant interfaces). Bitlauncher adds AI-assisted research in a crypto launchpad context. Evidence below is limited to published case studies.";

export const explainExperienceDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}): CompositionEnvelope | null => {
  if (!/\b(ai agent|ai agents|agentic|experience building)\b/i.test(query)) {
    return null;
  }
  const domain = "ai";
  const ordered = orderBrowseProjects({
    domain,
    projects: filterProjectsByDomain({ domain }),
  });
  const records = ordered.map(projectToPublicRecord);
  const projectIds = records.map((record) => record.id);
  const composite = selectProjectComposition({
    intent: "explain-experience",
    projects: ordered,
  });
  return evidenceAnswerDocument({
    body: agentExperienceBody,
    composite,
    domain,
    projectIds,
    records,
    requestId,
    sourceIds: projectIds.slice(0, 2),
  });
};
