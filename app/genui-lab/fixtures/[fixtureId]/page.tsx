import { GeneratedRegion } from "components/genui/generated-region";
import { GenuiSessionProvider } from "components/genui/genui-session";
import {
  fixtureLabEnabled,
  genuiFixtures,
  isGenuiFixtureId,
} from "lib/genui/fixtures/registry";
import { notFound } from "next/navigation";

export default async function GenuiFixturePage({
  params,
}: {
  params: Promise<{ fixtureId: string }>;
}) {
  if (!fixtureLabEnabled()) notFound();
  const { fixtureId } = await params;
  if (!isGenuiFixtureId(fixtureId)) notFound();
  const fixture = genuiFixtures[fixtureId];
  const width = fixture.containerWidth ?? 1024;

  return (
    <main
      className="min-h-screen bg-black p-6 text-white"
      data-fixture-id={fixtureId}
    >
      <div
        className="max-w-full min-w-0 overflow-x-hidden"
        style={{ margin: "0 auto", maxWidth: width, width: "100%" }}
      >
        <GenuiSessionProvider writesEnabled={false}>
          <GeneratedRegion
            complete={Boolean(fixture.envelope)}
            envelope={fixture.envelope}
            error={fixture.errorMessage ?? null}
            isStreaming={false}
          />
        </GenuiSessionProvider>
      </div>
    </main>
  );
}
