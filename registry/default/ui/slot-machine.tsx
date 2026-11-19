"use client"

import * as React from "react"
import { Bell, Cherry, Citrus, Clover, Gem, Grape, Star, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SlotMachineProps extends React.ComponentProps<"div"> {
  onResult?: (symbols: string[], win: boolean) => void
}

const SYMBOLS: { name: string; Icon: LucideIcon; color: string }[] = [
  { name: "Cherry", Icon: Cherry, color: "#dc2626" },
  { name: "Lemon", Icon: Citrus, color: "#ca8a04" },
  { name: "Grape", Icon: Grape, color: "#7c3aed" },
  { name: "Bell", Icon: Bell, color: "#d97706" },
  { name: "Clover", Icon: Clover, color: "#16a34a" },
  { name: "Star", Icon: Star, color: "#2563eb" },
  { name: "Gem", Icon: Gem, color: "#db2777" },
]
const ROW = 64
const LOOPS = 4

/**
 * A three-reel slot machine. Pull the lever (or press Spin): the reels blur,
 * then stop one after another. Three of a kind lights the marquee.
 */
function SlotMachine({ onResult, className, ...props }: SlotMachineProps) {
  const [stops, setStops] = React.useState([0, 2, 4])
  const [spin, setSpin] = React.useState(0)
  const [spinning, setSpinning] = React.useState(false)
  const [message, setMessage] = React.useState("Pull the lever")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const pull = () => {
    if (spinning) return
    const next = [0, 1, 2].map(() => Math.floor(Math.random() * SYMBOLS.length))
    setStops(next)
    setSpin((value) => value + 1)
    setSpinning(true)
    setMessage("Spinning…")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    timer.current = setTimeout(() => {
      setSpinning(false)
      const names = next.map((i) => SYMBOLS[i].name)
      const win = next.every((i) => i === next[0])
      const pair = new Set(next).size === 2
      setMessage(win ? `Jackpot! Three ${names[0].toLowerCase()}s.` : pair ? "So close: a pair." : `${names.join(", ")}. Try again.`)
      onResult?.(names, win)
    }, reduced ? 0 : 2300)
  }

  const win = !spinning && stops.every((i) => i === stops[0]) && spin > 0
  const strip = Array.from({ length: LOOPS + 1 }, () => SYMBOLS).flat()

  return (
    <div data-slot="slot-machine" className={cn("flex w-80 max-w-full items-start", className)} {...props}>
      <div className="min-w-0 flex-1 rounded-2xl bg-linear-to-b from-red-600 to-red-800 p-3 shadow-[0_18px_30px_-14px_rgb(0_0_0/0.65),inset_0_2px_0_rgb(255_255_255/0.25)]">
        <div className={cn("mb-3 rounded-md bg-neutral-950 py-1.5 text-center font-mono text-xs font-bold tracking-[0.3em] transition-colors", win ? "animate-pulse text-amber-300" : "text-amber-500/70")}>
          {win ? "JACKPOT" : "LUCKY 7"}
        </div>
        <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-neutral-900 p-1.5">
          {stops.map((stop, reel) => (
            <div key={reel} className="relative h-24 overflow-hidden rounded-md bg-linear-to-b from-neutral-300 via-white to-neutral-300" style={{ height: ROW * 1.5 }}>
              <div
                key={spin}
                aria-hidden="true"
                className={cn("absolute inset-x-0", spin > 0 && "transition-transform ease-[cubic-bezier(.15,.85,.25,1)] motion-reduce:transition-none")}
                style={{
                  top: ROW * 0.25,
                  transform: `translateY(${-(spin > 0 ? LOOPS * SYMBOLS.length + stop : stop) * ROW}px)`,
                  transitionDuration: `${1300 + reel * 450}ms`,
                }}
              >
                {strip.map((symbol, i) => (
                  <div key={i} className="grid place-items-center" style={{ height: ROW }}>
                    <symbol.Icon className="size-10" style={{ color: symbol.color }} strokeWidth={2.2} />
                  </div>
                ))}
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/35" />
            </div>
          ))}
        </div>
        <button type="button" onClick={pull} disabled={spinning} className="mt-3 w-full rounded-md bg-amber-400 py-1.5 text-sm font-bold text-red-900 shadow-[0_3px_0_#b45309] outline-none transition-transform active:translate-y-[2px] focus-visible:ring-3 focus-visible:ring-ring/60 disabled:opacity-70">
          Spin
        </button>
        <p role="status" className="mt-2 min-h-5 text-center text-xs text-red-50">
          {message}
        </p>
      </div>
      {/* Lever */}
      <button
        type="button"
        onClick={pull}
        disabled={spinning}
        aria-label="Pull the lever"
        className="group mt-6 -ml-1 flex flex-col items-center outline-none focus-visible:[&>span:first-child]:ring-3 focus-visible:[&>span:first-child]:ring-ring/60"
      >
        <span className={cn("size-7 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fecaca,#dc2626_60%,#7f1d1d)] shadow-md transition-transform duration-300", spinning && "translate-y-20")} />
        <span className={cn("h-24 w-1.5 origin-bottom rounded-full bg-linear-to-r from-neutral-400 to-neutral-200 transition-transform duration-300", spinning && "scale-y-[0.15]")} />
        <span className="h-4 w-4 rounded-sm bg-neutral-700" />
      </button>
    </div>
  )
}

export { SlotMachine }
