import type { TechStackItemWithProjects } from "gaboesquivel";
import { Project } from "components/work/project";

export default function TechStack({
	tech,
}: { tech: TechStackItemWithProjects }) {
	return (
		<div>
			<h1 className="mb-8 text-2xl font-bold tracking-tighter">{tech.name}</h1>
			<p>{tech.description}</p>
			{tech.intro.map((intro) => (
				<p key={intro}>{intro}</p>
			))}
			<h3 className="font-bold text-xl mb-4">Experience:</h3>
			{tech.experience.map((experience) => (
				<p key={experience}>{experience}</p>
			))}

			{tech.projects.map((project) => (
				<Project key={project.title} project={project} />
			))}
		</div>
	);
}
