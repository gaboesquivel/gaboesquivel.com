const TAG_DISPLAY_NAMES: Record<string, string> = {
  ReactJS: 'React',
  NextJS: 'Next.js',
  NodeJS: 'Node.js',
  Wordpress: 'WordPress',
  Ethers: 'Ethers.js',
  EthersJS: 'Ethers.js',
  ShadcnUI: 'shadcn/ui',
  RXJS: 'RxJS',
  Mootools: 'MooTools',
  WebAuthN: 'WebAuthn',
  'TanStack Form': 'TanStack Form',
  'TanStack Query': 'TanStack Query',
  'TanStack Start': 'TanStack Start',
}

export const displayTagName = (tag: string) => TAG_DISPLAY_NAMES[tag] ?? tag

export const displayTechList = (tags: string[]) =>
  tags.map(displayTagName).join(', ')
