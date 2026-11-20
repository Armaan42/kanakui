"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ThereminProps extends React.ComponentProps<"div"> {
  /** Lowest note, in hertz. The field spans three octaves above it. */
  low?: number
  sound?: boolean
}

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const noteOf = (frequency: number) => {
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440))
  return `${NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`
}
const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

/**
 * A theremin. Hold the pointer down in the field and move it: left and right
 * change the pitch, up and down the volume. From the keyboard, Space plays and
 * the arrow keys move your hand.
 */
function Theremin({ low = 130.81, sound = true, className, ...props }: ThereminProps) {
  const [hand, setHand] = React.useState({ x: 0.5, y: 0.35 })
  const [playing, setPlaying] = React.useState(false)
  const field = React.useRef<HTMLDivElement>(null)
  const voice = React.useRef<{ ctx: AudioContext; tone: OscillatorNode; lfo: OscillatorNode; gain: GainNode } | null>(null)
  const frequency = low * 2 ** (hand.x * 3)
  const volume = 0.1 + (1 - hand.y) * 0.9

  const tune = (x: number, y: number) => {
    const current = voice.current
    if (!current) return
    const now = current.ctx.currentTime
    current.tone.frequency.setTargetAtTime(low * 2 ** (x * 3), now, 0.02)
    current.gain.gain.setTargetAtTime((0.1 + (1 - y) * 0.9) * 0.25, now, 0.03)
  }

  const begin = (x: number, y: number) => {
    setPlaying(true)
    if (!sound || voice.current) return
    try {
      const ctx = new AudioContext()
      const tone = ctx.createOscillator()
      const lfo = ctx.createOscillator()
      const depth = ctx.createGain()
      const gain = ctx.createGain()
      lfo.frequency.value = 5.5
      depth.gain.value = 3
      lfo.connect(depth).connect(tone.frequency)
      gain.gain.value = 0
      tone.connect(gain).connect(ctx.destination)
      tone.start()
      lfo.start()
      voice.current = { ctx, tone, lfo, gain }
      tune(x, y)
    } catch {
      // No Web Audio: the wave still moves.
    }
  }

  const end = () => {
    setPlaying(false)
    const current = voice.current
    if (!current) return
    voice.current = null
    const now = current.ctx.currentTime
    current.gain.gain.setTargetAtTime(0, now, 0.05)
    current.tone.stop(now + 0.3)
    current.lfo.stop(now + 0.3)
    window.setTimeout(() => void current.ctx.close(), 400)
  }

  React.useEffect(() => () => void voice.current?.ctx.close(), [])

  const place = (event: React.PointerEvent) => {
    const box = field.current!.getBoundingClientRect()
    const next = { x: clamp((event.clientX - box.left) / box.width), y: clamp((event.clientY - box.top) / box.height) }
    setHand(next)
    tune(next.x, next.y)
    return next
  }

  // The wave: more cycles for higher notes, taller for louder ones. Drawn twice as wide so it can scroll.
  const cycles = Math.round(3 + hand.x * 11)
  const amplitude = playing ? 6 + volume * 30 : 1.5
  const points = Array.from({ length: 241 }, (_, i) => {
    const x = (i / 240) * 400
    return `${x.toFixed(1)},${(50 - Math.sin((x / 200) * cycles * Math.PI * 2) * amplitude).toFixed(1)}`
  })

  return (
    <div data-slot="theremin" className={cn("flex w-full max-w-xl flex-col gap-3", className)} {...props}>
      <div
        ref={field}
        role="slider"
        tabIndex={0}
        aria-label="Theremin field. Hold Space to play; arrow keys change pitch and volume."
        aria-valuemin={Math.round(low)}
        aria-valuemax={Math.round(low * 8)}
        aria-valuenow={Math.round(frequency)}
        aria-valuetext={`${noteOf(frequency)}, ${Math.round(frequency)} hertz, volume ${Math.round(volume * 100)}%`}
        onPointerDown={(event) => {
          if (event.button !== 0) return
          event.currentTarget.setPointerCapture(event.pointerId)
          const at = place(event)
          begin(at.x, at.y)
        }}
        onPointerMove={(event) => {
          if (event.buttons) place(event)
        }}
        onPointerUp={end}
        onPointerCancel={end}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault()
            if (!event.repeat) begin(hand.x, hand.y)
            return
          }
          const moves: Record<string, [number, number]> = { ArrowLeft: [-0.02, 0], ArrowRight: [0.02, 0], ArrowUp: [0, -0.05], ArrowDown: [0, 0.05] }
          const by = moves[event.key]
          if (!by) return
          event.preventDefault()
          const next = { x: clamp(hand.x + by[0]), y: clamp(hand.y + by[1]) }
          setHand(next)
          tune(next.x, next.y)
        }}
        onKeyUp={(event) => {
          if (event.key === " ") end()
        }}
        onBlur={end}
        className="relative h-56 cursor-crosshair touch-none overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_50%_120%,#1e1b4b,#09090b_70%)] outline-none select-none focus-visible:ring-3 focus-visible:ring-violet-400"
      >
        {/* Pitch scale. */}
        <div aria-hidden="true" className="absolute inset-x-4 top-3 flex justify-between font-mono text-[10px] text-violet-200/60">
          {[0, 1, 2, 3].map((octave) => (
            <span key={octave}>{noteOf(low * 2 ** octave)}</span>
          ))}
        </div>
        <svg aria-hidden="true" viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            className={cn("drop-shadow-[0_0_6px_#8b5cf6]", playing && "animate-theremin-scroll motion-reduce:animate-none")}
          />
        </svg>
        <span
          aria-hidden="true"
          className={cn("absolute size-6 -translate-1/2 rounded-full border-2 border-violet-200/80 transition-[background,box-shadow]", playing && "bg-violet-300/40 shadow-[0_0_24px_8px_rgb(139_92_246/0.6)]")}
          style={{ left: `${hand.x * 100}%`, top: `${hand.y * 100}%` }}
        />
        <span aria-hidden="true" className="absolute right-4 bottom-3 font-mono text-[10px] text-violet-200/60">
          Louder ↑
        </span>
      </div>

      {/* The instrument. */}
      <div aria-hidden="true" className="relative mx-auto h-16 w-[86%]">
        <span className="absolute right-[10%] bottom-10 h-24 w-1.5 rounded-full bg-linear-to-r from-neutral-500 via-neutral-100 to-neutral-500" />
        <span className="absolute bottom-12 left-[6%] h-6 w-16 rounded-full border-[5px] border-neutral-300 border-b-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-12 rounded-lg bg-linear-to-b from-amber-700 to-amber-950 shadow-[0_12px_20px_-10px_rgb(0_0_0/0.6),inset_0_2px_0_rgb(255_255_255/0.2)]" />
        <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
          <span className="size-4 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#525252)]" />
          <span className="size-4 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#525252)]" />
        </span>
      </div>

      <p className="text-center font-mono text-sm tabular-nums text-muted-foreground">
        {noteOf(frequency)} · {Math.round(frequency)} Hz · {playing ? "playing" : "hold to play"}
      </p>
    </div>
  )
}

export { Theremin }
