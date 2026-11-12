"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface BackgroundBeamsProps extends React.ComponentProps<"div"> {
  /** Number of beams. */
  count?: number
  /** Start and end color of the light that travels along each beam. Any CSS color. */
  colors?: [string, string]
}

/**
 * Curved lines sweeping across a section, with light traveling along them.
 * Place inside a `relative` element; it fills it and sits behind the content.
 * Decorative: hidden from assistive technology, and the light stops with
 * reduced motion.
 */
function BackgroundBeams({
  count = 18,
  colors = ["oklch(0.72 0.18 295)", "oklch(0.8 0.13 210)"],
  className,
  ...props
}: BackgroundBeamsProps) {
  const id = React.useId().replace(/:/g, "")
  const beams = Array.from({ length: count }, (_, i) => {
    const x = -260 + i * 52
    return {
      d: `M${x} 660 C${x + 180} 470 ${x + 40} 260 ${x + 330} 60 S${x + 560} -120 ${x + 700} -220`,
      // Fixed, pseudo-random timing so server and browser render the same thing.
      duration: 7 + ((i * 37) % 6),
      delay: -((i * 1.7) % 9),
    }
  })

  return (
    <div
      aria-hidden="true"
      data-slot="background-beams"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      {...props}
    >
      <svg className="size-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={`${id}-light`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        {beams.map((beam, i) => (
          <g key={i}>
            <path d={beam.d} stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
            <path
              d={beam.d}
              pathLength={1}
              stroke={`url(#${id}-light)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="0.12 1"
              className="animate-beam-travel motion-reduce:hidden"
              style={{ animationDuration: `${beam.duration}s`, animationDelay: `${beam.delay}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export { BackgroundBeams, type BackgroundBeamsProps }
