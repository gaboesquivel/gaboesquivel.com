import type { Metadata } from 'next'
import { ConnectPageContent } from '../connect/connect-page-content'

export default function ContactPage() {
  return <ConnectPageContent />
}

export const metadata: Metadata = {
  title: 'Work with Gabo Esquivel',
  description:
    'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.',
  alternates: {
    canonical: '/connect',
  },
  openGraph: {
    title: 'Work with Gabo Esquivel',
    description:
      'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work with Gabo Esquivel',
    description:
      'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.',
  },
}
