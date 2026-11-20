"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface PianoProps extends React.ComponentProps<"div"> {
  /** Octaves to show, starting at C. */
  octaves?: number
  /** Octave number of the lowest C. */
  startOctave?: number
  sound?: boolean
  onNote?: (note: string) => void
}

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
/** Computer keys for the first octave and a half, like a tracker. */
const KEYS = "awsedftgyhujkolp;"

/**
 * A playable piano. Press the keys, glide across them with the pointer held
 * down, or play from the computer keyboard (A to ; with W, E, T, Y, U, O and P
 * for the black keys) while the piano has focus.
 */
function Piano({ octaves = 2, startOctave = 4, sound = true, onNote, className, ...props }: PianoProps) {
  const notes = React.useMemo(
    () =>
      Array.from({ length: octaves * 12 + 1 }, (_, i) => {
        const name = NAMES[i % 12]
        const octave = startOctave + Math.floor(i / 12)
        return { id: `${name}${octave}`, black: name.includes("#"), midi: 12 * (octave + 1) + (i % 12), key: KEYS[i] }
      }),
    [octaves, startOctave]
  )
  const whites = notes.filter((note) => !note.black)
  const [down, setDown] = React.useState<string[]>([])
  const [last, setLast] = React.useState("")
  const audio = React.useRef<AudioContext | null>(null)
  const voices = React.useRef(new Map<string, { stop: (when: number) => void }>())

  const start = (id: string) => {
    const note = notes.find((item) => item.id === id)
    if (!note || voices.current.has(id)) return
    setDown((list) => [...list, id])
    setLast(id)
    onNote?.(id)
    if (!sound) {
      voices.current.set(id, { stop: () => {} })
      return
    }
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const now = ctx.currentTime
      const frequency = 440 * 2 ** ((note.midi - 69) / 12)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.4)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3)
      gain.connect(ctx.destination)
      const tones = ([[1, "triangle", 1], [2, "sine", 0.35], [3, "sine", 0.12]] as const).map(([ratio, type, level]) => {
        const tone = ctx.createOscillator()
        const mix = ctx.createGain()
        tone.type = type
        tone.frequency.value = frequency * ratio
        mix.gain.value = level
        tone.connect(mix).connect(gain)
        tone.start(now)
        tone.stop(now + 3)
        return tone
      })
      voices.current.set(id, {
        stop: (when) => {
          gain.gain.cancelScheduledValues(when)
          gain.gain.setTargetAtTime(0.0001, when, 0.12)
          tones.forEach((tone) => tone.stop(when + 0.8))
        },
      })
    } catch {
      voices.current.set(id, { stop: () => {} })
    }
  }

  const stop = (id: string) => {
    const voice = voices.current.get(id)
    if (!voice) return
    voices.current.delete(id)
    setDown((list) => list.filter((item) => item !== id))
    try {
      voice.stop(audio.current?.currentTime ?? 0)
    } catch {
      // Already stopped.
    }
  }

  const stopAll = () => [...voices.current.keys()].forEach(stop)

  const keyProps = (id: string) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return
      // Touch captures the pointer to the first key; let it go so a finger can glide across keys.
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      start(id)
    },
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.buttons === 1) start(id)
    },
    onPointerLeave: () => stop(id),
    onPointerUp: () => stop(id),
    onPointerCancel: () => stop(id),
  })

  const keyFor = (key: string) => notes.find((note) => note.key === key.toLowerCase())?.id

  return (
    <div data-slot="piano" className={cn("flex w-full max-w-2xl flex-col gap-3", className)} {...props}>
      <div className="rounded-2xl bg-linear-to-b from-neutral-800 to-neutral-950 p-3 pt-6 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.12)]">
        <div className="mb-3 h-1 rounded-full bg-red-800/80" aria-hidden="true" />
        <div
          role="group"
          tabIndex={0}
          aria-label="Piano keys. With focus here, play with the A to ; row, and W E T Y U O P for black keys."
          onKeyDown={(event) => {
            if (event.repeat || event.metaKey || event.ctrlKey) return
            const id = keyFor(event.key)
            if (!id) return
            event.preventDefault()
            start(id)
          }}
          onKeyUp={(event) => {
            const id = keyFor(event.key)
            if (id) stop(id)
          }}
          onBlur={stopAll}
          className="relative flex h-44 touch-none rounded-md outline-none select-none focus-visible:ring-3 focus-visible:ring-sky-400 sm:h-52"
        >
          {whites.map((note) => (
            <button
              key={note.id}
              type="button"
              tabIndex={-1}
              aria-label={note.id}
              data-down={down.includes(note.id) || undefined}
              {...keyProps(note.id)}
              className="relative flex flex-1 items-end justify-center rounded-b-md border-x border-neutral-300 bg-linear-to-b from-neutral-100 to-white pb-2 shadow-[inset_0_-6px_0_#d4d4d4] transition-[box-shadow,background] duration-75 first:rounded-bl-lg last:rounded-br-lg data-down:from-neutral-200 data-down:to-neutral-100 data-down:shadow-[inset_0_-2px_0_#d4d4d4]"
            >
              <span aria-hidden="true" className="font-mono text-[10px] text-neutral-500 uppercase">
                {note.key}
              </span>
            </button>
          ))}
          {notes.map((note, i) => {
            if (!note.black) return null
            const before = notes.slice(0, i).filter((item) => !item.black).length
            return (
              <button
                key={note.id}
                type="button"
                tabIndex={-1}
                aria-label={note.id}
                data-down={down.includes(note.id) || undefined}
                {...keyProps(note.id)}
                className="absolute top-0 z-10 flex h-[62%] -translate-x-1/2 items-end justify-center rounded-b-md bg-linear-to-b from-neutral-700 to-neutral-950 pb-1.5 shadow-[inset_0_-5px_0_#262626,0_3px_4px_rgb(0_0_0/0.5)] transition-[box-shadow] duration-75 data-down:shadow-[inset_0_-1px_0_#262626,0_1px_2px_rgb(0_0_0/0.5)]"
                style={{ left: `${(before / whites.length) * 100}%`, width: `${(100 / whites.length) * 0.62}%` }}
              >
                <span aria-hidden="true" className="font-mono text-[9px] text-neutral-400 uppercase">
                  {note.key}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {last ? `Last note: ${last}` : ""}
      </p>
    </div>
  )
}

export { Piano }
