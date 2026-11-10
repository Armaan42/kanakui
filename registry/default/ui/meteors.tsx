import * as React from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps extends React.ComponentProps<"div"> {
  /** Number of meteors. */
  count?: number
}

// Deterministic pseudo-random numbers, so server and client render the same
// positions (no hydration mismatch) without storing a list.
function seeded(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Streaks of light falling diagonally across their positioned parent.
 * Decorative; hidden when the user prefers reduced motion.
 */
function Meteors({ count = 16, className, ...props }: MeteorsProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="meteors"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="absolute h-px w-24 rotate-[215deg] animate-meteor bg-linear-to-r from-foreground/70 to-transparent opacity-0"
          style={{
            top: `${Math.round(seeded(index, 1) * 40) - 10}%`,
            left: `${Math.round(seeded(index, 2) * 110)}%`,
            animationDelay: `${(seeded(index, 3) * 6).toFixed(2)}s`,
            animationDuration: `${(3 + seeded(index, 4) * 5).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  )
}

export { Meteors, type MeteorsProps }
