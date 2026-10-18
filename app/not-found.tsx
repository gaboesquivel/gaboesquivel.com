import { RecoveryPage } from 'components/shared/recovery-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found | Gabo Esquivel',
  description:
    "This address isn't a page on the site. Home is the overview, and explore is the directory of every page.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <RecoveryPage title="Page not found">
      This address isn't a page on the site. Home is the overview, and explore
      is the directory of every page.
    </RecoveryPage>
  )
}
