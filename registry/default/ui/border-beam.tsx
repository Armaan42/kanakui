import * as React from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps extends React.ComponentProps<"div"> {
  /** Time for the beam to travel once around the border, as a CSS duration. */
  duration?: string
  /** Beam color. Any CSS color. */
  color?: string
  /** Border thickness in pixels. */
  borderWidth?: number
  /** Length of the beam, as a percentage of the full turn (0–100). */
  length?: number
}

/**
 * A light that travels around the border of its parent. Place it inside a
 * `relative` element with rounded corners; it follows the parent's radius.
 * Decorative only, and hidden when the user prefers reduced motion.
 */
function BorderBeam({
  className,
  duration = "6s",
  color = "var(--foreground)",
  borderWidth = 1.5,
  length = 12,
  style,
  ...props
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="border-beam"
      className={cn("pointer-events-none absolute inset-0 animate-border-beam rounded-[inherit] motion-reduce:hidden", className)}
      style={{
        "--border-beam-duration": duration,
        padding: borderWidth,
        background: `conic-gradient(from var(--border-beam-angle), transparent 0%, ${color} ${length}%, transparent ${length * 2}%) border-box`,
        mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { BorderBeam, type BorderBeamProps }
