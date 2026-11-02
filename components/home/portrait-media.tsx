import { ogColors } from "lib/og/constants";
import {
  portraitHeight,
  portraitOverlay,
  portraitSrc,
  portraitWidth,
} from "lib/portrait-overlay";
import Image from "next/image";

const { dots, label, labels, strokeGroups } = portraitOverlay;

export function PortraitMedia() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <Image
        src={portraitSrc}
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
        {strokeGroups.map((group) => (
          <g
            key={group.paths[0].d}
            stroke={ogColors.accent}
            strokeWidth={group.strokeWidth}
            opacity={group.opacity}
          >
            {group.paths.map((path) => (
              <path
                key={path.d}
                d={path.d}
                strokeWidth={
                  "strokeWidth" in path ? path.strokeWidth : undefined
                }
                opacity={"opacity" in path ? path.opacity : undefined}
              />
            ))}
          </g>
        ))}
        <g fill={ogColors.accent} opacity={dots.opacity}>
          {dots.points.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={dots.r} />
          ))}
        </g>
        {labels.map((item) => (
          <g key={item.text}>
            <path
              d={item.tick}
              stroke={ogColors.accent}
              opacity={label.tickOpacity}
              strokeWidth={label.strokeWidth}
            />
            <circle
              {...item.marker}
              fill={ogColors.accent}
              opacity={label.markerOpacity}
            />
            <text
              x={item.textX}
              y={item.baselineY}
              fill={ogColors.gray}
              fontSize={label.fontSize}
              fontFamily="ui-monospace, monospace"
            >
              {item.text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
