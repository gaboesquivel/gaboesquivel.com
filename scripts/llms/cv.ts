import { resolveCv } from 'gaboesquivel'

export const renderCvMarkdown = () => {
  const { variant, entries } = resolveCv({})
  const lines = [
    variant.professionalTitle,
    '',
    variant.summary,
    '',
    '## Highlights',
    '',
    ...variant.highlights.map((item) => `- ${item}`),
    '',
    '## Skills',
    '',
    ...variant.skills.map(
      ({ label, keywords }) => `- **${label}:** ${keywords}`,
    ),
    '',
    '## Experience',
    '',
  ]

  for (const exp of entries) {
    lines.push(
      `### ${exp.title}, ${exp.company}`,
      '',
      `${exp.location} • ${exp.type} • ${exp.duration}`,
      '',
      exp.description,
      '',
      ...exp.achievements.map((item) => `- ${item}`),
      '',
      `**Tech:** ${exp.techStack.join(', ')}`,
      '',
    )
  }

  if (variant.also) {
    lines.push('## Additional experience', '', variant.also, '')
  }

  return lines.join('\n').trim()
}
