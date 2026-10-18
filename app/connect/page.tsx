import { pageMetadata } from 'lib/page-metadata'
import { ConnectPageContent } from './connect-page-content'

export default function ContractWorkPage() {
  return <ConnectPageContent />
}

export const metadata = pageMetadata({
  title: 'Work with Gabo Esquivel',
  description:
    'Open to direct hire, international hire, or contracting through Blockmatic Labs LLC. Cannot work under W-2. Based in Costa Rica, working US Mountain Time.',
})
