import * as React from "react"

import { cn } from "@/lib/utils"

interface NoiseBackgroundProps extends React.ComponentProps<"div"> {
  /** Opacity of the grain, 0–1. */
  intensity?: number
  /** Grain size: higher values give finer grain. */
  frequency?: number
}

/**
 * A film-grain texture over its positioned parent, drawn with an SVG
 * turbulence filter (no image to download). Adds depth to flat or gradient
 * surfaces. Decorative and static.
 */
function NoiseBackground({ intensity = 0.08, frequency = 0.8, className, style, ...props }: NoiseBackgroundProps) {
  const id = `noise-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <div
      aria-hidden="true"
      data-slot="noise-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden mix-blend-overlay", className)}
      style={{ opacity: intensity, ...style }}
      {...props}
    >
      <svg className="size-full">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={3} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  )
}

export { NoiseBackground, type NoiseBackgroundProps }
