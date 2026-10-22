"use client";

import type { CompositionEnvelope } from "lib/genui/envelope";
import dynamic from "next/dynamic";
import Link from "next/link";

const OpenUiExperienceRenderer = dynamic(
  () =>
    import("./openui-renderer").then(
      (module) => module.OpenUiExperienceRenderer
    ),
  {
    loading: () => (
      <div
        aria-busy="true"
        className="min-h-[12rem] rounded-md border border-hairline bg-black/40 p-6"
      >
        Loading experience…
      </div>
    ),
    ssr: false,
  }
);

export const GeneratedRegion = ({
  complete,
  envelope,
  error,
  isStreaming,
}: {
  complete: boolean;
  envelope: CompositionEnvelope | null;
  error: string | null;
  isStreaming: boolean;
}) => {
  const announced =
    error ??
    (complete ? "Results ready." : isStreaming ? "Loading results." : "");

  return (
    <section aria-live="polite" className="min-h-[12rem] space-y-4">
      <p className="sr-only" role="status">
        {announced}
      </p>
      {error && (
        <div className="rounded-md border border-hairline p-4 text-sm text-neutral-200">
          <p>{error}</p>
          <p className="mt-2 text-neutral-400">
            Try{" "}
            <Link className="text-accent" href="/work">
              /work
            </Link>
            ,{" "}
            <Link className="text-accent" href="/cv">
              /cv
            </Link>
            , or{" "}
            <Link className="text-accent" href="/contact">
              /contact
            </Link>
            .
          </p>
        </div>
      )}
      {envelope && (
        <OpenUiExperienceRenderer
          complete={complete}
          fallbackText={envelope.fallbackText}
          isStreaming={isStreaming}
          records={envelope.records}
          response={envelope.openuiText}
        />
      )}
    </section>
  );
};
