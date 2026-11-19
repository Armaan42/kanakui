"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface AnalogClockProps extends React.ComponentProps<"div"> {
  /** IANA time zone, for example "Asia/Tokyo". Defaults to the visitor's own. */
  timeZone?: string
  /** Shown under the dial, for example a city. */
  label?: string
}

const mod = (value: number, by: number) => ((value % by) + by) % by

function formatTime(totalMinutes: number) {
  const hour = Math.floor(mod(totalMinutes, 720) / 60) || 12
  const minute = String(mod(totalMinutes, 60)).padStart(2, "0")
  return `${hour}:${minute} ${mod(totalMinutes, 1440) < 720 ? "AM" : "PM"}`
}

/**
 * A station clock. The needle sweeps round, waits at twelve, and the minute
 * hand clicks forward. Drag the minute hand, or use the arrow keys, to set
 * the clock by hand; "Back to now" returns it to the real time.
 */
function AnalogClock({ timeZone, label, className, ...props }: AnalogClockProps) {
  const hourHand = React.useRef<SVGGElement>(null)
  const minuteHand = React.useRef<SVGGElement>(null)
  const secondHand = React.useRef<SVGGElement>(null)
  const dial = React.useRef<SVGSVGElement>(null)
  const offset = React.useRef(0)
  const shownMinutes = React.useRef(0)
  const dragging = React.useRef(false)
  const [time, setTime] = React.useState<string | null>(null)
  const [adjusted, setAdjusted] = React.useState(false)

  React.useEffect(() => {
    const parts = timeZone
      ? new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", hour: "numeric", minute: "numeric" })
      : null
    const rotate = (hand: SVGGElement | null, angle: number) => hand?.setAttribute("transform", `rotate(${angle.toFixed(2)} 100 100)`)
    let frame = 0
    let lastLabel = ""

    const tick = () => {
      const now = new Date()
      let minutes = now.getHours() * 60 + now.getMinutes()
      if (parts) {
        const read = (type: string) => Number(parts.formatToParts(now).find((part) => part.type === type)?.value ?? 0)
        minutes = read("hour") * 60 + read("minute")
      }
      const seconds = now.getSeconds() + now.getMilliseconds() / 1000
      const total = minutes + offset.current
      shownMinutes.current = total
      const settle = dragging.current ? 1 : 1 - (1 - Math.min(1, seconds / 0.25)) ** 3
      rotate(hourHand.current, mod(total, 720) / 2)
      rotate(minuteHand.current, (mod(total, 60) - 1 + settle) * 6)
      rotate(secondHand.current, Math.min(1, seconds / 58.5) * 360)
      const next = formatTime(total)
      if (next !== lastLabel) {
        lastLabel = next
        setTime(next)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [timeZone])

  const nudge = (minutes: number) => {
    offset.current += minutes
    setAdjusted(offset.current !== 0)
  }

  const dragTo = (event: React.PointerEvent) => {
    const box = dial.current?.getBoundingClientRect()
    if (!box) return
    const angle = Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY)
    const target = mod(Math.round((angle / (Math.PI * 2)) * 60), 60)
    nudge(mod(target - mod(shownMinutes.current, 60) + 30, 60) - 30)
  }

  return (
    <div data-slot="analog-clock" className={cn("flex w-64 max-w-full flex-col items-center gap-3", className)} {...props}>
      <svg ref={dial} viewBox="0 0 200 200" className="w-full touch-none drop-shadow-[0_14px_18px_rgb(0_0_0/0.3)]" role="group" aria-label={label ? `Clock, ${label}` : "Clock"}>
        <circle cx="100" cy="100" r="98" fill="#27272a" />
        <circle cx="100" cy="100" r="93" fill="#a1a1aa" />
        <circle cx="100" cy="100" r="90" fill="#fafaf7" />
        {Array.from({ length: 60 }, (_, i) => (
          <line key={i} x1="100" y1="14" x2="100" y2={i % 5 === 0 ? 25 : 18} stroke="#18181b" strokeWidth={i % 5 === 0 ? 2.6 : 0.8} transform={`rotate(${i * 6} 100 100)`} />
        ))}
        {[12, 3, 6, 9].map((hour) => {
          const angle = (hour / 12) * Math.PI * 2
          return (
            <text key={hour} x={(100 + 62 * Math.sin(angle)).toFixed(2)} y={(100 - 62 * Math.cos(angle)).toFixed(2)} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="600" fill="#18181b" fontFamily="ui-sans-serif, system-ui, sans-serif">
              {hour}
            </text>
          )
        })}
        <g ref={hourHand} transform="rotate(304 100 100)">
          <path d="M96.5 116h7l-1.2-64a2.3 2.3 0 0 0-4.6 0Z" fill="#18181b" />
        </g>
        <g
          ref={minuteHand}
          transform="rotate(48 100 100)"
          role="slider"
          tabIndex={0}
          aria-label="Set the minutes"
          aria-valuemin={0}
          aria-valuemax={59}
          aria-valuenow={time ? Number(time.split(":")[1].slice(0, 2)) : 0}
          aria-valuetext={time ?? undefined}
          onKeyDown={(event) => {
            const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 5, PageDown: -5 }[event.key]
            if (!step) return
            event.preventDefault()
            nudge(step)
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            dragging.current = true
          }}
          onPointerMove={(event) => {
            if (dragging.current) dragTo(event)
          }}
          onPointerUp={() => {
            dragging.current = false
          }}
          onPointerCancel={() => {
            dragging.current = false
          }}
          className="cursor-grab outline-none active:cursor-grabbing [&:focus-visible>path]:fill-blue-700"
        >
          <rect x="90" y="18" width="20" height="104" fill="transparent" />
          <path d="M97.4 120h5.2l-.9-96a1.7 1.7 0 0 0-3.4 0Z" fill="#18181b" />
        </g>
        <g ref={secondHand} className="pointer-events-none">
          <path d="M99.5 132h1V30l2.2 9h-5.4l2.2-9Z" fill="#b45309" />
          <circle cx="100" cy="100" r="4.5" fill="#b45309" />
          <circle cx="100" cy="100" r="1.5" fill="#fafaf7" />
        </g>
      </svg>
      <div className="flex min-h-8 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
        {label ? <span className="font-medium">{label}</span> : null}
        <time className="font-mono text-muted-foreground tabular-nums">{time ?? " "}</time>
        {adjusted ? (
          <button
            type="button"
            onClick={() => nudge(-offset.current)}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <RotateCcw aria-hidden="true" className="size-3" />
            Back to now
          </button>
        ) : null}
      </div>
    </div>
  )
}

export { AnalogClock }
