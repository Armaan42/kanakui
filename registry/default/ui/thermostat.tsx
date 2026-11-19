"use client"

import * as React from "react"
import { Flame, Snowflake } from "lucide-react"

import { cn } from "@/lib/utils"

interface ThermostatProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  min?: number
  max?: number
  defaultValue?: number
  /** The room's current temperature. */
  current?: number
  unit?: string
  onValueChange?: (value: number) => void
}

const SWEEP = 270
const START = 135

function arc(from: number, to: number, r: number) {
  const point = (deg: number) => [100 + r * Math.cos((deg * Math.PI) / 180), 100 + r * Math.sin((deg * Math.PI) / 180)]
  const [x1, y1] = point(from)
  const [x2, y2] = point(to)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

/**
 * A round thermostat. Drag around the ring, scroll, or use the arrow keys to
 * set the temperature; the ring glows warm when it's heating and cool when
 * it's cooling.
 */
function Thermostat({ min = 10, max = 30, defaultValue = 21, current = 19, unit = "°C", onValueChange, className, ...props }: ThermostatProps) {
  const [value, setValue] = React.useState(defaultValue)
  const dragging = React.useRef(false)
  const share = (value - min) / (max - min)
  const mode = value > current + 0.4 ? "heat" : value < current - 0.4 ? "cool" : "hold"
  const color = mode === "heat" ? "#f97316" : mode === "cool" ? "#38bdf8" : "#a3a3a3"

  const set = (next: number) => {
    const clamped = Math.round(Math.min(max, Math.max(min, next)) * 2) / 2
    setValue(clamped)
    onValueChange?.(clamped)
  }

  const fromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    let deg = (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) / Math.PI
    deg = (deg - START + 360) % 360
    if (deg > SWEEP) deg = deg > SWEEP + 45 ? 0 : SWEEP
    set(min + (deg / SWEEP) * (max - min))
  }

  return (
    <div data-slot="thermostat" className={cn("w-64 max-w-full", className)} {...props}>
      <div
        role="slider"
        tabIndex={0}
        aria-label="Target temperature"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}, ${mode === "heat" ? "heating" : mode === "cool" ? "cooling" : "holding"}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          dragging.current = true
          fromPointer(event)
        }}
        onPointerMove={(event) => dragging.current && fromPointer(event)}
        onPointerUp={() => (dragging.current = false)}
        onWheel={(event) => set(value - Math.sign(event.deltaY) * 0.5)}
        onKeyDown={(event) => {
          const moves: Record<string, number> = { ArrowUp: 0.5, ArrowRight: 0.5, ArrowDown: -0.5, ArrowLeft: -0.5, PageUp: 2, PageDown: -2 }
          const move = moves[event.key]
          if (move === undefined) return
          event.preventDefault()
          set(value + move)
        }}
        className="relative aspect-square cursor-pointer touch-none rounded-full bg-[radial-gradient(circle_at_50%_35%,#3f3f46,#18181b_70%)] shadow-[0_18px_30px_-12px_rgb(0_0_0/0.6),inset_0_0_0_8px_#27272a,inset_0_2px_0_rgb(255_255_255/0.15)] outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/60"
      >
        <span aria-hidden="true" className="absolute inset-[12%] rounded-full transition-[box-shadow] duration-500" style={{ boxShadow: `0 0 50px 4px ${color}55` }} />
        <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full">
          {Array.from({ length: 41 }, (_, i) => {
            const deg = START + (i / 40) * SWEEP
            const r1 = 82
            const r2 = i % 5 === 0 ? 72 : 76
            const lit = i / 40 <= share
            return (
              <line
                key={i}
                x1={(100 + r1 * Math.cos((deg * Math.PI) / 180)).toFixed(2)}
                y1={(100 + r1 * Math.sin((deg * Math.PI) / 180)).toFixed(2)}
                x2={(100 + r2 * Math.cos((deg * Math.PI) / 180)).toFixed(2)}
                y2={(100 + r2 * Math.sin((deg * Math.PI) / 180)).toFixed(2)}
                stroke={lit ? color : "#52525b"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
          <path d={arc(START, START + SWEEP * share, 90)} stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx={(100 + 90 * Math.cos(((START + SWEEP * share) * Math.PI) / 180)).toFixed(2)} cy={(100 + 90 * Math.sin(((START + SWEEP * share) * Math.PI) / 180)).toFixed(2)} r="7" fill="#fafafa" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-xs tracking-widest text-neutral-400 uppercase">{mode === "heat" ? "Heating to" : mode === "cool" ? "Cooling to" : "Holding"}</span>
          <span className="font-mono text-5xl font-light tabular-nums">
            {value.toFixed(1)}
            <span className="text-lg">{unit}</span>
          </span>
          <span className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
            {mode === "heat" ? <Flame aria-hidden="true" className="size-3.5 text-orange-400" /> : mode === "cool" ? <Snowflake aria-hidden="true" className="size-3.5 text-sky-300" /> : null}
            Inside {current}
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

export { Thermostat }
