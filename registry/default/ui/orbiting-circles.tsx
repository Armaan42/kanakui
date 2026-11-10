import * as React from "react"

import { cn } from "@/lib/utils"

interface OrbitingCirclesProps {
  /** Items placed evenly around the orbit, e.g. small icons. */
  children: React.ReactNode
  /** Orbit radius in pixels. */
  radius?: number
  /** Seconds per full orbit. */
  duration?: number
  /** Orbit counter-clockwise. */
  reverse?: boolean
  /** Draw the orbit path. */
  path?: boolean
  className?: string
}

/**
 * Places its children evenly on a circle and orbits them around the center
 * of the positioned parent, keeping each item upright. Stack several with
 * different radii. With reduced motion the items stay in place on the orbit.
 */
function OrbitingCircles({ children, radius = 120, duration = 24, reverse = false, path = true, className }: OrbitingCirclesProps) {
  const items = React.Children.toArray(children)

  return (
    <div data-slot="orbiting-circles" className={cn("pointer-events-none absolute inset-0", className)}>
      {path ? (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-foreground/15"
          style={{ width: radius * 2, height: radius * 2 }}
        />
      ) : null}
      {items.map((item, index) => {
        const angle = (360 / items.length) * index
        const vars = { "--orbit-angle": angle, "--orbit-radius": radius } as React.CSSProperties
        return (
          <div
            key={index}
            className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit motion-reduce:animate-none"
            style={{
              ...vars,
              // Starting position, also used as the resting position with reduced motion.
              transform: `rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)`,
              animationDuration: `${duration}s`,
              animationDirection: reverse ? "reverse" : "normal",
            }}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}

export { OrbitingCircles, type OrbitingCirclesProps }
