import * as React from "react"

import { cn } from "@/lib/utils"

interface GridPatternProps extends React.ComponentProps<"svg"> {
  /** Cell size, in pixels. */
  size?: number
  /** Cells to fill, as `[column, row]` pairs counted from the top-left. */
  highlight?: [number, number][]
  /** Dash pattern for the lines, e.g. `"4 2"`. Solid by default. */
  dashed?: string
  /** Fade the grid out toward the edges. */
  fade?: boolean
}

/**
 * Grid lines that fill their positioned parent, with optional highlighted
 * cells. Lines use `currentColor`; highlighted cells use the same color at
 * low opacity. Set the color with a text class, e.g. `text-border`.
 */
function GridPattern({ size = 32, highlight = [], dashed, fade = false, className, style, ...props }: GridPatternProps) {
  const id = `grid-pattern-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <svg
      aria-hidden="true"
      data-slot="grid-pattern"
      className={cn("pointer-events-none absolute inset-0 size-full text-foreground/10", className)}
      style={
        fade
          ? { maskImage: "radial-gradient(ellipse at top, #000 20%, transparent 70%)", ...style }
          : style
      }
      {...props}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="currentColor" strokeDasharray={dashed} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {highlight.map(([column, row]) => (
        <rect
          key={`${column}-${row}`}
          x={column * size + 1}
          y={row * size + 1}
          width={size - 1}
          height={size - 1}
          fill="currentColor"
          opacity={0.6}
        />
      ))}
    </svg>
  )
}

export { GridPattern, type GridPatternProps }
