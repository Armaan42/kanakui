"use client"

import * as React from "react"
import { Smartphone } from "lucide-react"

import { cn } from "@/lib/utils"

interface CompassProps extends React.ComponentProps<"div"> {
  /** The direction you start out facing, in degrees. */
  defaultHeading?: number
  onHeadingChange?: (heading: number) => void
}

const POINTS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
const pointOf = (heading: number) => POINTS[Math.round(heading / 22.5) % 16]
const wrap = (degrees: number) => ((degrees % 360) + 360) % 360
const nearest = (delta: number) => ((delta + 540) % 360) - 180

type Orientation = DeviceOrientationEvent & { webkitCompassHeading?: number }
type Permissioned = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> }

/**
 * A brass compass with a floating card. Turn it by dragging (or with the
 * arrow keys) and the card swings round on its pivot, overshooting and
 * settling like the real thing. On a phone it can follow your heading.
 */
function Compass({ defaultHeading = 30, onHeadingChange, className, ...props }: CompassProps) {
  const [heading, setHeading] = React.useState(defaultHeading)
  const [live, setLive] = React.useState(false)
  const [canSense, setCanSense] = React.useState(false)
  const card = React.useRef<SVGGElement>(null)
  const svg = React.useRef<SVGSVGElement>(null)
  const physics = React.useRef({ angle: -defaultHeading, velocity: 0, target: -defaultHeading })
  const frame = React.useRef(0)
  const drag = React.useRef<{ last: number } | null>(null)

  const settle = React.useCallback(() => {
    if (frame.current) return
    let last = performance.now()
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.04)
      last = now
      const p = physics.current
      // A damped spring: the card overshoots a little and settles.
      const pull = nearest(p.target - p.angle)
      p.velocity += (pull * 38 - p.velocity * 5.6) * dt
      p.angle += p.velocity * dt
      card.current?.setAttribute("transform", `rotate(${p.angle})`)
      if (Math.abs(pull) < 0.05 && Math.abs(p.velocity) < 0.05) {
        frame.current = 0
        return
      }
      frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
  }, [])

  const face = React.useCallback(
    (next: number) => {
      const value = wrap(next)
      setHeading(value)
      onHeadingChange?.(Math.round(value))
      physics.current.target = -value
      settle()
    },
    [onHeadingChange, settle]
  )

  React.useEffect(() => {
    const id = window.setTimeout(() => setCanSense("DeviceOrientationEvent" in window && window.matchMedia("(pointer: coarse)").matches), 0)
    return () => {
      window.clearTimeout(id)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  React.useEffect(() => {
    if (!live) return
    const listen = (event: Event) => {
      const orientation = event as Orientation
      const value = orientation.webkitCompassHeading ?? (orientation.alpha === null ? null : 360 - orientation.alpha)
      if (value !== null) face(value)
    }
    window.addEventListener("deviceorientation", listen)
    return () => window.removeEventListener("deviceorientation", listen)
  }, [live, face])

  const angleOf = (event: React.PointerEvent) => {
    const box = svg.current!.getBoundingClientRect()
    return (Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY) * 180) / Math.PI
  }

  return (
    <div data-slot="compass" className={cn("flex w-72 max-w-full flex-col items-center gap-4", className)} {...props}>
      <svg
        ref={svg}
        viewBox="-120 -120 240 240"
        tabIndex={0}
        role="slider"
        aria-label="Compass. Drag or use the arrow keys to turn."
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={Math.round(heading)}
        aria-valuetext={`${Math.round(heading)} degrees, ${pointOf(heading)}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { last: angleOf(event) }
          setLive(false)
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          const now = angleOf(event)
          // Turning the compass clockwise is turning yourself clockwise.
          face(heading + nearest(now - drag.current.last))
          drag.current.last = now
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onKeyDown={(event) => {
          const steps: Record<string, number> = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 45, PageDown: -45 }
          const by = steps[event.key]
          if (by === undefined) return
          event.preventDefault()
          setLive(false)
          face(heading + by)
        }}
        className="w-full cursor-grab touch-none rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:cursor-grabbing"
      >
        <defs>
          <radialGradient id="compass-brass" cx="0.35" cy="0.3" r="0.9">
            <stop offset="0" stopColor="#fef3c7" />
            <stop offset="0.35" stopColor="#d4a72c" />
            <stop offset="0.8" stopColor="#8a6212" />
            <stop offset="1" stopColor="#4a3308" />
          </radialGradient>
        </defs>
        <circle r="118" fill="url(#compass-brass)" />
        <circle r="102" fill="#f8f1df" stroke="#8a6212" strokeWidth="2" />
        {/* The floating card: degree ticks, letters and the needle all swing together. */}
        <g ref={card} transform={`rotate(${-defaultHeading})`}>
          {Array.from({ length: 72 }, (_, i) => (
            <line key={i} y1="-98" y2={i % 9 === 0 ? -84 : i % 3 === 0 ? -89 : -93} stroke="#3f3a2e" strokeWidth={i % 9 === 0 ? 1.6 : 0.8} transform={`rotate(${i * 5})`} />
          ))}
          {[
            ["N", 0],
            ["E", 90],
            ["S", 180],
            ["W", 270],
          ].map(([letter, angle]) => (
            <text key={letter} y="-64" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill={letter === "N" ? "#b91c1c" : "#3f3a2e"} transform={`rotate(${angle})`}>
              {letter}
            </text>
          ))}
          <path d="M0 -58 L9 0 L0 6 L-9 0 Z" fill="#b91c1c" />
          <path d="M0 58 L9 0 L0 -6 L-9 0 Z" fill="#e7e5e4" stroke="#78716c" strokeWidth="0.8" />
        </g>
        <circle r="7" fill="url(#compass-brass)" stroke="#4a3308" />
        {/* Lubber line: the way you're facing. */}
        <path d="M0 -114 L6 -103 L-6 -103 Z" fill="#111827" />
        <ellipse cx="-34" cy="-46" rx="40" ry="20" fill="rgb(255 255 255 / 0.25)" transform="rotate(-35 -34 -46)" />
      </svg>
      <p className="font-mono text-2xl tabular-nums">
        {Math.round(heading)}° <span className="text-muted-foreground">{pointOf(heading)}</span>
      </p>
      {canSense ? (
        <button
          type="button"
          aria-pressed={live}
          onClick={async () => {
            if (live) return setLive(false)
            const permission = (DeviceOrientationEvent as Permissioned).requestPermission
            if (permission && (await permission()) !== "granted") return
            setLive(true)
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Smartphone aria-hidden="true" className="size-3.5" />
          Use my phone’s compass
        </button>
      ) : null}
    </div>
  )
}

export { Compass }
