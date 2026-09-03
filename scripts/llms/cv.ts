import { cvKeys, resolveCv } from 'gaboesquivel'

const cvSectionTitles: Record<(typeof cvKeys)[number], string> = {
  full: 'Curriculum Vitae',
  ai: 'AI Product Engineering CV',
  web3: 'Web3 Product Engineering CV',
  fullstack: 'Full-Stack Product Engineering CV',
}

export const cvExports = () =>
  cvKeys.map((key) => ({
    path: key === 'full' ? '/cv' : `/cv?focus=${key}`,
    title: cvSectionTitles[key],
    focus: key === 'full' ? undefined : key,
  }))

export const renderCvMarkdown = ({ focus }: { focus?: string } = {}) => {
  const { variant, entries } = resolveCv({ focus })
  const lines = [
    variant.professionalTitle,
    '',
    variant.summary,
    '',
    '## Highlights',
    '',
    ...variant.highlights.map((item) => `- ${item}`),
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

  lines.push(
    '## Skills',
    '',
    ...variant.skills.map(
      ({ label, keywords }) => `- **${label}:** ${keywords}`,
    ),
    '',
  )

  return lines.join('\n').trim()
}
