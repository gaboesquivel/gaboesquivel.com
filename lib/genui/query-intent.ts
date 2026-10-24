import { projects } from "gaboesquivel";
import { siteOrigin } from "lib/site-path";

import {
  answerDocument,
  bookingDocument,
  capabilityShowcaseDocument,
  projectDocument,
  stackDocument,
  writingDocument,
} from "./builders";
import { chooseWritingComposite } from "./composites";
import {
  isCompoundComposeQuery,
  parseComposeSections,
} from "./compound-intent";
import { postRecord, profileRecord, publishedPosts } from "./content-records";
import { openUiStringList, openUiStringLiteral } from "./contract/serialize";
import { composeCuratedDocument } from "./curated-responses";
import { domainFromQuery } from "./domain-from-query";
import type { CompositionEnvelope } from "./envelope";
import { explainExperienceDocument } from "./explain-experience";
import { normalizeGenuiQuery } from "./normalize-query";
import { orderBrowseProjects } from "./project-browse";
import type { GenuiProjectDomain } from "./project-domain";
import { filterProjectsByDomain } from "./project-domain";
import { projectsMatchingQuery } from "./project-query-match";
import { projectToPublicRecord } from "./public-records";
import {
  composeSectionsDocument,
  browseProjectsEnvelope,
} from "./section-compose";
import {
  selectProjectComposition,
  splitLeadAndRemainderProjects,
} from "./select-project-composition";
import {
  classifyTaskIntent,
  wantsArchitectureIntent,
  wantsBooking,
  wantsBrowseProjects,
  wantsProjectsLanguage,
  wantsWritingBrowse,
} from "./task-intent";
import { writingCategoryFromText } from "./writing-category";

const isOutOfScopeRealtime = (query: string) =>
  /\b(weather|temperature)\b.*\b(right now|today|currently)\b/i.test(query) ||
  /\b(bitcoin|btc|eth|stock price|trading at)\b.*\b(right now|today|currently)\b/i.test(
    query
  );

const isAdversarialOrUnsafe = (query: string) =>
  /<script|javascript:|\.env\b|system prompt|ignore (all )?previous|pretend you|private (project )?notes|invoke every|without (any )?confirmation|without asking/i.test(
    query
  ) ||
  /^abc xyz qwerty$/i.test(normalizeGenuiQuery(query)) ||
  /\bbook me tomorrow\b/i.test(query);

const isEmptyIntentNoise = (query: string) =>
  normalizeGenuiQuery(query) === "ai";

const wantsQuantum = (query: string) => /\bquantum computing\b/i.test(query);

const wantsTypeScriptOnly = (query: string) =>
  /\btypescript\b/i.test(query) &&
  /\bonly\b/i.test(query) &&
  wantsProjectsLanguage(query);

const wantsCompensation = (query: string) =>
  /\bcompensation\b/i.test(query) && /\baccept\b/i.test(query);

const wantsUnpublished = (query: string) =>
  /\bnever published\b/i.test(query) ||
  /\bhaven't announced\b/i.test(query) ||
  /\bhave not announced\b/i.test(query);

const wantsFabrication = (query: string) =>
  /\beven if you only have\b/i.test(query) ||
  /\bfive ai projects\b/i.test(query);

export const browseProjectsDocument = ({
  domain,
  requestId,
}: {
  domain: GenuiProjectDomain;
  requestId: string;
}) => browseProjectsEnvelope({ domain, requestId });

