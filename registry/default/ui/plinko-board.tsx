"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface PlinkoBoardProps extends React.ComponentProps<"div"> {
  /** Rows of pegs. There's one more slot than rows. */
  rows?: number
  /** Labels for the slots, left to right. */
  slots?: string[]
  onLand?: (slot: number) => void
}

type Ball = { id: number; path: { x: number; y: number }[]; start: number; slot: number; color: string }

const SPACING = 30
const TOP = 46
const ROW = 32
const STEP = 120
const COLORS = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"]

/**
 * A Plinko board. Drop balls and watch them bounce off the pegs into the
 * slots; drop a lot and the tally draws a bell curve.
 */
function PlinkoBoard({ rows = 9, slots: labels, onLand, className, ...props }: PlinkoBoardProps) {
  const count = rows + 1
  const width = count * SPACING + 20
  const height = TOP + rows * ROW + 70
  const [tally, setTally] = React.useState<number[]>(() => Array(count).fill(0))
  const [flash, setFlash] = React.useState<number | null>(null)
  const [drawn, setDrawn] = React.useState<{ id: number; x: number; y: number; color: string }[]>([])
  const balls = React.useRef<Ball[]>([])
  const nextId = React.useRef(0)
  const frame = React.useRef(0)
  const timers = React.useRef<number[]>([])

  React.useEffect(
    () => () => {
      cancelAnimationFrame(frame.current)
      timers.current.forEach((id) => window.clearTimeout(id))
    },
    []
  )

  const pegX = (row: number, i: number) => width / 2 + (i - (row + 2) / 2) * SPACING
  const slotX = (slot: number) => width / 2 + (slot - rows / 2) * SPACING

  const position = (ball: Ball, now: number) => {
    // A ball dropped just before this frame can be a hair in the future; start it at the top.
    const t = Math.max(0, (now - ball.start) / STEP)
    const i = Math.min(Math.floor(t), ball.path.length - 2)
    const local = Math.min(t - i, 1)
    const a = ball.path[i]
    const b = ball.path[i + 1]
    // Falling speeds up within each hop, with a little bounce off the peg.
    return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local * local - Math.sin(local * Math.PI) * 7 }
  }

  const tick = (now: number) => {
    const landed = balls.current.filter((ball) => now - ball.start >= (ball.path.length - 1) * STEP)
    if (landed.length) {
      balls.current = balls.current.filter((ball) => !landed.includes(ball))
      setTally((current) => current.map((n, i) => n + landed.filter((ball) => ball.slot === i).length))
      const last = landed[landed.length - 1].slot
      setFlash(last)
      landed.forEach((ball) => onLand?.(ball.slot))
    }
    setDrawn(balls.current.map((ball) => ({ id: ball.id, color: ball.color, ...position(ball, now) })))
    frame.current = balls.current.length ? requestAnimationFrame(tick) : 0
  }

  const drop = () => {
    let offset = 0
    const path = [{ x: width / 2, y: 12 }]
    for (let row = 0; row < rows; row++) {
      // Each peg knocks the ball half a gap left or right.
      offset += Math.random() < 0.5 ? -1 : 1
      path.push({ x: width / 2 + (offset * SPACING) / 2, y: TOP + row * ROW + 14 })
    }
    path.push({ x: path[path.length - 1].x, y: height - 26 })
    nextId.current += 1
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    balls.current.push({ id: nextId.current, path, start: performance.now() - (still ? path.length * STEP : 0), slot: (offset + rows) / 2, color: COLORS[nextId.current % COLORS.length] })
    if (!frame.current) frame.current = requestAnimationFrame(tick)
  }

  const dropMany = (n: number) => {
    for (let i = 0; i < n; i++) timers.current.push(window.setTimeout(drop, i * 110))
  }

  const total = tally.reduce((a, b) => a + b, 0)
  const tallest = Math.max(1, ...tally)

  return (
    <div data-slot="plinko-board" className={cn("flex w-full max-w-sm flex-col gap-4", className)} {...props}>
      <div className="rounded-2xl bg-linear-to-b from-indigo-900 to-slate-950 p-3 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.8)]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label={`Plinko board, ${total} balls dropped`}>
          {Array.from({ length: rows }, (_, row) =>
            Array.from({ length: row + 3 }, (_, i) => <circle key={`${row}-${i}`} cx={pegX(row, i)} cy={TOP + row * ROW} r="3.4" fill="#e2e8f0" />)
          )}
          {Array.from({ length: count }, (_, slot) => {
            const x = slotX(slot)
            const bar = (tally[slot] / tallest) * 34
            return (
              <g key={slot}>
                <rect x={x - SPACING / 2 + 2} y={height - 48} width={SPACING - 4} height="44" rx="4" fill={flash === slot ? "#facc15" : "rgb(255 255 255 / 0.08)"} className="transition-[fill] duration-300" />
                <rect x={x - SPACING / 2 + 6} y={height - 8 - bar} width={SPACING - 12} height={bar} rx="2" fill="rgb(255 255 255 / 0.35)" />
                <text x={x} y={height - 36} textAnchor="middle" fontSize="9" fontWeight="700" fill={flash === slot ? "#1e1b4b" : "#cbd5e1"}>
                  {labels?.[slot] ?? tally[slot]}
                </text>
              </g>
            )
          })}
          {drawn.map((ball) => (
            <circle key={ball.id} cx={ball.x} cy={ball.y} r="6" fill={ball.color} stroke="white" strokeWidth="1.2" />
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={drop} className="h-10 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50">
          Drop a ball
        </button>
        <button type="button" onClick={() => dropMany(20)} className="h-10 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          Drop 20
        </button>
        <button
          type="button"
          aria-label="Reset the tally"
          onClick={() => {
            setTally(Array(count).fill(0))
            setFlash(null)
          }}
          className="ml-auto grid size-10 place-items-center rounded-full border text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
        </button>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {total ? `${total} dropped. Most landed in slot ${tally.indexOf(tallest) + 1}.` : "Drop a ball to start."}
      </p>
    </div>
  )
}

export { PlinkoBoard }
