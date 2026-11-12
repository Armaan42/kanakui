"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface GlowGridProps extends React.ComponentProps<"div"> {
  /** Color of the light on the borders. Any CSS color. */
  color?: string
}

/**
 * A grid of `GlowCard`s whose borders light up near the pointer, as if a
 * light were moving across them. Lay it out with grid classes. Without a
 * pointer (touch, keyboard) the cards look like normal cards.
 */
function GlowGrid({ color = "oklch(0.75 0.17 290)", className, style, children, ...props }: GlowGridProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const grid = ref.current
    if (!grid) return
    let frame = 0
    let x = 0
    let y = 0
    const update = () => {
      frame = 0
      for (const card of grid.querySelectorAll<HTMLElement>("[data-slot=glow-card]")) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty("--glow-x", `${x - rect.left}px`)
        card.style.setProperty("--glow-y", `${y - rect.top}px`)
      }
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      x = event.clientX
      y = event.clientY
      grid.style.setProperty("--glow", "1")
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onLeave = () => grid.style.setProperty("--glow", "0")
    grid.addEventListener("pointermove", onMove, { passive: true })
    grid.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(frame)
      grid.removeEventListener("pointermove", onMove)
      grid.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-slot="glow-grid"
      className={cn("grid gap-3", className)}
      style={{ "--glow-color": color, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}

/** A card inside `GlowGrid`. Accepts all `<div>` props. */
function GlowCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glow-card"
      className={cn(
        "relative isolate rounded-xl border bg-card p-5 text-card-foreground",
        // The lit border: a radial light, masked to a 1px ring.
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-px before:opacity-(--glow,0) before:transition-opacity before:duration-300",
        "before:[background:radial-gradient(260px_circle_at_var(--glow-x,-999px)_var(--glow-y,-999px),var(--glow-color),transparent_70%)]",
        "before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
        // A faint wash inside.
        "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:opacity-(--glow,0) after:transition-opacity after:duration-300",
        "after:[background:radial-gradient(320px_circle_at_var(--glow-x,-999px)_var(--glow-y,-999px),color-mix(in_oklch,var(--glow-color)_10%,transparent),transparent_70%)]",
        className
      )}
      {...props}
    />
  )
}

export { GlowGrid, GlowCard, type GlowGridProps }
