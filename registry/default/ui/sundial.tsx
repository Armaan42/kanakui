"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"

interface SundialProps extends React.ComponentProps<"div"> {
  /** The dial is laid out for this latitude, in degrees north. */
  latitude?: number
}

const NUMERALS = ["VI", "VII", "VIII", "IX", "X", "XI", "XII", "I", "II", "III", "IV", "V", "VI"]
const ORIGIN = { x: 0, y: 70 }

/** Angle of the shadow from the noon line, clockwise, for a horizontal sundial. */
const shadowAngle = (hour: number, latitude: number) => {
  const h = ((hour - 12) * 15 * Math.PI) / 180
  if (Math.abs(hour - 12) >= 6) return Math.sign(hour - 12) * 90
  return (Math.atan(Math.sin((latitude * Math.PI) / 180) * Math.tan(h)) * 180) / Math.PI
}

/** The sun's height at the equinox: low in the morning and evening, highest at noon. */
const altitude = (hour: number, latitude: number) =>
  (Math.asin(Math.cos((latitude * Math.PI) / 180) * Math.cos(((hour - 12) * 15 * Math.PI) / 180)) * 180) / Math.PI

const point = (angle: number, length: number) => ({
  x: ORIGIN.x + Math.sin((angle * Math.PI) / 180) * length,
  y: ORIGIN.y - Math.cos((angle * Math.PI) / 180) * length,
})

const clock = (hour: number) => `${Math.floor(hour)}:${String(Math.round((hour % 1) * 60)).padStart(2, "0")}`

/**
 * A garden sundial. Slide through the day (or jump to now) and the gnomon's
 * shadow sweeps across the hour lines, long in the morning, short at noon.
 */
function Sundial({ latitude = 51.5, className, ...props }: SundialProps) {
  const [hour, setHour] = React.useState(10.5)
  const id = React.useId()
  const sunUp = altitude(hour, latitude) > 0
  const angle = shadowAngle(hour, latitude)
  // A gnomon 34 units tall, so the shadow is its height over the tangent of the sun's altitude.
  const length = sunUp ? Math.min(130, 34 / Math.tan((altitude(hour, latitude) * Math.PI) / 180)) : 0
  const tip = point(angle, length)
  const side = point(angle + 90, 5)
  const other = point(angle - 90, 5)

  const now = () => {
    const date = new Date()
    setHour(Math.min(19, Math.max(5, date.getHours() + date.getMinutes() / 60)))
  }

  return (
    <div data-slot="sundial" className={cn("flex w-80 max-w-full flex-col gap-4", className)} {...props}>
      {/* The sky, with the sun crossing it. */}
      <div aria-hidden="true" className={cn("relative h-14 overflow-hidden rounded-xl transition-colors duration-500", sunUp ? "bg-linear-to-b from-sky-300 to-sky-100" : "bg-linear-to-b from-indigo-950 to-slate-800")}>
        <span
          className="absolute size-6 -translate-1/2 rounded-full bg-yellow-300 shadow-[0_0_20px_6px_rgb(253_224_71/0.7)] transition-[left,top] duration-200"
          style={{ left: `${((hour - 5) / 14) * 100}%`, top: `${100 - Math.max(-30, altitude(hour, latitude)) * 1.8}%` }}
        />
      </div>

      <svg viewBox="-160 -84 320 172" className="w-full" role="img" aria-label={sunUp ? `Sundial reading about ${clock(hour)}` : "Sundial in the dark: the sun is down"}>
        <defs>
          <radialGradient id={`${id.replace(/[^a-zA-Z0-9_-]/g, "")}-stone`} cx="0.45" cy="0.4" r="0.8">
            <stop offset="0" stopColor="#e7e1d3" />
            <stop offset="1" stopColor="#a8a092" />
          </radialGradient>
        </defs>
        <path d="M-150 80 A150 150 0 0 1 150 80 Z" fill={`url(#${id.replace(/[^a-zA-Z0-9_-]/g, "")}-stone)`} stroke="#78716c" strokeWidth="2" />
        {NUMERALS.map((numeral, i) => {
          const at = shadowAngle(6 + i, latitude)
          const end = point(at, 132)
          const label = point(at, 116)
          return (
            <g key={i}>
              <line x1={ORIGIN.x} y1={ORIGIN.y} x2={end.x} y2={end.y} stroke="#57534e" strokeWidth={i === 6 ? 1.6 : 0.8} />
              <text x={label.x} y={label.y + 4} textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#292524">
                {numeral}
              </text>
            </g>
          )
        })}
        {/* Shadow. */}
        {sunUp ? (
          <path d={`M${side.x} ${side.y} L${tip.x} ${tip.y} L${other.x} ${other.y} Z`} fill="rgb(28 25 23 / 0.45)" className="transition-[d] duration-200" />
        ) : null}
        {/* Gnomon, seen from above: a bronze blade along the noon line. */}
        <path d={`M${ORIGIN.x - 3} ${ORIGIN.y} L${ORIGIN.x} ${ORIGIN.y - 70} L${ORIGIN.x + 3} ${ORIGIN.y} Z`} fill="#92400e" stroke="#451a03" strokeWidth="0.8" />
        <text x="0" y="-74" textAnchor="middle" fontSize="9" fill="#57534e" fontFamily="system-ui, sans-serif">
          N
        </text>
      </svg>

      <div>
        <label htmlFor={id} className="flex justify-between text-sm">
          <span>Time of day</span>
          <span className="font-mono tabular-nums">{clock(hour)}</span>
        </label>
        <input
          id={id}
          type="range"
          min={5}
          max={19}
          step={1 / 12}
          value={hour}
          onChange={(event) => setHour(Number(event.target.value))}
          className="mt-1.5 w-full accent-amber-700"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Laid out for {latitude}° N, at the equinox.</p>
        <button type="button" onClick={now} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          <Clock aria-hidden="true" className="size-3.5" />
          Now
        </button>
      </div>
    </div>
  )
}

export { Sundial }
