"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface GaugeBand {
  /** Upper bound of the band (inclusive). */
  upTo: number
  label: string
  /** Any CSS color. */
  color: string
}

interface ScoreGaugeProps extends React.ComponentProps<"div"> {
  value: number
  min?: number
  max?: number
  /** Accessible name and caption, e.g. "Credit score". */
  label: string
  /** Colored ranges from `min` to `max`. Defaults to credit-score bands. */
  bands?: GaugeBand[]
  /** Small text under the rating, e.g. "Updated 2 Nov". */
  caption?: string
}

const CREDIT_BANDS: GaugeBand[] = [
  { upTo: 579, label: "Poor", color: "#ef4444" },
  { upTo: 669, label: "Fair", color: "#f97316" },
  { upTo: 739, label: "Good", color: "#eab308" },
  { upTo: 799, label: "Very good", color: "#84cc16" },
  { upTo: 850, label: "Excellent", color: "#22c55e" },
]

const START = 160 // degrees, measured clockwise from 3 o'clock
const SWEEP = 220
const CX = 100
const CY = 100
const R = 78

const point = (angle: number, r = R) => {
  const a = (angle * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const
}

function arc(from: number, to: number) {
  const [x1, y1] = point(from)
  const [x2, y2] = point(to)
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

/**
 * A speedometer-style gauge. When it scrolls into view the needle sweeps to
 * the value and the number counts up. It's a `meter` with the value and
 * rating as text; with reduced motion it shows the value immediately.
 */
function ScoreGauge({ value, min = 300, max = 850, label, bands = CREDIT_BANDS, caption, className, ...props }: ScoreGaugeProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(min)
  const clamped = Math.min(max, Math.max(min, value))
  const band = bands.find((b) => clamped <= b.upTo) ?? bands[bands.length - 1]

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      if (reduced) {
        setShown(clamped)
        return
      }
      const start = performance.now()
      const duration = 1400
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - (1 - t) ** 3
        setShown(min + (clamped - min) * eased)
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [clamped, min])

  const angleOf = (v: number) => START + ((v - min) / (max - min)) * SWEEP
  const needle = angleOf(shown)

  return (
    <div
      ref={ref}
      role="meter"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-valuetext={`${clamped}, ${band.label}`}
      data-slot="score-gauge"
      className={cn("relative w-full max-w-xs", className)}
      {...props}
    >
      <svg viewBox="0 0 200 150" aria-hidden="true" className="w-full overflow-visible">
        {/* Track */}
        <path d={arc(START, START + SWEEP)} fill="none" stroke="currentColor" strokeOpacity={0.08} strokeWidth={16} strokeLinecap="round" />
        {/* Bands */}
        {bands.map((b, i) => {
          const a = angleOf(i === 0 ? min : bands[i - 1].upTo) + 1.2
          const z = angleOf(Math.min(b.upTo, max)) - 1.2
          return <path key={b.label} d={arc(a, z)} fill="none" stroke={b.color} strokeWidth={10} strokeLinecap="round" opacity={0.9} />
        })}
        {/* Ticks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = START + (i / 11) * SWEEP
          const [x1, y1] = point(a, R - 15)
          const [x2, y2] = point(a, R - 20)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1.5} strokeLinecap="round" />
        })}
        {/* Needle */}
        <g style={{ transform: `rotate(${needle}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
          <path d={`M ${CX} ${CY - 4} L ${CX + R - 18} ${CY} L ${CX} ${CY + 4} Z`} fill="currentColor" />
        </g>
        <circle cx={CX} cy={CY} r={9} fill="currentColor" />
        <circle cx={CX} cy={CY} r={4} fill={band.color} />
        <text x={point(START, R + 2)[0]} y={point(START, R)[1] + 18} textAnchor="middle" className="fill-current text-[9px] opacity-50">
          {min}
        </text>
        <text x={point(START + SWEEP, R + 2)[0]} y={point(START + SWEEP, R)[1] + 18} textAnchor="middle" className="fill-current text-[9px] opacity-50">
          {max}
        </text>
      </svg>
      <div className="-mt-6 text-center">
        <p aria-hidden="true" className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>
        <p className="text-4xl font-semibold tracking-tight tabular-nums">{Math.round(shown)}</p>
        {/* Band colors (lime, yellow…) are too light for text, so the color goes on a dot. */}
        <p className="inline-flex items-center gap-1.5 text-sm font-medium">
          <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: band.color }} />
          {band.label}
        </p>
        {caption ? <p className="mt-0.5 text-xs text-muted-foreground">{caption}</p> : null}
      </div>
    </div>
  )
}

export { ScoreGauge }
