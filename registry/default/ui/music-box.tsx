"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

type Pin = { beat: number; note: string }

interface MusicBoxProps extends React.ComponentProps<"div"> {
  /** The pins on the drum: which note plays on which beat. Notes are written like "C5" or "F#4". */
  tune?: Pin[]
  /** Beats in one turn of the drum. */
  beats?: number
  /** Beats the crank moves per full turn. */
  beatsPerTurn?: number
  /** Speed of the Play button, in beats per minute. */
  tempo?: number
  /** Printed on the label inside the lid. */
  title?: string
  sound?: boolean
}

/** "Twinkle, Twinkle, Little Star" (traditional), melody plus a bass note per bar. */
const TWINKLE: Pin[] = (() => {
  const melody = ["C5 C5 G5 G5 A5 A5 G5", "F5 F5 E5 E5 D5 D5 C5", "G5 G5 F5 F5 E5 E5 D5", "G5 G5 F5 F5 E5 E5 D5", "C5 C5 G5 G5 A5 A5 G5", "F5 F5 E5 E5 D5 D5 C5"]
  const bass = [["C4", "F4"], ["F4", "G4"], ["C4", "G4"], ["C4", "G4"], ["C4", "F4"], ["F4", "G4"]]
  return melody.flatMap((phrase, p) => [
    ...phrase.split(" ").map((note, i) => ({ beat: p * 8 + i, note })),
    { beat: p * 8, note: bass[p][0] },
    { beat: p * 8 + 4, note: bass[p][1] },
  ]).concat({ beat: 46, note: "C4" })
})()

