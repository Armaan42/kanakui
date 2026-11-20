"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

interface OscilloscopeProps extends React.ComponentProps<"div"> {
  defaultX?: number
  defaultY?: number
  /** Starting phase difference in degrees. */
  defaultPhase?: number
}

interface KnobProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (value: number) => void
}

/** A round knob: drag up or down, scroll, or use the arrow keys. */
function Knob({ label, value, min, max, step, unit = "", onChange }: KnobProps) {
  const drag = React.useRef<{ y: number; value: number } | null>(null)
  const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next / step) * step))
  const turn = -135 + ((value - min) / (max - min)) * 270
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { y: event.clientY, value }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          const range = max - min
          onChange(clamp(drag.current.value + ((drag.current.y - event.clientY) / 120) * range))
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onKeyDown={(event) => {
          const moves: Record<string, number> = { ArrowUp: step, ArrowRight: step, ArrowDown: -step, ArrowLeft: -step }
          if (event.key === "Home") onChange(min)
          else if (event.key === "End") onChange(max)
          else if (moves[event.key] !== undefined) onChange(clamp(value + moves[event.key]))
          else return
          event.preventDefault()
        }}
        className="relative size-14 cursor-ns-resize touch-none rounded-full bg-[radial-gradient(circle_at_35%_30%,#525252,#0a0a0a_70%)] shadow-[0_4px_8px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.15)] outline-none focus-visible:ring-3 focus-visible:ring-emerald-400"
      >
        <span aria-hidden="true" className="absolute inset-1.5 rounded-full" style={{ rotate: `${turn}deg` }}>
          <span className="absolute top-0 left-1/2 h-3 w-0.5 -translate-x-1/2 rounded-full bg-neutral-100" />
        </span>
      </div>
      <span className="text-[10px] font-semibold tracking-wider text-neutral-300 uppercase">{label}</span>
      <span className="font-mono text-xs text-emerald-300 tabular-nums">
        {value}
        {unit}
      </span>
    </div>
  )
}

/**
 * A green-phosphor oscilloscope tracing Lissajous figures. Two knobs set the
 * horizontal and vertical frequencies, a third the phase; let it drift to
 * watch the figure turn.
 */
function Oscilloscope({ defaultX = 3, defaultY = 2, defaultPhase = 90, className, ...props }: OscilloscopeProps) {
  const [x, setX] = React.useState(defaultX)
  const [y, setY] = React.useState(defaultY)
  const [phase, setPhase] = React.useState(defaultPhase)
  const [drifting, setDrifting] = React.useState(true)
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const settings = React.useRef({ x, y, phase, drifting })
  const drift = React.useRef(0)

  React.useEffect(() => {
    settings.current = { x, y, phase, drifting }
  }, [x, y, phase, drifting])

  React.useEffect(() => {
    const ctx = canvas.current?.getContext("2d")
    if (!ctx) return
    const W = 480
    const H = 360
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    let last = performance.now()
    const draw = (now: number) => {
      const { x: a, y: b, phase: p, drifting: moving } = settings.current
      if (moving && !still) drift.current += ((now - last) / 1000) * 0.6
      last = now
      // Fade what's there instead of clearing it: the phosphor's afterglow.
      ctx.fillStyle = "rgb(3 10 6 / 0.28)"
      ctx.fillRect(0, 0, W, H)
      ctx.beginPath()
      const shift = (p * Math.PI) / 180 + drift.current
      for (let i = 0; i <= 720; i++) {
        const t = (i / 720) * Math.PI * 2
        const px = W / 2 + Math.sin(a * t + shift) * W * 0.4
        const py = H / 2 - Math.sin(b * t) * H * 0.4
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.strokeStyle = "#7dffa8"
      ctx.lineWidth = 2
      ctx.shadowColor = "#22ff77"
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div data-slot="oscilloscope" className={cn("w-full max-w-xl rounded-2xl bg-linear-to-b from-neutral-600 to-neutral-800 p-4 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.8),inset_0_2px_0_rgb(255_255_255/0.2)]", className)} {...props}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-[#030a06] p-1 shadow-[inset_0_0_0_6px_#171717,inset_0_0_30px_rgb(0_0_0/0.9)]">
          <canvas
            ref={canvas}
            width={480}
            height={360}
            role="img"
            aria-label={`Lissajous figure, ${x} to ${y}, phase ${phase} degrees`}
            className="block aspect-4/3 w-full rounded-2xl"
          />
          {/* Graticule. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1 rounded-2xl"
            style={{
              backgroundImage: "linear-gradient(rgb(125 255 168 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(125 255 168 / 0.12) 1px, transparent 1px)",
              backgroundSize: "10% 12.5%",
              backgroundPosition: "center",
            }}
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-1 rounded-2xl bg-[radial-gradient(ellipse_at_50%_40%,transparent_55%,rgb(0_0_0/0.55))]" />
        </div>
        <div className="flex justify-around gap-4 sm:flex-col sm:justify-start">
          <Knob label="X freq" value={x} min={1} max={7} step={1} onChange={setX} />
          <Knob label="Y freq" value={y} min={1} max={7} step={1} onChange={setY} />
          <Knob label="Phase" value={phase} min={0} max={180} step={5} unit="°" onChange={setPhase} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-wider text-neutral-300 uppercase">
          Ratio {x}:{y}
        </span>
        <button
          type="button"
          aria-pressed={drifting}
          onClick={() => setDrifting(!drifting)}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-900 px-4 text-xs font-semibold tracking-wider text-neutral-100 uppercase outline-none hover:bg-black focus-visible:ring-3 focus-visible:ring-emerald-400"
        >
          {drifting ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
          Drift
        </button>
      </div>
    </div>
  )
}

export { Oscilloscope }
