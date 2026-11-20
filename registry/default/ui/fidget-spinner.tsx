"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface FidgetSpinnerProps extends React.ComponentProps<"div"> {
  /** Body colour. */
  color?: string
  /** How quickly it slows down: higher stops sooner. */
  friction?: number
}

const LOBES = [0, 120, 240]

function Body({ color, id }: { color: string; id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-body`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor={`color-mix(in oklab, ${color} 55%, white)`} />
          <stop offset="0.6" stopColor={color} />
          <stop offset="1" stopColor={`color-mix(in oklab, ${color} 60%, black)`} />
        </radialGradient>
        <radialGradient id={`${id}-metal`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#a3a3a3" />
          <stop offset="1" stopColor="#404040" />
        </radialGradient>
      </defs>
      {LOBES.map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path d="M-20 -8 L-26 -58 A30 30 0 1 1 26 -58 L20 -8 Z" fill={`url(#${id}-body)`} />
          <circle cy="-62" r="20" fill={`url(#${id}-metal)`} />
          <circle cy="-62" r="12" fill="#262626" />
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} cx={Math.cos((i / 8) * Math.PI * 2) * 16} cy={-62 + Math.sin((i / 8) * Math.PI * 2) * 16} r="2.6" fill="#d4d4d4" />
          ))}
        </g>
      ))}
      <circle r="30" fill={`url(#${id}-body)`} />
      <circle r="22" fill={`url(#${id}-metal)`} />
      <circle r="13" fill="#e5e5e5" stroke="#737373" />
    </>
  )
}

/**
 * A fidget spinner. Flick it with the pointer (or press Spin) and it keeps
 * turning on its bearings, slowing down until it stops. Shows the RPM.
 */
function FidgetSpinner({ color = "#4a4e55", friction = 1, className, ...props }: FidgetSpinnerProps) {
  const [rpm, setRpm] = React.useState(0)
  const svg = React.useRef<SVGSVGElement>(null)
  const rotor = React.useRef<SVGGElement>(null)
  const ghosts = React.useRef<(SVGGElement | null)[]>([])
  const state = React.useRef({ angle: 0, speed: 0, dragging: false, last: 0, lastTime: 0 })
  const frame = React.useRef(0)
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")

  const paint = () => {
    const { angle, speed } = state.current
    rotor.current?.setAttribute("transform", `rotate(${angle})`)
    // Faint copies trailing behind read as motion blur once it's really going.
    const blur = Math.min(1, Math.abs(speed) / 2400)
    ghosts.current.forEach((ghost, i) => {
      ghost?.setAttribute("transform", `rotate(${angle - Math.sign(speed) * (i + 1) * 9})`)
      ghost?.setAttribute("opacity", String(blur * (0.35 - i * 0.12)))
    })
  }

  const run = () => {
    if (frame.current) return
    let last = performance.now()
    let shown = 0
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const s = state.current
      if (!s.dragging) {
        s.angle += s.speed * dt
        // Bearing drag: a little proportional loss plus a small constant one.
        const slowed = s.speed * Math.exp(-0.22 * friction * dt) - Math.sign(s.speed) * 14 * friction * dt
        s.speed = Math.sign(slowed) === Math.sign(s.speed) ? slowed : 0
      }
      paint()
      if (now - shown > 150) {
        shown = now
        setRpm(Math.round(Math.abs(s.speed) / 6))
      }
      if (!s.dragging && Math.abs(s.speed) < 1) {
        s.speed = 0
        setRpm(0)
        paint()
        frame.current = 0
        return
      }
      frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
  }

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const angleOf = (event: React.PointerEvent) => {
    const box = svg.current!.getBoundingClientRect()
    return (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) / Math.PI
  }

  const flick = (amount: number) => {
    state.current.speed += amount
    run()
  }

  return (
    <div data-slot="fidget-spinner" className={cn("flex w-72 max-w-full flex-col items-center gap-4", className)} {...props}>
      <svg
        ref={svg}
        viewBox="-110 -110 220 220"
        tabIndex={0}
        role="img"
        aria-label={`Fidget spinner, ${rpm} RPM. Press Space to spin it.`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          const s = state.current
          s.dragging = true
          s.last = angleOf(event)
          s.lastTime = event.timeStamp
          s.speed = 0
          run()
        }}
        onPointerMove={(event) => {
          const s = state.current
          if (!s.dragging) return
          const now = angleOf(event)
          const delta = ((now - s.last + 540) % 360) - 180
          const dt = Math.max(event.timeStamp - s.lastTime, 1) / 1000
          s.angle += delta
          s.speed = s.speed * 0.5 + (delta / dt) * 0.5
          s.last = now
          s.lastTime = event.timeStamp
        }}
        onPointerUp={() => {
          state.current.dragging = false
          state.current.speed = Math.max(-4000, Math.min(4000, state.current.speed))
        }}
        onKeyDown={(event) => {
          if (event.key !== " " && event.key !== "Enter") return
          event.preventDefault()
          flick(1400)
        }}
        className="aspect-square w-full cursor-grab touch-none rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:cursor-grabbing"
      >
        {[0, 1, 2].map((i) => (
          <g key={i} ref={(node) => void (ghosts.current[i] = node)} opacity="0">
            <Body color={color} id={`${id}-g${i}`} />
          </g>
        ))}
        <g ref={rotor}>
          <Body color={color} id={id} />
        </g>
      </svg>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => flick(1400)}
          className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Spin
        </button>
        <p className="text-sm text-muted-foreground tabular-nums">{rpm} RPM</p>
      </div>
    </div>
  )
}

export { FidgetSpinner }
