"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface WheelSegment {
  label: string
  /** Any CSS color. */
  color: string
}

interface PrizeWheelProps extends React.ComponentProps<"div"> {
  segments: WheelSegment[]
  /** Index of the segment to land on. Random when unset. */
  pick?: number
  onResult?: (segment: WheelSegment, index: number) => void
  /** Spin duration in ms. */
  duration?: number
}

const SIZE = 200
const C = SIZE / 2
const R = SIZE / 2 - 6

function slice(index: number, count: number) {
  const a0 = ((index / count) * 360 - 90) * (Math.PI / 180)
  const a1 = (((index + 1) / count) * 360 - 90) * (Math.PI / 180)
  const p = (a: number) => `${(C + R * Math.cos(a)).toFixed(2)} ${(C + R * Math.sin(a)).toFixed(2)}`
  return `M ${C} ${C} L ${p(a0)} A ${R} ${R} 0 ${count <= 2 ? 1 : 0} 1 ${p(a1)} Z`
}

/**
 * A spin-to-win wheel. "Spin" turns it several times and eases to a stop;
 * the pointer ticks as it passes each segment. The result is announced.
 * With reduced motion it shows the result straight away.
 */
function PrizeWheel({ segments, pick, onResult, duration = 5200, className, ...props }: PrizeWheelProps) {
  const wheelRef = React.useRef<HTMLDivElement>(null)
  const pointerRef = React.useRef<HTMLSpanElement>(null)
  const [rotation, setRotation] = React.useState(0)
  const [spinning, setSpinning] = React.useState(false)
  const [result, setResult] = React.useState<number | null>(null)
  const count = segments.length
  const step = 360 / count

  // While spinning, tick the pointer each time a segment edge passes it.
  React.useEffect(() => {
    if (!spinning) return
    let frame = 0
    let lastEdge = -1
    const tick = () => {
      const wheel = wheelRef.current
      if (wheel) {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(wheel).transform)
        const angle = ((Math.atan2(matrix.b, matrix.a) * 180) / Math.PI + 360) % 360
        const edge = Math.floor(angle / step)
        if (edge !== lastEdge && lastEdge !== -1) {
          pointerRef.current?.animate([{ transform: "rotate(-22deg)" }, { transform: "rotate(0deg)" }], { duration: 140, easing: "ease-out" })
        }
        lastEdge = edge
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [spinning, step])

  const spin = () => {
    if (spinning || count === 0) return
    const target = pick ?? Math.floor(Math.random() * count)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Land the middle of the target segment under the pointer (at the top), with a little jitter.
    const jitter = (Math.random() - 0.5) * step * 0.6
    const landing = 360 - (target * step + step / 2) + jitter
    const base = rotation - (rotation % 360)
    setResult(null)
    setRotation(base + (reduced ? 360 : 360 * 6) + landing)
    setSpinning(!reduced)
    const finish = () => {
      setSpinning(false)
      setResult(target)
      onResult?.(segments[target], target)
    }
    if (reduced) finish()
    else setTimeout(finish, duration)
  }

  return (
    <div data-slot="prize-wheel" className={cn("flex w-full max-w-xs flex-col items-center gap-5", className)} {...props}>
      <div className="relative aspect-square w-full">
        {/* Pointer */}
        <span
          ref={pointerRef}
          aria-hidden="true"
          className="absolute -top-2 left-1/2 z-10 -ml-3 h-9 w-6 origin-[50%_20%] drop-shadow-md"
        >
          <svg viewBox="0 0 24 36" className="size-full">
            <path d="M12 36 L2 8 A10 10 0 1 1 22 8 Z" className="fill-foreground" />
            <circle cx="12" cy="9" r="4" className="fill-background" />
          </svg>
        </span>
        {/* Wheel */}
        <div
          ref={wheelRef}
          aria-hidden="true"
          className="size-full rounded-full shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] motion-reduce:transition-none"
          style={{ transform: `rotate(${rotation}deg)`, transition: `transform ${duration}ms cubic-bezier(0.12, 0.7, 0.12, 1)` }}
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full">
            <circle cx={C} cy={C} r={C} className="fill-neutral-900 dark:fill-neutral-700" />
            {segments.map((s, i) => (
              <g key={s.label + i}>
                <path d={slice(i, count)} fill={s.color} stroke="white" strokeOpacity={0.6} strokeWidth={1} />
                <text
                  x={C}
                  y={C - R * 0.62}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${i * step + step / 2} ${C} ${C})`}
                  className="fill-white text-[9px] font-bold"
                  style={{ paintOrder: "stroke", stroke: "rgb(0 0 0 / 0.25)", strokeWidth: 2 }}
                >
                  {s.label}
                </text>
              </g>
            ))}
            {/* Pegs on the rim */}
            {segments.map((_, i) => {
              const a = ((i / count) * 360 - 90) * (Math.PI / 180)
              return <circle key={i} cx={C + (R - 3) * Math.cos(a)} cy={C + (R - 3) * Math.sin(a)} r={2.2} className="fill-amber-200" />
            })}
          </svg>
        </div>
        {/* Hub with the spin button */}
        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="absolute top-1/2 left-1/2 grid size-[26%] -translate-1/2 place-items-center rounded-full bg-foreground text-sm font-bold text-background shadow-lg ring-4 ring-background outline-none focus-visible:ring-ring/50 disabled:cursor-wait"
        >
          {spinning ? "…" : "Spin"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-6 text-center font-medium">
        {result !== null ? `You won: ${segments[result].label}!` : spinning ? "Spinning…" : ""}
      </p>
    </div>
  )
}

export { PrizeWheel }
