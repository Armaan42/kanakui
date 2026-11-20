"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type CorkNote = {
  id: string
  /** Position of the pin, in percent of the board. */
  x: number
  y: number
  kind: "card" | "sticky" | "photo"
  text: string
  /** For photos. */
  src?: string
  alt?: string
  /** Pin colour. */
  pin?: string
}

interface CorkboardProps extends React.ComponentProps<"div"> {
  notes?: CorkNote[]
  /** Pairs of note ids joined by string. */
  links?: [string, string][]
}

const NOTES: CorkNote[] = [
  { id: "goal", x: 18, y: 14, kind: "card", text: "Spring launch: 14 May", pin: "#dc2626" },
  { id: "copy", x: 55, y: 18, kind: "sticky", text: "Final copy from Ines by Friday", pin: "#2563eb" },
  { id: "press", x: 80, y: 52, kind: "card", text: "Press list: 40 names", pin: "#ca8a04" },
  { id: "demo", x: 30, y: 60, kind: "sticky", text: "Record the demo video", pin: "#16a34a" },
]
const LINKS: [string, string][] = [
  ["goal", "copy"],
  ["goal", "demo"],
  ["copy", "press"],
]

// Keep the pins far enough from the edges that the notes hanging from them stay on the board.
const clampX = (value: number) => Math.min(86, Math.max(14, value))
const clampY = (value: number) => Math.min(70, Math.max(6, value))

/**
 * A corkboard of pinned notes joined by red string. Drag the notes around
 * (or focus one and use the arrow keys) and the string follows.
 */
function Corkboard({ notes = NOTES, links = LINKS, className, ...props }: CorkboardProps) {
  const [items, setItems] = React.useState(notes)
  const board = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ id: string; dx: number; dy: number } | null>(null)

  const move = (id: string, x: number, y: number) =>
    setItems((list) => {
      const note = list.find((item) => item.id === id)
      if (!note) return list
      // The note being moved comes to the front.
      return [...list.filter((item) => item.id !== id), { ...note, x: clampX(x), y: clampY(y) }]
    })

  const percent = (event: React.PointerEvent) => {
    const box = board.current!.getBoundingClientRect()
    return { x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 }
  }

  const byId = Object.fromEntries(items.map((item) => [item.id, item]))

  return (
    <div data-slot="corkboard" className={cn("w-full max-w-3xl rounded-2xl bg-linear-to-br from-amber-700 via-amber-800 to-amber-950 p-3 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.2)]", className)} {...props}>
      <div
        ref={board}
        className="relative aspect-[16/11] overflow-hidden rounded-lg shadow-[inset_0_3px_10px_rgb(0_0_0/0.45)]"
        style={{
          backgroundColor: "#c79a68",
          backgroundImage:
            "radial-gradient(rgb(120 80 40 / 0.35) 1px, transparent 1.5px), radial-gradient(rgb(255 230 190 / 0.25) 1px, transparent 1.5px), radial-gradient(rgb(90 60 30 / 0.25) 2px, transparent 2.5px)",
          backgroundSize: "7px 7px, 11px 11px, 23px 23px",
          backgroundPosition: "0 0, 3px 5px, 9px 2px",
        }}
      >
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-40 size-full">
          {links.map(([from, to]) => {
            const a = byId[from]
            const b = byId[to]
            if (!a || !b) return null
            const sag = Math.min(10, Math.hypot(b.x - a.x, b.y - a.y) * 0.18)
            return (
              <path
                key={`${from}-${to}`}
                d={`M${a.x} ${a.y} Q${(a.x + b.x) / 2} ${(a.y + b.y) / 2 + sag} ${b.x} ${b.y}`}
                fill="none"
                stroke="#b91c1c"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="drop-shadow-[0_2px_1px_rgb(0_0_0/0.35)]"
              />
            )
          })}
        </svg>
        {items.map((note, i) => {
          const tilt = ((note.id.length * 7 + note.text.length) % 9) - 4
          return (
            <button
              key={note.id}
              type="button"
              aria-label={`${note.kind === "photo" ? note.alt ?? "Photo" : note.text}. Drag, or use the arrow keys, to move it.`}
              onPointerDown={(event) => {
                if (event.button !== 0) return
                event.currentTarget.setPointerCapture(event.pointerId)
                const point = percent(event)
                drag.current = { id: note.id, dx: note.x - point.x, dy: note.y - point.y }
                move(note.id, note.x, note.y)
              }}
              onPointerMove={(event) => {
                const current = drag.current
                if (!current || current.id !== note.id) return
                const point = percent(event)
                move(note.id, point.x + current.dx, point.y + current.dy)
              }}
              onPointerUp={() => {
                drag.current = null
              }}
              onKeyDown={(event) => {
                const steps: Record<string, [number, number]> = { ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2] }
                const step = steps[event.key]
                if (!step) return
                event.preventDefault()
                move(note.id, note.x + step[0], note.y + step[1])
              }}
              className="absolute w-[27%] -translate-x-1/2 cursor-grab touch-none text-left outline-none select-none focus-visible:z-50 active:cursor-grabbing [&:focus-visible>span]:ring-3 [&:focus-visible>span]:ring-sky-400"
              style={{ left: `${note.x}%`, top: `${note.y}%`, zIndex: i + 1, rotate: `${tilt}deg` }}
            >
              <span
                className={cn(
                  "mt-[-6px] block shadow-[0_8px_12px_-6px_rgb(0_0_0/0.5)]",
                  note.kind === "card" && "rounded-sm bg-white p-2 pt-3 font-serif text-[11px] leading-snug text-neutral-800 [background-image:linear-gradient(transparent_calc(100%-1px),#bfdbfe_1px)] [background-size:100%_1.1rem] sm:p-3 sm:pt-4 sm:text-sm",
                  note.kind === "sticky" && "aspect-square bg-yellow-200 p-2 pt-3 text-[11px] leading-snug text-neutral-800 sm:p-3 sm:pt-4 sm:text-sm",
                  note.kind === "photo" && "bg-white p-1.5 pb-5 sm:p-2 sm:pb-7"
                )}
              >
                {note.kind === "photo" ? (
                  <>
                    <img src={note.src} alt="" draggable={false} className="aspect-4/3 w-full object-cover" />
                    <span className="mt-1 block truncate font-[cursive] text-[11px] text-neutral-700 sm:text-sm">{note.text}</span>
                  </>
                ) : (
                  note.text
                )}
              </span>
              {/* Push pin. */}
              <span aria-hidden="true" className="absolute top-[-10px] left-1/2 size-3.5 -translate-x-1/2 rounded-full shadow-[1px_3px_3px_rgb(0_0_0/0.45)]" style={{ background: `radial-gradient(circle at 35% 30%, #fff8, ${note.pin ?? "#dc2626"} 45%)` }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Corkboard }
export type { CorkNote }
