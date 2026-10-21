import { getTechCategories, techStack } from "gaboesquivel";

const TOKEN_CAP = 1500;

export interface RankSection {
  body?: string;
  bodyKey?: string;
  categories: string[];
  company: string;
  kind: "cv" | "employment" | "page" | "post" | "project" | "tech";
  opening: string;
  path: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  title: string;
}

const estimateTokens = (text: string) => Math.ceil(text.length / 4);

const tokensOf = (question: string) =>
  question
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((token) => token.length > 2);

const asksView = (question: string) =>
  /\b(think|thought|view|opinion|into|believe|wrote|writing|interested)\b/i.test(
    question
  );

const asksStack = (question: string) =>
  /\b(stacks?|technolog(?:y|ies))\b/i.test(question);

const stackCategory = (question: string) => {
  const q = question.toLowerCase();
  if (/\bai\b/.test(q)) return "ai";
  if (/\bweb3\b|\bblockchain\b/.test(q)) return "web3";
  if (/\bfront-?end\b/.test(q)) return "frontend";
  if (/\bback-?end\b/.test(q)) return "backend";
  if (/\b(?:cloud|devops)\b/.test(q)) return "cloud-devops";
  return "";
};

const categoriesFor = (section: RankSection) => {
  if (section.kind !== "tech" || section.categories.length > 0)
    return section.categories;
  const slug = section.path.split("/").at(-1) ?? "";
  const item = techStack.find((tech) => tech.slug === slug);
  return item ? [...getTechCategories(item)] : section.categories;
};

const namesArchive = ({
  question,
  section,
}: {
  question: string;
  section: RankSection;
}) => {
  const q = question.toLowerCase();
  const slug = section.path.split("/").at(-1) ?? "";
  const years = [...question.matchAll(/\b(?:19|20)\d{2}\b/g)].map((match) =>
    Number(match[0])
  );
  return (
    (section.title.length > 4 && q.includes(section.title.toLowerCase())) ||
    (slug.length > 8 && q.includes(slug.toLowerCase())) ||
    years.some(
      (year) => year < 2020 && section.publishedAt.startsWith(String(year))
    )
  );
};

const eligible = ({
  question,
  section,
}: {
  question: string;
  section: RankSection;
}) => {
  if (section.kind !== "post" || section.publishedAt >= "2020") return true;
  return namesArchive({ question, section });
};

const scoreOf = ({
  question,
  section,
}: {
  question: string;
  section: RankSection;
}) => {
  const tokens = tokensOf(question);
  const haystack = [
    section.title,
    section.path,
    section.summary,
    section.categories.join(" "),
    section.tags.join(" "),
    section.company,
    section.opening,
  ]
    .join("\n")
    .toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (haystack.includes(token)) score += 1;
    if (section.title.toLowerCase().includes(token)) score += 2;
  }
  const company = section.company.toLowerCase();
  if (company.length > 2 && question.toLowerCase().includes(company)) {
    score += section.kind === "employment" ? 8 : 4;
  }
  if (/\bshipped\b/i.test(question) && section.kind === "project") score += 3;
  if (
    /\b(lead|led|role)\b/i.test(question) &&
    (section.kind === "employment" || section.kind === "cv")
  ) {
    score += 2;
  }
  return score;
};

const bodyOf = ({
  bodies,
  section,
}: {
  bodies?: Record<string, string>;
  section: RankSection;
}) =>
  section.body ??
  (section.bodyKey ? bodies?.[section.bodyKey] : undefined) ??
  section.opening;

const blockOf = ({
  bodies,
  section,
}: {
  bodies?: Record<string, string>;
  section: RankSection;
}) =>
  `# ${section.title}\n\n${section.path}${
    section.publishedAt ? `\n\nPublished: ${section.publishedAt}` : ""
  }\n\n${bodyOf({ bodies, section })}`;

