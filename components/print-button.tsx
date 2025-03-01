'use client'

import { FileText } from 'lucide-react'

export function PrintButton() {
  return (
    <a
      href="/gaboesquivel-cv.pdf"
      download="gaboesquivel-cv.pdf"
      className="print:hidden flex items-center gap-2 text-sm hover:text-accent transition-colors"
    >
      PDF <FileText className="h-3.5 w-3.5" />
    </a>
  )
}