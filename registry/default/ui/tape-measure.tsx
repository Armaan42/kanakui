"use client"

import * as React from "react"
import { Lock, LockOpen } from "lucide-react"

import { cn } from "@/lib/utils"

interface TapeMeasureProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Longest the tape goes, in units. */
  max?: number
  unit?: "cm" | "in"
  /** Pixels per unit on screen. */
  scale?: number
  onMeasure?: (length: number) => void
}

/**
 * A retractable tape measure. Pull the tab to draw out the tape and read the
 * length; let go and it snaps back, unless you lock it. The tab is a slider,
 * so the arrow keys work too.
 */
function TapeMeasure({ max = 30, unit = "cm", scale = 14, onMeasure, className, ...props }: TapeMeasureProps) {
  const [length, setLength] = React.useState(0)
  const [locked, setLocked] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const start = React.useRef({ x: 0, length: 0 })
  const step = unit === "cm" ? 0.1 : 0.125

  const set = (next: number) => {
    const value = Math.round(Math.min(max, Math.max(0, next)) / step) * step
    setLength(value)
    onMeasure?.(value)
  }

  const release = () => {
    setDragging(false)
    if (!locked) set(0)
  }

  const ticks = Array.from({ length: max + 1 }, (_, i) => i)

  return (
    <div data-slot="tape-measure" className={cn("w-full max-w-xl", className)} {...props}>
      <div className="flex items-center">
        {/* The case */}
        <div className="relative z-10 grid size-28 shrink-0 place-items-center rounded-[1.6rem] bg-linear-145 from-amber-300 via-amber-400 to-amber-600 shadow-[0_12px_20px_-10px_rgb(0_0_0/0.55),inset_0_2px_0_rgb(255_255_255/0.5)]">
          <span aria-hidden="true" className="grid size-16 place-items-center rounded-full bg-neutral-900 shadow-[inset_0_2px_6px_rgb(0_0_0/0.6)]">
            <span className="size-6 rounded-full bg-linear-145 from-neutral-300 to-neutral-500" />
          </span>
          <button
            type="button"
            aria-pressed={locked}
            aria-label={locked ? "Unlock the tape" : "Lock the tape"}
            onClick={() => {
              setLocked(!locked)
              if (locked && !dragging) set(0)
            }}
            className="absolute -top-2 left-1/2 grid h-5 w-9 -translate-x-1/2 place-items-center rounded-full bg-neutral-900 text-amber-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {locked ? <Lock aria-hidden="true" className="size-3" /> : <LockOpen aria-hidden="true" className="size-3" />}
          </button>
        </div>

        {/* The tape */}
        <div className="relative -ml-2 h-9 min-w-0 flex-1 overflow-hidden">
          <div
            aria-hidden="true"
            className={cn("absolute top-1.5 left-0 h-6 overflow-hidden bg-yellow-300 shadow-[inset_0_-2px_0_rgb(0_0_0/0.15)]", !dragging && "transition-[width] duration-500 ease-[cubic-bezier(.2,1.3,.4,1)] motion-reduce:transition-none")}
            style={{ width: length * scale }}
          >
            {ticks.map((i) => (
              <span key={i} className="absolute top-0 flex flex-col items-start" style={{ left: i * scale }}>
                <span className={cn("w-px bg-neutral-900", i % 5 === 0 ? "h-3" : "h-2")} />
                {i % 5 === 0 && i > 0 ? <span className="-ml-1 font-mono text-[8px] leading-none font-bold text-neutral-900">{i}</span> : null}
              </span>
            ))}
          </div>
          <button
            type="button"
            role="slider"
            aria-label="Tape length"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={Number(length.toFixed(2))}
            aria-valuetext={`${length.toFixed(1)} ${unit}`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId)
              start.current = { x: event.clientX, length }
              setDragging(true)
            }}
            onPointerMove={(event) => dragging && set(start.current.length + (event.clientX - start.current.x) / scale)}
            onPointerUp={release}
            onPointerCancel={release}
            onKeyDown={(event) => {
              const moves: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 5, PageDown: -5 }
              if (event.key === "Home") return set(0)
              const move = moves[event.key]
              if (move === undefined) return
              event.preventDefault()
              set(length + move)
            }}
            className={cn("absolute top-0 h-9 w-4 cursor-grab touch-none rounded-r-sm bg-linear-to-b from-neutral-300 to-neutral-500 shadow outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing", !dragging && "transition-[left] duration-500 ease-[cubic-bezier(.2,1.3,.4,1)] motion-reduce:transition-none")}
            style={{ left: length * scale }}
          />
        </div>
      </div>
      <p aria-live="polite" className="mt-4 text-center font-mono text-sm tabular-nums">
        <span className="text-2xl font-semibold">{length.toFixed(1)}</span> {unit}
        <span className="ml-3 text-xs text-muted-foreground">{locked ? "locked" : length ? "let go to retract" : "pull the tab"}</span>
      </p>
    </div>
  )
}

export { TapeMeasure }
