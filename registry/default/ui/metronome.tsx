"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

interface MetronomeProps extends React.ComponentProps<"div"> {
  defaultTempo?: number
  /** Beats in a bar; the first is accented. */
  defaultBeats?: number
  sound?: boolean
}

const MARKINGS: [number, string][] = [
  [60, "Largo"],
  [76, "Adagio"],
  [108, "Andante"],
  [120, "Moderato"],
  [168, "Allegro"],
  [Infinity, "Presto"],
]
const marking = (tempo: number) => MARKINGS.find(([below]) => tempo < below)![1]

/**
 * A wind-up metronome. The arm swings in time and ticks at each end, with an
 * accent on the first beat of the bar. Slide the weight (the tempo) and pick
 * the beats in a bar.
 */
function Metronome({ defaultTempo = 96, defaultBeats = 4, sound = true, className, ...props }: MetronomeProps) {
  const [tempo, setTempo] = React.useState(defaultTempo)
  const [beats, setBeats] = React.useState(defaultBeats)
  const [running, setRunning] = React.useState(false)
  const [beat, setBeat] = React.useState(-1)
  const beatRef = React.useRef(-1)
  const audio = React.useRef<AudioContext | null>(null)

  React.useEffect(() => {
    if (!running) return
    const tick = () => {
      const next = (beatRef.current + 1) % beats
      beatRef.current = next
      setBeat(next)
      const ctx = audio.current
      if (!ctx) return
      const now = ctx.currentTime
      const tone = ctx.createOscillator()
      const gain = ctx.createGain()
      tone.type = "square"
      tone.frequency.value = next === 0 ? 1760 : 1100
      gain.gain.setValueAtTime(next === 0 ? 0.12 : 0.07, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)
      tone.connect(gain).connect(ctx.destination)
      tone.start(now)
      tone.stop(now + 0.05)
    }
    tick()
    const id = window.setInterval(tick, 60000 / tempo)
    return () => window.clearInterval(id)
  }, [running, tempo, beats])

  const toggle = () => {
    if (!running && sound) {
      try {
        audio.current ??= new AudioContext()
      } catch {
        // No Web Audio: swing silently.
      }
    }
    beatRef.current = -1
    setBeat(-1)
    setRunning(!running)
  }

  // A higher weight on the arm means a slower beat, as on a real metronome.
  const weight = 12 + ((208 - tempo) / (208 - 40)) * 58

  return (
    <div data-slot="metronome" className={cn("flex w-64 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div aria-hidden="true" className="relative h-72 w-56">
        {/* Body. */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-800 via-amber-900 to-amber-950 [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]" />
        <div className="absolute inset-x-[30%] top-[14%] bottom-[24%] bg-[#f3ead6] [clip-path:polygon(28%_0,72%_0,100%_100%,0_100%)]">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="absolute inset-x-[30%] h-px bg-amber-900/40" style={{ top: `${8 + i * 10}%` }} />
          ))}
        </div>
        {/* Arm. */}
        <div
          key={running ? `run-${tempo}` : "still"}
          className={cn("absolute bottom-[26%] left-1/2 h-[70%] w-1.5 -translate-x-1/2 origin-bottom rounded-full bg-linear-to-r from-neutral-400 via-neutral-100 to-neutral-500", running && "animate-metronome-swing motion-reduce:animate-none")}
          style={{ animationDuration: `${(60 / tempo) * 2}s` }}
        >
          <span className="absolute left-1/2 h-5 w-7 -translate-x-1/2 rounded-sm bg-linear-to-b from-neutral-200 via-neutral-400 to-neutral-600 shadow-[0_2px_3px_rgb(0_0_0/0.4)]" style={{ top: `${weight}%` }} />
        </div>
        <span className="absolute bottom-[23%] left-1/2 size-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#737373)]" />
        <div className="absolute inset-x-0 bottom-0 h-[20%] bg-amber-950/60" />
        <span className="absolute bottom-[7%] left-1/2 -translate-x-1/2 font-serif text-xs tracking-[0.3em] text-amber-200/80 italic">{marking(tempo)}</span>
      </div>

      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: beats }, (_, i) => (
          <span key={i} className={cn("size-2.5 rounded-full bg-muted-foreground/25 transition-colors duration-75", beat === i && (i === 0 ? "bg-red-500" : "bg-foreground"))} />
        ))}
      </div>

      <label className="flex w-full flex-col gap-1.5 text-sm">
        <span className="flex justify-between">
          <span>Tempo</span>
          <span className="font-mono tabular-nums">
            {tempo} bpm · {marking(tempo)}
          </span>
        </span>
        <input type="range" min={40} max={208} value={tempo} onChange={(event) => setTempo(Number(event.target.value))} className="w-full accent-amber-700" />
      </label>

      <div className="flex w-full items-center gap-2">
        <div role="group" aria-label="Beats in a bar" className="inline-flex rounded-full border p-1">
          {[2, 3, 4, 6].map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={beats === count}
              onClick={() => {
                beatRef.current = -1
                setBeats(count)
              }}
              className="h-8 w-8 rounded-full text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {count}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={running}
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {running ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {running ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  )
}

export { Metronome }
