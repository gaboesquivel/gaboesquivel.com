import { ogColors } from "lib/og/constants";
import Image from "next/image";

const labels = ["PRODUCT", "DESIGN", "ENGINEERING", "DELIVERY"];
const labelStartY = 268;
const labelStep = 72;
const axisX = 858;
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

/** Geometry in cropped portrait coordinates (1213×1098); strokes stay off facial pixels. */
export function PortraitMedia() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <Image
        src="/images/home/portrait-v2-1213.webp"
        alt="Gabo Esquivel"
        width={1213}
        height={1098}
        sizes="(min-width: 1152px) 532px, (min-width: 1024px) 46vw, (min-width: 672px) 672px, 100vw"
        preload
        className="block h-auto w-full"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1213 1098"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 block h-full w-full"
        fill="none"
      >
        <g stroke={ogColors.accent} strokeWidth="1.5" opacity="0.28">
          <path
            d="M 928 96 A 520 520 0 0 1 952 712"
            strokeWidth="2"
            opacity="0.32"
          />
          <path d="M 1012 148 V 628" opacity="0.22" />
          <path d="M 968 200 H 1188 M 968 272 H 1188 M 968 344 H 1188 M 968 416 H 1188" />
        </g>
        <g fill={ogColors.accent} opacity="0.35">
          {portraitDots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />
          ))}
        </g>
        <g stroke={ogColors.accent} strokeWidth="1.5" opacity="0.4">
          <path d="M 1068 168 H 1148 M 1108 128 V 208" />
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
          <path d="M 998 768 H 1022 M 1010 756 V 780" />
        </g>
      </svg>
    </div>
  );
}
