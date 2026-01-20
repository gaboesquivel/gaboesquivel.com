import { TechList } from 'components/tech/tech-list'
import type { Metadata } from 'next'

export default function TechStackPage() {
  return <TechList heading="Gabo's Tech Stack" />
}

export const metadata: Metadata = {
  title: 'Tech Stack | Gabo Esquivel',
  openGraph: {
    title: 'Tech Stack | Gabo Esquivel',
    type: 'website',
  },
}