const takeFitting = ({
  bodies,
  sections,
}: {
  bodies?: Record<string, string>;
  sections: RankSection[];
}) => {
  const header =
    "Published sections for this turn. Link the path you used. If they do not answer the question, say the site does not cover it and offer to pass it along.";
  const parts = [header];
  const paths: string[] = [];
  let tokens = estimateTokens(header);
  for (const section of sections) {
    const block = blockOf({ bodies, section });
    const cost = estimateTokens(block);
    if (paths.length > 0 && tokens + cost > TOKEN_CAP) break;
    if (paths.length === 0 && tokens + cost > TOKEN_CAP) {
      parts.push(block.slice(0, (TOKEN_CAP - tokens) * 4));
      paths.push(section.path);
      break;
    }
    parts.push(block);
    paths.push(section.path);
    tokens += cost;
  }
  const joined = parts.join("\n\n");
  const paste =
    estimateTokens(joined) > TOKEN_CAP
      ? joined.slice(0, TOKEN_CAP * 4)
      : joined;
  return { paste, paths };
};

const recentTitles = (sections: RankSection[]) => {
  const lines = sections
    .filter(
      (section) => section.kind === "post" && section.publishedAt >= "2020"
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 12)
    .map(
      (section) =>
        `- ${section.title} (${section.publishedAt}): ${section.summary} ${section.path}`
    );
  const paste = [
    "Recent writing titles and summaries. Full posts stay out until a topic matches. Link a path only if you name that post, and state its date.",
    ...lines,
  ].join("\n");
  return {
    paste: paste.slice(0, TOKEN_CAP * 4),
    paths: [] as string[],
  };
};

const best = (
  scored: { score: number; section: RankSection }[],
  kind: RankSection["kind"]
) =>
  scored
    .filter((item) => item.section.kind === kind)
    .sort((a, b) => b.score - a.score)[0]?.section;

export const rankSections = ({
  bodies,
  question,
  sections,
}: {
  bodies?: Record<string, string>;
  question: string;
  sections: RankSection[];
}) => {
  const words = question.trim().split(/\s+/).filter(Boolean);
  if (
    words.length <= 8 &&
    /\b(what are you into|what are you interested|what do you like)\b/i.test(
      question
    )
  ) {
    return recentTitles(sections);
  }

  const scored = sections
    .filter((section) => eligible({ question, section }))
    .map((section) => ({ score: scoreOf({ question, section }), section }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const category = asksStack(question) ? stackCategory(question) : "";
  const tech = category
    ? sections.filter(
        (section) =>
          section.kind === "tech" && categoriesFor(section).includes(category)
      )
    : [];
  if (tech.length > 0) return takeFitting({ bodies, sections: tech });

  const employment = scored.find(
    (item) =>
      item.section.kind === "employment" &&
      item.section.company.length > 2 &&
      question.toLowerCase().includes(item.section.company.toLowerCase())
  )?.section;

  if (employment) {
    const project = scored.find(
      (item) =>
        item.section.kind === "project" &&
        item.section.company.toLowerCase() === employment.company.toLowerCase()
    )?.section;
    const second = asksView(question) ? best(scored, "post") : project;
    return takeFitting({
      bodies,
      sections: [employment, second].filter((section): section is RankSection =>
        Boolean(section)
      ),
    });
  }

  if (asksView(question)) {
    const posts = scored
      .filter((item) => item.section.kind === "post")
      .sort(
        (a, b) =>
          b.section.publishedAt.localeCompare(a.section.publishedAt) ||
          b.score - a.score
      );
    if (posts[0]) {
      return takeFitting({
        bodies,
        sections: posts.slice(0, 2).map((item) => item.section),
      });
    }
  }

  const project = best(scored, "project");
  if (project) {
    const role = scored.find(
      (item) =>
        item.section.kind === "employment" &&
        item.section.company.length > 0 &&
        item.section.company.toLowerCase() === project.company.toLowerCase()
    )?.section;
    return takeFitting({
      bodies,
      sections: [project, role].filter((section): section is RankSection =>
        Boolean(section)
      ),
    });
  }

  const top = scored[0]?.section;
  if (!top) return { paste: "", paths: [] as string[] };
  const second =
    top.kind === "project"
      ? undefined
      : scored.find((item) => item.section !== top)?.section;
  return takeFitting({
    bodies,
    sections: [top, second].filter((section): section is RankSection =>
      Boolean(section)
    ),
  });
};
