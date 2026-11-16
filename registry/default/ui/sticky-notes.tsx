"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface StickyNote {
  id: string
  text: string
  color?: "yellow" | "pink" | "blue" | "green"
  /** Starting position, as a percentage of the board's width and height. */
  x: number
  y: number
  /** Tilt in degrees. */
  rotate?: number
}

interface StickyNotesProps extends React.ComponentProps<"div"> {
  notes: StickyNote[]
}

const COLORS = {
  yellow: "bg-[#fff3a6] text-[#5b4a12]",
  pink: "bg-[#ffd3e1] text-[#6b2240]",
  blue: "bg-[#cfe6ff] text-[#1e3a5f]",
  green: "bg-[#d4f5c9] text-[#24502a]",
}
const HANDWRITING = '"Segoe Print", "Bradley Hand", "Marker Felt", "Chalkboard SE", cursive'
const KEY_STEP = 2 // percent

/**
 * A board of sticky notes. Drag a note to move it; the note you grab comes
 * to the front. Keyboard users can focus a note and move it with the arrow
 * keys (hold Shift for bigger steps).
 */
function StickyNotes({ notes, className, ...props }: StickyNotesProps) {
  const boardRef = React.useRef<HTMLDivElement>(null)
  const [positions, setPositions] = React.useState(() => Object.fromEntries(notes.map((n) => [n.id, { x: n.x, y: n.y }])))
  const [stack, setStack] = React.useState(() => notes.map((n) => n.id))
  const [dragging, setDragging] = React.useState<string | null>(null)
  const grab = React.useRef({ dx: 0, dy: 0 })

  const bringToFront = (id: string) => setStack((s) => [...s.filter((x) => x !== id), id])

  const moveTo = (id: string, x: number, y: number) =>
    setPositions((p) => ({ ...p, [id]: { x: Math.min(82, Math.max(0, x)), y: Math.min(78, Math.max(0, y)) } }))

  return (
    <div
      ref={boardRef}
      data-slot="sticky-notes"
      className={cn(
        "@container relative aspect-[4/3] w-full max-w-2xl touch-none overflow-hidden rounded-2xl border bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] bg-muted/30",
        className
      )}
      {...props}
    >
      {notes.map((note) => {
        const position = positions[note.id]
        const z = stack.indexOf(note.id)
        const isDragging = dragging === note.id
        return (
          <div
            key={note.id}
            role="note"
            tabIndex={0}
            aria-label={`${note.text}. Use the arrow keys to move this note.`}
            onPointerDown={(event) => {
              const board = boardRef.current?.getBoundingClientRect()
              if (!board) return
              event.currentTarget.setPointerCapture(event.pointerId)
              bringToFront(note.id)
              setDragging(note.id)
              grab.current = {
                dx: event.clientX - board.left - (position.x / 100) * board.width,
                dy: event.clientY - board.top - (position.y / 100) * board.height,
              }
            }}
            onPointerMove={(event) => {
              if (!isDragging) return
              const board = boardRef.current?.getBoundingClientRect()
              if (!board) return
              moveTo(
                note.id,
                ((event.clientX - board.left - grab.current.dx) / board.width) * 100,
                ((event.clientY - board.top - grab.current.dy) / board.height) * 100
              )
            }}
            onPointerUp={() => setDragging(null)}
            onPointerCancel={() => setDragging(null)}
            onFocus={() => bringToFront(note.id)}
            onKeyDown={(event) => {
              const step = event.shiftKey ? KEY_STEP * 4 : KEY_STEP
              const moves: Record<string, [number, number]> = {
                ArrowLeft: [-step, 0],
                ArrowRight: [step, 0],
                ArrowUp: [0, -step],
                ArrowDown: [0, step],
              }
              const move = moves[event.key]
              if (!move) return
              event.preventDefault()
              moveTo(note.id, position.x + move[0], position.y + move[1])
            }}
            className={cn(
              "absolute flex aspect-square w-[18%] min-w-28 cursor-grab flex-col p-[2.5%] pt-[4%] outline-none select-none",
              "shadow-[0_1px_1px_rgb(0_0_0/0.08),0_10px_18px_-10px_rgb(0_0_0/0.45)] focus-visible:ring-3 focus-visible:ring-ring/50",
              "transition-[box-shadow,scale] duration-200",
              isDragging && "scale-105 cursor-grabbing shadow-[0_2px_4px_rgb(0_0_0/0.1),0_22px_30px_-12px_rgb(0_0_0/0.5)]",
              COLORS[note.color ?? "yellow"]
            )}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              zIndex: z + 1,
              rotate: `${isDragging ? 0 : (note.rotate ?? 0)}deg`,
            }}
          >
            {/* Tape */}
            <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-4deg] bg-white/55 shadow-sm backdrop-blur-[1px]" />
            <p className="text-[clamp(0.8rem,1.9cqw,1.05rem)] leading-snug" style={{ fontFamily: HANDWRITING }}>
              {note.text}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export { StickyNotes }
