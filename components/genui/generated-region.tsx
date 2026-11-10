"use client";

import { Shimmer } from "components/ai-elements/shimmer";
import { useSiteSearchOptional } from "components/search/site-search-context";
import type { SearchRecord } from "components/search/types";
import { press } from "components/shared/motion";
import type { CompositionEnvelope } from "lib/genui/envelope";
import { curatedGenuiQuerySuggestions } from "lib/genui/query-suggestions";
import { announcementFor, searchError } from "lib/search/compose-outcome";
import type { SearchError, SearchStatus } from "lib/search/compose-outcome";
import {
  browseLinks,
  composeStageCopy,
  EXAMPLE_CHIP_COUNT,
  searchCopy,
  sourceLine,
} from "lib/search/copy";
import type { ComposeStage } from "lib/search/copy";
import { rankSearchRecords } from "lib/search/rank-records";
import { cn } from "lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useMemo, useState } from "react";

const SHIMMER_DELAY_MS = 300;

/**
 * The quiet status line: the stage label (or "Composing results…") as static
 * text at once, the shimmer only after 300ms (static under reduced motion),
 * and Stop beside it, never inside the field. The live region announces
 * "Composing results…" once; stage changes are visible but not announced.
 */
const ProgressLine = ({
  onStop,
  stage,
}: {
  onStop?: () => void;
  stage?: ComposeStage | null;
}) => {
  const [shimmer, setShimmer] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setShimmer(true), SHIMMER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);
  const label = stage ? composeStageCopy[stage] : searchCopy.composing;
  return (
    <div className="flex min-h-11 items-center justify-between gap-4">
      {/* `text-*` utilities would be merged away from `text-shimmer`, so size
          and colour sit on the wrapper. */}
      <div aria-hidden="true">
        {shimmer ? <Shimmer>{label}</Shimmer> : <p>{label}</p>}
      </div>
      {onStop ? (
        <button
          className={cn(
            "min-h-11 shrink-0 cursor-pointer rounded-md border border-hairline px-4 text-neutral-200 hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent",
            press
          )}
          onClick={onStop}
          type="button"
        >
          {searchCopy.stop}
        </button>
      ) : null}
    </div>
  );
};

/** The waiting box before any part of a result has streamed in. */
const ComposingLine = ({
  onStop,
  stage,
}: {
  onStop?: () => void;
  stage?: ComposeStage | null;
}) => (
  <div className="min-h-[12rem] rounded-md border border-hairline px-6 py-4 text-sm text-neutral-300">
    <ProgressLine onStop={onStop} stage={stage} />
  </div>
);

const OpenUiExperienceRenderer = dynamic(
  () =>
    import("./openui-renderer").then(
      (module) => module.OpenUiExperienceRenderer
    ),
  { loading: () => <ComposingLine />, ssr: false }
);

/** Counts the projects and posts a settled result cites. */
const sourceLineFor = (envelope: CompositionEnvelope) =>
  sourceLine({
    posts: envelope.records.filter((record) => record.kind === "post").length,
    projects: envelope.records.filter((record) => record.kind === "project")
      .length,
  });

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

const textLink =
  "text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent";

const BrowseLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
  <p className="text-neutral-400">
    {searchCopy.browse}{" "}
    {browseLinks.map((link, index) => (
      <span key={link.href}>
        <Link className={textLink} href={link.href} onClick={onNavigate}>
          {link.label}
        </Link>
        {index < browseLinks.length - 2
          ? ", "
          : index === browseLinks.length - 2
            ? ", or "
            : "."}
      </span>
    ))}
  </p>
);

