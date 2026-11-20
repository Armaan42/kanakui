"use client"

import * as React from "react"
import { BellRing } from "lucide-react"

import { cn } from "@/lib/utils"

interface TakeANumberProps extends React.ComponentProps<"div"> {
  /** The number being served now. */
  serving?: number
  /** The next ticket in the dispenser. */
  nextTicket?: number
  sound?: boolean
  onTake?: (ticket: number) => void
}

const SEGMENTS: Record<string, string> = { "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcdfg" }
const SHAPES: Record<string, string> = {
  a: "M2.4 0.6h7.2l-1 1.6h-5.2z", b: "M10.2 1.2l-1.1 1.6v6.2l1.1 0.9z", c: "M10.2 10.1l-1.1 0.9v6.2l1.1 1.6z", d: "M2.4 19.4h7.2l-1 -1.6h-5.2z",
  e: "M1.8 10.1l1.1 0.9v6.2l-1.1 1.6z", f: "M1.8 1.2l1.1 1.6v6.2l-1.1 0.9z", g: "M2.6 10l1-0.8h4.8l1 0.8-1 0.8h-4.8z",
}

function Led({ value }: { value: number }) {
  return (
    <span className="flex h-14 gap-1" aria-hidden="true">
      {String(value % 100).padStart(2, "0").split("").map((digit, i) => (
        <svg key={i} viewBox="0 0 12 20" className="h-full w-auto drop-shadow-[0_0_6px_rgb(255_40_40/0.8)]">
          {Object.entries(SHAPES).map(([name, d]) => (
            <path key={name} d={d} fill={SEGMENTS[digit].includes(name) ? "#ff3b30" : "rgb(255 59 48 / 0.08)"} />
          ))}
        </svg>
      ))}
    </span>
  )
}

/**
 * A take-a-number queue, like at the deli counter. Pull a ticket from the
 * dispenser, watch "Now serving" count up, and hear a chime when it's you.
 */
function TakeANumber({ serving: startServing = 44, nextTicket = 47, sound = true, onTake, className, ...props }: TakeANumberProps) {
  const [serving, setServing] = React.useState(startServing)
  const [next, setNext] = React.useState(nextTicket)
  const [ticket, setTicket] = React.useState<number | null>(null)
  const audio = React.useRef<AudioContext | null>(null)

  const chime = () => {
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      ;[880, 660].forEach((frequency, i) => {
        const at = ctx.currentTime + i * 0.25
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.frequency.value = frequency
        gain.gain.setValueAtTime(0.0001, at)
        gain.gain.exponentialRampToValueAtTime(0.12, at + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.9)
        tone.connect(gain).connect(ctx.destination)
        tone.start(at)
        tone.stop(at + 1)
      })
    } catch {
      // No Web Audio.
    }
  }

  const take = () => {
    setTicket(next)
    setNext(next + 1)
    onTake?.(next)
  }

  const advance = () => {
    const now = serving + 1
    setServing(now)
    if (now === ticket) chime()
  }

  const ahead = ticket === null ? 0 : ticket - serving
  const status =
    ticket === null
      ? `Now serving ${serving}. Take a number.`
      : ahead > 0
        ? `You're number ${ticket}. ${ahead} ${ahead === 1 ? "person" : "people"} ahead of you.`
        : ahead === 0
          ? `Number ${ticket}, it's your turn!`
          : `Number ${ticket} has been served. Take a new number.`

  return (
    <div data-slot="take-a-number" className={cn("grid w-full max-w-lg grid-cols-[minmax(0,1fr)] items-start gap-8 sm:grid-cols-2", className)} {...props}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center rounded-xl bg-neutral-950 px-4 py-3 shadow-[0_14px_24px_-12px_rgb(0_0_0/0.7)]">
          <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">Now serving</span>
          <Led value={serving} />
        </div>
        <button
          type="button"
          onClick={advance}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <BellRing aria-hidden="true" className="size-3.5" />
          Next customer
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Dispenser. */}
        <button
          type="button"
          onClick={take}
          aria-label="Take a number"
          className="group relative grid h-36 w-36 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f87171,#dc2626_45%,#7f1d1d)] shadow-[0_16px_26px_-12px_rgb(0_0_0/0.7),inset_0_3px_0_rgb(255_255_255/0.3)] outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
        >
          <span aria-hidden="true" className="text-center text-[11px] leading-tight font-black tracking-wider text-white uppercase">
            Take a<br />number
          </span>
          {/* Paper ticket sticking out of the slot. */}
          <span aria-hidden="true" className="absolute -bottom-7 left-1/2 h-10 w-14 -translate-x-1/2 rounded-b-sm bg-[#fdf6e3] shadow-md transition-transform group-hover:translate-y-1 group-active:translate-y-2">
            <span className="absolute inset-x-0 top-2 border-t border-dashed border-neutral-400" />
            <span className="absolute inset-x-0 bottom-1 text-center font-mono text-xs font-bold text-red-700">{next}</span>
          </span>
          <span aria-hidden="true" className="absolute -bottom-1 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-neutral-900" />
        </button>

        {/* Your ticket. */}
        <div className="mt-6 h-24">
          {ticket !== null ? (
            <div
              key={ticket}
              className={cn(
                "flex h-24 w-32 animate-take-a-number-tear flex-col items-center justify-center rounded-sm bg-[#fdf6e3] shadow-lg motion-reduce:animate-none",
                ahead === 0 && "ring-4 ring-emerald-500"
              )}
              style={{ rotate: "-4deg" }}
            >
              <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-600 uppercase">Your number</span>
              <span className="font-mono text-4xl font-black text-red-700 tabular-nums">{ticket}</span>
            </div>
          ) : null}
        </div>
      </div>

      <p role="status" className="text-center text-sm sm:col-span-2">
        {status}
      </p>
    </div>
  )
}

export { TakeANumber }
