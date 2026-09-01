'use client'

import { FileText } from 'lucide-react'

export function PrintButton({ file }: { file: string }) {
  return (
    <a
      href={`/${file}`}
      download={file}
      className="print:hidden flex items-center gap-2 text-sm hover:text-accent transition-colors"
    >
      PDF <FileText className="h-3.5 w-3.5" />
    </a>
  )
}
