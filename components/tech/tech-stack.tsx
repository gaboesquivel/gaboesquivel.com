'use client'
import type { TechStackItemWithProjects } from "gaboesquivel";
import { ProjectsMasonry } from "components/shared/projects-masonry";
import {PostCard} from '../blog/post-card';
import { allBlogs } from 'contentlayer/generated';

export default function TechStack({
	tech,
}: { tech: TechStackItemWithProjects }) {
	return (
		<div>
			<h1 className="mb-8 text-2xl font-bold tracking-tighter">{tech.name}</h1>
			<p className="prose prose-neutral dark:prose-invert">{tech.description}</p>
			{tech.intro.map((intro) => (
				<p className="prose prose-neutral dark:prose-invert" key={intro}>{intro}</p>
			))}
			<h3 className="font-bold text-xl mb-4">Experience:</h3>
			{tech.experience.map((experience) => (
				<p className="prose prose-neutral dark:prose-invert" key={experience}>{experience}</p>
			))}

			<ProjectsMasonry projects={tech.projects} identifier={tech.name} />

			<h3 className="font-bold text-xl mb-4 mt-16">Related Posts</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{allBlogs.filter((blog) => blog.tech?.includes(tech.name)).map((blog) => (
					<PostCard key={blog.slug} post={blog} />
				))}
			</div>
		</div>
	);
}