export const composeIntentDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}): CompositionEnvelope | null => {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const taskIntent = classifyTaskIntent(trimmed);

  if (isAdversarialOrUnsafe(trimmed) || isOutOfScopeRealtime(trimmed)) {
    const body = isOutOfScopeRealtime(trimmed)
      ? "I do not have live weather or market data on this site. Browse /work, /cv, or /contact for published work and ways to reach me."
      : "I can only use published site content and approved flows here. Browse /work, /cv, or /contact, or use the contact and booking forms when you are ready.";
    return answerDocument({
      body,
      records: [],
      requestId,
      sourceIds: [],
    });
  }

  if (isEmptyIntentNoise(trimmed)) {
    return answerDocument({
      body: "Your message was very short. Try asking about AI or Web3 projects, latest writing, my CV, booking a call, or sending a note.",
      records: [],
      requestId,
      sourceIds: [],
    });
  }

  const curated = composeCuratedDocument({ query: trimmed, requestId });
  if (curated) return curated;

  if (wantsQuantum(trimmed)) {
    return answerDocument({
      body: "No published quantum computing projects are listed on this site. Browse /work for the full public portfolio.",
      records: [],
      requestId,
      sourceIds: [],
    });
  }

  if (wantsUnpublished(trimmed) || wantsFabrication(trimmed)) {
    return answerDocument({
      body: "I only share published projects and writing from this site. I will not invent or disclose unpublished work.",
      records: [],
      requestId,
      sourceIds: [],
    });
  }

  if (wantsTypeScriptOnly(trimmed)) {
    const matched = projects.filter((project) =>
      project.tech.some((tag) => tag.toLowerCase().includes("typescript"))
    );
    if (!matched.length) {
      return answerDocument({
        body: "No projects with verified TypeScript metadata matched that filter. Browse /work for the public catalog.",
        records: [],
        requestId,
        sourceIds: [],
      });
    }
    const records = matched.map(projectToPublicRecord);
    const projectIds = records.map((record) => record.id);
    const ordered = orderBrowseProjects({ domain: "all", projects: matched });
    const { lead, leadComposite, remainder } =
      splitLeadAndRemainderProjects(ordered);
    if (!remainder.length) {
      return projectDocument({
        composite: selectProjectComposition({
          intent: "browse-projects",
          projects: ordered,
        }),
        projectIds,
        records,
        requestId,
      });
    }
    const leadRecords = lead.map(projectToPublicRecord);
    const leadIds = leadRecords.map((record) => record.id);
    const remainderRecords = remainder.map(projectToPublicRecord);
    const remainderIds = remainderRecords.map((record) => record.id);
    return stackDocument({
      childExpressions: [
        `ProjectExperience(${openUiStringLiteral(leadComposite)}, ${openUiStringList(leadIds)})`,
        `ProjectExperience(${openUiStringLiteral("project-compact-list")}, ${openUiStringList(remainderIds)})`,
      ],
      fallbackText: "TypeScript projects",
      records: [...leadRecords, ...remainderRecords],
      requestId,
    });
  }

  const named = projectsMatchingQuery(trimmed)[0];
  if (
    named &&
    (taskIntent === "project-detail" ||
      /\b(show|tell|about)\b/i.test(trimmed)) &&
    !isCompoundComposeQuery(trimmed)
  ) {
    const record = projectToPublicRecord(named);
    return projectDocument({
      composite: "case-study",
      projectIds: [record.id],
      records: [record],
      requestId,
    });
  }

  const sections = parseComposeSections(trimmed);
  const onlyExplainExperience =
    sections.length === 1 && sections[0]?.type === "explain-experience";
  if (sections.length >= 1 && !onlyExplainExperience) {
    const sectionDoc = composeSectionsDocument({ requestId, sections });
    if (sectionDoc) return sectionDoc;
  }

  if (wantsCompensation(trimmed)) {
    const contact = profileRecord({
      id: "/contact",
      title: "Contact",
      url: `${siteOrigin}/contact`,
    });
    return answerDocument({
      body: "Compensation is not listed publicly on this site. Use the contact or booking flow if you want to discuss a role or engagement.",
      records: [contact],
      requestId,
      sourceIds: [contact.id],
    });
  }

  if (taskIntent === "explain-experience") {
    return explainExperienceDocument({ query: trimmed, requestId });
  }

  if (taskIntent === "profile") {
    return null;
  }

  if (taskIntent === "compare-projects") {
    const compared = projectsMatchingQuery(trimmed).slice(0, 3);
    if (compared.length >= 2 && compared.length <= 3) {
      const records = compared.map(projectToPublicRecord);
      const projectIds = records.map((record) => record.id);
      const composite = selectProjectComposition({
        intent: "compare-projects",
        projects: compared,
      });
      const domain = domainFromQuery(trimmed);
      return projectDocument({
        composite,
        domain: domain === "ai" || domain === "web3" ? domain : undefined,
        projectIds,
        records,
        requestId,
      });
    }
    return null;
  }

  if (
    /\b(discuss a project|availability and booking)\b/i.test(trimmed) &&
    wantsBooking(trimmed)
  ) {
    return bookingDocument({
      records: [
        profileRecord({
          title: "Book a call",
          url: `${siteOrigin}/contact`,
        }),
      ],
      requestId,
    });
  }

  if (
    taskIntent === "explain-architecture" ||
    wantsArchitectureIntent(trimmed)
  ) {
    const domain = domainFromQuery(trimmed) ?? "ai";
    if (domain === "ai" || domain === "web3") {
      const filtered = filterProjectsByDomain({ domain });
      if (filtered.length) {
        const ordered = orderBrowseProjects({ domain, projects: filtered });
        const records = ordered.map(projectToPublicRecord);
        const projectIds = records.map((record) => record.id);
        return capabilityShowcaseDocument({
          domain,
          projectIds,
          records,
          requestId,
        });
      }
    }
    return null;
  }

  const domain = domainFromQuery(trimmed);
  if (
    domain &&
    (taskIntent === "browse-projects" || wantsBrowseProjects(trimmed))
  ) {
    return browseProjectsDocument({
      domain,
      requestId,
    });
  }

  if (wantsWritingBrowse(trimmed)) {
    const category = writingCategoryFromText(trimmed);
    const posts = publishedPosts().filter((post) =>
      category
        ? (post.category ?? []).some((item) => item.toLowerCase() === category)
        : true
    );
    const limit = /\blatest blog post\b/i.test(trimmed) ? 1 : 6;
    const slice = posts.slice(0, limit);
    if (slice.length) {
      const records = slice.map(postRecord);
      const postIds = records.map((record) => record.id);
      const featured = publishedPosts()[0];
      return writingDocument({
        composite: chooseWritingComposite({
          featuredSlug: featured?.slug,
          leadPostId: postIds[0],
        }),
        postIds,
        records,
        requestId,
      });
    }
  }

  return null;
};
