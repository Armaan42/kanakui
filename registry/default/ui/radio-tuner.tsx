"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface RadioStation {
  frequency: number
  name: string
  /** What's on, shown when tuned in. */
  genre?: string
}

interface RadioTunerProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  stations: RadioStation[]
  min?: number
  max?: number
  defaultFrequency?: number
  onTune?: (frequency: number, station: RadioStation | null) => void
}

/**
 * A valve radio's tuning dial. Turn the knob or drag the needle across the
 * band (arrow keys move 0.1 MHz). Close to a station the signal lamp glows and
 * its name comes through; between stations there's only hiss.
 */
function RadioTuner({ stations, min = 88, max = 108, defaultFrequency = 92.4, onTune, className, ...props }: RadioTunerProps) {
  const [frequency, setFrequency] = React.useState(defaultFrequency)
  const band = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)
  const nearest = stations.reduce<RadioStation | null>((best, station) => (!best || Math.abs(station.frequency - frequency) < Math.abs(best.frequency - frequency) ? station : best), null)
  const distance = nearest ? Math.abs(nearest.frequency - frequency) : 99
  const signal = Math.max(0, 1 - distance / 0.6)
  const tuned = signal > 0.55 ? nearest : null
  const share = (frequency - min) / (max - min)

  const set = (next: number) => {
    const value = Math.round(Math.min(max, Math.max(min, next)) * 10) / 10
    setFrequency(value)
    const station = stations.find((s) => Math.abs(s.frequency - value) < 0.27) ?? null
    onTune?.(value, station)
  }

  const fromPointer = (clientX: number) => {
    const box = band.current?.getBoundingClientRect()
    if (box) set(min + ((clientX - box.left) / box.width) * (max - min))
  }

  return (
    <div data-slot="radio-tuner" className={cn("w-full max-w-lg rounded-2xl bg-[linear-gradient(90deg,#5b3417,#7c4a24_45%,#4a2a12)] p-4 shadow-[0_18px_30px_-14px_rgb(0_0_0/0.65)]", className)} {...props}>
      <div className="rounded-lg bg-[#efe3c4] p-3 shadow-[inset_0_2px_6px_rgb(0_0_0/0.35)]">
        <div
          ref={band}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            dragging.current = true
            fromPointer(event.clientX)
          }}
          onPointerMove={(event) => dragging.current && fromPointer(event.clientX)}
          onPointerUp={() => (dragging.current = false)}
          className="relative h-16 cursor-ew-resize touch-none select-none"
        >
          {Array.from({ length: (max - min) * 2 + 1 }, (_, i) => (
            <span key={i} aria-hidden="true" className="absolute bottom-5 w-px bg-neutral-700" style={{ left: `${(i / ((max - min) * 2)) * 100}%`, height: i % 4 === 0 ? 14 : 7 }} />
          ))}
          {Array.from({ length: (max - min) / 2 + 1 }, (_, i) => (
            <span key={i} aria-hidden="true" className="absolute bottom-0 -translate-x-1/2 font-mono text-[10px] text-neutral-700" style={{ left: `${(i / ((max - min) / 2)) * 100}%` }}>
              {min + i * 2}
            </span>
          ))}
          {stations.map((station) => (
            <span key={station.name} aria-hidden="true" className="absolute top-0 -translate-x-1/2 font-serif text-[9px] whitespace-nowrap text-red-900/80 italic" style={{ left: `${((station.frequency - min) / (max - min)) * 100}%` }}>
              {station.name}
            </span>
          ))}
          <span aria-hidden="true" className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-red-600 shadow-[0_0_4px_rgb(220_38_38/0.6)] transition-[left] duration-100 motion-reduce:transition-none" style={{ left: `${share * 100}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span aria-hidden="true" className="size-3 rounded-full transition-[background-color,box-shadow] duration-200" style={{ background: `rgb(${Math.round(80 + 175 * signal)} ${Math.round(60 + 120 * signal)} 40)`, boxShadow: signal > 0.2 ? `0 0 ${10 * signal}px ${4 * signal}px rgb(251 191 36 / ${signal})` : "none" }} />
        <div className="min-w-0 flex-1">
          <p aria-live="polite" className="truncate font-mono text-sm text-amber-100">
            {frequency.toFixed(1)} MHz {tuned ? `· ${tuned.name}` : "· …hiss…"}
          </p>
          <p className="truncate text-xs text-amber-200/70">{tuned?.genre ?? "Turn the knob to find a station"}</p>
        </div>
        <button
          type="button"
          role="slider"
          aria-label="Tuning"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={frequency}
          aria-valuetext={`${frequency.toFixed(1)} megahertz${tuned ? `, ${tuned.name}` : ""}`}
          onKeyDown={(event) => {
            const moves: Record<string, number> = { ArrowRight: 0.1, ArrowUp: 0.1, ArrowLeft: -0.1, ArrowDown: -0.1, PageUp: 1, PageDown: -1 }
            const move = moves[event.key]
            if (move === undefined) return
            event.preventDefault()
            set(frequency + move)
          }}
          onWheel={(event) => set(frequency - Math.sign(event.deltaY) * 0.1)}
          style={{ rotate: `${share * 720}deg` }}
          className="size-14 shrink-0 rounded-full bg-[conic-gradient(#3f3f46,#a1a1aa,#27272a,#d4d4d8,#3f3f46)] shadow-[0_4px_10px_rgb(0_0_0/0.5)] outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
        >
          <span aria-hidden="true" className="mx-auto mt-1 block h-3 w-1 rounded-full bg-amber-100" />
        </button>
      </div>
    </div>
  )
}

export { RadioTuner }
