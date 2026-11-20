"use client"

import * as React from "react"
import { Pause, Play, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface PendulumWaveProps extends React.ComponentProps<"div"> {
  /** Number of pendulums. */
  count?: number
  /** Seconds until they all line up again. */
  cycle?: number
}

const SWING = 0.32

/**
 * A pendulum wave, seen from the side. Each pendulum is a little shorter than
 * the last, so they drift in and out of step: snakes, waves and chaos, until
 * after one full cycle they line up again.
 */
function PendulumWave({ count = 15, cycle = 60, className, ...props }: PendulumWaveProps) {
  const [playing, setPlaying] = React.useState(true)
  const [seconds, setSeconds] = React.useState(0)
  const time = React.useRef(0)
  const bobs = React.useRef<(SVGGElement | null)[]>([])
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const strings = React.useRef<(SVGLineElement | null)[]>([])

  // The longest swings 51 times per cycle, each shorter one once more.
  const pendulums = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const period = cycle / (51 + i)
        // Lengths are spread evenly for the picture; the timing comes from the period alone.
        const length = 292 - i * (180 / Math.max(count - 1, 1))
        return { period, length }
      }),
    [count, cycle]
  )

  const draw = React.useCallback(() => {
    pendulums.forEach((pendulum, i) => {
      const angle = SWING * Math.cos((2 * Math.PI * time.current) / pendulum.period)
      const x = Math.sin(angle) * pendulum.length
      const y = 20 + Math.cos(angle) * pendulum.length
      bobs.current[i]?.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`)
      strings.current[i]?.setAttribute("x2", x.toFixed(2))
      strings.current[i]?.setAttribute("y2", y.toFixed(2))
    })
  }, [pendulums])

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false)
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  React.useEffect(() => {
    draw()
    if (!playing) return
    let frame = 0
    let last = performance.now()
    let shown = -1
    const step = (now: number) => {
      time.current = (time.current + Math.min(Math.max(0, now - last), 50) / 1000) % cycle
      last = now
      draw()
      const whole = Math.floor(time.current)
      if (whole !== shown) {
        shown = whole
        setSeconds(whole)
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [playing, draw, cycle])

  return (
    <div data-slot="pendulum-wave" className={cn("flex w-full max-w-md flex-col gap-4", className)} {...props}>
      <div className="overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_50%_0%,#2a2a2c,#121213_70%)] shadow-[0_20px_36px_-22px_rgb(0_0_0/0.85)] ring-1 ring-black/50">
        <svg viewBox="-160 0 320 340" className="w-full" role="img" aria-label={`Pendulum wave, ${seconds} of ${cycle} seconds into the cycle`}>
          <defs>
            <radialGradient id={`${id}-steel`} cx="0.35" cy="0.3" r="0.75">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.25" stopColor="#d4d4d8" />
              <stop offset="0.7" stopColor="#6b6b72" />
              <stop offset="1" stopColor="#2a2a2e" />
            </radialGradient>
            <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d4d4d8" />
              <stop offset="1" stopColor="#71717a" />
            </linearGradient>
          </defs>
          <rect x="-150" y="12" width="300" height="8" rx="1.5" fill={`url(#${id}-bar)`} />
          {pendulums.map((pendulum, i) => (
            <g key={i}>
              <line ref={(node) => void (strings.current[i] = node)} x1="0" y1="20" x2="0" y2={20 + pendulum.length} stroke="rgb(228 228 231 / 0.28)" strokeWidth="0.6" />
              <g ref={(node) => void (bobs.current[i] = node)} transform={`translate(0 ${20 + pendulum.length})`}>
                <circle r="6.5" fill={`url(#${id}-steel)`} />
              </g>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-pressed={playing}
          onClick={() => setPlaying(!playing)}
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            time.current = 0
            setSeconds(0)
            draw()
          }}
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          Line up
        </button>
        <div className="ml-auto flex items-center gap-2.5 text-sm">
          <div aria-hidden="true" className="hidden h-1 w-20 overflow-hidden rounded-full bg-muted sm:block">
            <div className="h-full bg-foreground/70" style={{ width: `${(seconds / cycle) * 100}%` }} />
          </div>
          <span className="text-muted-foreground tabular-nums">
            {seconds}s / {cycle}s
          </span>
        </div>
      </div>
    </div>
  )
}

export { PendulumWave }
