import * as React from "react"

import { cn } from "@/lib/utils"

interface SparklesProps extends React.ComponentProps<"span"> {
  /** Number of sparkles. */
  count?: number
  /** Sparkle color. Any CSS color. Defaults to the text color. */
  color?: string
}

// Deterministic pseudo-random values: server and client render identical HTML.
function seeded(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Small four-point stars that twinkle around their content, e.g. a word in a
 * headline or a badge. Decorative; hidden when the user prefers reduced motion.
 */
function Sparkles({ count = 10, color, className, children, ...props }: SparklesProps) {
  return (
    <span data-slot="sparkles" className={cn("relative inline-block", className)} {...props}>
      <span aria-hidden="true" className="pointer-events-none absolute -inset-3 motion-reduce:hidden">
        {Array.from({ length: count }, (_, i) => {
          const size = 6 + Math.round(seeded(i, 1) * 8)
          return (
            <svg
              key={i}
              viewBox="0 0 16 16"
              className="absolute animate-sparkle"
              style={{
                top: `${Math.round(seeded(i, 2) * 100)}%`,
                left: `${Math.round(seeded(i, 3) * 100)}%`,
                width: size,
                height: size,
                color: color ?? "currentColor",
                animationDelay: `${(seeded(i, 4) * 2).toFixed(2)}s`,
                animationDuration: `${(1.4 + seeded(i, 5) * 1.4).toFixed(2)}s`,
              }}
            >
              <path d="M8 0c.5 4.2 3.3 7 8 8-4.7 1-7.5 3.8-8 8-.5-4.2-3.3-7-8-8 4.7-1 7.5-3.8 8-8Z" fill="currentColor" />
            </svg>
          )
        })}
      </span>
      <span className="relative">{children}</span>
    </span>
  )
}

export { Sparkles, type SparklesProps }
