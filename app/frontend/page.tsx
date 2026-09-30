import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Trading and auction interfaces',
    paragraphs: [
      'At Opyn the Next.js trading interface uses React Server Components over Ponder-indexed options data so Arbitrum behavior stays visible. At Bitlauncher the Gnosis auction bidding interface uses wagmi balance subscriptions and Supabase realtime updates.',
    ],
    projectSlugs: ['opyn', 'bitlauncher'],
  },
  {
    heading: 'Immersive and interactive products',
    paragraphs: [
      'At ZTX the React application hosted the virtual world, and the wallet session lived inside the WebGL surface instead of in separate app chrome. At AMC the YEAH! interactive player ran trivia, interviews, and quizzes inside the film itself. Curated titles carried more than 400 interactive elements each.',
    ],
    projectSlugs: ['ztx', 'amc-yeah-tv-facebook-app'],
  },
  {
    heading: 'Data-dense interfaces',
    paragraphs: [
      'Block producer scores only help if you can compare them. For EOS Rate I built a radial comparison interface on GraphQL and onchain ratings that keeps those scores in one view.',
    ],
    projectSlugs: ['eos-rate'],
  },
]

export default function FrontendExperiencePage() {
  return (
    <CapabilityPage
      title="Frontend engineering"
      intro={[
        'Interfaces get hard when the state behind them is hard: a balance that is already stale, an auction closing while you type, a live wallet session inside a virtual world.',
        'I build them in React, Next.js, TypeScript, TanStack Query, and Tailwind, and most of the design work is deciding what the screen has to show about that state, and when.',
      ]}
      sections={sections}
      postSlugs={[
        '2025-01-use-memo-use-callback-obsolete',
        '2026-01-evolution-ai-ux',
        '2024-07-viem-wagmi-ethers',
      ]}
      writingTitle="Writing about frontend systems"
    />
  )
}

export const metadata = pageMetadata({
  title: 'Frontend Engineering | Gabo Esquivel',
  description:
    'Frontend engineering for trading interfaces, wallet flows, interactive video, virtual worlds, and data-dense Web3 products.',
})
