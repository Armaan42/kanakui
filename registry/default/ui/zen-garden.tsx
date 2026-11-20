"use client"

import * as React from "react"
import { Brush, Mountain, Plus, Waves } from "lucide-react"

import { cn } from "@/lib/utils"

type Stone = { id: number; x: number; y: number; size: number }

interface ZenGardenProps extends React.ComponentProps<"div"> {
  /** Stones to start with, in percent of the tray (x, y) and canvas pixels (size). */
  defaultStones?: Omit<Stone, "id">[]
  /** Most stones the tray holds. */
  maxStones?: number
}

const W = 960
const H = 600
const TINES = 5
const GAP = 12
const STONES: Omit<Stone, "id">[] = [
  { x: 28, y: 40, size: 100 },
  { x: 68, y: 64, size: 76 },
  { x: 80, y: 24, size: 54 },
]
/** Where "Add a stone" puts stones, in turn. */
const SPOTS = [
  { x: 46, y: 72 },
  { x: 14, y: 76 },
  { x: 54, y: 22 },
  { x: 88, y: 84 },
  { x: 36, y: 14 },
]
const SHAPES = ["52% 48% 45% 55% / 58% 46% 54% 42%", "45% 55% 60% 40% / 50% 60% 40% 50%", "60% 40% 48% 52% / 44% 56% 44% 56%"]

/** A small seeded random number generator, so the sand looks the same every time. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function makeSand() {
  const sand = document.createElement("canvas")
  sand.width = W
  sand.height = H
  const ctx = sand.getContext("2d")!
  ctx.fillStyle = "#dcc9a3"
  ctx.fillRect(0, 0, W, H)
  const random = seeded(7)
  for (let i = 0; i < 16000; i++) {
    ctx.fillStyle = random() > 0.5 ? `rgb(255 250 235 / ${random() * 0.5})` : `rgb(120 95 60 / ${random() * 0.35})`
    ctx.fillRect(random() * W, random() * H, 1.4, 1.4)
  }
  return sand
}

/** Draws one groove in the sand: a shadow below, the furrow, then a lit edge above. */
function groove(ctx: CanvasRenderingContext2D, path: () => void) {
  ctx.save()
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  for (const [dx, dy, width, color] of [
    [1.4, 1.8, 4, "rgb(105 80 48 / 0.45)"],
    [0, 0, 2.6, "rgb(150 120 80 / 0.4)"],
    [-1, -1.2, 1.8, "rgb(255 249 232 / 0.7)"],
  ] as const) {
    ctx.setTransform(1, 0, 0, 1, dx, dy)
    ctx.lineWidth = width
    ctx.strokeStyle = color
    path()
    ctx.stroke()
  }
  ctx.restore()
}

function rakeLines(ctx: CanvasRenderingContext2D, sand: HTMLCanvasElement) {
  ctx.drawImage(sand, 0, 0)
  for (let y = 14; y < H; y += GAP + 4) {
    groove(ctx, () => {
      ctx.beginPath()
      ctx.moveTo(-10, y)
      for (let x = 0; x <= W + 20; x += 24) ctx.lineTo(x, y + Math.sin(x / 110 + y / 60) * 3)
    })
  }
}

function rakeRipples(ctx: CanvasRenderingContext2D, sand: HTMLCanvasElement, stone: Stone) {
  const cx = (stone.x / 100) * W
  const cy = (stone.y / 100) * H
  const rings = 5
  const outer = stone.size / 2 + rings * 15
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, outer + 6, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(sand, 0, 0)
  ctx.restore()
  for (let i = 1; i <= rings; i++) {
    groove(ctx, () => {
      ctx.beginPath()
      ctx.arc(cx, cy, stone.size / 2 + i * 15, 0, Math.PI * 2)
    })
  }
}

/**
 * A Japanese sand garden. Drag across the sand to rake it with a five-tine
 * rake, place and lift stones, rake fresh lines or smooth everything flat.
 */
