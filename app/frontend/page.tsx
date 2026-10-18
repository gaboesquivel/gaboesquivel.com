import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Trading and auction interfaces',
    paragraphs: [
      "Opyn's trading interface had to show what was happening on Arbitrum, so I built it in Next.js with React Server Components over Ponder-indexed protocol data. The Gnosis auctions at Bitlauncher are different: other people's bids land while you're looking at the screen, so that interface runs on wagmi balance subscriptions and Supabase realtime updates.",
    ],
    projectSlugs: ['opyn', 'bitlauncher'],
  },
  {
    heading: 'Immersive and interactive products',
    paragraphs: [
      'ZTX put a wallet inside a virtual world. The React application hosted the world, and the wallet session lived inside the WebGL surface instead of in separate app chrome. At AMC the film itself was the interface: the YEAH! player ran trivia, interviews, and quizzes inside the movie without covering it, and each title carried more than 400 interactive elements.',
    ],
    projectSlugs: ['ztx', 'amc-yeah-tv-facebook-app'],
  },
  {
    heading: 'Data-dense interfaces',
    paragraphs: [
      'Before participants voted for a block producer, they could check how the community rated it, and ratings only help if you can compare them side by side. For EOS Rate I built a radial comparison interface on GraphQL and onchain ratings so the scores sit in one view.',
    ],
    projectSlugs: ['eos-rate'],
  },
]

export default function FrontendExperiencePage() {
  return (
    <CapabilityPage
      title="Frontend engineering"
      intro={[
        "Interfaces get hard when the state behind them is hard: a balance that's already stale, an auction closing while you type, a live wallet session inside a virtual world.",
        'I build them in React, Next.js, TypeScript, TanStack Query, and Tailwind, and most of the design work is deciding what the screen needs to show about that state, and when.',
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
