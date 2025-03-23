"use client";
import { ProjectsMasonry } from "components/work/projects-masonry";
import { allBlogs } from "contentlayer/generated";
import type { TechStackItemWithProjects } from "gaboesquivel";
import { LatestPosts } from "../blog/latest-posts";
import { PostGrid } from "../blog/posts-grid";

export default function TechStack({
	tech,
}: { tech: TechStackItemWithProjects }) {
	const techRelatedPosts = allBlogs.filter((blog) =>
		blog.tech?.includes(tech.tag),
	);

	return (
		<div>
			<h1 className="mb-8 font-bold text-2xl tracking-tighter">{tech.name}</h1>
			<p className="prose prose-neutral dark:prose-invert">
				{tech.description}
			</p>
			{tech.intro.map((intro) => (
				<p className="prose prose-neutral dark:prose-invert" key={intro}>
					{intro}
				</p>
			))}
			<h3 className="mb-4 font-bold text-xl">Experience:</h3>
			{tech.experience.map((experience) => (
				<p className="prose prose-neutral dark:prose-invert" key={experience}>
					{experience}
				</p>
			))}
			<ProjectsMasonry projects={tech.projects} identifier={tech.name} />

			{techRelatedPosts.length > 0 ? (
				<PostGrid
					key={tech.name}
					posts={techRelatedPosts.slice(0, 6).map((blog) => ({
						slug: blog.slug,
						title: blog.title,
						publishedAt: blog.publishedAt,
					}))}
					title={"Related Posts"}
				/>
			) : (
				<LatestPosts title="Latest Posts" />
			)}
		</div>
	);
}
