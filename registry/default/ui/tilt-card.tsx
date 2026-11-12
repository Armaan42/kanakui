"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface TiltCardProps extends React.ComponentProps<"div"> {
  /** Largest tilt in degrees. */
  max?: number
  /** Show a soft glare that follows the pointer. */
  glare?: boolean
}

/**
 * A card that tilts in 3D toward the pointer, with a glare that follows it.
 * It settles back when the pointer leaves. Touch and keyboard users see a
 * normal card, and it stays flat with reduced motion.
 */
function TiltCard({ max = 10, glare = true, className, style, children, ...props }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef(0)

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return
    const card = ref.current
    if (!card) return
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const px = (clientX - rect.left) / rect.width
      const py = (clientY - rect.top) / rect.height
      card.style.setProperty("--tilt-x", `${(0.5 - py) * max * 2}deg`)
      card.style.setProperty("--tilt-y", `${(px - 0.5) * max * 2}deg`)
      card.style.setProperty("--glare-x", `${px * 100}%`)
      card.style.setProperty("--glare-y", `${py * 100}%`)
      card.style.setProperty("--glare", "1")
    })
  }

  const onPointerLeave = () => {
    const card = ref.current
    if (!card) return
    cancelAnimationFrame(frame.current)
    card.style.setProperty("--tilt-x", "0deg")
    card.style.setProperty("--tilt-y", "0deg")
    card.style.setProperty("--glare", "0")
  }

  return (
    <div className="perspective-[900px]">
      <div
        ref={ref}
        data-slot="tilt-card"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-card text-card-foreground transition-transform duration-200 ease-out will-change-transform transform-3d",
          "[transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] motion-reduce:[transform:none]",
          className
        )}
        style={style}
        {...props}
      >
        {children}
        {glare ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-(--glare,0) transition-opacity duration-300 motion-reduce:hidden"
            style={{
              background:
                "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), color-mix(in oklch, white 22%, transparent), transparent 55%)",
            }}
          />
        ) : null}
      </div>
    </div>
  )
}

export { TiltCard, type TiltCardProps }
