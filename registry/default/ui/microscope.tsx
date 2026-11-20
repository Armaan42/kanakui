"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface MicroscopeProps extends React.ComponentProps<"div"> {
  defaultSpecimen?: "onion" | "pond"
}

const LENSES = [4, 10, 40] as const
/** Each objective comes into focus at a slightly different knob position, as on a real scope. */
const SHARP_AT: Record<number, number> = { 4: 42, 10: 55, 40: 68 }

const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return seed / 2147483647
}

/** Onion skin: long brick-like cells, each with a nucleus, stained pink. */
const ONION = (() => {
  const random = seeded(11)
  const cells: React.ReactElement[] = []
  for (let row = 0; row < 12; row++) {
    const offset = row % 2 ? 40 : 0
    for (let col = -1; col < 6; col++) {
      const x = col * 80 + offset + (random() - 0.5) * 8
      const y = row * 34 + (random() - 0.5) * 4
      cells.push(
        <g key={`${row}-${col}`}>
          <rect x={x} y={y} width={78 + random() * 6} height="32" rx="6" fill="#fbcfe8" fillOpacity="0.55" stroke="#be185d" strokeWidth="1.4" />
          <ellipse cx={x + 20 + random() * 40} cy={y + 16} rx="5" ry="4" fill="#9d174d" fillOpacity="0.8" />
        </g>
      )
    }
  }
  return cells
})()

/** Pond water: green algae, a few chains of cells and some glassy diatoms. */
const POND = (() => {
  const random = seeded(29)
  const items: React.ReactElement[] = []
  for (let i = 0; i < 26; i++) {
    const x = random() * 400
    const y = random() * 400
    const r = 6 + random() * 14
    items.push(<circle key={`a${i}`} cx={x} cy={y} r={r} fill="#4ade80" fillOpacity="0.45" stroke="#15803d" strokeWidth="1.2" />)
  }
  for (let chain = 0; chain < 4; chain++) {
    const x = random() * 340
    const y = random() * 340
    const angle = random() * Math.PI
    for (let i = 0; i < 7; i++) {
      items.push(<rect key={`c${chain}-${i}`} x={x + Math.cos(angle) * i * 14} y={y + Math.sin(angle) * i * 14} width="13" height="9" rx="4" fill="#65a30d" fillOpacity="0.6" stroke="#3f6212" strokeWidth="1" transform={`rotate(${(angle * 180) / Math.PI} ${x + Math.cos(angle) * i * 14} ${y + Math.sin(angle) * i * 14})`} />)
    }
  }
  for (let i = 0; i < 5; i++) {
    const x = random() * 380
    const y = random() * 380
    items.push(
      <g key={`d${i}`} transform={`rotate(${random() * 180} ${x} ${y})`}>
        <ellipse cx={x} cy={y} rx="22" ry="7" fill="#fef9c3" fillOpacity="0.5" stroke="#a16207" strokeWidth="1" />
        <line x1={x - 18} y1={y} x2={x + 18} y2={y} stroke="#a16207" strokeWidth="0.6" />
      </g>
    )
  }
  return items
})()

/**
 * A microscope's eyepiece view. Pick a specimen and an objective, turn the
 * focus knob until it's sharp, dim or brighten the light, and drag (or use
 * the arrow keys) to move the slide.
 */
function Microscope({ defaultSpecimen = "onion", className, ...props }: MicroscopeProps) {
  const [specimen, setSpecimen] = React.useState(defaultSpecimen)
  const [lens, setLens] = React.useState<(typeof LENSES)[number]>(10)
  const [focus, setFocus] = React.useState(44)
  const [light, setLight] = React.useState(70)
  const [pan, setPan] = React.useState({ x: 0, y: 0 })
  const drag = React.useRef<{ x: number; y: number; pan: { x: number; y: number } } | null>(null)
  const focusId = React.useId()
  const lightId = React.useId()

  const blur = Math.min(10, Math.abs(focus - SHARP_AT[lens]) * (lens / 40 + 0.15))
  const sharp = blur < 0.8
  const scale = lens / 4
  const clampPan = (value: number) => Math.max(-140, Math.min(140, value))

  return (
    <div data-slot="microscope" className={cn("flex w-80 max-w-full flex-col gap-4", className)} {...props}>
      <div className="grid place-items-center rounded-3xl bg-neutral-950 p-5 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.8)]">
        <div
          tabIndex={0}
          role="img"
          aria-label={`${specimen === "onion" ? "Onion skin cells" : "Pond water"} at ${lens} times, ${sharp ? "in focus" : "out of focus"}. Drag or use the arrow keys to move the slide.`}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { x: event.clientX, y: event.clientY, pan }
          }}
          onPointerMove={(event) => {
            const current = drag.current
            if (!current) return
            setPan({ x: clampPan(current.pan.x + (event.clientX - current.x) / scale), y: clampPan(current.pan.y + (event.clientY - current.y) / scale) })
          }}
          onPointerUp={() => {
            drag.current = null
          }}
          onKeyDown={(event) => {
            const moves: Record<string, [number, number]> = { ArrowLeft: [8, 0], ArrowRight: [-8, 0], ArrowUp: [0, 8], ArrowDown: [0, -8] }
            const move = moves[event.key]
            if (!move) return
            event.preventDefault()
            setPan({ x: clampPan(pan.x + move[0]), y: clampPan(pan.y + move[1]) })
          }}
          className="relative aspect-square w-full cursor-move touch-none overflow-hidden rounded-full outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
          style={{ background: `radial-gradient(circle, rgb(255 253 240 / ${0.25 + light / 100}), rgb(230 225 200 / ${light / 140}) 70%)` }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="absolute inset-0 size-full transition-[filter] duration-150"
            style={{ filter: `blur(${blur}px) brightness(${0.35 + light / 100})`, transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)` }}
          >
            {specimen === "onion" ? ONION : POND}
          </svg>
          {/* Eyepiece vignette and a pointer line, as in a teaching scope. */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_20px_rgb(0_0_0/0.85)]" />
          <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 h-px w-[42%] bg-neutral-900/70" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Objective lens" className="inline-flex rounded-full border p-1">
          {LENSES.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={lens === value}
              onClick={() => setLens(value)}
              className="h-8 rounded-full px-3 font-mono text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {value}×
            </button>
          ))}
        </div>
        <div role="group" aria-label="Specimen" className="inline-flex rounded-full border p-1">
          {(
            [
              ["onion", "Onion"],
              ["pond", "Pond"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={specimen === value}
              onClick={() => setSpecimen(value)}
              className="h-8 rounded-full px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor={focusId} className="flex justify-between text-sm">
          <span>Focus</span>
          <span className={cn("text-xs", sharp ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground")}>{sharp ? "Sharp" : "Blurry"}</span>
        </label>
        <input id={focusId} type="range" min={0} max={100} value={focus} onChange={(event) => setFocus(Number(event.target.value))} className="mt-1.5 w-full accent-neutral-700" />
      </div>
      <div>
        <label htmlFor={lightId} className="text-sm">
          Light
        </label>
        <input id={lightId} type="range" min={10} max={100} value={light} onChange={(event) => setLight(Number(event.target.value))} className="mt-1.5 w-full accent-amber-500" />
      </div>
    </div>
  )
}

export { Microscope }
