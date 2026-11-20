"use client"

import * as React from "react"
import { Eraser, Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

interface DrumMachineProps extends React.ComponentProps<"div"> {
  /** Starting pattern: one string per voice (kick, snare, hat, clap), "x" for a hit and "." for a rest. */
  defaultPattern?: [string, string, string, string]
  defaultTempo?: number
  sound?: boolean
}

const VOICES = ["Kick", "Snare", "Hat", "Clap"] as const
const STEPS = 16
const BEAT: [string, string, string, string] = ["x...x...x...x.x.", "....x.......x...", "x.x.x.x.x.x.x.xx", "............x..."]

function noise(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  // A fixed pseudo-random sequence: white noise without Math.random.
  let seed = 1
  for (let i = 0; i < data.length; i++) {
    seed = (seed * 16807) % 2147483647
    data[i] = (seed / 2147483647) * 2 - 1
  }
  return buffer
}

function hit(ctx: AudioContext, buffer: AudioBuffer, voice: number) {
  const now = ctx.currentTime
  const out = ctx.createGain()
  out.connect(ctx.destination)
  const burst = (start: number, length: number, level: number, type: BiquadFilterType, frequency: number) => {
    const source = ctx.createBufferSource()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()
    source.buffer = buffer
    filter.type = type
    filter.frequency.value = frequency
    gain.gain.setValueAtTime(level, now + start)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + length)
    source.connect(filter).connect(gain).connect(out)
    source.start(now + start)
    source.stop(now + start + length + 0.02)
  }
  if (voice === 0) {
    const tone = ctx.createOscillator()
    const gain = ctx.createGain()
    tone.frequency.setValueAtTime(150, now)
    tone.frequency.exponentialRampToValueAtTime(40, now + 0.35)
    gain.gain.setValueAtTime(0.9, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
    tone.connect(gain).connect(out)
    tone.start(now)
    tone.stop(now + 0.5)
  } else if (voice === 1) {
    const tone = ctx.createOscillator()
    const gain = ctx.createGain()
    tone.type = "triangle"
    tone.frequency.value = 190
    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
    tone.connect(gain).connect(out)
    tone.start(now)
    tone.stop(now + 0.15)
    burst(0, 0.18, 0.45, "highpass", 1200)
  } else if (voice === 2) {
    burst(0, 0.05, 0.25, "highpass", 7000)
  } else {
    for (const at of [0, 0.012, 0.024]) burst(at, 0.03, 0.5, "bandpass", 1500)
    burst(0.036, 0.16, 0.45, "bandpass", 1500)
  }
}

/**
 * A 16-step drum machine with kick, snare, hi-hat and clap. Tap the pads to
 * build a pattern and press Play. Arrow keys move between pads.
 */
function DrumMachine({ defaultPattern = BEAT, defaultTempo = 100, sound = true, className, ...props }: DrumMachineProps) {
  const [pattern, setPattern] = React.useState(() => defaultPattern.map((row) => Array.from({ length: STEPS }, (_, i) => row[i] === "x")))
  const [tempo, setTempo] = React.useState(defaultTempo)
  const [playing, setPlaying] = React.useState(false)
  const [step, setStep] = React.useState(-1)
  const [focus, setFocus] = React.useState<[number, number]>([0, 0])
  const patternRef = React.useRef(pattern)
  const stepRef = React.useRef(-1)
  const audio = React.useRef<{ ctx: AudioContext; buffer: AudioBuffer } | null>(null)
  const grid = React.useRef<HTMLDivElement>(null)

  const ensureAudio = () => {
    if (!sound || audio.current) return
    try {
      const ctx = new AudioContext()
      audio.current = { ctx, buffer: noise(ctx) }
    } catch {
      // No Web Audio: the lights still run.
    }
  }

  React.useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      const next = (stepRef.current + 1) % STEPS
      stepRef.current = next
      setStep(next)
      const current = audio.current
      if (!current) return
      patternRef.current.forEach((row, voice) => {
        if (row[next]) hit(current.ctx, current.buffer, voice)
      })
    }, 60000 / tempo / 4)
    return () => window.clearInterval(id)
  }, [playing, tempo])

  const toggle = (voice: number, index: number) => {
    const next = patternRef.current.map((row, r) => (r === voice ? row.map((on, i) => (i === index ? !on : on)) : row))
    patternRef.current = next
    setPattern(next)
    ensureAudio()
    if (next[voice][index] && audio.current && !playing) hit(audio.current.ctx, audio.current.buffer, voice)
  }

  const move = (voice: number, index: number) => {
    const target: [number, number] = [(voice + VOICES.length) % VOICES.length, (index + STEPS) % STEPS]
    setFocus(target)
    grid.current?.querySelector<HTMLButtonElement>(`[data-cell="${target[0]}-${target[1]}"]`)?.focus()
  }

  return (
    <div data-slot="drum-machine" className={cn("w-full max-w-3xl rounded-2xl bg-linear-to-b from-stone-200 to-stone-300 p-4 text-stone-900 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.6),inset_0_2px_0_rgb(255_255_255/0.6)] sm:p-5", className)} {...props}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          aria-pressed={playing}
          onClick={() => {
            ensureAudio()
            if (playing) {
              stepRef.current = -1
              setStep(-1)
            }
            setPlaying(!playing)
          }}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-orange-700 px-4 text-sm font-semibold text-white shadow-[0_3px_0_#7c2d12] outline-none active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-500"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {playing ? "Stop" : "Play"}
        </button>
        <label className="flex items-center gap-3 text-xs font-semibold tracking-wider uppercase">
          Tempo
          <input type="range" min={70} max={160} value={tempo} onChange={(event) => setTempo(Number(event.target.value))} className="w-28 accent-orange-600 sm:w-36" />
          <span className="w-16 font-mono text-sm tabular-nums">{tempo} bpm</span>
        </label>
        <button
          type="button"
          onClick={() => {
            const empty = VOICES.map(() => Array.from({ length: STEPS }, () => false))
            patternRef.current = empty
            setPattern(empty)
          }}
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-md border border-stone-400 px-3 text-xs font-semibold tracking-wider uppercase outline-none hover:bg-stone-100 focus-visible:ring-3 focus-visible:ring-sky-500"
        >
          <Eraser aria-hidden="true" className="size-3.5" />
          Clear
        </button>
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div ref={grid} role="group" aria-label="Pattern. Arrow keys move between pads." className="grid min-w-[36rem] grid-cols-[3.5rem_repeat(16,minmax(0,1fr))] gap-1.5 rounded-lg bg-stone-800 p-3">
          {VOICES.map((voice, v) => (
            <React.Fragment key={voice}>
              <span aria-hidden="true" className="self-center font-mono text-[11px] font-semibold tracking-wider text-stone-200 uppercase">
                {voice}
              </span>
              {pattern[v].map((on, i) => (
                <button
                    key={i}
                    type="button"
                    data-cell={`${v}-${i}`}
                    data-step={step === i || undefined}
                    tabIndex={focus[0] === v && focus[1] === i ? 0 : -1}
                    aria-pressed={on}
                    aria-label={`${voice}, step ${i + 1}`}
                    onClick={() => toggle(v, i)}
                    onFocus={() => setFocus([v, i])}
                    onKeyDown={(event) => {
                      const moves: Record<string, [number, number]> = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }
                      const by = moves[event.key]
                      if (!by) return
                      event.preventDefault()
                      move(v + by[0], i + by[1])
                    }}
                    className={cn(
                      "aspect-square rounded-[5px] outline-none transition-[background-color,box-shadow] duration-75 focus-visible:ring-3 focus-visible:ring-sky-400",
                      i % 4 === 0 ? "bg-stone-500" : "bg-stone-600",
                      on && "bg-orange-500 shadow-[0_0_10px_rgb(249_115_22/0.6)]",
                      step === i && (on ? "bg-yellow-300 shadow-[0_0_14px_rgb(253_224_71/0.9)]" : "bg-stone-400")
                    )}
                  />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export { DrumMachine }
