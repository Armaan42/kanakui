import * as React from "react"

import { cn } from "@/lib/utils"

interface DotPatternProps extends React.ComponentProps<"svg"> {
  /** Distance between dots, in pixels. */
  spacing?: number
  /** Dot radius, in pixels. */
  radius?: number
  /** Fade the pattern out toward the edges. */
  fade?: boolean
}

/**
 * A repeating dot grid that fills its positioned parent. Dots use
 * `currentColor`, so set the color with a text class, e.g. `text-border`.
 */
function DotPattern({ spacing = 16, radius = 1, fade = false, className, style, ...props }: DotPatternProps) {
  // useId output may contain characters that break `url(#id)`; keep it safe.
  const id = `dot-pattern-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <svg
      aria-hidden="true"
      data-slot="dot-pattern"
      className={cn("pointer-events-none absolute inset-0 size-full text-foreground/15", className)}
      style={
        fade
          ? { maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)", ...style }
          : style
      }
      {...props}
    >
      <defs>
        <pattern id={id} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={spacing / 2} cy={spacing / 2} r={radius} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export { DotPattern, type DotPatternProps }
