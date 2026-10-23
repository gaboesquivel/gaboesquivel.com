export default function assertTier0(output) {
  const parsed = JSON.parse(output);
  if (parsed.tier !== 0) {
    return {
      pass: false,
      score: 0,
      reason: `expected tier 0, got ${parsed.tier}`,
    };
  }
  if (parsed.jevCalls !== 0 || parsed.modelCalls !== 0) {
    return {
      pass: false,
      score: 0,
      reason: "tier 0 must not invoke Jev or semantic models",
    };
  }
  return { pass: true, score: 1 };
}
