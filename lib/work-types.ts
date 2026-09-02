export const workTypeOptions = [
  'featured',
  'full-time',
  'contract',
  'web3',
  'ai',
  'lead',
  'oss',
  'all',
] as const

export type WorkType = (typeof workTypeOptions)[number]

export const workTypeCopy: Record<
  WorkType,
  { heading: string; description: string }
> = {
  featured: {
    heading: 'Selected software projects',
    description:
      'Selected software projects across AI, Web3, fintech, and full-stack work.',
  },
  'full-time': {
    heading: 'Full-time projects',
    description: 'Full-time projects from the work library.',
  },
  contract: {
    heading: 'Contract projects',
    description: 'Contract projects from the work library.',
  },
  web3: {
    heading: 'Web3 projects',
    description: 'Projects tagged Web3 in the work library.',
  },
  ai: {
    heading: 'AI projects',
    description: 'Projects tagged AI in the work library.',
  },
  lead: {
    heading: 'Leadership projects',
    description: 'Projects tagged lead in the work library.',
  },
  oss: {
    heading: 'Open-source projects',
    description: 'Open-source projects from the work library.',
  },
  all: {
    heading: 'All projects',
    description: 'The full project library.',
  },
}

export const isWorkType = (type: string): type is WorkType =>
  workTypeOptions.includes(type as WorkType)

export const workTypeHref = ({ type }: { type: string }) =>
  type === 'featured' ? '/work' : `/work/${type}`
