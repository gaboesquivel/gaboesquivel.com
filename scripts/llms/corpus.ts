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
  indexEvidenceSlugs,
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
  { label: "AI product engineering", path: "/ai" },
  { label: "Web3 product engineering", path: "/web3" },
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
  const evidenceLines = indexEvidenceSlugs.flatMap((slug) => {
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
      note: "Public Streamable HTTP; no API key or OAuth.",
      url: `${BASE_URL}/mcp`,
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
    "> I build useful and delightful software products. Product engineer based in Costa Rica, working US Mountain Time.",
    "",
    "Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Fluent in English, Spanish, Portuguese, and Italian.",
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

const buildLlmsFull = ({
  pages,
  projects,
  tech,
  currentPosts,
  manifest,
}: {
  pages: ReturnType<typeof loadNarrativePages>;
  projects: ReturnType<typeof sortProjects>;
  tech: ReturnType<typeof sortTech>;
  currentPosts: ReturnType<typeof loadBlogPosts>;
  manifest: Set<string>;
}) => {
  const header = [
    "# Gabo Esquivel",
    "",
    "> I build useful and delightful software products. Product engineer based in Costa Rica, working US Mountain Time.",
    "",
    `Canonical index: ${BASE_URL}/llms.txt`,
    "",
    LLMS_PREAMBLE_FULL,
    "",
  ].join("\n");

  const rewrite = (body: string) => rewriteInternalPaths(body, manifest);

  const pageSections = pages.map((page) =>
    wrapSection({
      body: rewrite(page.body),
      path: page.path,
      title: page.title,
    })
  );

  pageSections.push(
    ...cvExports().map((cv) =>
      wrapSection({
        body: rewrite(renderCvMarkdown({ focus: cv.focus })),
        path: cv.path,
        title: cv.title,
      })
    )
  );

  const projectSections = projects.map((project) =>
    wrapSection({
      body: rewrite(renderProjectMarkdown(project)),
      path: `/project/${project.slug}`,
      title: project.title,
    })
  );

  const techSections = tech.map((item) =>
    wrapSection({
      body: rewrite(renderTechMarkdown(item)),
      path: `/tech/${item.slug}`,
      title: item.name,
    })
  );

  const currentBlogSections = currentPosts.map((post: BlogPost) =>
    wrapSection({
      body: rewrite(renderBlogMarkdown(post)),
      path: `/blog/${post.slug}`,
      title: post.title,
    })
  );

  return joinSections([
    header,
    ...pageSections,
    ...projectSections,
    ...techSections,
    ...currentBlogSections,
  ]);
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
  const llmsFull = buildLlmsFull({
    currentPosts,
    manifest,
    pages,
    projects,
    tech,
  });

  const sectionsForValidation = [
    { body: llmsIndex, title: "Index" },
    ...pages.map((page) => ({ body: page.body, title: page.title })),
    ...cvExports().map((cv) => ({
      body: renderCvMarkdown({ focus: cv.focus }),
      title: cv.title,
    })),
    ...projects.map((project) => ({
      body: renderProjectMarkdown(project),
      title: project.title,
    })),
    ...tech.map((item) => ({
      body: renderTechMarkdown(item),
      title: item.name,
    })),
    ...currentPosts.map((post) => ({
      body: renderBlogMarkdown(post),
      title: post.title,
    })),
  ];

  validateCorpus(sectionsForValidation);

  cached = { llmsFull, llmsIndex };
  return cached;
};

export const getLlmsIndex = () => buildCorpusOnce().llmsIndex;

export const getLlmsFull = () => buildCorpusOnce().llmsFull;
