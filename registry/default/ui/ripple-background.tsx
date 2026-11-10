import * as React from "react"

import { cn } from "@/lib/utils"

interface RippleBackgroundProps extends React.ComponentProps<"div"> {
  /** Number of rings. */
  rings?: number
  /** Diameter of the innermost ring, in pixels. */
  size?: number
  /** Extra diameter per ring, in pixels. */
  step?: number
}

/**
 * Concentric rings that pulse outward from the center of their positioned
 * parent, e.g. behind an icon or avatar. Decorative; still with reduced motion.
 */
function RippleBackground({ rings = 6, size = 160, step = 90, className, ...props }: RippleBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="ripple-background"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle,#000,transparent_70%)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: rings }, (_, index) => {
        const diameter = size + index * step
        return (
          <span
            key={index}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple-ring rounded-full border border-foreground/15 bg-foreground/[0.03] motion-reduce:animate-none"
            style={{
              width: diameter,
              height: diameter,
              opacity: 1 - index / (rings + 1),
              animationDelay: `${index * 0.12}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export { RippleBackground, type RippleBackgroundProps }
