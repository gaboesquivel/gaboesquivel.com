import { getProjectBySlug, projects } from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";

import { cvDownloadPayload } from "../connect/cv-download";
import {
  answerDocument,
  bookingDocument,
  capabilityShowcaseDocument,
  contactDocument,
  cvDocument,
  projectDocument,
  writingDocument,
} from "./builders";
import { chooseProjectComposite, chooseWritingComposite } from "./composites";
import type { CompositionEnvelope, PublicRecord } from "./envelope";

const normalize = (query: string) =>
  query.trim().toLowerCase().replace(/\s+/g, " ");

const profileRecord = ({
  id = "profile",
  title,
  url,
}: {
  id?: string;
  title: string;
  url: string;
}): PublicRecord => ({
  id,
  kind: "profile",
  title,
  url,
});

const projectRecord = (project: (typeof projects)[number]): PublicRecord => ({
  description: project.description,
  id: `/project/${project.slug}`,
  kind: "project",
  slug: project.slug,
  title: project.title,
  url: `${siteOrigin}/project/${project.slug}`,
});

const postRecord = (post: (typeof allBlogs)[number]): PublicRecord => ({
  excerpt: post.summary ?? "",
  id: `/blog/${post.slug}`,
  kind: "post",
  publishedAt: post.publishedAt,
  slug: post.slug,
  title: post.title,
  url: `${siteOrigin}/blog/${post.slug}`,
});

const publishedPosts = () =>
  allBlogs
    .filter((post) => post.publishedAt >= "2020")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const filterProjectsByDomain = (domain: "ai" | "web3" | "all") => {
  if (domain === "all") return [...projects];
  if (domain === "ai" || domain === "web3") {
    return projects.filter((project) => project.type.includes(domain));
  }
  return [];
};

const findProjectByName = (query: string) => {
  const normalized = normalize(query);
  return projects.find(
    (project) =>
      normalized.includes(project.slug.replace(/-/g, " ")) ||
      normalized.includes(project.title.toLowerCase()) ||
      normalized.includes(project.slug)
  );
};

const wantsCv = (query: string) =>
  /\b(cv|curriculum|curr[ií]culum|r[eé]sum[eé]|resume)\b/i.test(query);

const wantsBooking = (query: string) =>
  (/\b(book|booking|schedule|agendar|reservar)\b/i.test(query) &&
    /\b(meeting|call|llamada|cita|intro|availability|booking)\b/i.test(
      query
    )) ||
  /\bbook me\b/i.test(query);

const wantsContact = (query: string) =>
  /\b(contact|reach|touch|inquir|inquiry|hire|contrat|contatt)/i.test(query) ||
  /how can i contact/i.test(query) ||
  /project inquiry/i.test(query) ||
  /senior typescript engineer/i.test(query) ||
  /vorrei contatt/i.test(query);

const wantsWriting = (query: string) =>
  /\b(article|articles|blog|post|posts|writing|publication)\b/i.test(query) ||
  /\blatest\b/i.test(query);

const wantsProjects = (query: string) =>
  /\b(project|projects|work|portfolio|built)\b/i.test(query);

const domainFromQuery = (query: string): "ai" | "web3" | "all" | null => {
  if (
    /\b(web3|blockchain|wallet|smart contract|onchain|on-chain)\b/i.test(query)
  )
    return "web3";
  if (
    /\b(ai|artificial intelligence|agent|agentic|inteligencia artificial|proyectos de inteligencia)\b/i.test(
      query
    )
  )
    return "ai";
  if (
    /\b(all your work|show me all|all projects|todo(s)? (tu )?trabajo)\b/i.test(
      query
    )
  )
    return "all";
  return null;
};

const writingDomainFromQuery = (query: string) => {
  if (/\bweb3\b/i.test(query)) return "web3";
  if (/\b(ai|generative interface|genui|mcp app|declarative ui)\b/i.test(query))
    return "ai";
  return null;
};

const isOutOfScopeRealtime = (query: string) =>
  /\b(weather|temperature)\b.*\b(right now|today|currently)\b/i.test(query) ||
  /\b(bitcoin|btc|eth|stock price|trading at)\b.*\b(right now|today|currently)\b/i.test(
    query
  );

const isAdversarialOrUnsafe = (query: string) =>
  /<script|javascript:|\.env\b|system prompt|ignore (all )?previous|pretend you|private (project )?notes|invoke every|without (any )?confirmation|without asking/i.test(
    query
  ) ||
  /^abc xyz qwerty$/i.test(normalize(query)) ||
  /\bbook me tomorrow\b/i.test(query);

