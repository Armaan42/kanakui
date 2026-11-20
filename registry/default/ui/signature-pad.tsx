"use client"

import * as React from "react"
import { Check, Eraser, Undo2 } from "lucide-react"

import { cn } from "@/lib/utils"

type Point = { x: number; y: number; w: number }

interface SignaturePadProps extends React.ComponentProps<"div"> {
  /** Ink colour. */
  ink?: string
  /** Called with a PNG data URL when the signature is accepted. */
  onSave?: (dataUrl: string) => void
}

const W = 800
const H = 260
const SCRIPT = "'Segoe Script', 'Snell Roundhand', 'Brush Script MT', cursive"

/** Draws one stroke as smooth curves through the midpoints, with the width the pen had at each point. */
function drawStroke(ctx: CanvasRenderingContext2D, points: Point[], ink: string) {
  ctx.strokeStyle = ink
  ctx.fillStyle = ink
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  if (points.length === 1) {
    ctx.beginPath()
    ctx.arc(points[0].x, points[0].y, points[0].w / 2, 0, Math.PI * 2)
    ctx.fill()
    return
  }
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const before = i > 1 ? points[i - 2] : a
    ctx.beginPath()
    ctx.moveTo((before.x + a.x) / 2, (before.y + a.y) / 2)
    ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2)
    ctx.lineWidth = (a.w + b.w) / 2
    ctx.stroke()
  }
}

/**
 * A signature pad with a fountain-pen feel: quick strokes come out thin and
 * slow ones thick. Draw it, or type your name and it's written in script.
 */
function SignaturePad({ ink = "#1e2a5a", onSave, className, ...props }: SignaturePadProps) {
  const [mode, setMode] = React.useState<"draw" | "type">("draw")
  const [strokes, setStrokes] = React.useState<Point[][]>([])
  const [name, setName] = React.useState("")
  const [saved, setSaved] = React.useState<string | null>(null)
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const current = React.useRef<Point[] | null>(null)
  const last = React.useRef<{ x: number; y: number; t: number } | null>(null)
  const id = React.useId()

  const redraw = React.useCallback(
    (list: Point[][], typed: string, how: "draw" | "type") => {
      const ctx = canvas.current?.getContext("2d")
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      if (how === "type") {
        if (!typed.trim()) return
        let size = 84
        ctx.font = `${size}px ${SCRIPT}`
        while (ctx.measureText(typed).width > W - 80 && size > 30) {
          size -= 4
          ctx.font = `${size}px ${SCRIPT}`
        }
        ctx.fillStyle = ink
        ctx.textBaseline = "alphabetic"
        ctx.fillText(typed, 40, H - 70)
        return
      }
      for (const stroke of list) drawStroke(ctx, stroke, ink)
    },
    [ink]
  )

  React.useEffect(() => {
    redraw(strokes, name, mode)
  }, [redraw, strokes, name, mode])

  const at = (event: React.PointerEvent) => {
    const box = canvas.current!.getBoundingClientRect()
    return { x: ((event.clientX - box.left) / box.width) * W, y: ((event.clientY - box.top) / box.height) * H }
  }

  const empty = mode === "draw" ? strokes.length === 0 : !name.trim()

  return (
    <div data-slot="signature-pad" className={cn("flex w-full max-w-xl flex-col gap-3", className)} {...props}>
      <div role="group" aria-label="How to sign" className="inline-flex self-start rounded-full border p-1">
        {(["draw", "type"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => {
              setMode(item)
              setSaved(null)
            }}
            className="h-8 rounded-full px-3 text-sm capitalize outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl border bg-[#fffdf8] shadow-[0_10px_24px_-14px_rgb(0_0_0/0.35)]">
        <canvas
          ref={canvas}
          width={W}
          height={H}
          role="img"
          aria-label={empty ? "Empty signature box" : mode === "type" ? `Signature: ${name}` : `Hand-drawn signature, ${strokes.length} strokes`}
          onPointerDown={(event) => {
            if (mode !== "draw" || event.button !== 0) return
            event.currentTarget.setPointerCapture(event.pointerId)
            const point = at(event)
            current.current = [{ ...point, w: 4 }]
            last.current = { ...point, t: event.timeStamp }
            setSaved(null)
          }}
          onPointerMove={(event) => {
            const stroke = current.current
            const previous = last.current
            if (!stroke || !previous) return
            const point = at(event)
            const distance = Math.hypot(point.x - previous.x, point.y - previous.y)
            if (distance < 1.5) return
            const speed = distance / Math.max(event.timeStamp - previous.t, 1)
            // Fast strokes thin out, slow ones pool ink; smoothed so the line swells gently.
            const target = Math.min(6.5, Math.max(1.4, 6.5 - speed * 2.2))
            const w = stroke[stroke.length - 1].w * 0.65 + target * 0.35
            stroke.push({ ...point, w })
            last.current = { ...point, t: event.timeStamp }
            const ctx = canvas.current?.getContext("2d")
            if (ctx) drawStroke(ctx, stroke.slice(-3), ink)
          }}
          onPointerUp={() => {
            const stroke = current.current
            current.current = null
            if (stroke) setStrokes((list) => [...list, stroke])
          }}
          className={cn("block aspect-[80/26] w-full touch-none", mode === "draw" ? "cursor-crosshair" : "")}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-[24%] flex items-end gap-2 border-b border-neutral-400 pb-1">
          <span className="text-xl leading-none text-neutral-400">×</span>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute right-8 bottom-[12%] text-xs text-neutral-500">
          {mode === "draw" ? "Sign above the line" : "Type your name below"}
        </span>
      </div>

      {mode === "type" ? (
        <div>
          <label htmlFor={id} className="sr-only">
            Your full name
          </label>
          <input
            id={id}
            value={name}
            placeholder="Your full name"
            maxLength={40}
            onChange={(event) => {
              setName(event.target.value)
              setSaved(null)
            }}
            className="h-10 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        {mode === "draw" ? (
          <button
            type="button"
            disabled={empty}
            onClick={() => setStrokes((list) => list.slice(0, -1))}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
          >
            <Undo2 aria-hidden="true" className="size-3.5" />
            Undo
          </button>
        ) : null}
        <button
          type="button"
          disabled={empty}
          onClick={() => {
            setStrokes([])
            setName("")
            setSaved(null)
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <Eraser aria-hidden="true" className="size-3.5" />
          Clear
        </button>
        <button
          type="button"
          disabled={empty}
          onClick={() => {
            const url = canvas.current?.toDataURL("image/png")
            if (!url) return
            setSaved(url)
            onSave?.(url)
          }}
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <Check aria-hidden="true" className="size-3.5" />
          Use signature
        </button>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {saved ? "Signature saved." : ""}
      </p>
    </div>
  )
}

export { SignaturePad }
