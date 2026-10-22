"use client";

import { press } from "components/shared/motion";
import { cn } from "lib/utils";
import { FileText } from "lucide-react";

export function PrintButton({ file }: { file: string }) {
  return (
    <a
      href={`/${file}`}
      download={file}
      className={cn(
        press,
        "inline-flex min-h-11 items-center gap-2 text-sm hover:text-accent print:hidden preview-print:hidden"
      )}
    >
      PDF <FileText className="h-3.5 w-3.5" />
    </a>
  );
}
