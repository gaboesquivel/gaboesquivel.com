import { GeneratedRegion } from "components/genui/generated-region";
import {
  fixtureLabEnabled,
  genuiFixtures,
  isGenuiFixtureId,
} from "lib/genui/fixtures/registry";
import { isGenuiWriteScenario } from "lib/genui/fixtures/write-scenarios";
import { notFound } from "next/navigation";

import { LabSearch } from "./lab-search";
import { GenuiLabSession } from "./lab-session";

export default async function GenuiFixturePage({
  params,
  searchParams,
}: {
  params: Promise<{ fixtureId: string }>;
  /** `?writes=<scenario>` enables scripted write states (booking, contact). */
  searchParams: Promise<{ writes?: string | string[] }>;
}) {
  if (!fixtureLabEnabled()) notFound();
  const { fixtureId } = await params;
  if (!isGenuiFixtureId(fixtureId)) notFound();
  const { writes } = await searchParams;
  const scenario = isGenuiWriteScenario(writes) ? writes : null;
  const fixture = genuiFixtures[fixtureId];
  const width = fixture.containerWidth ?? 1024;

  return (
    <main
      className="min-h-screen bg-black p-6 text-white"
      data-fixture-id={fixtureId}
      data-write-scenario={scenario ?? undefined}
    >
      <div
        className="max-w-full min-w-0 overflow-x-hidden"
        style={{ margin: "0 auto", maxWidth: width, width: "100%" }}
      >
        <GenuiLabSession scenario={scenario}>
          {fixture.search ? (
            <LabSearch envelope={fixture.envelope} state={fixture.search} />
          ) : (
            <GeneratedRegion
              envelope={fixture.envelope}
              error={
                fixture.errorMessage
                  ? { kind: "failed", message: fixture.errorMessage }
                  : null
              }
              status={
                fixture.errorMessage
                  ? "error"
                  : fixture.envelope
                    ? "result"
                    : "idle"
              }
            />
          )}
        </GenuiLabSession>
      </div>
    </main>
  );
}
