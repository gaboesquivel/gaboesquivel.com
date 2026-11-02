import {
  childExpressionsFromOpenUi,
  evidenceAnswerDocument,
  stackDocument,
} from "./builders";
import { parseComposeSections } from "./compound-intent";
import { openUiStringList, openUiStringLiteral } from "./contract/serialize";
import type { CompositionEnvelope } from "./envelope";
import { normalizeGenuiQuery } from "./normalize-query";
import { orderBrowseProjects } from "./project-browse";
import { filterProjectsByDomain } from "./project-domain";
import { projectToPublicRecord } from "./public-records";
import { curatedGenuiQuerySuggestions } from "./query-suggestions";
import {
  browseProjectsEnvelope,
  exploreWorkEnvelope,
  sectionToEnvelope,
} from "./section-compose";
import {
  selectProjectComposition,
  splitLeadAndRemainderProjects,
} from "./select-project-composition";

const labelToCanonical = () => {
  const map = new Map<string, string>();
  for (const item of curatedGenuiQuerySuggestions) {
    map.set(normalizeGenuiQuery(item.label), normalizeGenuiQuery(item.query));
    map.set(normalizeGenuiQuery(item.query), normalizeGenuiQuery(item.query));
  }
  return map;
};

const canonicalKeys = labelToCanonical();

export const resolveCuratedQueryKey = (query: string) =>
  canonicalKeys.get(normalizeGenuiQuery(query)) ?? null;

const aiProjectsIntro =
  "LegalAgent and Masterbots are shipped AI products; Wizard World was a hackathon experiment, not a product line.";

const fintechIntro =
  "Yes—Wink is Costa Rica's first neobank in the public portfolio. I was Lead Engineer on the React Native app and AWS backend, including partner-bank integrations and biometric KYC.";

const web3Intro =
  "These Web3 projects span wallets, marketplaces, and chain infrastructure. Case studies below are grouped from the public catalog—wallets and consumer apps are labeled in each project's summary.";

export const composeCuratedDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}): CompositionEnvelope | null => {
  const key = resolveCuratedQueryKey(query);
  if (!key) return null;

  const compound = parseComposeSections(query);
  if (compound.length > 1) {
    return null;
  }

  if (key === "show me your ai projects") {
    const domain = "ai";
    const ordered = orderBrowseProjects({
      domain,
      projects: filterProjectsByDomain({ domain }),
    });
    const records = ordered.map(projectToPublicRecord);
    const projectIds = records.map((record) => record.id);
    const composite = selectProjectComposition({
      intent: "browse-projects",
      projects: ordered,
    });
    return evidenceAnswerDocument({
      body: aiProjectsIntro,
      composite,
      domain,
      projectIds,
      records,
      requestId,
      sourceIds: projectIds.slice(0, 2),
    });
  }

  if (key === "show me your fintech work") {
    const domain = "fintech";
    const ordered = orderBrowseProjects({
      domain,
      projects: filterProjectsByDomain({ domain }),
    });
    const records = ordered.map(projectToPublicRecord);
    const projectIds = records.map((record) => record.id);
    const composite = selectProjectComposition({
      intent: "project-detail",
      projects: ordered,
    });
    return evidenceAnswerDocument({
      body: fintechIntro,
      composite,
      projectIds,
      records,
      requestId,
      sourceIds: projectIds,
    });
  }

  if (key === "show me your web3 projects") {
    const envelope = browseProjectsEnvelope({ domain: "web3", requestId });
    if (!envelope) return null;
    const ordered = orderBrowseProjects({
      domain: "web3",
      projects: filterProjectsByDomain({ domain: "web3" }),
    });
    const records = ordered.map(projectToPublicRecord);
    const { lead, leadComposite, remainder } =
      splitLeadAndRemainderProjects(ordered);
    const leadIds = lead.map((p) => `/project/${p.slug}`);
    if (!remainder.length) {
      return stackDocument({
        childExpressions: [
          `Answer(${openUiStringLiteral(web3Intro)}, ${openUiStringList(leadIds.slice(0, 3))})`,
          childExpressionsFromOpenUi(envelope.openuiText)[0] ?? "",
        ],
        fallbackText: web3Intro,
        records,
        requestId,
      });
    }
    const remainderIds = remainder.map((p) => `/project/${p.slug}`);
    return stackDocument({
      childExpressions: [
        `Answer(${openUiStringLiteral(web3Intro)}, ${openUiStringList(leadIds.slice(0, 3))})`,
        `ProjectExperience(${openUiStringLiteral(leadComposite)}, ${openUiStringList(leadIds)}, ${openUiStringLiteral("web3")})`,
        `ProjectExperience(${openUiStringLiteral("project-compact-list")}, ${openUiStringList(remainderIds)}, ${openUiStringLiteral("web3")})`,
      ],
      fallbackText: web3Intro,
      records,
      requestId,
    });
  }

  if (key === "explore my work") {
    return exploreWorkEnvelope({ requestId });
  }

  if (key === "show me your career timeline") {
    return sectionToEnvelope({
      requestId,
      section: { type: "timeline" },
    });
  }

  if (key === "download cv") {
    return sectionToEnvelope({ requestId, section: { type: "cv" } });
  }

  if (key === "how could we work together") {
    return sectionToEnvelope({ requestId, section: { type: "engagement" } });
  }

  if (key === "book a call") {
    return sectionToEnvelope({ requestId, section: { type: "booking" } });
  }

  if (key === "send email") {
    return sectionToEnvelope({ requestId, section: { type: "contact" } });
  }

  return null;
};
