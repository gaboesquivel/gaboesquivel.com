import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Multimodal AI on mobile',
    paragraphs: [
      "For LegalAgent I shipped the Expo client: OpenAI's Realtime API for voice, the Vercel AI SDK for chat, and bilingual transcription and synthesis in Spanish and English.",
    ],
    projectSlugs: ['legal-agent'],
  },
  {
    heading: 'Regulated mobile banking',
    paragraphs: [
      'At Wink I built the first version of the React Native app, including a native bridge for biometric authentication, for a bank whose customers never visit a branch.',
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Blockchain messaging, games, and retail AR',
    paragraphs: [
      "On Sense.chat I optimized the React Native messaging app and integrated EOS mainnet wallet and transaction flows. I built Fantasy Top Shots in React Native and Expo for Flow and NBA Top Shot NFT gameplay. On Tractor Supply I built the ViroAR feature that previews products in the customer's own space.",
    ],
    projectSlugs: ['make-sense-labs', 'fantasy-top-shots', 'tractor-supply'],
  },
]

export default function MobileExperiencePage() {
  return (
    <CapabilityPage
      title="Mobile engineering"
      intro={[
        'I build cross-platform mobile products with React Native and Expo. That has covered a regulated bank, a blockchain messenger, a retail AR feature, an NBA Top Shot game, and a voice assistant for lawyers.',
        'Mobile keeps pulling me past the app itself: a native bridge for biometrics, a wallet session, a realtime audio pipeline, the services underneath. The app is rarely the whole job.',
      ]}
      sections={sections}
      postSlugs={[
        '2025-09-why-expo',
        '2026-01-evolution-ai-ux',
        '2025-05-typescript-rag',
      ]}
      writingTitle="Writing about mobile products"
    />
  )
}

export const metadata: Metadata = {
  title: 'Mobile Engineering | Gabo Esquivel',
  description:
    'Mobile engineering with React Native and Expo across neobank apps, biometric authentication, blockchain messaging, retail AR, and AI assistants.',
  openGraph: {
    title: 'Mobile Engineering | Gabo Esquivel',
    description:
      'React Native and Expo products across regulated finance, blockchain, retail, games, and multimodal AI.',
    type: 'website',
  },
}
