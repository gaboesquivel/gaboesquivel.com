import { projects } from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { cvDownloadPayload } from "lib/connect/cv-download";
import { siteOrigin } from "lib/site-path";
import { featuredProjectSlugs } from "lib/work-types";

export const catalogProjects = projects.map((project) => ({
  description: project.description,
  link: project.link,
  slug: project.slug,
  tech: project.tech,
  title: project.title,
  type: project.type,
  url: `/project/${project.slug}`,
  year: project.year,
}));

export const catalogFeaturedProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);
  return project
    ? [
        {
          slug: project.slug,
          title: project.title,
          url: `/project/${project.slug}`,
        },
      ]
    : [];
});

export const catalogHasOpyn = catalogProjects.some(
  (project) => project.slug === "opyn"
);

export const catalogArticles = allBlogs
  .filter((post) => post.publishedAt >= "2020")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((post) => ({
    categories: post.category ?? [],
    publishedAt: post.publishedAt,
    slug: post.slug,
    summary: post.summary ?? "",
    title: post.title,
    url: `${siteOrigin}/blog/${post.slug}`,
  }));

export const catalogLatestArticle = catalogArticles[0] ?? null;

export const catalogCv = {
  pageUrl: cvDownloadPayload().pageUrl,
  pdfUrl: cvDownloadPayload().pdfUrl,
  title: cvDownloadPayload().title,
};

export const catalogContactUrl = `${siteOrigin}/contact`;

export const catalogProjectIds = new Set(
  catalogProjects.map((project) => `/project/${project.slug}`)
);

export const catalogPostIds = new Set(
  catalogArticles.map((post) => `/blog/${post.slug}`)
);
