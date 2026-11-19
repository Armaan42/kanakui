"use client"

import * as React from "react"
import { LockKeyhole, LockKeyholeOpen, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface SafeDialProps extends React.ComponentProps<"div"> {
  /** The combination, three numbers from 0 to 99. */
  code: [number, number, number]
  onUnlock?: () => void
}

const mod = (value: number, by: number) => ((value % by) + by) % by

/**
 * A safe's combination dial. Turn it (drag, scroll or arrow keys) to a
 * number and press the centre to enter it. Three right numbers open the door.
 */
function SafeDial({ code, onUnlock, className, ...props }: SafeDialProps) {
  const [turn, setTurn] = React.useState(0)
  const [entered, setEntered] = React.useState<number[]>([])
  const [state, setState] = React.useState<"locked" | "open" | "wrong">("locked")
  const dragging = React.useRef<{ angle: number; turn: number } | null>(null)
  const number = mod(Math.round(turn), 100)

  const angleAt = (event: React.PointerEvent, element: HTMLElement) => {
    const box = element.getBoundingClientRect()
    return (Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY) / (Math.PI * 2)) * 100
  }

  const enter = () => {
    if (state === "open") return
    const next = [...entered, number]
    if (next.length < 3) return setEntered(next)
    const right = next.every((value, i) => value === code[i])
    setEntered(next)
    setState(right ? "open" : "wrong")
    if (right) onUnlock?.()
  }

  const reset = () => {
    setEntered([])
    setState("locked")
  }

  return (
    <div data-slot="safe-dial" className={cn("flex w-72 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="relative grid aspect-square w-full place-items-center rounded-3xl bg-linear-145 from-neutral-600 via-neutral-700 to-neutral-900 p-6 shadow-[0_18px_30px_-14px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.15)]">
        <span aria-hidden="true" className="absolute top-3 left-1/2 size-0 -translate-x-1/2 border-x-[7px] border-t-[10px] border-x-transparent border-t-red-500" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Combination dial"
          aria-valuemin={0}
          aria-valuemax={99}
          aria-valuenow={number}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            dragging.current = { angle: angleAt(event, event.currentTarget), turn }
          }}
          onPointerMove={(event) => {
            if (!dragging.current) return
            const now = angleAt(event, event.currentTarget)
            const delta = mod(now - dragging.current.angle + 50, 100) - 50
            dragging.current.angle = now
            dragging.current.turn -= delta
            setTurn(dragging.current.turn)
          }}
          onPointerUp={() => {
            dragging.current = null
            setTurn((value) => Math.round(value))
          }}
          onWheel={(event) => setTurn((value) => Math.round(value + Math.sign(event.deltaY)))}
          onKeyDown={(event) => {
            const moves: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              return enter()
            }
            const move = moves[event.key]
            if (move === undefined) return
            event.preventDefault()
            setTurn((value) => Math.round(value + move))
          }}
          style={{ rotate: `${(-turn / 100) * 360}deg` }}
          className="relative aspect-square w-full cursor-grab touch-none rounded-full bg-[radial-gradient(circle_at_35%_30%,#e5e5e5,#a3a3a3_45%,#525252)] shadow-[0_6px_14px_rgb(0_0_0/0.5),inset_0_0_0_6px_#737373] outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/60 active:cursor-grabbing"
        >
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} aria-hidden="true" className="absolute inset-0" style={{ rotate: `${i * 3.6}deg` }}>
              <span className={cn("absolute top-2 left-1/2 w-px -translate-x-1/2 bg-neutral-900", i % 10 === 0 ? "h-3" : i % 5 === 0 ? "h-2" : "h-1.5")} />
              {i % 10 === 0 ? <span className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-neutral-900">{i}</span> : null}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={enter}
          aria-label={`Enter ${number}`}
          className={cn(
            "absolute grid size-20 place-items-center rounded-full bg-linear-145 from-neutral-500 to-neutral-800 text-white shadow-[0_4px_10px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.25)] outline-none transition-transform active:scale-95 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none",
            state === "open" && "bg-linear-145 from-emerald-500 to-emerald-700",
            state === "wrong" && "bg-linear-145 from-red-500 to-red-700"
          )}
        >
          {state === "open" ? <LockKeyholeOpen aria-hidden="true" className="size-6" /> : <LockKeyhole aria-hidden="true" className="size-6" />}
          <span className="font-mono text-xs tabular-nums">{String(number).padStart(2, "0")}</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("grid h-9 w-11 place-items-center rounded-md border font-mono text-sm tabular-nums", entered[i] !== undefined ? "border-foreground" : "border-dashed text-muted-foreground")}>
            {entered[i] !== undefined ? String(entered[i]).padStart(2, "0") : "--"}
          </span>
        ))}
        <button type="button" onClick={reset} aria-label="Clear the numbers" className="ml-1 grid size-9 place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          <RotateCcw aria-hidden="true" className="size-4" />
        </button>
      </div>
      <p role="status" className="min-h-5 text-sm">
        {state === "open" ? "Unlocked." : state === "wrong" ? "Wrong combination. Clear and try again." : `Turn to a number and press the centre (${entered.length}/3).`}
      </p>
    </div>
  )
}

export { SafeDial }