const SEMITONES: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const midi = (note: string) => {
  const match = /^([A-G])(#?)(\d)$/.exec(note)
  if (!match) return 60
  return SEMITONES[match[1]] + (match[2] ? 1 : 0) + (Number(match[3]) + 1) * 12
}
const mod = (value: number, by: number) => ((value % by) + by) % by

/**
 * A wind-up music box. Turning the crank (drag it round, use the arrow keys or
 * press Play) turns a brass drum, and each pin plucks a tooth of the steel comb.
 */
function MusicBox({
  tune = TWINKLE,
  beats = 48,
  beatsPerTurn = 8,
  tempo = 108,
  title = "Twinkle, Twinkle, Little Star",
  sound = true,
  className,
  ...props
}: MusicBoxProps) {
  const teeth = React.useMemo(() => [...new Set(tune.map((pin) => pin.note))].sort((a, b) => midi(a) - midi(b)), [tune])
  const [position, setPosition] = React.useState(0)
  const [rings, setRings] = React.useState<number[]>(() => teeth.map(() => 0))
  const [playing, setPlaying] = React.useState(false)
  const positionRef = React.useRef(0)
  const crankRef = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ last: number } | null>(null)
  const audio = React.useRef<AudioContext | null>(null)
  const frame = React.useRef(0)

  const pluck = React.useCallback(
    (notes: string[]) => {
      setRings((current) => teeth.map((tooth, i) => (current[i] ?? 0) + (notes.includes(tooth) ? 1 : 0)))
      if (!sound) return
      try {
        audio.current ??= new AudioContext()
        const ctx = audio.current
        const now = ctx.currentTime
        for (const note of notes) {
          const frequency = 440 * 2 ** ((midi(note) - 69) / 12)
          const body = ctx.createGain()
          body.gain.setValueAtTime(0.0001, now)
          body.gain.exponentialRampToValueAtTime(0.18, now + 0.004)
          body.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)
          body.connect(ctx.destination)
          const shimmer = ctx.createGain()
          shimmer.gain.setValueAtTime(0.05, now)
          shimmer.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)
          shimmer.connect(ctx.destination)
          for (const [ratio, out] of [[1, body], [2, body], [4.2, shimmer]] as const) {
            const tone = ctx.createOscillator()
            tone.frequency.value = frequency * ratio
            tone.connect(out)
            tone.start(now)
            tone.stop(now + 1.9)
          }
        }
      } catch {
        // No Web Audio: the comb still moves.
      }
    },
    [sound, teeth]
  )

  /** Turn the drum forward, plucking every pin that passes the comb. */
  const advance = React.useCallback(
    (by: number) => {
      if (by <= 0) return
      const from = positionRef.current
      const to = from + by
      positionRef.current = to
      setPosition(to)
      if (by > beats / 2) return
      const notes = tune.filter((pin) => {
        const passes = pin.beat + Math.floor((to - pin.beat) / beats) * beats
        return passes > from && passes <= to
      })
      if (notes.length) pluck(notes.map((pin) => pin.note))
    },
    [beats, pluck, tune]
  )

  React.useEffect(() => {
    if (!playing) return
    let last = performance.now()
    const tick = (now: number) => {
      advance(((now - last) / 60000) * tempo)
      last = now
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [advance, playing, tempo])

  const angleOf = (event: React.PointerEvent) => {
    const box = crankRef.current!.getBoundingClientRect()
    return (Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY) * 180) / Math.PI
  }

  const beat = Math.floor(mod(position, beats))

  return (
    <div data-slot="music-box" className={cn("flex w-80 max-w-full flex-col items-center gap-4", className)} {...props}>
      <div className="flex w-full items-end">
        <div className="min-w-0 flex-1">
          {/* Lid, open. */}
          <div aria-hidden="true" className="mx-2 grid h-20 place-items-center rounded-t-xl bg-linear-to-b from-amber-800 to-amber-950 shadow-[inset_0_2px_0_rgb(255_255_255/0.15)] transform-[perspective(500px)_rotateX(28deg)] origin-bottom">
            <span className="rounded-sm bg-[#f8f1df] px-3 py-1.5 text-center font-serif text-[11px] leading-tight text-amber-950 italic shadow-sm">{title}</span>
          </div>
          {/* Box. */}
          <div className="rounded-xl bg-linear-to-b from-amber-700 via-amber-800 to-amber-950 p-2.5 shadow-[0_16px_26px_-14px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.2)]">
            <div aria-hidden="true" className="relative overflow-hidden rounded-md bg-[radial-gradient(ellipse_at_50%_20%,#7f1d1d,#450a0a)] px-3 pt-3 pb-2 shadow-[inset_0_3px_8px_rgb(0_0_0/0.6)]">
              {/* Drum. */}
              <div className="relative h-16 rounded-[10px] bg-linear-to-b from-yellow-900 via-yellow-200 to-yellow-900 shadow-[0_4px_6px_rgb(0_0_0/0.5)]">
                <div className="absolute inset-0 rounded-[10px] bg-linear-to-b from-black/30 via-transparent to-black/40" />
                {tune.map((pin, i) => {
                  const ahead = mod(pin.beat - position, beats)
                  const angle = (ahead / beats) * Math.PI * 2
                  if (angle > Math.PI) return null
                  const depth = Math.sin(angle)
                  const size = 2.5 + depth * 3
                  return (
                    <span
                      key={i}
                      className="absolute -translate-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#a3a3a3)]"
                      style={{
                        left: `${((teeth.indexOf(pin.note) + 0.5) / teeth.length) * 100}%`,
                        top: `${50 + Math.cos(angle) * 46}%`,
                        width: size,
                        height: size,
                        opacity: 0.35 + depth * 0.65,
                      }}
                    />
                  )
                })}
              </div>
              {/* Comb. */}
              <div className="relative -mt-1 flex h-16 items-start gap-1">
                {/* The comb's base is cut on a slant: long low teeth on the left, short high ones on the right. */}
                <span className="absolute inset-0 bg-linear-to-r from-neutral-500 via-neutral-200 to-neutral-500 [clip-path:polygon(0_78%,100%_43%,100%_100%,0_100%)]" />
                {teeth.map((note, i) => {
                  const rung = rings[i] ?? 0
                  return (
                    <span key={note} className="relative flex h-full flex-1 justify-center">
                      <span
                        key={rung}
                        className={cn(
                          "w-[60%] origin-bottom rounded-t-sm bg-linear-to-r from-neutral-400 via-neutral-100 to-neutral-500 shadow-[0_1px_2px_rgb(0_0_0/0.4)]",
                          rung > 0 && "animate-music-box-twang motion-reduce:animate-none"
                        )}
                        style={{ height: `${80 - (i / Math.max(teeth.length - 1, 1)) * 35}%` }}
                      />
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Crank. */}
        <div
          ref={crankRef}
          role="slider"
          tabIndex={0}
          aria-label="Crank"
          aria-valuemin={0}
          aria-valuemax={beats - 1}
          aria-valuenow={beat}
          aria-valuetext={`Beat ${beat + 1} of ${beats}`}
          onPointerDown={(event) => {
            if (event.button !== 0) return
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { last: angleOf(event) }
            setPlaying(false)
          }}
          onPointerMove={(event) => {
            const current = drag.current
            if (!current) return
            const angle = angleOf(event)
            const delta = mod(angle - current.last + 180, 360) - 180
            current.last = angle
            // A ratchet: only forward turns move the drum.
            advance((delta / 360) * beatsPerTurn)
          }}
          onPointerUp={() => {
            drag.current = null
          }}
          onPointerCancel={() => {
            drag.current = null
          }}
          onKeyDown={(event) => {
            const steps: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, PageUp: 4 }
            const step = steps[event.key]
            if (!step) return
            event.preventDefault()
            advance(Math.floor(positionRef.current) + step - positionRef.current)
          }}
          className="relative mb-6 -ml-1 size-16 shrink-0 cursor-grab touch-none rounded-full outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/60 active:cursor-grabbing"
        >
          <span aria-hidden="true" className="absolute top-1/2 left-0 h-3 w-1/2 -translate-y-1/2 bg-linear-to-b from-yellow-200 to-yellow-800" />
          <span aria-hidden="true" className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fef3c7,#ca8a04_55%,#713f12)] shadow-[0_3px_6px_rgb(0_0_0/0.45)]" />
          <span
            aria-hidden="true"
            className="absolute inset-2 rounded-full"
            style={{ rotate: `${(position / beatsPerTurn) * 360}deg` }}
          >
            <span className="absolute top-1/2 left-1/2 h-2.5 w-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-yellow-100 via-yellow-500 to-yellow-800 shadow-[0_2px_3px_rgb(0_0_0/0.4)]" />
            <span className="absolute top-1/2 -right-1.5 size-5 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fef3c7,#92400e_60%,#451a03)] shadow-[0_2px_4px_rgb(0_0_0/0.45)]" />
          </span>
          <span aria-hidden="true" className="absolute top-1/2 left-1/2 size-4 -translate-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fef9c3,#a16207)] shadow-[0_1px_2px_rgb(0_0_0/0.5)]" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-pressed={playing}
          onClick={() => setPlaying((value) => !value)}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {playing ? "Pause" : "Play"}
        </button>
        <p className="text-sm text-muted-foreground">{playing ? "Playing" : "Or turn the crank yourself."}</p>
      </div>
    </div>
  )
}

export { MusicBox }
export type { Pin as MusicBoxPin }
