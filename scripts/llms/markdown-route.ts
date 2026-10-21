import { filterTechByCategory, projects, techStack } from "gaboesquivel";

import {
  isTechCategoryId,
  techCategoryLabels,
} from "../../components/tech/categories";
import {
  browseCategories,
  categoryDescriptions,
  categoryDisplayNames,
  postMatchesBrowseCategory,
} from "../../lib/blog-taxonomy";
import {
  featuredLandingPages,
  landingPageGroups,
} from "../../lib/landing-pages";
import { isEmptyTech } from "../../lib/tech-evidence";
import { isWorkType, workTypeCopy, workTypeHref } from "../../lib/work-types";
import { loadBlogPosts, renderBlogMarkdown } from "./blog";
import { cvExports, renderCvMarkdown } from "./cv";
import { absoluteUrl, llmsListItem, wrapSection } from "./format";
import { loadNarrativePages } from "./pages";
import {
  renderProjectMarkdown,
  renderTechMarkdown,
  sortProjects,
  sortTech,
} from "./projects";
import {
  buildRouteManifest,
  canonicalizePath,
  rewriteInternalPaths,
} from "./routes";

export { markdownNotFoundBody } from "../../lib/markdown-not-found";

export interface MarkdownRouteContext {
  manifest: Set<string>;
  pages: ReturnType<typeof loadNarrativePages>;
  posts: ReturnType<typeof loadBlogPosts>;
  projects: ReturnType<typeof sortProjects>;
  tech: ReturnType<typeof sortTech>;
}

const projectDescriptionLine = (description: string) =>
  description.split("\n")[0].trim();

const projectsForWorkType = (type: string) => {
  if (type === "all") {
    return projects;
  }
  if (type === "featured") {
    return projects.filter((project) => project.type.includes("featured"));
  }
  return projects.filter((project) => project.type.includes(type));
};

const renderWorkMarkdown = (type: string) => {
  const resolved = isWorkType(type) ? type : "featured";
  const copy = isWorkType(type)
    ? workTypeCopy[type]
    : {
        description: `Projects tagged ${type} in the work library.`,
        heading: `${type} projects`,
      };
  const filtered = projectsForWorkType(resolved);
  const lines = [
    copy.description,
    "",
    ...filtered.map((project) =>
      llmsListItem({
        name: project.title,
        note: projectDescriptionLine(project.description),
        url: absoluteUrl(`/project/${project.slug}`),
      })
    ),
  ];
  const path = workTypeHref({ type: resolved });
  return wrapSection({
    body: lines.join("\n"),
    path,
    title: copy.heading,
  });
};

const renderBlogIndexMarkdown = (posts: ReturnType<typeof loadBlogPosts>) => {
  const lines = [
    "Notes on shipping software — AI, Web3, and engineering.",
    "",
    ...posts.map((post) =>
      llmsListItem({
        name: post.title,
        note: post.summary,
        url: absoluteUrl(`/blog/${post.slug}`),
      })
    ),
  ];
  return wrapSection({
    body: lines.join("\n"),
    path: "/blog",
    title: "Writing",
  });
};

const renderBlogCategoryMarkdown = (
  category: string,
  posts: ReturnType<typeof loadBlogPosts>
) => {
  if (
    !browseCategories.includes(category as (typeof browseCategories)[number])
  ) {
    return null;
  }
  const slug = category as (typeof browseCategories)[number];
  const filtered = posts.filter((post) =>
    postMatchesBrowseCategory({
      categories: post.category,
      slug,
    })
  );
  const displayName = categoryDisplayNames[slug];
  const lines = [
    categoryDescriptions[slug],
    "",
    ...filtered.map((post) =>
      llmsListItem({
        name: post.title,
        note: post.summary,
        url: absoluteUrl(`/blog/${post.slug}`),
      })
    ),
  ];
  return wrapSection({
    body: lines.join("\n"),
    path: `/blog/category/${slug}`,
    title: `Writing: ${displayName}`,
  });
};

const renderExploreMarkdown = () => {
  const lines = [
    "Every page on the site, grouped by domain, engineering capability, and career context. Pick whichever one matches what you came here to find out.",
    "",
    "## Start here",
    ...featuredLandingPages.map((page) =>
      llmsListItem({
        name: page.title,
        note: page.description,
        url: absoluteUrl(page.href),
      })
    ),
    "",
    ...landingPageGroups.flatMap((group) => [
      `## ${group.title}`,
      ...group.pages.map((page) =>
        llmsListItem({
          name: page.title,
          note: page.description,
          url: absoluteUrl(page.href),
        })
      ),
      "",
    ]),
  ];
  return wrapSection({
    body: lines.join("\n").trim(),
    path: "/explore",
    title: "Explore",
  });
};

