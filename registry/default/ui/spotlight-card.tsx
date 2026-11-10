"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { usePointerPosition } from "@/registry/default/hooks/use-pointer-position"
import { composeRefs } from "@/registry/default/lib/compose-refs"

interface SpotlightCardProps extends React.ComponentProps<"div"> {
  /** Color of the spotlight. Any CSS color. Defaults to a soft tint of the foreground color. */
  spotlightColor?: string
  /** Radius of the spotlight in pixels. */
  radius?: number
}

function SpotlightCard({
  className,
  spotlightColor,
  radius = 320,
  style,
  ref,
  children,
  ...props
}: SpotlightCardProps) {
  const pointerRef = usePointerPosition<HTMLDivElement>()
  const composedRef = React.useMemo(() => composeRefs(pointerRef, ref), [pointerRef, ref])

  return (
    <div
      ref={composedRef}
      data-slot="spotlight-card"
      className={cn(
        "relative isolate overflow-hidden rounded-xl border bg-card text-card-foreground",
        className
      )}
      style={
        {
          "--spotlight-radius": `${radius}px`,
          "--spotlight-color": spotlightColor,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        aria-hidden="true"
        data-slot="spotlight-card-light"
        className="pointer-events-none absolute inset-0 -z-10 opacity-(--pointer-active,0) transition-opacity duration-300 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(var(--spotlight-radius) circle at var(--pointer-x, 50%) var(--pointer-y, 50%), var(--spotlight-color, color-mix(in oklch, var(--foreground) 10%, transparent)), transparent 70%)",
        }}
      />
      {children}
    </div>
  )
}

export { SpotlightCard, type SpotlightCardProps }
