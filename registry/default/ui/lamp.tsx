import * as React from "react"

import { cn } from "@/lib/utils"

interface LampProps extends React.ComponentProps<"div"> {
  /** Color of the light. Any CSS color. */
  color?: string
}

/**
 * A lamp at the top of a section: a glowing bar casting a cone of light that
 * opens outward, lighting the content below. Put your heading in `children`.
 * Looks best on a dark background. The light opens once on load and is
 * already open with reduced motion.
 */
function Lamp({ color = "oklch(0.78 0.14 220)", className, style, children, ...props }: LampProps) {
  return (
    <div
      data-slot="lamp"
      className={cn("relative isolate flex flex-col items-center overflow-hidden", className)}
      style={{ "--lamp-color": color, ...style } as React.CSSProperties}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] origin-top animate-lamp-open motion-reduce:animate-none"
      >
        {/* The cone: narrow at the bar, widening and fading as it falls. A blurred copy softens its edges. */}
        <div className="absolute top-0 left-1/2 h-72 w-[min(46rem,100%)] -translate-x-1/2 opacity-30 blur-xl">
          <div className="size-full bg-[linear-gradient(to_bottom,var(--lamp-color),transparent_85%)] [clip-path:polygon(24%_0,76%_0,100%_100%,0_100%)]" />
        </div>
        <div className="absolute top-0 left-1/2 h-72 w-[min(46rem,100%)] -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--lamp-color),transparent_70%)] opacity-25 [clip-path:polygon(24%_0,76%_0,100%_100%,0_100%)]" />
        <div className="absolute top-0 left-1/2 h-40 w-[min(36rem,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--lamp-color) opacity-40 blur-3xl" />
        <div className="absolute top-0 left-1/2 h-0.5 w-[min(24rem,60vw)] -translate-x-1/2 bg-(--lamp-color) shadow-[0_0_24px_4px_var(--lamp-color)]" />
      </div>
      {children}
    </div>
  )
}

export { Lamp, type LampProps }
