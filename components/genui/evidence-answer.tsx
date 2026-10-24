import type { ReactNode } from "react";

export const EvidenceAnswer = ({
  body,
  children,
  sources,
}: {
  body: string;
  children?: ReactNode;
  sources?: ReactNode;
}) => (
  <div className="space-y-8">
    <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-200">
      <p>{body}</p>
      {sources}
    </div>
    {children}
  </div>
);
