"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SpiritLevelProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  defaultAngle?: number
  /** Largest tilt either way, in degrees. */
  range?: number
  onAngleChange?: (angle: number) => void
}

/**
 * A spirit level. Drag it (or use the arrow keys) to tilt it; the bubble
 * drifts to the high end and the vial turns green when it's level.
 */
function SpiritLevel({ defaultAngle = 4, range = 12, onAngleChange, className, ...props }: SpiritLevelProps) {
  const [angle, setAngle] = React.useState(defaultAngle)
  const drag = React.useRef<{ y: number; angle: number } | null>(null)
  const level = Math.abs(angle) < 0.5
  const lowest = -range

  const set = (next: number) => {
    const value = Math.round(Math.min(range, Math.max(-range, next)) * 10) / 10
    setAngle(value)
    onAngleChange?.(value)
  }

  return (
    <div data-slot="spirit-level" className={cn("flex w-full max-w-md flex-col items-center gap-6 py-6", className)} {...props}>
      <div
        role="slider"
        tabIndex={0}
        aria-label="Tilt"
        aria-valuemin={lowest}
        aria-valuemax={range}
        aria-valuenow={angle}
        aria-valuetext={level ? "Level" : `${Math.abs(angle).toFixed(1)} degrees ${angle > 0 ? "right side down" : "left side down"}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { y: event.clientY, angle }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          const box = event.currentTarget.getBoundingClientRect()
          const side = event.clientX > box.left + box.width / 2 ? 1 : -1
          set(drag.current.angle + ((event.clientY - drag.current.y) / 8) * side)
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={(event) => {
          const moves: Record<string, number> = { ArrowRight: 0.5, ArrowUp: 0.5, ArrowLeft: -0.5, ArrowDown: -0.5 }
          if (event.key === "Home") return set(0)
          const move = moves[event.key]
          if (move === undefined) return
          event.preventDefault()
          set(angle + move)
        }}
        style={{ rotate: `${angle}deg` }}
        className="relative flex h-14 w-full cursor-grab touch-none items-center justify-center rounded-md bg-linear-to-b from-[#e7e7ea] via-[#b9b9bf] to-[#8e8e95] shadow-[0_10px_18px_-10px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.7),inset_0_-1px_0_rgb(0_0_0/0.2)] outline-none transition-[rotate] duration-150 select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing motion-reduce:transition-none"
      >
        <span aria-hidden="true" className="absolute inset-y-2 left-3 w-6 rounded-sm bg-[#2b2b2e] shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]" />
        <span aria-hidden="true" className="absolute inset-y-2 right-3 w-6 rounded-sm bg-[#2b2b2e] shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]" />
        {/* The vial */}
        <span
          aria-hidden="true"
          className={cn("relative h-8 w-40 overflow-hidden rounded-full border border-neutral-900/50 shadow-[inset_0_2px_4px_rgb(0_0_0/0.2)] transition-colors duration-300", level ? "bg-[#cfe08a]" : "bg-[#e9e3a6]")}
        >
          <span className="absolute inset-y-0 left-[calc(50%-1.6rem)] w-px bg-neutral-800/70" />
          <span className="absolute inset-y-0 left-[calc(50%+1.6rem)] w-px bg-neutral-800/70" />
          <span
            className="absolute top-1/2 h-5 w-10 -translate-y-1/2 rounded-full bg-white/85 shadow-[inset_0_-2px_3px_rgb(0_0_0/0.15)] transition-[left] duration-300 ease-out motion-reduce:transition-none"
            style={{ left: `calc(50% - 1.25rem + ${(angle / range) * 3.8}rem)` }}
          />
        </span>
      </div>
      <p aria-live="polite" className="text-sm tabular-nums">
        {level ? <span className="font-semibold">Level</span> : <span className="text-muted-foreground">{Math.abs(angle).toFixed(1)}° off level</span>}
      </p>
    </div>
  )
}

export { SpiritLevel }
