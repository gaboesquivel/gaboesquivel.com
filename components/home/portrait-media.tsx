import { ogColors } from "lib/og/constants";
import Image from "next/image";

const portraitWidth = 1433;
const portraitHeight = 1098;
/** Linework was tuned on the former left crop; full-frame raster keeps the same offsets. */
const geometryX = 220;

const labels = ["PRODUCT", "DESIGN", "ENGINEERING", "DELIVERY"];
const labelStartY = 268;
const labelStep = 72;
const axisX = 858 + geometryX;
const portraitDots = [
  [1048, 118],
  [1070, 118],
  [1092, 118],
  [1048, 140],
  [1070, 140],
  [1092, 140],
  [1048, 162],
  [1070, 162],
  [1092, 162],
] as const;

/** Geometry in full portrait coordinates (1433×1098); strokes stay off facial pixels. */
export function PortraitMedia() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <Image
        src="/images/gabo-portrait.webp"
        alt="Gabo Esquivel"
        width={portraitWidth}
        height={portraitHeight}
        sizes="(min-width: 1152px) 532px, (min-width: 1024px) 46vw, (min-width: 672px) 672px, 100vw"
        preload
        className="block h-auto w-full"
      />
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${portraitWidth} ${portraitHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 block h-full w-full"
        fill="none"
      >
        <g stroke={ogColors.accent} strokeWidth="1.5" opacity="0.28">
          <path
            d="M 1148 96 A 520 520 0 0 1 1172 712"
            strokeWidth="2"
            opacity="0.32"
          />
          <path d="M 1232 148 V 628" opacity="0.22" />
          <path d="M 1188 200 H 1408 M 1188 272 H 1408 M 1188 344 H 1408 M 1188 416 H 1408" />
        </g>
        <g fill={ogColors.accent} opacity="0.35">
          {portraitDots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx + geometryX} cy={cy} r="2" />
          ))}
        </g>
        <g stroke={ogColors.accent} strokeWidth="1.5" opacity="0.4">
          <path d="M 1288 168 H 1368 M 1328 128 V 208" />
        </g>
        <path
          d={`M ${axisX} 208 V 548`}
          stroke={ogColors.accent}
          strokeWidth="2"
          opacity="0.45"
        />
        {labels.map((label, i) => {
          const y = labelStartY + i * labelStep;
          return (
            <g key={label}>
              <path
                d={`M ${axisX} ${y} H ${axisX + 48}`}
                stroke={ogColors.accent}
                opacity="0.55"
                strokeWidth="2"
              />
              <circle
                cx={axisX}
                cy={y}
                r="4"
                fill={ogColors.accent}
                opacity="0.7"
              />
              <text
                x={axisX + 62}
                y={y + 7}
                fill={ogColors.gray}
                fontSize="22"
                fontFamily="ui-monospace, monospace"
              >
                {label}
              </text>
            </g>
          );
        })}
        <g stroke={ogColors.accent} strokeWidth="2" opacity="0.5">
          <path d="M 1218 768 H 1242 M 1230 756 V 780" />
        </g>
      </svg>
    </div>
  );
}