const KeywordMatches = ({
  matches,
  onNavigate,
}: {
  matches: SearchRecord[];
  onNavigate?: () => void;
}) =>
  matches.length ? (
    <div>
      <h2 className="text-sm text-neutral-400">{searchCopy.keywordMatches}</h2>
      <ul className="mt-2 flex flex-col gap-2">
        {matches.map((record) => (
          <li key={`${record.href}|${record.title}`}>
            <Link className={textLink} href={record.href} onClick={onNavigate}>
              {record.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

const outcomePanel =
  "flex flex-col gap-4 rounded-md border border-hairline p-4 text-sm text-neutral-200";

const ErrorPanel = ({
  error,
  matches,
  onNavigate,
  onRetry,
}: {
  error: SearchError;
  matches: SearchRecord[];
  onNavigate?: () => void;
  onRetry?: () => void;
}) => (
  <div className={outcomePanel}>
    <p>{error.message}</p>
    {onRetry ? (
      <button
        className={`self-start ${textLink}`}
        onClick={onRetry}
        type="button"
      >
        {searchCopy.retry}
      </button>
    ) : null}
    <KeywordMatches matches={matches} onNavigate={onNavigate} />
    <BrowseLinks onNavigate={onNavigate} />
  </div>
);

const EmptyPanel = ({
  matches,
  onExample,
  onNavigate,
}: {
  matches: SearchRecord[];
  onExample?: (query: string, label: string) => void;
  onNavigate?: () => void;
}) => (
  <div className={outcomePanel}>
    <p>{searchCopy.empty}</p>
    <KeywordMatches matches={matches} onNavigate={onNavigate} />
    {onExample ? (
      <div>
        <p className="text-neutral-400">{searchCopy.emptyExamples}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {curatedGenuiQuerySuggestions
            .slice(0, EXAMPLE_CHIP_COUNT)
            .map((example) => (
              <li key={example.query}>
                <button
                  className="min-h-11 cursor-pointer rounded-lg border border-hairline px-3 py-2 text-left text-neutral-200 transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                  onClick={() => onExample(example.query, example.label)}
                  type="button"
                >
                  {example.label}
                </button>
              </li>
            ))}
        </ul>
      </div>
    ) : null}
    <BrowseLinks onNavigate={onNavigate} />
  </div>
);

const StoppedPanel = ({ onRetry }: { onRetry?: () => void }) => (
  <div className={outcomePanel}>
    <p>{searchCopy.stopped}</p>
    {onRetry ? (
      <button
        className={`self-start ${textLink}`}
        onClick={onRetry}
        type="button"
      >
        {searchCopy.retry}
      </button>
    ) : null}
  </div>
);

/**
 * The shared search outcome region (homepage and dialog): one
 * live region, the status line with Stop, the generated result with its
 * source line, and the explicit empty, error and stopped states with keyword
 * matches for the submitted text.
 */
export const GeneratedRegion = ({
  envelope,
  error,
  onExample,
  onNavigate,
  onRetry,
  onStop,
  revealKey,
  stage,
  status,
  submitted = "",
}: {
  envelope: CompositionEnvelope | null;
  error: SearchError | null;
  onExample?: (query: string, label: string) => void;
  onNavigate?: () => void;
  onRetry?: () => void;
  /** Aborts the request in flight; shown beside the status line. */
  onStop?: () => void;
  /** Changes per request, so each new result reveals once. */
  revealKey?: number | string;
  stage?: ComposeStage | null;
  status: SearchStatus;
  submitted?: string;
}) => {
  const records = useSiteSearchOptional()?.records;
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
  const reportFailure = (message: string) => {
    if (!envelope) return;
    setRenderFailure((current) =>
      current?.envelope === envelope ? current : { envelope, message }
    );
  };

  const shownStatus: SearchStatus = failure ? "error" : status;
  const shownError =
    failure && status !== "error"
      ? { ...searchError("failed"), message: failure }
      : error;
  const matches = useMemo(
    () =>
      (shownStatus === "error" || shownStatus === "empty") && records
        ? rankSearchRecords(records, submitted)
        : [],
    [records, shownStatus, submitted]
  );
  const waiting = status === "composing" && !envelope?.openuiText;
  const showEnvelope =
    envelope && !failure && (status === "result" || status === "composing");

  return (
    <section
      aria-busy={status === "composing"}
      className="min-h-[12rem] space-y-4"
    >
      <p aria-live="polite" className="sr-only" role="status">
        {announcementFor({ error: shownError, status: shownStatus })}
      </p>
      {shownStatus === "error" && shownError ? (
        <ErrorPanel
          error={shownError}
          matches={matches}
          onNavigate={onNavigate}
          onRetry={onRetry}
        />
      ) : null}
      {shownStatus === "empty" ? (
        <EmptyPanel
          matches={matches}
          onExample={onExample}
          onNavigate={onNavigate}
        />
      ) : null}
      {shownStatus === "stopped" ? <StoppedPanel onRetry={onRetry} /> : null}
      {waiting ? <ComposingLine onStop={onStop} stage={stage} /> : null}
      {status === "composing" && !waiting ? (
        <div className="text-sm text-neutral-300">
          <ProgressLine onStop={onStop} stage={stage} />
        </div>
      ) : null}
      {showEnvelope ? (
        <div className="space-y-4" data-genui-reveal="" key={revealKey}>
          <RegionErrorBoundary
            key={envelope.openuiText}
            onError={() => reportFailure(searchCopy.renderFailed)}
          >
            <OpenUiExperienceRenderer
              complete={status === "result"}
              fallbackText={envelope.fallbackText}
              isStreaming={status === "composing"}
              onRenderFailure={reportFailure}
              datasets={envelope.datasets}
              records={envelope.records}
              response={envelope.openuiText}
            />
          </RegionErrorBoundary>
          {status === "result" && sourceLineFor(envelope) ? (
            <p className="text-xs text-neutral-400" data-search-source="">
              {sourceLineFor(envelope)}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};
