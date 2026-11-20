"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface HourglassProps extends React.ComponentProps<"div"> {
  /** Seconds for the sand to run through. */
  duration?: number
  onDone?: () => void
}

const format = (seconds: number) => {
  const total = Math.ceil(seconds)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`
}

/**
 * An hourglass timer. Press it to turn it over: the sand runs from the top
 * bulb to the bottom for `duration` seconds. Turn it mid-way and it runs back
 * with whatever has fallen so far, like a real one.
 */
function Hourglass({ duration = 60, onDone, className, ...props }: HourglassProps) {
  // Share of the sand in the bulb that starts at the top of the drawing.
  const [sand, setSand] = React.useState(0)
  const [turns, setTurns] = React.useState(0)
  const [running, setRunning] = React.useState(false)
  const flipped = turns % 2 === 1
  const top = flipped ? 1 - sand : sand
  const left = top * duration
  const clip = `${React.useId().replace(/[^a-zA-Z0-9]/g, "")}-glass`
  const done = React.useRef(onDone)
  const level = React.useRef(sand)
  React.useEffect(() => {
    done.current = onDone
    level.current = sand
  })

  React.useEffect(() => {
    if (!running) return
    let last = performance.now()
    const tick = setInterval(() => {
      const now = performance.now()
      const step = (now - last) / 1000 / duration
      last = now
      const next = Math.min(1, Math.max(0, flipped ? level.current + step : level.current - step))
      level.current = next
      setSand(next)
      if ((flipped && next >= 1) || (!flipped && next <= 0)) {
        setRunning(false)
        done.current?.()
      }
    }, 100)
    return () => clearInterval(tick)
  }, [running, flipped, duration])

  const turn = () => {
    setTurns((value) => value + 1)
    setRunning(true)
  }

  return (
    <div data-slot="hourglass" className={cn("flex w-48 flex-col items-center gap-4", className)} {...props}>
      <button
        type="button"
        onClick={turn}
        aria-label={running ? "Turn the hourglass over" : "Turn the hourglass to start"}
        className="rounded-xl outline-none transition-[rotate] duration-700 ease-in-out focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none"
        style={{ rotate: `${turns * 180}deg` }}
      >
        <svg viewBox="0 0 120 200" className="w-36 drop-shadow-[0_12px_14px_rgb(0_0_0/0.3)]" aria-hidden="true">
          <defs>
            <clipPath id={clip}>
              <path d="M24 22h72c0 34-26 52-30 78 4 26 30 44 30 78H24c0-34 26-52 30-78-4-26-30-44-30-78z" />
            </clipPath>
          </defs>
          <rect x="8" y="6" width="104" height="16" rx="5" fill="#7c4a24" />
          <rect x="8" y="178" width="104" height="16" rx="5" fill="#7c4a24" />
          <rect x="14" y="20" width="6" height="160" rx="3" fill="#5c3518" />
          <rect x="100" y="20" width="6" height="160" rx="3" fill="#5c3518" />
          <g clipPath={`url(#${clip})`}>
            {/* Sand in the top bulb (drawing coordinates), settled at its bottom. */}
            <rect x="0" y={22 + (1 - sand) * 78} width="120" height={sand * 78} fill="#d9a441" />
            {/* Sand in the bottom bulb, piled at the base. */}
            <rect x="0" y={178 - (1 - sand) * 78} width="120" height={(1 - sand) * 78} fill="#d9a441" />
            {running ? <rect x="58.5" y={flipped ? 22 : 96} width="3" height="82" fill="#d9a441" /> : null}
          </g>
          <path d="M24 22h72c0 34-26 52-30 78 4 26 30 44 30 78H24c0-34 26-52 30-78-4-26-30-44-30-78z" fill="rgb(255 255 255 / 0.12)" stroke="#94a3b8" strokeWidth="2.5" />
          <path d="M32 30c2 18 12 30 18 40" stroke="white" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </button>
      <p role="timer" aria-live="off" className="font-mono text-2xl tabular-nums">
        {format(turns === 0 ? duration : left)}
      </p>
      <p aria-live="polite" className="-mt-3 text-xs text-muted-foreground">
        {running ? "Running" : turns > 0 && left <= 0.05 ? "Time’s up" : "Ready"}
      </p>
    </div>
  )
}

export { Hourglass }
