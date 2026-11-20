"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

type Shape = "circle" | "star" | "heart"

interface TicketPunchProps extends React.ComponentProps<"div"> {
  title?: string
  /** What filling the card earns. */
  reward?: string
  /** Holes on the card, up to 10. */
  slots?: number
  defaultShape?: Shape
  /** Card colour. */
  color?: string
  sound?: boolean
  onComplete?: () => void
}

const SHAPES: Record<Shape, (x: number, y: number) => React.ReactElement> = {
  circle: (x, y) => <circle cx={x} cy={y} r="9" />,
  star: (x, y) => (
    <polygon
      points={Array.from({ length: 10 }, (_, i) => {
        const r = i % 2 ? 4.4 : 11
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2
        return `${x + Math.cos(a) * r},${y + Math.sin(a) * r}`
      }).join(" ")}
    />
  ),
  heart: (x, y) => <path d={`M${x} ${y + 9} C${x - 14} ${y} ${x - 9} ${y - 11} ${x} ${y - 4} C${x + 9} ${y - 11} ${x + 14} ${y} ${x} ${y + 9}Z`} />,
}

/**
 * A punch card: click a box to punch a hole in it (circle, star or heart).
 * The paper drops out of the hole, and a full card earns the reward.
 */
function TicketPunch({
  title = "Kiln Coffee",
  reward = "Your next coffee is on us.",
  slots = 10,
  defaultShape = "star",
  color = "#0f766e",
  sound = true,
  onComplete,
  className,
  ...props
}: TicketPunchProps) {
  const total = Math.min(slots, 10)
  const [shape, setShape] = React.useState<Shape>(defaultShape)
  const [punched, setPunched] = React.useState<{ slot: number; shape: Shape }[]>([])
  const audio = React.useRef<AudioContext | null>(null)
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const full = punched.length >= total

  const spot = (slot: number) => {
    const perRow = Math.ceil(total / 2)
    const row = Math.floor(slot / perRow)
    const col = slot % perRow
    return { x: 150 + (col - (perRow - 1) / 2) * 50, y: 98 + row * 54 }
  }

  const punch = (slot: number) => {
    if (punched.some((item) => item.slot === slot)) return
    const next = [...punched, { slot, shape }]
    setPunched(next)
    if (next.length === total) onComplete?.()
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const now = ctx.currentTime
      const tone = ctx.createOscillator()
      const gain = ctx.createGain()
      tone.type = "square"
      tone.frequency.setValueAtTime(900, now)
      tone.frequency.exponentialRampToValueAtTime(120, now + 0.04)
      gain.gain.setValueAtTime(0.07, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)
      tone.connect(gain).connect(ctx.destination)
      tone.start(now)
      tone.stop(now + 0.07)
    } catch {
      // No Web Audio: punch quietly.
    }
  }

  return (
    <div data-slot="ticket-punch" className={cn("flex w-full max-w-md flex-col gap-4", className)} {...props}>
      <div className="relative">
        <svg viewBox="0 0 300 204" className="w-full overflow-visible drop-shadow-[0_14px_14px_rgb(0_0_0/0.25)]" aria-hidden="true">
          <defs>
            <mask id={`${id}-holes`}>
              <rect width="300" height="204" fill="white" />
              {punched.map((item) => (
                <g key={item.slot} fill="black">
                  {SHAPES[item.shape](spot(item.slot).x, spot(item.slot).y)}
                </g>
              ))}
            </mask>
          </defs>
          <g mask={`url(#${id}-holes)`}>
            <rect width="300" height="204" rx="12" fill="#fbf7ee" />
            <rect width="300" height="64" rx="12" fill={color} />
            <rect y="52" width="300" height="12" fill={color} />
            <text x="20" y="34" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="#fff">
              {title}
            </text>
            <text x="20" y="52" fontSize="10" fill="rgb(255 255 255 / 0.85)">
              Buy {total - 1}, get the {total === 10 ? "10th" : `${total}th`} free
            </text>
            {Array.from({ length: total }, (_, slot) => {
              const { x, y } = spot(slot)
              return (
                <g key={slot}>
                  <circle cx={x} cy={y} r="17" fill="none" stroke={color} strokeOpacity="0.45" strokeDasharray="3 3" />
                  <text x={x} y={y + 27} textAnchor="middle" fontSize="8" fill="#57534e">
                    {slot + 1}
                  </text>
                </g>
              )
            })}
          </g>
          {/* Punched-out paper, falling away. */}
          {punched.map((item) => (
            <g key={item.slot} fill="#fbf7ee" stroke="rgb(0 0 0 / 0.15)" strokeWidth="0.5" className="animate-ticket-punch-chad motion-reduce:hidden" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              {SHAPES[item.shape](spot(item.slot).x, spot(item.slot).y)}
            </g>
          ))}
        </svg>
        {Array.from({ length: total }, (_, slot) => {
          const { x, y } = spot(slot)
          const done = punched.some((item) => item.slot === slot)
          return (
            <button
              key={slot}
              type="button"
              disabled={done}
              aria-label={done ? `Box ${slot + 1}, punched` : `Punch box ${slot + 1}`}
              onClick={() => punch(slot)}
              className="absolute size-[12%] -translate-1/2 cursor-crosshair rounded-full outline-none focus-visible:ring-3 focus-visible:ring-sky-500 disabled:cursor-default"
              style={{ left: `${(x / 300) * 100}%`, top: `${(y / 204) * 100}%` }}
            />
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Punch shape" className="inline-flex rounded-full border p-1">
          {(["circle", "star", "heart"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={shape === item}
              onClick={() => setShape(item)}
              className="h-8 rounded-full px-3 text-sm capitalize outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {item}
            </button>
          ))}
        </div>
        {punched.length ? (
          <button type="button" onClick={() => setPunched([])} className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
            <RotateCcw aria-hidden="true" className="size-3.5" />
            New card
          </button>
        ) : null}
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {full ? `Card full. ${reward}` : `${punched.length} of ${total} punched.`}
      </p>
    </div>
  )
}

export { TicketPunch }
