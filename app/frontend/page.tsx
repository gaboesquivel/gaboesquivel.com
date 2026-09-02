import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Trading and auction interfaces',
    paragraphs: [
      'A balance that is already stale and an auction closing while you type both need the screen to stay honest. At Opyn the Next.js trading interface uses React Server Components over Ponder-indexed options data so Arbitrum behavior stays visible. At Bitlauncher the Gnosis auction bidding interface uses wagmi balance subscriptions and Supabase realtime updates.',
    ],
    projectSlugs: ['opyn', 'bitlauncher'],
  },
  {
    heading: 'Immersive and interactive products',
    paragraphs: [
      'A virtual world holding a live wallet session has the same honesty problem. At ZTX I built a WebGL EVM wallet connector with Ethers.js that puts wallet state inside the virtual-world UI. At AMC the YEAH! interactive player ran trivia, interviews, and quizzes inside the film itself. Curated titles carried more than 400 interactive elements each.',
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
        'Interfaces get hard when the state behind them is hard. A balance that is already stale, an auction closing while you type, a virtual world holding a live wallet session: the screen has to be honest about all of it.',
        'React, Next.js, TypeScript, TanStack Query, and Tailwind are how it gets built. Deciding what the interface must tell the truth about, and when, is the part that takes judgment.',
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
