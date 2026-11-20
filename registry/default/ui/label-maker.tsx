"use client"

import * as React from "react"
import { Printer, Scissors, X } from "lucide-react"

import { cn } from "@/lib/utils"

type Tape = { name: string; color: string }
type Label = { id: number; text: string; tape: Tape }

interface LabelMakerProps extends React.ComponentProps<"div"> {
  defaultText?: string
  tapes?: Tape[]
  sound?: boolean
  onLabel?: (text: string) => void
}

const TAPES: Tape[] = [
  { name: "Red", color: "#c2261f" },
  { name: "Black", color: "#1c1c1c" },
  { name: "Blue", color: "#1d4ed8" },
  { name: "Green", color: "#15803d" },
]

/** Embossed letters on plastic tape: each letter sits a little unevenly, as pressed by hand. */
function Embossed({ text, count = text.length, tape }: { text: string; count?: number; tape: Tape }) {
  return (
    <span
      className="inline-flex h-9 items-center rounded-[3px] px-3 font-mono text-lg font-bold tracking-[0.18em] uppercase shadow-[0_2px_3px_rgb(0_0_0/0.35)]"
      style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${tape.color} 70%, white) 0%, ${tape.color} 18%, ${tape.color} 80%, color-mix(in oklab, ${tape.color} 70%, black) 100%)` }}
    >
      {[...text.slice(0, count)].map((char, i) => (
        <span
          key={i}
          className="inline-block text-white/90"
          style={{
            textShadow: "0 1px 0 rgb(0 0 0 / 0.45), 0 -1px 0 rgb(255 255 255 / 0.35)",
            transform: `translateY(${((i * 7) % 3) - 1}px) rotate(${((i * 13) % 5) - 2}deg)`,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  )
}

/**
 * A handheld label maker. Type a label, print it letter by letter onto
 * embossed tape, cut it off, and stick it on the shelf below.
 */
function LabelMaker({ defaultText = "Spices", tapes = TAPES, sound = true, onLabel, className, ...props }: LabelMakerProps) {
  const [text, setText] = React.useState(defaultText)
  const [tape, setTape] = React.useState(0)
  const [job, setJob] = React.useState<{ text: string; printed: number } | null>(null)
  const [labels, setLabels] = React.useState<Label[]>([])
  const nextId = React.useRef(0)
  const timer = React.useRef<number | undefined>(undefined)
  const audio = React.useRef<AudioContext | null>(null)
  const id = React.useId()
  const printing = job !== null && job.printed < job.text.length

  React.useEffect(() => () => window.clearInterval(timer.current), [])

  const clunk = () => {
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const now = ctx.currentTime
      const tone = ctx.createOscillator()
      const gain = ctx.createGain()
      tone.type = "square"
      tone.frequency.setValueAtTime(220, now)
      tone.frequency.exponentialRampToValueAtTime(60, now + 0.05)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07)
      tone.connect(gain).connect(ctx.destination)
      tone.start(now)
      tone.stop(now + 0.08)
    } catch {
      // No Web Audio: print silently.
    }
  }

  const print = () => {
    const words = text.trim()
    if (!words || printing) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (still) return setJob({ text: words, printed: words.length })
    setJob({ text: words, printed: 0 })
    let printed = 0
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      printed += 1
      clunk()
      setJob({ text: words, printed })
      if (printed >= words.length) window.clearInterval(timer.current)
    }, 150)
  }

  const cut = () => {
    if (!job || printing) return
    nextId.current += 1
    setLabels((list) => [...list, { id: nextId.current, text: job.text, tape: tapes[tape] }])
    onLabel?.(job.text)
    setJob(null)
  }

  return (
    <div data-slot="label-maker" className={cn("flex w-full max-w-md flex-col gap-4", className)} {...props}>
      <div className="relative rounded-[1.75rem] bg-linear-to-b from-zinc-600 via-zinc-700 to-zinc-900 p-4 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.8),inset_0_2px_0_rgb(255_255_255/0.18)]">
        <div className="flex items-center gap-3">
          <label htmlFor={id} className="sr-only">
            Label text
          </label>
          <input
            id={id}
            value={text}
            maxLength={18}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") print()
            }}
            className="h-11 min-w-0 flex-1 rounded-md bg-[linear-gradient(170deg,#c3cfb0,#a3b18f)] px-3 font-mono text-base font-bold tracking-widest text-neutral-900 uppercase shadow-[inset_0_2px_5px_rgb(0_0_0/0.45)] outline-none focus-visible:ring-3 focus-visible:ring-sky-400"
          />
          <button
            type="button"
            onClick={print}
            disabled={printing || !text.trim()}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-400 px-4 text-sm font-bold text-neutral-900 shadow-[0_3px_0_#92400e] outline-none active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-60"
          >
            <Printer aria-hidden="true" className="size-4" />
            Print
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div role="group" aria-label="Tape colour" className="flex gap-1.5">
            {tapes.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`${item.name} tape`}
                aria-pressed={tape === i}
                onClick={() => setTape(i)}
                className="size-7 rounded-full border-2 border-zinc-500 outline-none focus-visible:ring-3 focus-visible:ring-sky-400 aria-pressed:border-white"
                style={{ background: item.color }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={cut}
            disabled={!job || printing}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-zinc-200 px-3 text-sm font-semibold text-zinc-900 outline-none hover:bg-white focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-50"
          >
            <Scissors aria-hidden="true" className="size-4" />
            Cut
          </button>
        </div>
        {/* The exit slot. */}
        <span aria-hidden="true" className="absolute -right-1 bottom-7 h-11 w-2 rounded-l-sm bg-zinc-950" />
      </div>

      <div className="flex h-12 items-center justify-end overflow-hidden" aria-hidden={!job}>
        {job ? (
          <span className="transition-transform duration-150" style={{ transform: `translateX(${printing ? (job.text.length - job.printed) * 4 : 0}px)` }}>
            <Embossed text={job.text} count={job.printed} tape={tapes[tape]} />
          </span>
        ) : null}
      </div>
      <p role="status" className="sr-only">
        {job ? (printing ? `Printing ${job.text}` : `${job.text} is printed. Cut it off.`) : labels.length ? `${labels.length} labels on the shelf` : ""}
      </p>

      <div className="min-h-24 rounded-xl border border-dashed p-3">
        {labels.length ? (
          <ul className="flex flex-wrap gap-3">
            {labels.map((label, i) => (
              <li key={label.id} className="group relative" style={{ rotate: `${((i * 5) % 7) - 3}deg` }}>
                <Embossed text={label.text} tape={label.tape} />
                <button
                  type="button"
                  aria-label={`Peel off ${label.text}`}
                  onClick={() => setLabels((list) => list.filter((item) => item.id !== label.id))}
                  className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-foreground text-background opacity-0 outline-none group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <X aria-hidden="true" className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Cut labels land here.</p>
        )}
      </div>
    </div>
  )
}

export { LabelMaker }
export type { Tape as LabelTape }
