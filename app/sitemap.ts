import { allBlogs } from "contentlayer/generated";
import { projects } from "gaboesquivel";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://gaboesquivel.com";

	// Define primary routes with high priority
	const primaryRoutes = [""].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: "daily" as const,
		priority: 1,
	}));

	// Define secondary routes with medium priority
	const secondaryRoutes = ["/blog", "/tech", "/work"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	// Define tertiary routes with lower priority
	const tertiaryRoutes = ["/cv", "/bio"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}));

	// Get all blog posts with high priority
	const blogs = allBlogs.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.publishedAt,
		changeFrequency: "weekly" as const,
		priority: 0.9,
	}));

	// Get unique categories from blog posts
	const categories = new Set<string>();
	for (const post of allBlogs) {
		if (post.category) {
			for (const cat of post.category) {
				categories.add(cat.toLowerCase());
			}
		}
	}

	// Create category URLs with medium priority
	const categoryUrls = Array.from(categories).map((category) => ({
		url: `${baseUrl}/blog/category/${category}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	// Get all project pages with high priority
	const projectUrls = projects.map((project) => ({
		url: `${baseUrl}/project/${project.slug}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	return [
		...primaryRoutes,
		...secondaryRoutes,
		...tertiaryRoutes,
		...blogs,
		...categoryUrls,
		...projectUrls,
	];
}
