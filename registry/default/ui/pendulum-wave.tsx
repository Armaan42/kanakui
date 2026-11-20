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
  const bobs = React.useRef<(SVGCircleElement | null)[]>([])
  const strings = React.useRef<(SVGLineElement | null)[]>([])

  // The longest swings 51 times per cycle, each shorter one once more.
  const pendulums = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const period = cycle / (51 + i)
        // Lengths are spread evenly for the picture; the timing comes from the period alone.
        const length = 292 - i * (180 / Math.max(count - 1, 1))
        return { period, length, color: `hsl(${200 + (i / count) * 160} 85% 60%)` }
      }),
    [count, cycle]
  )

  const draw = React.useCallback(() => {
    pendulums.forEach((pendulum, i) => {
      const angle = SWING * Math.cos((2 * Math.PI * time.current) / pendulum.period)
      const x = Math.sin(angle) * pendulum.length
      const y = 20 + Math.cos(angle) * pendulum.length
      bobs.current[i]?.setAttribute("cx", x.toFixed(2))
      bobs.current[i]?.setAttribute("cy", y.toFixed(2))
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
      time.current = (time.current + Math.min(now - last, 50) / 1000) % cycle
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
      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_50%_0%,#1e293b,#020617_75%)] p-4 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.8)]">
        <svg viewBox="-160 0 320 340" className="w-full" role="img" aria-label={`Pendulum wave, ${seconds} of ${cycle} seconds into the cycle`}>
          <rect x="-150" y="10" width="300" height="10" rx="3" fill="#475569" />
          {pendulums.map((pendulum, i) => (
            <g key={i}>
              <line ref={(node) => void (strings.current[i] = node)} x1="0" y1="20" x2="0" y2={20 + pendulum.length} stroke="rgb(203 213 225 / 0.35)" strokeWidth="0.8" />
              <circle ref={(node) => void (bobs.current[i] = node)} cx="0" cy={20 + pendulum.length} r={5 + (i / count) * 3} fill={pendulum.color} style={{ filter: `drop-shadow(0 0 4px ${pendulum.color})` }} />
            </g>
          ))}
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-pressed={playing}
          onClick={() => setPlaying(!playing)}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
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
          className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          Line up
        </button>
        <span className="ml-auto font-mono text-sm text-muted-foreground tabular-nums">
          {seconds}s / {cycle}s
        </span>
      </div>
    </div>
  )
}

export { PendulumWave }
