import * as React from "react"

import { cn } from "@/lib/utils"

interface RetroGridProps extends React.ComponentProps<"div"> {
  /** Tilt of the grid plane, in degrees. */
  angle?: number
  /** Cell size, in pixels. */
  cellSize?: number
}

/**
 * A grid floor receding into the distance that slowly scrolls toward the
 * viewer. Fills its positioned parent and fades out at the horizon.
 * Decorative; stops moving when the user prefers reduced motion.
 */
function RetroGrid({ angle = 65, cellSize = 56, className, style, ...props }: RetroGridProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="retro-grid"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]", className)}
      style={{ "--retro-grid-angle": `${angle}deg`, "--retro-grid-cell": `${cellSize}px`, ...style } as React.CSSProperties}
      {...props}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--retro-grid-angle))]">
        <div
          className="animate-retro-grid [margin-left:-200%] h-[300vh] w-[600vw] [transform-origin:100%_0_0] motion-reduce:animate-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--foreground) 18%, transparent) 1px, transparent 0), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 18%, transparent) 1px, transparent 0)",
            backgroundSize: "var(--retro-grid-cell) var(--retro-grid-cell)",
            backgroundRepeat: "repeat",
            inset: "0% 0px",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-background to-transparent to-90%" />
    </div>
  )
}

export { RetroGrid, type RetroGridProps }
