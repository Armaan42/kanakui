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
const R = SIZE / 2 - 9

/** Dark or light label text, whichever reads better on the segment. */
function labelOn(color: string) {
  const hex = /^#([0-9a-f]{6})$/i.exec(color.trim())?.[1]
  if (!hex) return "#ffffff"
  const n = parseInt(hex, 16)
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.35 ? "#1c1c1f" : "#f7f4ee"
}

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
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")

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
          className="absolute -top-1.5 left-1/2 z-10 -ml-[11px] h-8 w-[22px] origin-[50%_28%] drop-shadow-[0_2px_2px_rgb(0_0_0/0.35)]"
        >
          <svg viewBox="0 0 22 32" className="size-full">
            <defs>
              <linearGradient id={`${id}-pointer`} x1="0" x2="1">
                <stop offset="0" stopColor="#f3dca4" />
                <stop offset="0.5" stopColor="#c99a4b" />
                <stop offset="1" stopColor="#8a6428" />
              </linearGradient>
            </defs>
            <path d="M11 32 L2 9 A9 9 0 1 1 20 9 Z" fill={`url(#${id}-pointer)`} />
            <circle cx="11" cy="9" r="3" fill="#3b2a10" />
          </svg>
        </span>
        {/* Wheel */}
        <div
          ref={wheelRef}
          aria-hidden="true"
          className="size-full rounded-full shadow-[0_24px_40px_-24px_rgb(0_0_0/0.7)] motion-reduce:transition-none"
          style={{ transform: `rotate(${rotation}deg)`, transition: `transform ${duration}ms cubic-bezier(0.12, 0.7, 0.12, 1)` }}
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full">
            <defs>
              <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#efd9a3" />
                <stop offset="0.45" stopColor="#b88a3e" />
                <stop offset="1" stopColor="#6e4f1f" />
              </linearGradient>
            </defs>
            <circle cx={C} cy={C} r={C} fill={`url(#${id}-rim)`} />
            <circle cx={C} cy={C} r={C - 4} fill="#141416" />
            {segments.map((s, i) => (
              <g key={s.label + i}>
                <path d={slice(i, count)} fill={s.color} stroke="#141416" strokeWidth={0.75} />
                <text
                  x={C}
                  y={C - R * 0.62}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${i * step + step / 2} ${C} ${C})`}
                  fill={labelOn(s.color)}
                  className="text-[8.5px] font-semibold"
                >
                  {s.label}
                </text>
              </g>
            ))}
            {/* Pegs on the rim */}
            {segments.map((_, i) => {
              const a = ((i / count) * 360 - 90) * (Math.PI / 180)
              return <circle key={i} cx={C + (R + 1) * Math.cos(a)} cy={C + (R + 1) * Math.sin(a)} r={2} fill="#f3dca4" stroke="#6e4f1f" strokeWidth={0.5} />
            })}
          </svg>
        </div>
        {/* Hub with the spin button */}
        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="absolute top-1/2 left-1/2 grid size-[24%] -translate-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fbf8f2,#e3dccd)] text-sm font-semibold text-neutral-900 shadow-[0_4px_10px_rgb(0_0_0/0.35),inset_0_-2px_0_rgb(0_0_0/0.08)] ring-[3px] ring-[#b88a3e] outline-none focus-visible:ring-ring disabled:cursor-wait"
        >
          {spinning ? "…" : "Spin"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-6 text-center text-sm">
        {result !== null ? (
          <>
            <span className="text-muted-foreground">You won </span>
            <span className="font-semibold">{segments[result].label}</span>
          </>
        ) : spinning ? (
          <span className="text-muted-foreground">Spinning…</span>
        ) : null}
      </p>
    </div>
  )
}

export { PrizeWheel }
