"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface MoonPhaseProps extends React.ComponentProps<"div"> {
  /** A date as YYYY-MM-DD. Leave it out to start on today. */
  defaultDate?: string
}

const SYNODIC = 29.530588853
/** A known new moon: 6 January 2000, 18:14 UTC. */
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14)
const DAY = 86400000
const NAMES: [number, string][] = [
  [1.84566, "New moon"],
  [5.53699, "Waxing crescent"],
  [9.22831, "First quarter"],
  [12.91963, "Waxing gibbous"],
  [16.61096, "Full moon"],
  [20.30228, "Waning gibbous"],
  [23.99361, "Last quarter"],
  [27.68493, "Waning crescent"],
  [Infinity, "New moon"],
]
const CRATERS = [
  [-30, -22, 14],
  [24, -40, 9],
  [36, 18, 16],
  [-12, 34, 11],
  [-48, 20, 7],
  [8, -6, 6],
]

const toIso = (time: number) => new Date(time).toISOString().slice(0, 10)
const dateLabel = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
const shortLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" })

function phaseOn(iso: string) {
  // Noon UTC, so the phase doesn't depend on the viewer's time zone.
  const time = Date.parse(`${iso}T12:00:00Z`)
  const age = ((((time - NEW_MOON) / DAY) % SYNODIC) + SYNODIC) % SYNODIC
  const fraction = age / SYNODIC
  const lit = (1 - Math.cos(fraction * Math.PI * 2)) / 2
  const name = NAMES.find(([below]) => age < below)![1]
  const toFull = ((0.5 - fraction + 1) % 1) * SYNODIC
  const nextFull = toFull < 0.5 ? toFull + SYNODIC : toFull
  return { time, age, fraction, lit, name, fullOn: time + nextFull * DAY }
}

/** The lit part of the moon: the outer edge on the sunny side, closed by the terminator ellipse. */
function litPath(fraction: number, r: number) {
  const waxing = fraction < 0.5
  const crescent = Math.cos(fraction * Math.PI * 2) > 0
  const rx = Math.abs(Math.cos(fraction * Math.PI * 2)) * r
  const outer = waxing ? 1 : 0
  const terminator = waxing ? (crescent ? 0 : 1) : crescent ? 1 : 0
  return `M0 ${-r} A${r} ${r} 0 0 ${outer} 0 ${r} A${rx} ${r} 0 0 ${terminator} 0 ${-r}Z`
}

/**
 * The moon's phase for any date: the right shape of light, its name, how much
 * is lit and when it's next full. Step a day at a time or pick a date.
 */
function MoonPhase({ defaultDate, className, ...props }: MoonPhaseProps) {
  const [date, setDate] = React.useState<string | null>(defaultDate ?? null)
  const id = React.useId()
  const svgId = id.replace(/[^a-zA-Z0-9_-]/g, "")

  React.useEffect(() => {
    if (date) return
    // Today, in the viewer's own calendar.
    const timer = window.setTimeout(() => {
      const now = new Date()
      // Only if nothing has been picked in the meantime.
      setDate((current) => current ?? toIso(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())))
    }, 0)
    return () => window.clearTimeout(timer)
  }, [date])

  const moon = date ? phaseOn(date) : null
  const step = (days: number) => date && setDate(toIso(Date.parse(`${date}T12:00:00Z`) + days * DAY))

  return (
    <div data-slot="moon-phase" className={cn("flex w-72 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="grid aspect-square w-full place-items-center rounded-3xl bg-[radial-gradient(circle_at_50%_45%,#1e293b,#020617_70%)] shadow-[0_18px_30px_-16px_rgb(0_0_0/0.8)]">
        <svg viewBox="-100 -100 200 200" className="w-[78%]" role="img" aria-label={moon ? `${moon.name}, ${Math.round(moon.lit * 100)}% lit` : "Moon"}>
          <defs>
            <radialGradient id={`${svgId}-lit`} cx="0.4" cy="0.38" r="0.75">
              <stop offset="0" stopColor="#fefce8" />
              <stop offset="1" stopColor="#d6d3c4" />
            </radialGradient>
            <clipPath id={`${svgId}-disc`}>
              <circle r="90" />
            </clipPath>
          </defs>
          <circle r="96" fill="rgb(254 252 232 / 0.06)" />
          <circle r="90" fill="#272d3a" />
          {moon ? <path d={litPath(moon.fraction, 90)} fill={`url(#${svgId}-lit)`} /> : null}
          <g clipPath={`url(#${svgId}-disc)`} fill="rgb(0 0 0 / 0.1)">
            {CRATERS.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
        </svg>
      </div>

      <div className="text-center" aria-live="polite">
        <p className="text-xl font-semibold">{moon ? moon.name : "…"}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {moon ? `${Math.round(moon.lit * 100)}% lit · ${moon.age.toFixed(1)} days old · next full ${shortLabel.format(moon.fullOn)}` : " "}
        </p>
      </div>

      <div className="flex w-full items-center gap-2">
        <button type="button" aria-label="Previous day" onClick={() => step(-1)} className="grid size-10 shrink-0 place-items-center rounded-full border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <label htmlFor={id} className="sr-only">
          Date
        </label>
        <input
          id={id}
          type="date"
          value={date ?? ""}
          onChange={(event) => event.target.value && setDate(event.target.value)}
          className="h-10 min-w-0 flex-1 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <button type="button" aria-label="Next day" onClick={() => step(1)} className="grid size-10 shrink-0 place-items-center rounded-full border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
      {moon ? <p className="-mt-2 text-xs text-muted-foreground">{dateLabel.format(moon.time)}</p> : null}
    </div>
  )
}

export { MoonPhase }
