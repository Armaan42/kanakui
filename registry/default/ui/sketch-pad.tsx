"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SketchPadProps extends React.ComponentProps<"div"> {
  width?: number
  height?: number
}

/**
 * A knob-drawing toy. The left knob moves the stylus across, the right one
 * up and down; drag them (or focus the screen and use the arrow keys) to
 * draw one continuous line. Shake to clear.
 */
function SketchPad({ width = 300, height = 200, className, ...props }: SketchPadProps) {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const pen = React.useRef({ x: width / 2, y: height / 2 })
  const [turns, setTurns] = React.useState({ x: 0, y: 0 })
  const [shakes, setShakes] = React.useState(0)
  const [moves, setMoves] = React.useState(0)
  const lastY = React.useRef(0)

  React.useEffect(() => {
    const element = canvas.current
    if (!element) return
    const ratio = window.devicePixelRatio || 1
    element.width = width * ratio
    element.height = height * ratio
    element.getContext("2d")?.scale(ratio, ratio)
  }, [width, height])

  const move = (dx: number, dy: number) => {
    const context = canvas.current?.getContext("2d")
    if (!context) return
    const from = pen.current
    const to = { x: Math.min(width - 2, Math.max(2, from.x + dx)), y: Math.min(height - 2, Math.max(2, from.y + dy)) }
    context.strokeStyle = "#3f3f46"
    context.lineWidth = 1.6
    context.lineCap = "round"
    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
    context.stroke()
    pen.current = to
    setTurns((value) => ({ x: value.x + dx * 3, y: value.y + dy * 3 }))
    setMoves((value) => value + 1)
  }

  const shake = () => {
    const context = canvas.current?.getContext("2d")
    context?.clearRect(0, 0, width, height)
    setShakes((value) => value + 1)
    setMoves(0)
  }

  const knob = (axis: "x" | "y", label: string) => {
    return (
      <button
        type="button"
        aria-label={`${label} knob. Drag up or down to draw.`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          lastY.current = event.clientY
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
          const delta = (lastY.current - event.clientY) / 2
          lastY.current = event.clientY
          if (delta) move(axis === "x" ? delta : 0, axis === "y" ? -delta : 0)
        }}
        onKeyDown={(event) => {
          const step = event.key === "ArrowUp" || event.key === "ArrowRight" ? 4 : event.key === "ArrowDown" || event.key === "ArrowLeft" ? -4 : 0
          if (!step) return
          event.preventDefault()
          move(axis === "x" ? step : 0, axis === "y" ? -step : 0)
        }}
        style={{ rotate: `${turns[axis]}deg` }}
        className="grid size-14 cursor-ns-resize touch-none place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#d4d4d8_55%,#a1a1aa)] shadow-[0_4px_8px_rgb(0_0_0/0.35),inset_0_0_0_3px_#e4e4e7] outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        <span aria-hidden="true" className="h-5 w-1 -translate-y-3 rounded-full bg-zinc-500" />
      </button>
    )
  }

  return (
    <div data-slot="sketch-pad" className={cn("w-fit max-w-full", className)} {...props}>
      <div key={shakes} className={cn("rounded-[1.75rem] bg-linear-to-b from-teal-500 to-teal-700 p-5 pb-4 shadow-[0_18px_30px_-14px_rgb(0_0_0/0.6),inset_0_2px_0_rgb(255_255_255/0.3)]", shakes > 0 && "animate-sketch-pad-shake motion-reduce:animate-none")}>
        <canvas
          ref={canvas}
          tabIndex={0}
          role="img"
          aria-label={`Drawing screen. Use the arrow keys to draw. ${moves} strokes.`}
          onKeyDown={(event) => {
            const moves: Record<string, [number, number]> = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -4], ArrowDown: [0, 4] }
            const step = moves[event.key]
            if (!step) return
            event.preventDefault()
            move(...step)
          }}
          style={{ width, height }}
          className="block max-w-full rounded-lg bg-[#c9cbc4] shadow-[inset_0_2px_8px_rgb(0_0_0/0.35)] outline-none focus-visible:ring-3 focus-visible:ring-white/70"
        />
        <div className="mt-4 flex items-center justify-between">
          {knob("x", "Left-right")}
          <button type="button" onClick={shake} className="rounded-full bg-teal-900/50 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-teal-50 uppercase outline-none hover:bg-teal-900/70 focus-visible:ring-3 focus-visible:ring-white/70">
            Shake
          </button>
          {knob("y", "Up-down")}
        </div>
      </div>
    </div>
  )
}

export { SketchPad }
