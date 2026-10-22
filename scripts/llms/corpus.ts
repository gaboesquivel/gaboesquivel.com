import { hireTermsPlainIndexLine } from "../../lib/hire-terms";
import { siteLlmsBlurb } from "../../lib/site-identity";
import { featuredProjectSlugs } from "../../lib/work-types";
import { LLMS_PREAMBLE_FULL, LLMS_PREAMBLE_INDEX } from "./authority";
import type { BlogPost } from "./blog";
import {
  isArchivePostFromBlog,
  loadBlogPosts,
  renderBlogMarkdown,
} from "./blog";
import { cvExports, renderCvMarkdown } from "./cv";
import { BASE_URL, joinSections, llmsListItem, wrapSection } from "./format";
import { loadNarrativePages } from "./pages";
import {
  renderProjectMarkdown,
  renderTechMarkdown,
  sortProjects,
  sortTech,
} from "./projects";
import { buildRouteManifest, rewriteInternalPaths } from "./routes";
import { validateCorpus } from "./validate";

const canonicalRoutes = [
  { label: "Home", path: "/" },
  { label: "Career story", path: "/bio" },
  { label: "AI engineering", path: "/ai" },
  { label: "Web3 engineering", path: "/web3" },
  { label: "Full-stack product engineering", path: "/fullstack" },
  { label: "Frontend engineering", path: "/frontend" },
  { label: "Backend engineering", path: "/backend" },
  { label: "Mobile engineering", path: "/mobile" },
  { label: "Startup product engineering", path: "/startups" },
  { label: "Institutional software engineering", path: "/institutions" },
  { label: "Technical leadership", path: "/lead" },
  { label: "Curriculum vitae", path: "/cv" },
  { label: "Ask", path: "/ask" },
  { label: "Site agent", path: "/mcp" },
  { label: "Gabo Esquivel MCP", path: "/docs" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Privacy", path: "/privacy" },
  { label: "Work portfolio", path: "/work" },
  { label: "Technology stack", path: "/tech" },
  { label: "Writing", path: "/blog" },
];

const buildLlmsIndex = ({
  projects,
  currentPosts,
}: {
  projects: ReturnType<typeof sortProjects>;
  currentPosts: ReturnType<typeof loadBlogPosts>;
}) => {
  const evidenceLines = featuredProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project
      ? [
          llmsListItem({
            name: project.title,
            note: project.description.split("\n")[0],
            url: `${BASE_URL}/project/${project.slug}`,
          }),
        ]
      : [];
  });

  const developerResourceLines = [
    llmsListItem({
      name: "Gabo Esquivel Site API (OpenAPI)",
      note: "Read-only JSON: profile, page list, and Markdown exports. Task execution uses MCP at /mcp.",
      url: `${BASE_URL}/openapi.json`,
    }),
    llmsListItem({
      name: "Gabo Esquivel MCP — developer documentation",
      note: "Streamable HTTP protocol (agent_start, agent_get), Gabo Esquivel MCP authentication, and limits. Aliases: /developers, /mcp/docs.",
      url: `${BASE_URL}/docs`,
    }),
    llmsListItem({
      name: "Gabo Esquivel MCP server endpoint",
      note: "Public Streamable HTTP; agent_* tools and published cv tool; no API key or OAuth.",
      url: `${BASE_URL}/mcp`,
    }),
    llmsListItem({
      name: "Gabo Esquivel MCP CV download card",
      note: "MCP Apps UI at /mcp/cv; call cv for PDF links with a download card in ChatGPT and other MCP Apps hosts.",
      url: `${BASE_URL}/mcp/cv`,
    }),
    llmsListItem({
      name: "Gabo Esquivel llms.txt (agent corpus)",
      note: "Plain-text index of site facts; not an OpenAPI spec.",
      url: `${BASE_URL}/llms.txt`,
    }),
  ];

  const routeLines = canonicalRoutes.map((route) =>
    llmsListItem({
      name: route.label,
      url: `${BASE_URL}${route.path}`,
    })
  );

  const writingLines = currentPosts.slice(0, 12).map((post) =>
    llmsListItem({
      name: post.title,
      note: post.summary,
      url: `${BASE_URL}/blog/${post.slug}`,
    })
  );

  return [
    "# Gabo Esquivel",
    "",
    siteLlmsBlurb,
    "",
    hireTermsPlainIndexLine,
    "",
    LLMS_PREAMBLE_INDEX,
    "",
    `Full corpus: [llms-full.txt](${BASE_URL}/llms-full.txt)`,
    "",
    "## Gabo Esquivel MCP (developer resources)",
    ...developerResourceLines,
    "",
    "## Canonical routes",
    ...routeLines,
    "",
    "## Strongest evidence",
    ...evidenceLines,
    "",
    "## Recent writing",
    ...writingLines,
    "",
  ].join("\n");
};

const corpusContentSections = ({
  pages,
  projects,
  tech,
  currentPosts,
}: {
  pages: ReturnType<typeof loadNarrativePages>;
  projects: ReturnType<typeof sortProjects>;
  tech: ReturnType<typeof sortTech>;
  currentPosts: ReturnType<typeof loadBlogPosts>;
}) => [
  ...pages.map((page) => ({
    body: page.body,
    path: page.path,
    title: page.title,
  })),
  ...cvExports().map((cv) => ({
    body: renderCvMarkdown({ focus: cv.focus }),
    path: cv.path,
    title: cv.title,
  })),
  ...projects.map((project) => ({
    body: renderProjectMarkdown(project),
    path: `/project/${project.slug}`,
    title: project.title,
  })),
  ...tech.map((item) => ({
    body: renderTechMarkdown(item),
    path: `/tech/${item.slug}`,
    title: item.name,
  })),
  ...currentPosts.map((post: BlogPost) => ({
    body: renderBlogMarkdown(post),
    path: `/blog/${post.slug}`,
    title: post.title,
  })),
];

const buildLlmsFull = ({
  manifest,
  sections,
}: {
  manifest: Set<string>;
  sections: { body: string; path: string; title: string }[];
}) => {
  const header = [
    "# Gabo Esquivel",
    "",
    siteLlmsBlurb,
    "",
    `Canonical index: ${BASE_URL}/llms.txt`,
    "",
    LLMS_PREAMBLE_FULL,
    "",
  ].join("\n");

  const rewrite = (body: string) => rewriteInternalPaths(body, manifest);

  const wrapped = sections.map((section) =>
    wrapSection({
      body: rewrite(section.body),
      path: section.path,
      title: section.title,
    })
  );

  return joinSections([header, ...wrapped]);
};

let cached: { llmsIndex: string; llmsFull: string } | null = null;

const buildCorpusOnce = () => {
  if (cached) {
    return cached;
  }

  const posts = loadBlogPosts();
  const currentPosts = posts.filter((post) => !isArchivePostFromBlog(post));
  const pages = loadNarrativePages();
  const projects = sortProjects();
  const tech = sortTech();
  const manifest = buildRouteManifest();

  const llmsIndex = buildLlmsIndex({ currentPosts, projects });
  const contentSections = corpusContentSections({
    currentPosts,
    pages,
    projects,
    tech,
  });
  const llmsFull = buildLlmsFull({ manifest, sections: contentSections });

  validateCorpus([
    { body: llmsIndex, title: "Index" },
    ...contentSections.map(({ body, title }) => ({ body, title })),
  ]);

  cached = { llmsFull, llmsIndex };
  return cached;
};

export const getLlmsIndex = () => buildCorpusOnce().llmsIndex;

export const getLlmsFull = () => buildCorpusOnce().llmsFull;
