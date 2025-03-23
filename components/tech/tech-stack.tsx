"use client";
import { ProjectsMasonry } from "components/work/projects-masonry";
import { allBlogs } from "contentlayer/generated";
import type { TechStackItemWithProjects } from "gaboesquivel";
import { PostGrid } from "../blog/posts-grid";

export default function TechStack({
	tech,
}: { tech: TechStackItemWithProjects }) {
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

			<PostGrid
				key={tech.name}
				posts={allBlogs
					.filter((blog) => blog.tech?.includes(tech.tag))
					.map((blog) => ({
						slug: blog.slug,
						title: blog.title,
						publishedAt: blog.publishedAt,
					}))}
				title={"Related Posts"}
			/>
		</div>
	);
}
