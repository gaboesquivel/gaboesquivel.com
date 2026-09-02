import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

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
      'Sense.chat needed an EOS wallet inside a messenger: I optimized the React Native app and integrated mainnet wallet and transaction flows.',
      'Fantasy Top Shots needed NBA Top Shot collections to work as a roster: I built the React Native and Expo game on Flow for the 2022 hackathon.',
      'Tractor Supply needed product previews inside an existing retail app: I built the ViroAR feature for those previews.',
    ],
    projectSlugs: ['make-sense-labs', 'fantasy-top-shots', 'tractor-supply'],
  },
]

export default function MobileExperiencePage() {
  return (
    <CapabilityPage
      title="Mobile engineering"
      intro={[
        'The app is rarely the whole job. Mobile keeps pulling past the screen: a native bridge for biometrics, a wallet session, a realtime audio pipeline, the services underneath.',
      ]}
      sections={sections}
      postSlugs={['2025-09-why-expo', '2026-01-evolution-ai-ux']}
      writingTitle="Writing about mobile products"
    />
  )
}

export const metadata = pageMetadata({
  title: 'Mobile Engineering | Gabo Esquivel',
  description:
    'Mobile engineering with React Native and Expo across neobank apps, biometric authentication, blockchain messaging, retail AR, and AI assistants.',
})
