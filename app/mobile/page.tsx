import { CapabilityPage } from 'components/work/capability-page'
import { pageMetadata } from 'lib/page-metadata'

const sections = [
  {
    heading: 'Multimodal AI on mobile',
    paragraphs: [
      "LegalAgent's mobile client had to handle voice and chat in two languages. I shipped it in Expo around OpenAI's Realtime API for voice and the Vercel AI SDK for chat, with bilingual transcription and synthesis in Spanish and English.",
    ],
    projectSlugs: ['legal-agent'],
  },
  {
    heading: 'Regulated mobile banking',
    paragraphs: [
      "Wink was banking without a branch visit, so identity checks couldn't depend on one either. I built biometric authentication through a React Native native bridge, which let KYC and login happen on the phone.",
    ],
    projectSlugs: ['wink'],
  },
  {
    heading: 'Blockchain messaging and retail AR',
    paragraphs: [
      'Sense.chat is a secure chat app built around data privacy, and it needed an EOS wallet inside the messenger. I optimized the React Native app and integrated mainnet wallet and transaction flows.',
      'Tractor Supply already had a retail app and wanted product previews, so as a consultant I built the ViroAR feature for them.',
    ],
    projectSlugs: ['make-sense-labs', 'tractor-supply'],
  },
]

export default function MobileExperiencePage() {
  return (
    <CapabilityPage
      title="Mobile engineering"
      intro={[
        'Mobile work keeps pulling me past the screen: a native bridge for biometrics, a wallet session inside a messenger, a realtime audio pipeline. I build those layers along with the app.',
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
  path: '/mobile',
})
