import { cvKeys, resolveCv } from "gaboesquivel";

import { cvPath, cvSectionTitles } from "../../lib/cv-paths";

export const cvExports = () =>
  cvKeys.map((key) => ({
    focus: key === "full" ? undefined : key,
    path: cvPath({ key }),
    title: cvSectionTitles[key],
  }));

export const renderCvMarkdown = ({ focus }: { focus?: string } = {}) => {
  const { variant, entries } = resolveCv({ focus });
  const lines = [
    variant.professionalTitle,
    "",
    variant.summary,
    "",
    "## Highlights",
    "",
    ...variant.highlights.map((item) => `- ${item}`),
    "",
    "## Experience",
    "",
  ];

  for (const exp of entries) {
    lines.push(
      `### ${exp.title}, ${exp.company}`,
      "",
      `${exp.location} • ${exp.type} • ${exp.duration}`,
      "",
      exp.description,
      "",
      ...exp.achievements.map((item) => `- ${item}`),
      "",
      `**Tech:** ${exp.techStack.join(", ")}`,
      ""
    );
  }

  if (variant.also) {
    lines.push("## Additional experience", "", variant.also, "");
  }

  lines.push(
    "## Skills",
    "",
    ...variant.skills.map(
      ({ label, keywords }) => `- **${label}:** ${keywords}`
    ),
    ""
  );

  return lines.join("\n").trim();
};
