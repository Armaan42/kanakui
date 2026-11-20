"use client"

import * as React from "react"
import { Wind } from "lucide-react"

import { cn } from "@/lib/utils"

interface WindChimesProps extends React.ComponentProps<"div"> {
  /** Notes of the tubes, longest first, in hertz. Defaults to a pentatonic scale. */
  notes?: number[]
  sound?: boolean
}

// C major pentatonic, from G4 up: every combination sounds pleasant.
const PENTATONIC = [392, 440, 523.25, 587.33, 659.25, 783.99]

/**
 * Wind chimes. Brush the pointer across the tubes to ring them, press a tube,
 * or let the breeze through. Each tube swings and rings with a bell-like tone.
 */
function WindChimes({ notes = PENTATONIC, sound = true, className, ...props }: WindChimesProps) {
  const [swings, setSwings] = React.useState<number[]>(() => notes.map(() => 0))
  const [breezy, setBreezy] = React.useState(false)
  const audio = React.useRef<AudioContext | null>(null)
  const last = React.useRef<number[]>([])
  const timers = React.useRef<number[]>([])

  React.useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const ring = (index: number, time = 0) => {
    // A tube can't ring again until it has had a moment to swing.
    if (time - (last.current[index] ?? -1000) < 120) return
    last.current[index] = time
    setSwings((current) => notes.map((_, i) => (current[i] ?? 0) + (i === index ? 1 : 0)))
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const now = ctx.currentTime
      const base = notes[index]
      // A metal tube's partials aren't whole multiples, which is what makes it sound like a chime.
      for (const [ratio, level, decay] of [[1, 0.16, 3.2], [2.76, 0.05, 1.6], [5.4, 0.025, 0.7]] as const) {
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.frequency.value = base * ratio
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(level, now + 0.004)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay)
        tone.connect(gain).connect(ctx.destination)
        tone.start(now)
        tone.stop(now + decay + 0.05)
      }
    } catch {
      // No Web Audio: the tubes still swing.
    }
  }

  const breeze = () => {
    if (breezy) return
    setBreezy(true)
    // A gust: a deterministic but uneven run of tubes across three seconds.
    const order = [2, 0, 4, 1, 5, 3, 1, 4, 0, 2, 5, 3]
    order.forEach((tube, i) => {
      timers.current.push(window.setTimeout(() => ring(tube % notes.length, performance.now()), 120 + i * 230 + ((i * 97) % 110)))
    })
    timers.current.push(window.setTimeout(() => setBreezy(false), 3200))
  }

  return (
    <div data-slot="wind-chimes" className={cn("flex w-72 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="relative w-full" style={{ height: 300 }}>
        {/* Hanging ring and top. */}
        <span aria-hidden="true" className="absolute top-0 left-1/2 h-6 w-px -translate-x-1/2 bg-neutral-500" />
        <span aria-hidden="true" className="absolute top-5 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-full bg-linear-to-b from-amber-700 to-amber-950 shadow-[0_4px_6px_-2px_rgb(0_0_0/0.5)]" />
        <div className="absolute inset-x-[17%] top-8 flex justify-between">
          {notes.map((note, i) => {
            const length = 230 - i * 22
            return (
              <button
                key={note}
                type="button"
                aria-label={`Tube ${i + 1}`}
                onPointerEnter={(event) => ring(i, event.timeStamp)}
                onClick={(event) => ring(i, event.timeStamp)}
                className="group relative flex w-5 flex-col items-center outline-none"
                style={{ height: length }}
              >
                <span
                  key={swings[i]}
                  className={cn("flex h-full w-full origin-top flex-col items-center", swings[i] > 0 && "animate-wind-chimes-swing motion-reduce:animate-none")}
                  style={{ animationDuration: `${1.4 + i * 0.12}s` }}
                >
                  <span className="h-6 w-px bg-neutral-500" />
                  <span className="w-3.5 flex-1 rounded-sm bg-linear-to-r from-neutral-500 via-neutral-100 to-neutral-500 shadow-[0_3px_5px_rgb(0_0_0/0.3)] group-focus-visible:ring-3 group-focus-visible:ring-sky-400" />
                </span>
              </button>
            )
          })}
        </div>
        {/* Clapper and sail. */}
        <span aria-hidden="true" className="absolute top-8 left-1/2 h-[190px] w-px -translate-x-1/2 bg-neutral-500" />
        <span aria-hidden="true" className="absolute top-[150px] left-1/2 size-7 -translate-x-1/2 rounded-full bg-linear-to-b from-amber-600 to-amber-900 shadow-md" />
        <span
          aria-hidden="true"
          className={cn("absolute top-[222px] left-1/2 h-12 w-8 -translate-x-1/2 origin-top rounded-b-md bg-linear-to-b from-amber-700 to-amber-900", breezy && "animate-wind-chimes-swing motion-reduce:animate-none")}
          style={{ animationDuration: "1.1s" }}
        />
      </div>
      <button
        type="button"
        onClick={breeze}
        disabled={breezy}
        className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
      >
        <Wind aria-hidden="true" className="size-4" />
        {breezy ? "Breezy…" : "Let the breeze in"}
      </button>
      <p className="text-center text-sm text-muted-foreground">Brush across the tubes to ring them.</p>
    </div>
  )
}

export { WindChimes }
