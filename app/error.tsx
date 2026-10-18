'use client'

import { RecoveryPage } from 'components/shared/recovery-page'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <RecoveryPage
      title="This page didn't load"
      documentTitle="This page didn't load | Gabo Esquivel"
      onRetry={retry}
    >
      This page failed while loading. Try again, or go to home or explore.
    </RecoveryPage>
  )
}
