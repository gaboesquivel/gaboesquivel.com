import { describe, expect, test } from "bun:test";

import {
  createLibrary,
  createParser,
  defineComponent,
} from "@openuidev/react-lang";
import { z } from "zod";

import { genuiDependencyPins } from "./dependency-pins";

describe("genui compatibility gate", () => {
  test("pinned OpenUI parses a minimal fixture", () => {
    const Probe = defineComponent({
      component: ({ props }) => props.label,
      description: "compat probe",
      name: "Probe",
      props: z.object({ label: z.string() }),
    });
    const library = createLibrary({
      components: [Probe],
      root: "Probe",
    });
    const parser = createParser(library.toJSONSchema(), library.root);
    const result = parser.parse('root = Probe("ok")');
    expect(result.meta.errors).toEqual([]);
    expect(genuiDependencyPins["@openuidev/react-lang"]).toBe("1.0.1");
  });

  test("TypeSafe SDK loads", async () => {
    const { TypeSafeClient } = await import("@typesafe-ai/sdk");
    expect(typeof TypeSafeClient).toBe("function");
    expect(genuiDependencyPins["@typesafe-ai/sdk"]).toBe("0.7.0");
  });

  test("Sonnet model id matches connect configuration", async () => {
    const { SONNET_GATEWAY_MODEL } = await import("../connect/sonnet-model");
    expect(SONNET_GATEWAY_MODEL).toBe(genuiDependencyPins.sonnetGatewayModel);
  });
});
