"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface CameraShutterProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Available apertures, widest first, as f-numbers. */
  stops?: number[]
  defaultStop?: number
  /** Engraved on the lens ring. */
  lensLabel?: string
  onStopChange?: (stop: number) => void
  /** Called when the shutter fires, with the aperture and the running shot count. */
  onCapture?: (shot: { stop: number; count: number }) => void
}

const BLADES = 9
const CENTER = 100
const RIM = 74
const MIN_HOLE = 2
const MAX_HOLE = 66

type Point = [number, number]
const fixed = (value: number) => value.toFixed(2)

function rimHit(from: Point, to: Point): Point {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dx, dy) || 1
  const [ux, uy] = [dx / length, dy / length]
  const [ox, oy] = [from[0] - CENTER, from[1] - CENTER]
  const b = ox * ux + oy * uy
  const t = -b + Math.sqrt(Math.max(0, b * b - (ox * ox + oy * oy - RIM * RIM)))
  return [from[0] + ux * t, from[1] + uy * t]
}

/** One path per blade for an opening from 0 (shut) to 1 (wide open). */
function bladePaths(opening: number) {
  const hole = MIN_HOLE + (MAX_HOLE - MIN_HOLE) * opening
  const twist = (1 - opening) * 1.05
  const corners = Array.from({ length: BLADES }, (_, i): Point => {
    const angle = twist + (i * Math.PI * 2) / BLADES
    return [CENTER + hole * Math.cos(angle), CENTER + hole * Math.sin(angle)]
  })
  const at = (i: number) => corners[(i + BLADES) % BLADES]
  const edge = corners.map((corner, i) => rimHit(at(i - 1), corner))
  return corners.map((corner, i) => {
    const next = at(i + 1)
    const nextEdge = edge[(i + 1) % BLADES]
    return `M${fixed(corner[0])} ${fixed(corner[1])}L${fixed(next[0])} ${fixed(next[1])}L${fixed(nextEdge[0])} ${fixed(nextEdge[1])}A${RIM} ${RIM} 0 0 0 ${fixed(edge[i][0])} ${fixed(edge[i][1])}Z`
  })
}

/**
 * A lens with a working iris. Pick an aperture and the blades close down to
 * it; press the shutter and they snap shut and open again with a flash.
 */
function CameraShutter({
  stops = [1.8, 2.8, 4, 5.6, 8, 11, 16],
  defaultStop,
  lensLabel = "50mm 1:1.8",
  onStopChange,
  onCapture,
  className,
  ...props
}: CameraShutterProps) {
  const openingFor = React.useCallback((stop: number) => stops[0] / stop, [stops])
  const [stop, setStop] = React.useState(defaultStop ?? stops[2] ?? stops[0])
  const [opening, setOpening] = React.useState(() => openingFor(defaultStop ?? stops[2] ?? stops[0]))
  const [count, setCount] = React.useState(0)
  const [flash, setFlash] = React.useState(false)
  const current = React.useRef(opening)
  const frame = React.useRef(0)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const busy = React.useRef(false)
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")

  React.useEffect(
    () => () => {
      cancelAnimationFrame(frame.current)
      clearTimeout(timer.current)
    },
    []
  )

  const moveTo = (target: number, duration: number, done?: () => void) => {
    cancelAnimationFrame(frame.current)
    const from = current.current
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      current.current = target
      setOpening(target)
      done?.()
      return
    }
    let start: number | undefined
    const step = (now: number) => {
      start ??= now
      const progress = Math.min(1, (now - start) / duration)
      const value = from + (target - from) * (1 - (1 - progress) ** 3)
      current.current = value
      setOpening(value)
      if (progress < 1) frame.current = requestAnimationFrame(step)
      else done?.()
    }
    frame.current = requestAnimationFrame(step)
  }

  const chooseStop = (next: number) => {
    setStop(next)
    onStopChange?.(next)
    if (!busy.current) moveTo(openingFor(next), 320)
  }

  const fire = () => {
    if (busy.current) return
    busy.current = true
    moveTo(0, 90, () => {
      setFlash(true)
      const nextCount = count + 1
      setCount(nextCount)
      onCapture?.({ stop, count: nextCount })
      timer.current = setTimeout(() => {
        setFlash(false)
        moveTo(openingFor(stop), 240, () => {
          busy.current = false
        })
      }, 90)
    })
  }

  const blades = bladePaths(opening)

  return (
    <div data-slot="camera-shutter" className={cn("flex w-72 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="relative aspect-square w-full rounded-full bg-[radial-gradient(circle_at_35%_28%,#3f3f46,#18181b_62%,#09090b)] shadow-[0_18px_40px_-14px_rgb(0_0_0/0.6),inset_0_1px_1px_rgb(255_255_255/0.2)]">
        <svg viewBox="0 0 200 200" role="img" aria-label={`Lens iris set to f/${stop}`} className="size-full">
          <defs>
            <radialGradient id={`${id}-glass`} cx="42%" cy="36%" r="72%">
              <stop offset="0" stopColor="#6d5bd0" />
              <stop offset="0.42" stopColor="#123a4c" />
              <stop offset="1" stopColor="#030712" />
            </radialGradient>
            <path id={`${id}-ring`} d="M100 12a88 88 0 1 1-.01 0" />
          </defs>
          {Array.from({ length: 72 }, (_, i) => (
            <line key={i} x1="100" y1="3" x2="100" y2={i % 6 === 0 ? 8 : 6} stroke="#71717a" strokeWidth="0.7" transform={`rotate(${i * 5} 100 100)`} />
          ))}
          <text fill="#d4d4d8" fontSize="7" letterSpacing="2.4" fontFamily="ui-monospace, monospace">
            <textPath href={`#${id}-ring`} startOffset="3%">
              {lensLabel}
            </textPath>
          </text>
          <circle cx="100" cy="100" r="80" fill="#0a0a0b" stroke="#3f3f46" strokeWidth="1.5" />
          <circle cx="100" cy="100" r={RIM} fill={`url(#${id}-glass)`} />
          <ellipse cx="78" cy="72" rx="15" ry="8" fill="white" opacity="0.2" transform="rotate(-32 78 72)" />
          {blades.map((d, i) => (
            <path key={i} d={d} fill={i % 2 ? "#1c1c20" : "#232328"} stroke="#44444c" strokeWidth="0.5" strokeLinejoin="round" />
          ))}
          <circle cx="100" cy="100" r={RIM} fill="none" stroke="#000" strokeWidth="2" />
        </svg>
        <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 rounded-full bg-white transition-opacity", flash ? "opacity-90 duration-75" : "opacity-0 duration-300")} />
      </div>

      <fieldset className="w-full">
        <legend className="sr-only">Aperture</legend>
        <div className="flex flex-wrap justify-center gap-1">
          {stops.map((value) => (
            <label key={value} className="cursor-pointer">
              <input type="radio" name={`${id}-stop`} className="peer sr-only" checked={stop === value} onChange={() => chooseStop(value)} />
              <span className="block rounded-md border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                f/{value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={fire}
          aria-label="Release the shutter"
          className="grid size-14 place-items-center rounded-full border-4 border-foreground/80 outline-none transition-transform active:scale-90 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
        >
          <span aria-hidden="true" className="size-9 rounded-full bg-red-600 shadow-[inset_0_-3px_5px_rgb(0_0_0/0.3)]" />
        </button>
        <p aria-live="polite" className="w-20 font-mono text-xs text-muted-foreground tabular-nums">
          {count} {count === 1 ? "shot" : "shots"}
        </p>
      </div>
    </div>
  )
}

export { CameraShutter }
