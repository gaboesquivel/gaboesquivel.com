import {
  experimental_composeSpec,
  experimental_createEvaluator,
} from "@json-render/core";
import type { Spec } from "@json-render/core";
import { z } from "zod";

export interface SlotState {
  day: string | null;
  days: string[];
  duration: 15 | 30 | null;
  slots: Record<"15" | "30", Record<string, string[]>>;
  timeZone: string;
}

const slotStateRecord = (state: SlotState) =>
  state as unknown as Record<string, unknown>;

const catalog = {
  data: {
    components: {
      Days: {
        props: z.object({
          days: z.object({ $state: z.literal("/days") }),
        }),
      },
      Duration: {
        props: z.object({
          choices: z.tuple([z.literal(15), z.literal(30)]),
        }),
      },
      Stack: {
        props: z.object({}),
        slots: ["default"],
      },
      Times: {
        props: z.object({
          slots: z.object({ $state: z.literal("/slots") }),
        }),
      },
    },
  },
  validate: (spec: unknown) => {
    const allowed = new Set(["Stack", "Duration", "Days", "Times"]);
    if (!spec || typeof spec !== "object" || !("elements" in spec)) {
      return { success: false };
    }
    const elements = (spec as { elements?: Record<string, { type?: string }> })
      .elements;
    const success = Object.values(elements ?? {}).every((element) =>
      allowed.has(element.type ?? "")
    );
    return { success };
  },
};

const candidates = [
  {
    description: "Column of duration, days, and times",
    element: { props: {}, type: "Stack" },
    id: "stack",
    maxUses: 1,
    root: true,
  },
  {
    description: "Choose 15 or 30 minutes",
    element: { props: { choices: [15, 30] }, type: "Duration" },
    id: "duration",
    maxUses: 1,
    resource: "duration",
    root: false,
  },
  {
    description: "Choose a day that has open time",
    element: { props: { days: { $state: "/days" } }, type: "Days" },
    id: "days",
    maxUses: 1,
    root: false,
  },
  {
    description: "Choose a start time",
    element: { props: { slots: { $state: "/slots" } }, type: "Times" },
    id: "times",
    maxUses: 1,
    root: false,
  },
];

export const fixedSpec = (state: SlotState): Spec => ({
  elements: {
    days: {
      props: { days: { $state: "/days" } },
      type: "Days",
    },
    duration: {
      props: { choices: [15, 30] },
      type: "Duration",
    },
    stack: {
      children: ["duration", "days", "times"],
      props: {},
      type: "Stack",
    },
    times: {
      props: { slots: { $state: "/slots" } },
      type: "Times",
    },
  },
  root: "stack",
  state: slotStateRecord(state),
});

const hasPicker = (spec: Spec) => {
  const types = new Set(
    Object.values(spec.elements).map((element) => element.type)
  );
  return types.has("Duration") && types.has("Days") && types.has("Times");
};

export const layoutIsForced = ({
  dayCount,
  duration,
}: {
  dayCount: number;
  duration: 15 | 30 | null;
}) => duration === 15 || duration === 30 || dayCount <= 1;

export const jevEvaluatorConfig = () => {
  const apiKey = process.env.AI_GATEWAY_API_KEY?.trim();
  if (!apiKey) return null;
  return { apiKey, model: "typesafe-ai/jev" as const };
};

export const composeSlots = async ({
  duration,
  state,
}: {
  duration: 15 | 30 | null;
  state: SlotState;
}) => {
  const fixed = fixedSpec(state);
  const jev = jevEvaluatorConfig();
  if (layoutIsForced({ dayCount: state.days.length, duration }) || !jev) {
    return fixed;
  }
  try {
    const evaluate = experimental_createEvaluator(jev);
    let spec = fixed;
    for await (const event of experimental_composeSpec({
      candidates,
      catalog,
      evaluate,
      initialState: slotStateRecord(state),
      maxElements: 4,
      prompt:
        "Stack duration, then days, then times. Do not add fields, buttons, or clock labels.",
    })) {
      if (event.type !== "complete") continue;
      if (
        event.stopReason === "unavailable" ||
        !event.spec ||
        !hasPicker(event.spec)
      ) {
        spec = fixed;
      } else {
        spec = {
          ...event.spec,
          state: slotStateRecord(state),
        };
      }
    }
    return spec;
  } catch {
    return fixed;
  }
};
