import * as React from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends React.ComponentProps<"div"> {
  /** Scroll right-to-left (default) or the reverse. */
  reverse?: boolean
  /** Pause while the pointer is over the marquee. */
  pauseOnHover?: boolean
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean
  /** How many copies of the children to render. Raise it if gaps appear on wide screens. */
  repeat?: number
  /** Time for one full loop, as a CSS duration. */
  duration?: string
  /** Space between items, as a CSS length. */
  gap?: string
}

/**
 * Scrolls its children in an endless loop. Copies after the first are hidden
 * from assistive technology and can't be focused, so content is read once.
 * Stops moving when the user prefers reduced motion.
 */
function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duration = "40s",
  gap = "1rem",
  style,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      className={cn("group flex gap-(--marquee-gap) overflow-hidden", vertical ? "flex-col" : "flex-row", className)}
      style={{ "--marquee-duration": duration, "--marquee-gap": gap, ...style } as React.CSSProperties}
      {...props}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          aria-hidden={index > 0 ? true : undefined}
          inert={index > 0 ? true : undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--marquee-gap) motion-reduce:animate-none",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export { Marquee, type MarqueeProps }
