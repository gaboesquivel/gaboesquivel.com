"use client";

import { Shimmer } from "components/ai-elements/shimmer";
import type { CompositionEnvelope } from "lib/genui/envelope";
import { RENDER_FAILED_MESSAGE } from "lib/genui/messages";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useState } from "react";

const LoadingLine = () => (
  <div
    aria-hidden="true"
    className="min-h-[12rem] rounded-md border border-hairline p-6"
  >
    <Shimmer className="text-sm text-neutral-300">Composing results…</Shimmer>
  </div>
);

const OpenUiExperienceRenderer = dynamic(
  () =>
    import("./openui-renderer").then(
      (module) => module.OpenUiExperienceRenderer
    ),
  { loading: LoadingLine, ssr: false }
);

/** Catches failures outside OpenUI's per-element boundaries. */
class RegionErrorBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { failed: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const ErrorPanel = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="rounded-md border border-hairline p-4 text-sm text-neutral-200">
    <p>{message}</p>
    {onRetry && (
      <button
        className="mt-3 text-sm text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
        onClick={onRetry}
        type="button"
      >
        Try again
      </button>
    )}
    <p className="mt-2 text-neutral-400">
      Or browse{" "}
      <Link className="text-accent" href="/work">
        work
      </Link>
      ,{" "}
      <Link className="text-accent" href="/cv">
        the résumé
      </Link>
      , or{" "}
      <Link className="text-accent" href="/contact">
        contact
      </Link>
      .
    </p>
  </div>
);

export const GeneratedRegion = ({
  complete,
  envelope,
  error,
  isStreaming,
  onRetry,
}: {
  complete: boolean;
  envelope: CompositionEnvelope | null;
  error: string | null;
  isStreaming: boolean;
  onRetry?: () => void;
}) => {
  // Render failures are keyed to the envelope that produced them, so a new
  // result clears them without an effect.
  const [renderFailure, setRenderFailure] = useState<{
    envelope: CompositionEnvelope;
    message: string;
  } | null>(null);
  const failure =
    renderFailure && renderFailure.envelope === envelope
      ? renderFailure.message
      : null;
  const shownError = error ?? failure;
  const reportFailure = (message: string) => {
    if (!envelope) return;
    setRenderFailure((current) =>
      current?.envelope === envelope ? current : { envelope, message }
    );
  };

  const announced =
    shownError ??
    (complete ? "Results ready." : isStreaming ? "Loading results." : "");
  const waiting =
    !shownError && !envelope?.openuiText && (isStreaming || !complete);

  return (
    <section aria-busy={waiting} className="min-h-[12rem] space-y-4">
      <p aria-live="polite" className="sr-only" role="status">
        {announced}
      </p>
      {shownError ? (
        <ErrorPanel message={shownError} onRetry={onRetry} />
      ) : null}
      {waiting ? <LoadingLine /> : null}
      {envelope && !failure ? (
        <RegionErrorBoundary
          key={envelope.openuiText}
          onError={() => reportFailure(RENDER_FAILED_MESSAGE)}
        >
          <OpenUiExperienceRenderer
            complete={complete}
            fallbackText={envelope.fallbackText}
            isStreaming={isStreaming}
            onRenderFailure={reportFailure}
            records={envelope.records}
            response={envelope.openuiText}
          />
        </RegionErrorBoundary>
      ) : null}
    </section>
  );
};
