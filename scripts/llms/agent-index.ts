import { experience, getTechCategories, resolveCv } from "gaboesquivel";

import { loadBlogPosts, renderBlogMarkdown } from "./blog";
import { absoluteUrl } from "./format";
import { loadNarrativePages } from "./pages";
import {
  renderProjectMarkdown,
  renderTechMarkdown,
  sortProjects,
  sortTech,
} from "./projects";

const openingOf = (body: string) =>
  body.replace(/\s+/g, " ").trim().slice(0, 600);

const companySlug = (company: string) =>
  company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const employmentRecords = () =>
  experience.map((entry) => {
    const slug = companySlug(entry.company);
    const markdown = [
      `**Title:** ${entry.title}`,
      `**Company:** ${entry.company}`,
      `**Location:** ${entry.location}`,
      `**Type:** ${entry.type}`,
      `**Duration:** ${entry.duration}`,
      "",
      entry.description,
      "",
      "## Achievements",
      "",
      ...entry.achievements.map((item) => `- ${item}`),
      "",
      `**Tech:** ${entry.techStack.join(", ")}`,
      "",
      `Cite [the CV](${absoluteUrl("/cv")}).`,
    ].join("\n");
    return {
      bodyKey: `#employment/${slug}`,
      company: entry.company,
      markdown,
      title: `${entry.title}, ${entry.company}`,
    };
  });

export const cvOverviewMarkdown = () => {
  const { variant } = resolveCv({});
  return [
    variant.professionalTitle,
    "",
    variant.summary,
    "",
    "## Highlights",
    "",
    ...variant.highlights.map((item) => `- ${item}`),
    "",
    "## Skills",
    "",
    ...variant.skills.map(
      ({ keywords, label }) => `- **${label}:** ${keywords}`
    ),
    "",
    `Canonical: ${absoluteUrl("/cv")}`,
  ].join("\n");
};

const section = ({
  body,
  categories = [],
  company = "",
  kind,
  path,
  publishedAt = "",
  summary,
  tags = [],
  title,
  bodyKey,
}: {
  body: string;
  bodyKey: string;
  categories?: string[];
  company?: string;
  kind: "cv" | "employment" | "page" | "post" | "project" | "tech";
  path: string;
  publishedAt?: string;
  summary: string;
  tags?: string[];
  title: string;
}) => ({
  bodyKey,
  categories,
  company,
  kind,
  opening: openingOf(body),
  path,
  publishedAt,
  summary,
  tags,
  title,
});

export const buildAgentIndex = ({
  employment = employmentRecords(),
  cvOverview = cvOverviewMarkdown(),
}: {
  cvOverview?: string;
  employment?: ReturnType<typeof employmentRecords>;
} = {}) => {
  const pages = loadNarrativePages().map((page) =>
    section({
      body: page.body,
      bodyKey: page.path,
      kind: "page",
      path: page.path,
      summary: page.body.split("\n").find((line) => line.trim()) ?? page.title,
      title: page.title,
    })
  );

  const projects = sortProjects().map((project) =>
    section({
      body: renderProjectMarkdown(project),
      bodyKey: `/project/${project.slug}`,
      company: project.experienceCompany ?? "",
      kind: "project",
      path: `/project/${project.slug}`,
      summary: project.description,
      tags: project.tech,
      title: project.title,
    })
  );

  const tech = sortTech().flatMap((item) => {
    const body = renderTechMarkdown(item);
    if (!body) return [];
    return [
      section({
        body,
        bodyKey: `/tech/${item.slug}`,
        categories: getTechCategories(item),
        kind: "tech",
        path: `/tech/${item.slug}`,
        summary: item.description,
        tags: [item.tag],
        title: item.name,
      }),
    ];
  });

  const posts = loadBlogPosts().map((post) =>
    section({
      body: renderBlogMarkdown(post),
      bodyKey: `/blog/${post.slug}`,
      categories: post.category ?? [],
      kind: "post",
      path: `/blog/${post.slug}`,
      publishedAt: post.publishedAt,
      summary: post.summary,
      tags: post.tech ?? [],
      title: post.title,
    })
  );

  const jobs = employment.map((entry) =>
    section({
      body: entry.markdown,
      bodyKey: entry.bodyKey,
      company: entry.company,
      kind: "employment",
      path: "/cv",
      summary: entry.title,
      title: entry.title,
    })
  );

  const cv = section({
    body: cvOverview,
    bodyKey: "#cv/overview",
    kind: "cv",
    path: "/cv",
    summary: cvOverview.split("\n").find((line) => line.trim()) ?? "CV",
    title: "Curriculum Vitae",
  });

  return [...pages, ...projects, ...tech, ...posts, jobs, cv].flat();
};
