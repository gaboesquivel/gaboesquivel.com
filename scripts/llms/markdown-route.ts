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
import { absoluteUrl, wrapSection } from "./format";
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
    ...filtered.map(
      (project) =>
        `- [${project.title}](${absoluteUrl(`/project/${project.slug}`)}): ${projectDescriptionLine(project.description)}`
    ),
  ];
  const path = workTypeHref({ type: resolved });
  return wrapSection({
    body: lines.join("\n"),
    path,
    title: copy.heading,
  });
};

const renderBlogIndexMarkdown = () => {
  const posts = loadBlogPosts();
  const lines = [
    "Notes on shipping software — AI, Web3, and engineering.",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.summary}`
    ),
  ];
  return wrapSection({
    body: lines.join("\n"),
    path: "/blog",
    title: "Writing",
  });
};

const renderBlogCategoryMarkdown = (category: string) => {
  if (
    !browseCategories.includes(category as (typeof browseCategories)[number])
  ) {
    return null;
  }
  const slug = category as (typeof browseCategories)[number];
  const posts = loadBlogPosts().filter((post) =>
    postMatchesBrowseCategory({
      categories: post.category,
      slug,
    })
  );
  const displayName = categoryDisplayNames[slug];
  const lines = [
    categoryDescriptions[slug],
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.summary}`
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
    ...featuredLandingPages.map(
      (page) =>
        `- [${page.title}](${absoluteUrl(page.href)}): ${page.description}`
    ),
    "",
    ...landingPageGroups.flatMap((group) => [
      `## ${group.title}`,
      ...group.pages.map(
        (page) =>
          `- [${page.title}](${absoluteUrl(page.href)}): ${page.description}`
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
    ...filteredTech.map(
      (tech) =>
        `- [${tech.name}](${absoluteUrl(`/tech/${tech.slug}`)}): ${tech.description}`
    ),
  ];
  return wrapSection({
    body: lines.join("\n"),
    path: `/tech/${category}`,
    title: `${label} technologies`,
  });
};

const resolveCvMarkdown = (search: string) => {
  const focus = new URLSearchParams(search).get("focus");
  const routeKey = focus && focus !== "full" ? `/cv?focus=${focus}` : "/cv";
  const cv = cvExports().find((item) => item.path === routeKey);
  if (!cv) {
    return null;
  }
  const manifest = buildRouteManifest();
  const body = rewriteInternalPaths(
    renderCvMarkdown({ focus: cv.focus }),
    manifest
  );
  return wrapSection({ body, path: cv.path, title: cv.title });
};

export const getMarkdownForPath = ({
  pathname,
  search = "",
}: {
  pathname: string;
  search?: string;
}) => {
  const path = pathname === "" ? "/" : canonicalizePath(pathname);
  const manifest = buildRouteManifest();
  const routeKey = search
    ? `${path}?${new URLSearchParams(search).toString()}`
    : path;

  if (path === "/cv") {
    return resolveCvMarkdown(search);
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
    return renderBlogIndexMarkdown();
  }

  if (path.startsWith("/blog/category/")) {
    const category = path.slice("/blog/category/".length);
    return renderBlogCategoryMarkdown(category);
  }

  if (path === "/explore") {
    return renderExploreMarkdown();
  }

  if (path.startsWith("/project/")) {
    const slug = path.slice("/project/".length);
    const project = sortProjects().find((item) => item.slug === slug);
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
    const tech = sortTech().find((item) => item.slug === slug);
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
    const post = loadBlogPosts().find((item) => item.slug === slug);
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

  const page = loadNarrativePages().find((item) => item.path === path);
  if (!page) {
    return null;
  }
  const body = rewriteInternalPaths(page.body, manifest);
  return wrapSection({ body, path: page.path, title: page.title });
};
