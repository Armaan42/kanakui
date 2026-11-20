"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface DartboardProps extends React.ComponentProps<"div"> {
  /** Starting score; the game counts down to exactly zero. */
  start?: number
  /** How far a throw can stray from where you aimed, in board millimetres. */
  spread?: number
  onThrow?: (score: number, label: string) => void
}

type Dart = { x: number; y: number; score: number; label: string }

const ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]
/** Real board radii in millimetres. */
const R = { bull: 6.35, outer: 15.9, trebleIn: 99, trebleOut: 107, doubleIn: 162, doubleOut: 170 }

function scoreAt(x: number, y: number): { score: number; label: string } {
  const r = Math.hypot(x, y)
  if (r <= R.bull) return { score: 50, label: "Bull" }
  if (r <= R.outer) return { score: 25, label: "Outer bull" }
  if (r > R.doubleOut) return { score: 0, label: "Miss" }
  const angle = ((Math.atan2(x, -y) * 180) / Math.PI + 360 + 9) % 360
  const number = ORDER[Math.floor(angle / 18)]
  if (r >= R.trebleIn && r <= R.trebleOut) return { score: number * 3, label: `Treble ${number}` }
  if (r >= R.doubleIn) return { score: number * 2, label: `Double ${number}` }
  return { score: number, label: `${number}` }
}

function sector(inner: number, outer: number, from: number, to: number) {
  const p = (r: number, deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180
    return `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`
  }
  return `M${p(inner, from)} L${p(outer, from)} A${outer} ${outer} 0 0 1 ${p(outer, to)} L${p(inner, to)} A${inner} ${inner} 0 0 0 ${p(inner, from)}Z`
}

/**
 * A dartboard with real proportions. Click to throw (darts stray a little),
 * or aim with the arrow keys and press Enter. Plays 301: three darts a turn,
 * count down to exactly zero, and going below zero is a bust.
 */
