import { filterTechByCategory, techStack } from "gaboesquivel";

const fold = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");

const explicitAliases: Record<string, string> = {
  next: "NextJS",
  nextjs: "NextJS",
  node: "NodeJS",
  nodejs: "NodeJS",
  react: "ReactJS",
  reactjs: "ReactJS",
};

const index = new Map<string, string>();
const ambiguous = new Set<string>();

const addKey = ({ key, tag }: { key: string; tag: string }) => {
  if (!key) return;
  const existing = index.get(key);
  if (!existing) {
    index.set(key, tag);
    return;
  }
  if (existing !== tag) {
    index.delete(key);
    ambiguous.add(key);
  }
};

for (const tech of techStack) {
  addKey({ key: fold(tech.tag), tag: tech.tag });
  addKey({ key: fold(tech.name), tag: tech.tag });
  addKey({ key: fold(tech.slug), tag: tech.tag });
  for (const alias of tech.aliases ?? []) {
    addKey({ key: fold(alias), tag: tech.tag });
  }
}

for (const [alias, tag] of Object.entries(explicitAliases)) {
  index.set(fold(alias), tag);
  ambiguous.delete(fold(alias));
}

export const web3TechnologyTags = new Set(
  filterTechByCategory(techStack, "web3").map((tech) => tech.tag)
);

export const resolveTechnology = ({
  label,
}: {
  label: string;
}):
  | { status: "resolved"; tag: string }
  | { status: "ambiguous" }
  | { status: "unknown" } => {
  const key = fold(label);
  if (key.length < 2) return { status: "unknown" };
  if (ambiguous.has(key) && !index.has(key)) return { status: "ambiguous" };
  const tag = index.get(key);
  if (!tag) return { status: "unknown" };
  return { status: "resolved", tag };
};

export const technologyExclusionNote =
  "A project is excluded when its published type or technology list positively matches the excluded domain or technology. An empty technology list is unknown, so that record is omitted rather than treated as a negative match. Absence of a tag is not proof the technology was never used.";
