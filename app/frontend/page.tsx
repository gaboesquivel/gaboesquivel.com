import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Trading and auction interfaces',
    paragraphs: [
      'At Opyn I built the Next.js trading interface on Ponder-indexed options data so positions and protocol state stay visible without hiding Arbitrum behavior. At Bitlauncher I built the Gnosis auction bidding UI with wagmi balance subscriptions and Supabase realtime updates for bids, bridges, and wallets.',
    ],
    projectSlugs: ['opyn', 'bitlauncher'],
  },
  {
    heading: 'Immersive and interactive products',
    paragraphs: [
      'At ZTX I built a WebGL EVM wallet connector with Ethers.js so wallet state lives inside the virtual-world UI. At AMC I led the YEAH! Facebook streaming frontend, with Brightcove playback and in-player trivia, interviews, and quizzes as part of the film.',
    ],
    projectSlugs: ['ztx', 'amc-yeah-tv-facebook-app'],
  },
  {
    heading: 'Data-dense interfaces',
    paragraphs: [
      'For EOS Rate I built a radial comparison interface on GraphQL and onchain ratings so block producer scores stay comparable in one view.',
    ],
    projectSlugs: ['eos-rate'],
  },
]

export default function FrontendExperiencePage() {
  return (
    <CapabilityPage
      title="Frontend engineering"
      intro={[
        'I build interfaces for complex products where state, performance, and progressive disclosure matter. The work includes financial applications, wallet flows, interactive media, virtual worlds, and data-rich AI and Web3 products.',
        'React, Next.js, TypeScript, TanStack Query, Tailwind, and component systems are implementation tools. The engineering work is deciding how product state moves through them and what the interface needs to make clear.',
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

export const metadata: Metadata = {
  title: 'Frontend Engineering | Gabo Esquivel',
  description:
    'Frontend engineering for trading interfaces, wallet flows, interactive video, virtual worlds, and data-dense Web3 products.',
  openGraph: {
    title: 'Frontend Engineering | Gabo Esquivel',
    description:
      'React, Next.js, and TypeScript interfaces for complex financial, Web3, media, and AI products.',
    type: 'website',
  },
}