function Dartboard({ start = 301, spread = 14, onThrow, className, ...props }: DartboardProps) {
  const [darts, setDarts] = React.useState<Dart[]>([])
  const [left, setLeft] = React.useState(start)
  const [aim, setAim] = React.useState({ x: 0, y: -103 })
  const [note, setNote] = React.useState("")
  const svg = React.useRef<SVGSVGElement>(null)

  const turnTotal = darts.reduce((sum, dart) => sum + dart.score, 0)
  const remaining = left - turnTotal
  const over = darts.length === 3 || remaining <= 0

  const throwAt = (x: number, y: number) => {
    if (over) return
    // A human throw: scatter around the aim, more often near it than far.
    const angle = Math.random() * Math.PI * 2
    const distance = Math.sqrt(Math.random()) * spread
    const hit = { x: x + Math.cos(angle) * distance, y: y + Math.sin(angle) * distance }
    const { score, label } = scoreAt(hit.x, hit.y)
    const next = [...darts, { ...hit, score, label }]
    setDarts(next)
    onThrow?.(score, label)
    const after = left - next.reduce((sum, dart) => sum + dart.score, 0)
    setNote(after < 0 ? `${label}. Bust! The turn doesn't count.` : after === 0 ? `${label}. Checkout, you win!` : `${label}, ${score}.`)
  }

  const nextTurn = () => {
    if (remaining === 0) {
      setLeft(start)
      setNote("New game.")
    } else if (remaining > 0) setLeft(remaining)
    setDarts([])
    if (remaining < 0) setNote("Bust. Score stays at " + left + ".")
  }

  return (
    <div data-slot="dartboard" className={cn("flex w-full max-w-sm flex-col gap-4", className)} {...props}>
      <div className="rounded-full bg-neutral-900 p-2 shadow-[0_20px_34px_-14px_rgb(0_0_0/0.7)]">
        <div className="relative">
        <svg
          ref={svg}
          viewBox="-200 -200 400 400"
          tabIndex={0}
          role="application"
          aria-label="Dartboard. Click to throw, or aim with the arrow keys and press Enter."
          onClick={(event) => {
            const box = svg.current!.getBoundingClientRect()
            throwAt(((event.clientX - box.left) / box.width) * 400 - 200, ((event.clientY - box.top) / box.height) * 400 - 200)
          }}
          onKeyDown={(event) => {
            const moves: Record<string, [number, number]> = { ArrowLeft: [-6, 0], ArrowRight: [6, 0], ArrowUp: [0, -6], ArrowDown: [0, 6] }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              throwAt(aim.x, aim.y)
              return
            }
            const move = moves[event.key]
            if (!move) return
            event.preventDefault()
            setAim({ x: Math.max(-185, Math.min(185, aim.x + move[0])), y: Math.max(-185, Math.min(185, aim.y + move[1])) })
          }}
          className="peer block w-full cursor-crosshair rounded-full outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
        >
          <circle r="200" fill="#111" />
          {ORDER.map((number, i) => {
            const from = i * 18 - 9
            const to = from + 18
            const dark = i % 2 === 0
            return (
              <g key={number}>
                <path d={sector(R.outer, R.trebleIn, from, to)} fill={dark ? "#1c1917" : "#f1e7d0"} />
                <path d={sector(R.trebleIn, R.trebleOut, from, to)} fill={dark ? "#b91c1c" : "#15803d"} />
                <path d={sector(R.trebleOut, R.doubleIn, from, to)} fill={dark ? "#1c1917" : "#f1e7d0"} />
                <path d={sector(R.doubleIn, R.doubleOut, from, to)} fill={dark ? "#b91c1c" : "#15803d"} />
                <text
                  x={Math.sin((i * 18 * Math.PI) / 180) * 185}
                  y={-Math.cos((i * 18 * Math.PI) / 180) * 185 + 6}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#f5f5f4"
                  fontFamily="system-ui, sans-serif"
                >
                  {number}
                </text>
              </g>
            )
          })}
          <circle r={R.outer} fill="#15803d" />
          <circle r={R.bull} fill="#b91c1c" />
          {[R.outer, R.trebleIn, R.trebleOut, R.doubleIn, R.doubleOut].map((r) => (
            <circle key={r} r={r} fill="none" stroke="#a8a29e" strokeWidth="0.8" />
          ))}
          {/* Darts. */}
          {darts.map((dart, i) => (
            <g key={i} className="animate-dartboard-thunk motion-reduce:animate-none" style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }}>
              <line x1={dart.x} y1={dart.y} x2={dart.x + 16} y2={dart.y - 26} stroke="#d4d4d4" strokeWidth="3" strokeLinecap="round" />
              <line x1={dart.x + 16} y1={dart.y - 26} x2={dart.x + 26} y2={dart.y - 42} stroke="#404040" strokeWidth="5" strokeLinecap="round" />
              <path d={`M${dart.x + 24} ${dart.y - 38}l14 -4l-6 14z`} fill={["#0ea5e9", "#f59e0b", "#a855f7"][i]} />
              <circle cx={dart.x} cy={dart.y} r="2.2" fill="#fafafa" />
            </g>
          ))}
        </svg>
        {/* Keyboard aim, shown while the board has focus. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-6 -translate-1/2 rounded-full border-2 border-sky-400 opacity-0 peer-focus-visible:opacity-100"
          style={{ left: `${((aim.x + 200) / 400) * 100}%`, top: `${((aim.y + 200) / 400) * 100}%` }}
        />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-semibold tabular-nums">{remaining < 0 ? left : remaining}</p>
          <p className="text-xs text-muted-foreground">
            left · this turn {darts.map((dart) => dart.score).join(" + ") || "–"}
          </p>
        </div>
        <button
          type="button"
          onClick={nextTurn}
          disabled={!darts.length}
          className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          {remaining === 0 ? "New game" : "Collect darts"}
        </button>
      </div>
      <p role="status" className="min-h-5 text-sm">
        {note || `Three darts a turn. Count ${start} down to exactly zero.`}
        {over && remaining > 0 ? " Collect your darts." : ""}
      </p>
    </div>
  )
}

export { Dartboard }
