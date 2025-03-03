'use client'
import type { TechStackItemWithProjects } from "gaboesquivel";
import { ProjectsMasonry } from "components/shared/projects-masonry";

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
		</div>
	);
}
