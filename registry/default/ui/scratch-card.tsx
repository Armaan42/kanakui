"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ScratchCardProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** What's under the coating. */
  children: React.ReactNode
  /** Share of the coating (0–1) that must be scratched off before it clears completely. */
  threshold?: number
  /** Scratch radius in px. */
  brush?: number
  /** Text printed on the coating. */
  label?: string
  onReveal?: () => void
}

/**
 * A scratch-off card: scratch the silver coating with a mouse or finger to
 * reveal what's underneath; past `threshold` it clears completely. The
 * "Reveal" button does the same for keyboard and screen-reader users.
 */
function ScratchCard({ children, threshold = 0.55, brush = 22, label = "Scratch here", onReveal, className, ...props }: ScratchCardProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = React.useState(false)
  const drawing = React.useRef(false)
  const last = React.useRef<{ x: number; y: number } | null>(null)
  const moves = React.useRef(0)

  // Paint the coating at the canvas's real pixel size.
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const paint = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.scale(dpr, dpr)
      const g = ctx.createLinearGradient(0, 0, width, height)
      g.addColorStop(0, "#d4d4d8")
      g.addColorStop(0.35, "#f4f4f5")
      g.addColorStop(0.5, "#a1a1aa")
      g.addColorStop(0.7, "#e4e4e7")
      g.addColorStop(1, "#a1a1aa")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
      // Speckles, like real scratch-off ink.
      for (let i = 0; i < (width * height) / 60; i++) {
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? "255,255,255" : "82,82,91"},${0.08 + Math.random() * 0.12})`
        ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5)
      }
      ctx.fillStyle = "rgba(63,63,70,0.75)"
      ctx.font = "600 14px system-ui, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label.toUpperCase(), width / 2, height / 2)
    }
    paint()
    const observer = new ResizeObserver(() => {
      if (!revealed) paint()
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [label, revealed])

  const reveal = () => {
    if (revealed) return
    setRevealed(true)
    onReveal?.()
  }

  /** Share of the coating already scratched off, sampled on a coarse grid. */
  const cleared = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return 0
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 32) {
      total++
      if (data[i] === 0) clear++
    }
    return clear / total
  }

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    ctx.globalCompositeOperation = "destination-out"
    ctx.lineWidth = brush * 2
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(last.current?.x ?? point.x, last.current?.y ?? point.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    last.current = point
    if (++moves.current % 8 === 0 && cleared() > threshold) reveal()
  }

  return (
    <div data-slot="scratch-card" className={cn("flex w-full max-w-sm flex-col items-center gap-3", className)} {...props}>
      <div className="relative w-full overflow-hidden rounded-2xl border bg-card shadow-lg">
        <div aria-hidden={!revealed} inert={!revealed}>
          {children}
        </div>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            drawing.current = true
            last.current = null
            scratch(event)
          }}
          onPointerMove={(event) => drawing.current && scratch(event)}
          onPointerUp={() => {
            drawing.current = false
            if (cleared() > threshold) reveal()
          }}
          onPointerCancel={() => (drawing.current = false)}
          className={cn(
            "absolute inset-0 size-full cursor-[grab] touch-none transition-opacity duration-700 motion-reduce:transition-none",
            revealed && "pointer-events-none opacity-0"
          )}
        />
      </div>
      {revealed ? (
        <p role="status" className="text-sm text-muted-foreground">
          Revealed!
        </p>
      ) : (
        <button
          type="button"
          onClick={reveal}
          className="rounded-md px-2 py-1 text-sm text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Scratch with your finger or mouse, or reveal it
        </button>
      )}
    </div>
  )
}

export { ScratchCard }
