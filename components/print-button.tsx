"use client";

import { FileText } from "lucide-react";

export function PrintButton({ file }: { file: string }) {
  return (
    <a
      href={`/${file}`}
      download={file}
      className="flex items-center gap-2 text-sm transition-colors hover:text-accent print:hidden preview-print:hidden"
    >
      PDF <FileText className="h-3.5 w-3.5" />
    </a>
  );
}