function ZenGarden({ defaultStones = STONES, maxStones = 7, className, ...props }: ZenGardenProps) {
  const [stones, setStones] = React.useState<Stone[]>(() => defaultStones.map((stone, id) => ({ ...stone, id })))
  const [tool, setTool] = React.useState<"rake" | "stones">("rake")
  const [strokes, setStrokes] = React.useState(0)
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const rakeHead = React.useRef<HTMLSpanElement>(null)
  const sand = React.useRef<HTMLCanvasElement | null>(null)
  const last = React.useRef<{ x: number; y: number } | null>(null)
  const keyboard = React.useRef({ x: W / 2, y: H / 2 })
  const nextId = React.useRef(defaultStones.length)
  const spot = React.useRef(0)
  const stonesRef = React.useRef(stones)

  const context = () => canvas.current?.getContext("2d") ?? null

  React.useEffect(() => {
    const ctx = canvas.current?.getContext("2d")
    if (!ctx) return
    sand.current = makeSand()
    rakeLines(ctx, sand.current)
    for (const stone of stonesRef.current) rakeRipples(ctx, sand.current, stone)
  }, [])

  const toCanvas = (event: React.PointerEvent) => {
    const box = canvas.current!.getBoundingClientRect()
    return { x: ((event.clientX - box.left) / box.width) * W, y: ((event.clientY - box.top) / box.height) * H }
  }

  /** Rakes from the last point to this one: smooths a strip of sand, then cuts five grooves across it. */
  const rakeTo = (point: { x: number; y: number }) => {
    const ctx = context()
    const from = last.current
    if (!ctx || !sand.current || !from) return
    const dx = point.x - from.x
    const dy = point.y - from.y
    const length = Math.hypot(dx, dy)
    if (length < 4) return
    const nx = -dy / length
    const ny = dx / length
    ctx.save()
    ctx.strokeStyle = ctx.createPattern(sand.current, "no-repeat")!
    ctx.lineWidth = TINES * GAP + 4
    ctx.lineCap = "butt"
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    ctx.restore()
    for (let i = 0; i < TINES; i++) {
      const offset = (i - (TINES - 1) / 2) * GAP
      groove(ctx, () => {
        ctx.beginPath()
        ctx.moveTo(from.x + nx * offset, from.y + ny * offset)
        ctx.lineTo(point.x + nx * offset, point.y + ny * offset)
      })
    }
    last.current = point
    const head = rakeHead.current
    const box = canvas.current?.getBoundingClientRect()
    if (head && box) {
      head.style.left = `${(point.x / W) * 100}%`
      head.style.top = `${(point.y / H) * 100}%`
      head.style.width = `${((TINES * GAP + 8) / W) * box.width}px`
      head.style.rotate = `${Math.atan2(dy, dx) + Math.PI / 2}rad`
    }
  }

  const update = (next: Stone[]) => {
    stonesRef.current = next
    setStones(next)
  }

  const addStone = (x: number, y: number) => {
    const ctx = context()
    if (stonesRef.current.length >= maxStones || !ctx || !sand.current) return
    const size = 52 + ((nextId.current * 23) % 44)
    const stone = { id: nextId.current++, x, y, size }
    rakeRipples(ctx, sand.current, stone)
    update([...stonesRef.current, stone])
  }

  const liftStone = (stone: Stone) => {
    const ctx = context()
    if (ctx && sand.current) {
      ctx.save()
      ctx.beginPath()
      ctx.arc((stone.x / 100) * W, (stone.y / 100) * H, stone.size / 2 + 4, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(sand.current, 0, 0)
      ctx.restore()
    }
    update(stonesRef.current.filter((item) => item.id !== stone.id))
  }

  const full = stones.length >= maxStones
  const hint =
    tool === "rake"
      ? "Raking"
      : full
        ? `Tray full: ${stones.length} of ${maxStones} stones`
        : `${stones.length} of ${maxStones} stones`

  return (
    <div data-slot="zen-garden" className={cn("flex w-full max-w-xl flex-col gap-4", className)} {...props}>
      <div className="rounded-2xl bg-linear-to-b from-stone-600 via-stone-700 to-stone-900 p-3 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.15)]">
        <div className="relative overflow-hidden rounded-lg shadow-[inset_0_3px_10px_rgb(0_0_0/0.45)]">
          <canvas
            ref={canvas}
            width={W}
            height={H}
            tabIndex={0}
            role="img"
            aria-label={`Raked sand with ${stones.length} ${stones.length === 1 ? "stone" : "stones"}. Use the arrow keys to rake. ${strokes} strokes.`}
            onPointerDown={(event) => {
              if (event.button !== 0) return
              const point = toCanvas(event)
              if (tool === "stones") return addStone((point.x / W) * 100, (point.y / H) * 100)
              event.currentTarget.setPointerCapture(event.pointerId)
              last.current = point
              setStrokes((value) => value + 1)
            }}
            onPointerMove={(event) => {
              if (tool !== "rake") return
              const head = rakeHead.current
              if (head) head.style.opacity = "1"
              if (last.current && event.buttons) return rakeTo(toCanvas(event))
              if (head) {
                const point = toCanvas(event)
                head.style.left = `${(point.x / W) * 100}%`
                head.style.top = `${(point.y / H) * 100}%`
              }
            }}
            onPointerUp={() => {
              last.current = null
            }}
            onPointerLeave={() => {
              if (rakeHead.current) rakeHead.current.style.opacity = "0"
            }}
            onKeyDown={(event) => {
              const moves: Record<string, [number, number]> = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }
              const step = moves[event.key]
              if (!step) return
              event.preventDefault()
              const from = keyboard.current
              const to = { x: Math.min(Math.max(from.x + step[0], 0), W), y: Math.min(Math.max(from.y + step[1], 0), H) }
              last.current = from
              rakeTo(to)
              keyboard.current = to
              last.current = null
            }}
            className={cn(
              "block aspect-8/5 w-full touch-none outline-none focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:ring-inset",
              tool === "rake" ? "cursor-none" : "cursor-copy"
            )}
          />
          <span
            ref={rakeHead}
            aria-hidden="true"
            className="pointer-events-none absolute h-2.5 -translate-1/2 rounded-full bg-linear-to-b from-amber-600 to-amber-900 opacity-0 shadow-[0_3px_4px_rgb(0_0_0/0.4)] transition-opacity"
            style={{ width: 64 }}
          />
          {stones.map((stone, i) => {
            const style = {
              left: `${stone.x}%`,
              top: `${stone.y}%`,
              width: `${(stone.size / W) * 100}%`,
              aspectRatio: `${1 + ((stone.id * 7) % 4) / 10}`,
              borderRadius: SHAPES[stone.id % SHAPES.length],
              background: "radial-gradient(circle at 35% 30%, #a8a29e, #57534e 55%, #292524)",
            }
            const look = "absolute -translate-1/2 shadow-[4px_8px_10px_rgb(0_0_0/0.45),inset_-3px_-4px_6px_rgb(0_0_0/0.35)]"
            return tool === "stones" ? (
              <button
                key={stone.id}
                type="button"
                aria-label={`Lift stone ${i + 1}`}
                onClick={() => liftStone(stone)}
                className={cn(look, "cursor-pointer outline-none hover:brightness-110 focus-visible:ring-3 focus-visible:ring-sky-400")}
                style={style}
              />
            ) : (
              <span key={stone.id} aria-hidden="true" className={cn(look, "pointer-events-none")} style={style} />
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Tool" className="inline-flex rounded-full border p-1">
          {(
            [
              ["rake", "Rake", Brush],
              ["stones", "Stones", Mountain],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              aria-pressed={tool === value}
              onClick={() => setTool(value)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background"
            >
              <Icon aria-hidden="true" className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
        {tool === "stones" ? (
          <button
            type="button"
            disabled={full}
            onClick={() => {
              const at = SPOTS[spot.current % SPOTS.length]
              spot.current += 1
              addStone(at.x, at.y)
            }}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
          >
            <Plus aria-hidden="true" className="size-3.5" />
            Add a stone
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            const ctx = context()
            if (!ctx || !sand.current) return
            rakeLines(ctx, sand.current)
            for (const stone of stonesRef.current) rakeRipples(ctx, sand.current, stone)
          }}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Waves aria-hidden="true" className="size-3.5" />
          Rake lines
        </button>
        <button
          type="button"
          onClick={() => {
            const ctx = context()
            if (ctx && sand.current) ctx.drawImage(sand.current, 0, 0)
          }}
          className="inline-flex h-10 items-center rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Smooth
        </button>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {hint}
      </p>
    </div>
  )
}

export { ZenGarden }
