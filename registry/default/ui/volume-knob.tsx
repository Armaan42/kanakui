"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface VolumeKnobProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Accessible name and caption, e.g. "Volume". */
  label?: string
  /** Formats the value for the readout and screen readers. */
  format?: (value: number) => string
}

const SWEEP = 270 // degrees from min to max
const LEDS = 21
/** Pixels of vertical drag for the full range. */
const DRAG_RANGE = 220

/**
 * A synth-style knob. Drag up or down (or scroll) to turn it; the LED ring
 * lights up to the value. It's a `slider`: arrow keys, Page Up/Down, Home
 * and End work as usual.
 */
function VolumeKnob({
  value: valueProp,
  defaultValue = 50,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label = "Volume",
  format = (v) => `${Math.round(v)}%`,
  className,
  ...props
}: VolumeKnobProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled
  const drag = React.useRef<{ y: number; value: number } | null>(null)
  const knobRef = React.useRef<HTMLDivElement>(null)

  const set = React.useCallback(
    (next: number) => {
      const snapped = Math.min(max, Math.max(min, Math.round(next / step) * step))
      setUncontrolled(snapped)
      onValueChange?.(snapped)
    },
    [min, max, step, onValueChange]
  )

  // Wheel needs a non-passive listener to stop the page from scrolling.
  React.useEffect(() => {
    const el = knobRef.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      set(value - Math.sign(event.deltaY) * step * 2)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [set, value, step])

  const ratio = (value - min) / (max - min)
  const angle = -SWEEP / 2 + ratio * SWEEP
  const lit = Math.round(ratio * (LEDS - 1))

  return (
    <div data-slot="volume-knob" className={cn("inline-flex flex-col items-center gap-3 select-none", className)} {...props}>
      <div className="relative grid size-40 place-items-center">
        {/* LED ring */}
        {Array.from({ length: LEDS }, (_, i) => {
          const a = -SWEEP / 2 + (i / (LEDS - 1)) * SWEEP
          const on = i <= lit && value > min
          const color =
            i < LEDS * 0.6
              ? "bg-emerald-400 shadow-[0_0_6px_rgb(52_211_153)]"
              : i < LEDS * 0.85
                ? "bg-amber-400 shadow-[0_0_6px_rgb(251_191_36)]"
                : "bg-red-500 shadow-[0_0_6px_rgb(239_68_68)]"
          return (
            <span key={i} aria-hidden="true" className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
              <span
                className={cn(
                  "absolute top-0 left-1/2 h-2.5 w-1.5 -translate-x-1/2 rounded-full transition-[background-color,box-shadow] duration-150",
                  on ? color : "bg-neutral-300 dark:bg-neutral-700"
                )}
              />
            </span>
          )
        })}

        {/* Knob */}
        <div
          ref={knobRef}
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={format(value)}
          aria-orientation="vertical"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { y: event.clientY, value }
          }}
          onPointerMove={(event) => {
            if (!drag.current) return
            const dy = drag.current.y - event.clientY
            set(drag.current.value + (dy / DRAG_RANGE) * (max - min))
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          onKeyDown={(event) => {
            const big = (max - min) / 10
            const keys: Record<string, number> = {
              ArrowUp: value + step,
              ArrowRight: value + step,
              ArrowDown: value - step,
              ArrowLeft: value - step,
              PageUp: value + big,
              PageDown: value - big,
              Home: min,
              End: max,
            }
            if (!(event.key in keys)) return
            event.preventDefault()
            set(keys[event.key])
          }}
          className="relative size-28 cursor-ns-resize touch-none rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-linear-to-b from-neutral-200 to-neutral-500 shadow-[0_10px_20px_-6px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.8)] dark:from-neutral-600 dark:to-neutral-900 dark:shadow-[0_10px_20px_-6px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.15)]" />
          <span
            aria-hidden="true"
            className="absolute inset-[10%] rounded-full bg-[conic-gradient(from_0deg,#d4d4d4,#fafafa,#a3a3a3,#e5e5e5,#d4d4d4,#fafafa,#a3a3a3,#e5e5e5,#d4d4d4)] shadow-[inset_0_2px_4px_rgb(255_255_255/0.6),inset_0_-3px_6px_rgb(0_0_0/0.25)] dark:bg-[conic-gradient(from_0deg,#404040,#737373,#262626,#525252,#404040,#737373,#262626,#525252,#404040)]"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <span className="absolute top-[8%] left-1/2 h-[24%] w-[5%] -translate-x-1/2 rounded-full bg-neutral-900 dark:bg-white" />
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
        <p aria-hidden="true" className="font-mono text-lg font-semibold tabular-nums">
          {format(value)}
        </p>
      </div>
    </div>
  )
}

export { VolumeKnob }
