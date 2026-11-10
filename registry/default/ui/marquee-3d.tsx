import * as React from "react"

import { cn } from "@/lib/utils"
import { Marquee } from "@/registry/default/ui/marquee"

interface Marquee3dProps {
  /** Items to show; they are split across the columns. */
  items: React.ReactNode[]
  /** Number of scrolling columns. */
  columns?: number
  /** Height of the wall. */
  className?: string
}

/**
 * A wall of vertically scrolling columns, tilted back in 3D, with alternating
 * directions. Good behind a hero or as a showcase of screenshots. Built on
 * Marquee, so repeated copies are hidden from screen readers and motion stops
 * with reduced motion.
 */
function Marquee3d({ items, columns = 4, className }: Marquee3dProps) {
  const lanes = Array.from({ length: columns }, (_, lane) => items.filter((_, i) => i % columns === lane))

  return (
    <div
      data-slot="marquee-3d"
      className={cn(
        "relative h-96 w-full overflow-hidden [perspective:1000px] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]",
        className
      )}
    >
      <div className="absolute inset-x-0 -top-1/4 flex h-[150%] justify-center gap-4 [transform:rotateX(35deg)_rotateZ(-12deg)] [transform-style:preserve-3d]">
        {lanes.map((lane, index) => (
          <Marquee key={index} vertical reverse={index % 2 === 1} pauseOnHover duration={`${28 + index * 6}s`} className="h-full">
            {lane.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  )
}

export { Marquee3d, type Marquee3dProps }
