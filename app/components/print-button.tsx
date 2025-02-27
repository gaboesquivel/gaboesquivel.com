'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  const handlePrint = () => window.print()

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="print:hidden flex items-center gap-2 text-sm hover:text-accent transition-colors"
    >
      Print <Printer className="h-3.5 w-3.5" />
    </button>
  )
} 