const isEmptyIntentNoise = (query: string) => normalize(query) === "ai";

const wantsQuantum = (query: string) => /\bquantum computing\b/i.test(query);

const wantsTypeScriptOnly = (query: string) =>
  /\btypescript\b/i.test(query) &&
  /\bonly\b/i.test(query) &&
  wantsProjects(query);

const wantsCompensation = (query: string) =>
  /\bcompensation\b/i.test(query) && /\baccept\b/i.test(query);

const wantsUnpublished = (query: string) =>
  /\bnever published\b/i.test(query) ||
  /\bhaven't announced\b/i.test(query) ||
  /\bhave not announced\b/i.test(query);

const wantsFabrication = (query: string) =>
  /\beven if you only have\b/i.test(query) ||
  /\bfive ai projects\b/i.test(query);

export const composeIntentDocument = ({
  query,
  requestId,
}: {
  query: string;
  requestId: string;
}): CompositionEnvelope | null => {
  const trimmed = query.trim();
  if (!trimmed) return null;

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

  if (wantsUnpublished(trimmed) || wantsFabrication(trimmed)) {
    return answerDocument({
      body: "I only share published projects and writing from this site. I will not invent or disclose unpublished work.",
      records: [],
      requestId,
      sourceIds: [],
    });
  }

  if (wantsCv(trimmed)) {
    const payload = cvDownloadPayload();
    const record: PublicRecord = {
      id: "/cv",
      kind: "cv",
      pdfUrl: payload.pdfUrl,
      title: payload.title,
      url: payload.pageUrl,
      variant: payload.variant,
    };
    return cvDocument({ record, requestId });
  }

  if (wantsBooking(trimmed)) {
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
    wantsContact(trimmed) &&
    (!wantsProjects(trimmed) || /\binquiry\b/i.test(trimmed))
  ) {
    return contactDocument({
      records: [
        profileRecord({
          title: "Contact",
          url: `${siteOrigin}/contact`,
        }),
      ],
      requestId,
    });
  }

  const named = findProjectByName(trimmed);
  if (named && /\b(show|tell|about|project)\b/i.test(trimmed)) {
    const record = projectRecord(named);
    return projectDocument({
      composite: "case-study",
      projectIds: [record.id],
      records: [record],
      requestId,
    });
  }

  if (wantsQuantum(trimmed)) {
    return answerDocument({
      body: "No published quantum computing projects are listed on this site. Browse /work for the full public portfolio.",
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
    const records = matched.map(projectRecord);
    const projectIds = records.map((record) => record.id);
    return projectDocument({
      composite: chooseProjectComposite({ projectIds }),
      projectIds,
      records,
      requestId,
    });
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
    /\b(muestra|muéstrame|mostre)\b/i.test(trimmed) &&
    domainFromQuery(trimmed) === "ai"
  ) {
    const filtered = filterProjectsByDomain("ai");
    if (filtered.length) {
      const records = filtered.map(projectRecord);
      const projectIds = records.map((record) => record.id);
      return capabilityShowcaseDocument({
        domain: "ai",
        projectIds,
        records,
        requestId,
      });
    }
  }

  const domain = domainFromQuery(trimmed);
  if (domain && (wantsProjects(trimmed) || /\bproyectos\b/i.test(trimmed))) {
    const filtered = filterProjectsByDomain(domain);
    if (filtered.length) {
      const records = filtered.map(projectRecord);
      const projectIds = records.map((record) => record.id);
      if (domain === "ai" || domain === "web3") {
        return capabilityShowcaseDocument({
          domain,
          projectIds,
          records,
          requestId,
        });
      }
      return projectDocument({
        composite: chooseProjectComposite({ projectIds }),
        projectIds,
        records,
        requestId,
      });
    }
  }

  if (wantsWriting(trimmed)) {
    const category = writingDomainFromQuery(trimmed);
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

  if (
    /\b(who is gabo|professional background|technology stack|experience building ai agents|how long have you been)\b/i.test(
      trimmed
    )
  ) {
    return null;
  }

  if (wantsProjects(trimmed) && (domain === "ai" || domain === "web3")) {
    const filtered = filterProjectsByDomain(domain);
    if (filtered.length) {
      const records = filtered.map(projectRecord);
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
};

export const catalogHasProjectSlug = (slug: string) =>
  Boolean(getProjectBySlug(slug));

export const featuredProjectIds = () =>
  featuredProjectSlugs.map((slug) => `/project/${slug}`);
