import { CapabilityPage } from 'components/work/capability-page'
import type { Metadata } from 'next'

const sections = [
  {
    heading: 'Multimodal AI on mobile',
    paragraphs: [
      'For LegalAgent I shipped an Expo assistant with voice, chat, bilingual realtime transcription and synthesis, and RAG for case context, plus a separate admin for access and sources.',
    ],
    projectSlugs: ['legal-agent'],
  },
  {
    heading: 'Regulated mobile banking',
    paragraphs: [
      'As Lead Engineer at Wink I built the first React Native neobank app with a biometric KYC native bridge, partner-bank API integrations, and the AWS backend those flows depend on.',
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Blockchain messaging, games, and retail AR',
    paragraphs: [
      'On Sense.chat I optimized the React Native messaging app and integrated EOS mainnet wallet and transaction flows. I built Fantasy Top Shots in React Native and Expo for Flow and NBA Top Shot NFT gameplay. On Tractor Supply I added ViroAR product previews and TypeScript to an existing retail app.',
    ],
    projectSlugs: ['make-sense-labs', 'fantasy-top-shots', 'tractor-supply'],
  },
]

export default function MobileExperiencePage() {
  return (
    <CapabilityPage
      title="Mobile engineering"
      intro={[
        'I build cross-platform mobile products with React Native and Expo across regulated finance, blockchain messaging, retail, games, and multimodal AI.',
        'The work includes native bridges, authentication, realtime data, voice, retrieval, wallet integrations, and the backend services required to make the mobile experience complete.',
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
