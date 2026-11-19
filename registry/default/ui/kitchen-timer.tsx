"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface KitchenTimerProps extends React.ComponentProps<"div"> {
  /** Minutes on the dial. */
  max?: number
  defaultMinutes?: number
  onDone?: () => void
}

const mod = (value: number, by: number) => ((value % by) + by) % by

/**
 * A wind-up kitchen timer. Twist the dial (drag, scroll or arrow keys) to set
 * the minutes; let go and it ticks back down to zero, then rings.
 */
function KitchenTimer({ max = 60, defaultMinutes = 0, onDone, className, ...props }: KitchenTimerProps) {
  const [seconds, setSeconds] = React.useState(defaultMinutes * 60)
  const [running, setRunning] = React.useState(defaultMinutes > 0)
  const [ringing, setRinging] = React.useState(false)
  const drag = React.useRef<{ angle: number } | null>(null)
  const done = React.useRef(onDone)
  const left = React.useRef(seconds)
  React.useEffect(() => {
    done.current = onDone
    left.current = seconds
  })

  React.useEffect(() => {
    if (!running) return
    const tick = setInterval(() => {
      const next = Math.max(0, left.current - 1)
      left.current = next
      setSeconds(next)
      if (next === 0) {
        setRunning(false)
        setRinging(true)
        done.current?.()
      }
    }, 1000)
    return () => clearInterval(tick)
  }, [running])

  const set = (next: number) => {
    setRinging(false)
    setSeconds(Math.round(Math.min(max * 60, Math.max(0, next)) / 30) * 30)
  }

  const angleAt = (event: React.PointerEvent, element: HTMLElement) => {
    const box = element.getBoundingClientRect()
    return mod((Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY) * 180) / Math.PI, 360)
  }

  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60

  return (
    <div data-slot="kitchen-timer" className={cn("flex w-60 flex-col items-center gap-4", className)} {...props}>
      <div className={cn("relative aspect-square w-full", ringing && "animate-kitchen-timer-ring motion-reduce:animate-none")}>
        <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-linear-to-b from-neutral-50 to-neutral-200 shadow-[0_14px_24px_-12px_rgb(0_0_0/0.55),inset_0_-6px_12px_rgb(0_0_0/0.08)] dark:from-neutral-200 dark:to-neutral-400" />
        <span aria-hidden="true" className="absolute top-[3%] left-1/2 size-0 -translate-x-1/2 border-x-[8px] border-t-[12px] border-x-transparent border-t-red-500" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Minutes"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={minutes}
          aria-valuetext={`${minutes} minutes ${rest} seconds`}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { angle: angleAt(event, event.currentTarget) }
            setRunning(false)
          }}
          onPointerMove={(event) => {
            if (!drag.current) return
            const now = angleAt(event, event.currentTarget)
            const delta = mod(now - drag.current.angle + 180, 360) - 180
            drag.current.angle = now
            set(seconds - (delta / 360) * max * 60)
          }}
          onPointerUp={() => {
            drag.current = null
            setRunning(seconds > 0)
          }}
          onKeyDown={(event) => {
            const moves: Record<string, number> = { ArrowUp: 60, ArrowRight: 60, ArrowDown: -60, ArrowLeft: -60, PageUp: 300, PageDown: -300 }
            const move = moves[event.key]
            if (move === undefined) return
            event.preventDefault()
            const next = Math.min(max * 60, Math.max(0, seconds + move))
            set(next)
            setRunning(next > 0)
          }}
          style={{ rotate: `${(-seconds / (max * 60)) * 360}deg` }}
          className="absolute inset-[12%] cursor-grab touch-none rounded-full bg-linear-to-b from-red-500 to-red-700 shadow-[0_6px_10px_rgb(0_0_0/0.35),inset_0_2px_0_rgb(255_255_255/0.35)] outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/60 active:cursor-grabbing"
        >
          {Array.from({ length: max }, (_, i) => (
            <span key={i} aria-hidden="true" className="absolute inset-0" style={{ rotate: `${(i / max) * 360}deg` }}>
              <span className={cn("absolute top-1.5 left-1/2 w-px -translate-x-1/2 bg-white/90", i % 5 === 0 ? "h-3" : "h-1.5")} />
              {i % 5 === 0 ? <span className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-white">{i}</span> : null}
            </span>
          ))}
          <span aria-hidden="true" className="absolute inset-[32%] rounded-full bg-linear-to-b from-red-400 to-red-600 shadow-inner" />
        </div>
      </div>
      <p role="timer" className="font-mono text-2xl tabular-nums">
        {String(minutes).padStart(2, "0")}:{String(rest).padStart(2, "0")}
      </p>
      <p aria-live="polite" className="-mt-3 min-h-4 text-xs text-muted-foreground">
        {ringing ? "Ring ring! Time’s up." : running ? "Ticking…" : "Twist the dial to set it"}
      </p>
    </div>
  )
}

export { KitchenTimer }
