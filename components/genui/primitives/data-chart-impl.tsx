"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "components/ui/chart";
import type { ChartConfig } from "components/ui/chart";
import type { ChartKind, GenuiDataset } from "lib/genui/dataset";
import { useSyncExternalStore } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

const sliceColors = [
  "var(--color-accent)",
  "oklch(0.87 0 0)",
  "oklch(0.72 0.08 190)",
  "oklch(0.556 0 0)",
  "oklch(0.6 0.06 190)",
  "oklch(0.439 0 0)",
  "oklch(0.48 0.05 190)",
  "oklch(0.371 0 0)",
];

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Animation is opt-in: the server snapshot assumes reduced motion. */
const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true
  );

const chartPoints = (dataset: GenuiDataset) => {
  const label = dataset.columns.find((column) => column.type === "text");
  const value = dataset.columns.find((column) => column.type === "number");
  if (!label || !value) return null;
  return {
    labelKey: label.key,
    labelName: label.label,
    points: dataset.rows.map((row) => ({
      label: String(row[label.key] ?? ""),
      value: Number(row[value.key] ?? 0),
    })),
    valueKey: value.key,
    valueName: value.label,
  };
};

const DataChartImpl = ({
  dataset,
  kind,
}: {
  dataset: GenuiDataset;
  kind: ChartKind;
}) => {
  const reduced = usePrefersReducedMotion();
  const shape = chartPoints(dataset);
  if (!shape) return null;
  const config = {
    value: { color: "var(--color-accent)", label: shape.valueName },
  } satisfies ChartConfig;
  const animate = !reduced;
  const axis = {
    axisLine: false,
    stroke: "var(--color-neutral-400, #a3a3a3)",
    tickLine: false,
  };

  return (
    <ChartContainer className="h-72 w-full" config={config}>
      {kind === "pie" ? (
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent nameKey="label" />} />
          <Pie
            data={shape.points}
            dataKey="value"
            isAnimationActive={animate}
            nameKey="label"
            stroke="none"
          >
            {shape.points.map((point, index) => (
              <Cell
                fill={sliceColors[index % sliceColors.length]}
                key={point.label}
              />
            ))}
          </Pie>
        </PieChart>
      ) : kind === "line" ? (
        <LineChart data={shape.points} margin={{ left: 4, right: 12 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.14)" vertical={false} />
          <XAxis dataKey="label" {...axis} />
          <YAxis allowDecimals={false} width={32} {...axis} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="value"
            dot
            isAnimationActive={animate}
            stroke="var(--color-value)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      ) : kind === "area" ? (
        <AreaChart data={shape.points} margin={{ left: 4, right: 12 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.14)" vertical={false} />
          <XAxis dataKey="label" {...axis} />
          <YAxis allowDecimals={false} width={32} {...axis} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="value"
            fill="var(--color-value)"
            fillOpacity={0.25}
            isAnimationActive={animate}
            stroke="var(--color-value)"
            type="monotone"
          />
        </AreaChart>
      ) : (
        <BarChart data={shape.points} margin={{ left: 4, right: 12 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.14)" vertical={false} />
          <XAxis dataKey="label" interval={0} {...axis} />
          <YAxis allowDecimals={false} width={32} {...axis} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="value"
            fill="var(--color-value)"
            isAnimationActive={animate}
            radius={4}
          />
        </BarChart>
      )}
    </ChartContainer>
  );
};

export default DataChartImpl;