const renderTechCategoryMarkdown = (category: string) => {
  if (!isTechCategoryId(category) || category === "featured") {
    return null;
  }
  const label = techCategoryLabels[category];
  const filteredTech = filterTechByCategory(techStack, category).filter(
    (tech) => !isEmptyTech(tech)
  );
  const lines = [
    `Technologies in the ${label} area, each linked to project evidence on the site.`,
    "",
    ...filteredTech.map((tech) =>
      llmsListItem({
        name: tech.name,
        note: tech.description,
        url: absoluteUrl(`/tech/${tech.slug}`),
      })
    ),
  ];
  return wrapSection({
    body: lines.join("\n"),
    path: `/tech/${category}`,
    title: `${label} technologies`,
  });
};

const resolveCvMarkdown = ({
  context,
  search,
}: {
  context: MarkdownRouteContext;
  search: string;
}) => {
  const focus = new URLSearchParams(search).get("focus");
  const cv = cvExports().find((item) => {
    if (!focus || focus === "full") {
      return item.focus === undefined;
    }
    return item.focus === focus;
  });
  if (!cv) {
    return null;
  }
  const body = rewriteInternalPaths(
    renderCvMarkdown({ focus: cv.focus }),
    context.manifest
  );
  return wrapSection({ body, path: cv.path, title: cv.title });
};

const defaultContext = (): MarkdownRouteContext => ({
  manifest: buildRouteManifest(),
  pages: loadNarrativePages(),
  posts: loadBlogPosts(),
  projects: sortProjects(),
  tech: sortTech(),
});

export const getMarkdownForPath = ({
  pathname,
  search = "",
  context,
}: {
  pathname: string;
  search?: string;
  context?: MarkdownRouteContext;
}) => {
  const ctx = context ?? defaultContext();
  const path = pathname === "" ? "/" : canonicalizePath(pathname);
  const { manifest } = ctx;
  const routeKey = search
    ? `${path}?${new URLSearchParams(search).toString()}`
    : path;

  if (path === "/cv") {
    return resolveCvMarkdown({ context: ctx, search });
  }

  if (!manifest.has(path) && !manifest.has(routeKey)) {
    return null;
  }

  if (path === "/work") {
    return renderWorkMarkdown("featured");
  }

  if (path.startsWith("/work/")) {
    const type = path.slice("/work/".length);
    return renderWorkMarkdown(type);
  }

  if (path === "/blog") {
    return renderBlogIndexMarkdown(ctx.posts);
  }

  if (path.startsWith("/blog/category/")) {
    const category = path.slice("/blog/category/".length);
    return renderBlogCategoryMarkdown(category, ctx.posts);
  }

  if (path === "/explore") {
    return renderExploreMarkdown();
  }

  if (path.startsWith("/project/")) {
    const slug = path.slice("/project/".length);
    const project = ctx.projects.find((item) => item.slug === slug);
    if (!project) {
      return null;
    }
    const body = rewriteInternalPaths(renderProjectMarkdown(project), manifest);
    return wrapSection({
      body,
      path: `/project/${project.slug}`,
      title: project.title,
    });
  }

  if (path.startsWith("/tech/")) {
    const slug = path.slice("/tech/".length);
    const categoryMarkdown = renderTechCategoryMarkdown(slug);
    if (categoryMarkdown) {
      return categoryMarkdown;
    }
    const tech = ctx.tech.find((item) => item.slug === slug);
    if (!tech) {
      return null;
    }
    const body = rewriteInternalPaths(renderTechMarkdown(tech), manifest);
    return wrapSection({ body, path: `/tech/${tech.slug}`, title: tech.name });
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    if (slug.startsWith("category/")) {
      return null;
    }
    const post = ctx.posts.find((item) => item.slug === slug);
    if (!post) {
      return null;
    }
    const body = rewriteInternalPaths(renderBlogMarkdown(post), manifest);
    return wrapSection({
      body,
      path: `/blog/${post.slug}`,
      title: post.title,
    });
  }

  const page = ctx.pages.find((item) => item.path === path);
  if (!page) {
    return null;
  }
  const body = rewriteInternalPaths(page.body, manifest);
  return wrapSection({ body, path: page.path, title: page.title });
};
