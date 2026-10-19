import { techCategoryIds } from "components/tech/categories";
import { projects, techStack } from "gaboesquivel";
import { allBlogs } from "lib/blog";
import { browseCategories, isArchivePost } from "lib/blog-taxonomy";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gaboesquivel.com";

  const primaryRoutes = [""].map((route) => ({
    changeFrequency: "daily" as const,
    priority: 1,
    url: `${baseUrl}${route}`,
  }));

  const secondaryRoutes = [
    "/blog",
    "/tech",
    "/work",
    "/ai",
    "/web3",
    "/ask",
  ].map((route) => ({
    changeFrequency: "weekly" as const,
    priority: 0.8,
    url: `${baseUrl}${route}`,
  }));

  const tertiaryRoutes = [
    "/about",
    "/contact",
    "/docs",
    "/privacy",
    "/cv",
    "/bio",
    "/frontend",
    "/backend",
    "/fullstack",
    "/mobile",
    "/startups",
    "/institutions",
    "/lead",
  ].map((route) => ({
    changeFrequency: "monthly" as const,
    priority: 0.6,
    url: `${baseUrl}${route}`,
  }));

  const llmsRoutes = [
    "/llms.txt",
    "/llms-full.txt",
    "/.well-known/llms.txt",
    "/.well-known/llms-full.txt",
  ].map((route) => ({
    changeFrequency: "monthly" as const,
    priority: 0.4,
    url: `${baseUrl}${route}`,
  }));

  const blogs = allBlogs.map((post) => ({
    changeFrequency: isArchivePost(post.publishedAt)
      ? ("yearly" as const)
      : ("monthly" as const),
    lastModified: post.publishedAt,
    priority: isArchivePost(post.publishedAt) ? 0.3 : 0.6,
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  const categoryUrls = browseCategories.map((category) => ({
    changeFrequency: "weekly" as const,
    priority: 0.5,
    url: `${baseUrl}/blog/category/${category}`,
  }));

  const projectUrls = projects.map((project) => ({
    changeFrequency: "monthly" as const,
    priority: 0.8,
    url: `${baseUrl}/project/${project.slug}`,
  }));

  const techCategoryUrls = techCategoryIds
    .filter((id) => id !== "featured")
    .map((category) => ({
      changeFrequency: "weekly" as const,
      priority: 0.7,
      url: `${baseUrl}/tech/${category}`,
    }));

  const techUrls = techStack.map((tech) => ({
    changeFrequency: "monthly" as const,
    priority: 0.7,
    url: `${baseUrl}/tech/${tech.slug}`,
  }));

  return [
    ...primaryRoutes,
    ...secondaryRoutes,
    ...tertiaryRoutes,
    ...llmsRoutes,
    ...blogs,
    ...categoryUrls,
    ...projectUrls,
    ...techCategoryUrls,
    ...techUrls,
  ];
}
