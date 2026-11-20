"use client"

import * as React from "react"
import { Bell, Cherry, Citrus, Clover, Gem, Grape, Star, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SlotMachineProps extends React.ComponentProps<"div"> {
  onResult?: (symbols: string[], win: boolean) => void
}

const SYMBOLS: { name: string; Icon: LucideIcon; color: string }[] = [
  // Printed reel strips: two inks, like the real thing.
  { name: "Cherry", Icon: Cherry, color: "#b42318" },
  { name: "Lemon", Icon: Citrus, color: "#1f1f22" },
  { name: "Grape", Icon: Grape, color: "#1f1f22" },
  { name: "Bell", Icon: Bell, color: "#b42318" },
  { name: "Clover", Icon: Clover, color: "#1f1f22" },
  { name: "Star", Icon: Star, color: "#b42318" },
  { name: "Gem", Icon: Gem, color: "#1f1f22" },
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
  const [message, setMessage] = React.useState("Ready")
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
      setMessage(win ? `Jackpot: three ${names[0].toLowerCase()}s` : pair ? "A pair. So close" : names.join(", "))
      onResult?.(names, win)
    }, reduced ? 0 : 2300)
  }

  const win = !spinning && stops.every((i) => i === stops[0]) && spin > 0
  const strip = Array.from({ length: LOOPS + 1 }, () => SYMBOLS).flat()

  return (
    <div data-slot="slot-machine" className={cn("flex w-80 max-w-full items-start", className)} {...props}>
      <div className="min-w-0 flex-1 rounded-[1.25rem] bg-[linear-gradient(#2b2b2e,#18181a)] p-2.5 shadow-[0_20px_34px_-20px_rgb(0_0_0/0.85),inset_0_1px_0_rgb(255_255_255/0.12)] ring-1 ring-black/40">
        <p role="status" className={cn("mb-2.5 flex h-8 items-center justify-center truncate rounded-md bg-[#0b0c0a] px-2 font-mono text-xs shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)] transition-colors", win ? "animate-pulse text-[#ffcf7a] motion-reduce:animate-none" : "text-[#f3b15a]")}>
          {message}
        </p>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-[linear-gradient(#a1a1aa,#52525b)] p-1 shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          {stops.map((stop, reel) => (
            <div key={reel} className="relative h-24 overflow-hidden rounded-[5px] bg-linear-to-b from-[#d9d3c6] via-[#faf7f0] to-[#d9d3c6]" style={{ height: ROW * 1.5 }}>
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
                    <symbol.Icon className="size-9" style={{ color: symbol.color }} strokeWidth={2} />
                  </div>
                ))}
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/30" />
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex justify-end rounded-lg bg-[#121214] p-2 shadow-[inset_0_1px_3px_rgb(0_0_0/0.8)]">
          <button type="button" onClick={pull} disabled={spinning} className="h-9 rounded-full bg-[linear-gradient(#ff7a3d,#e2531b)] px-5 text-sm font-semibold text-white shadow-[0_2px_0_#8a2e0b,inset_0_1px_0_rgb(255_255_255/0.3)] outline-none active:translate-y-px active:shadow-none focus-visible:ring-2 focus-visible:ring-[#f3b15a] disabled:opacity-60">
            Spin
          </button>
        </div>
      </div>
      {/* Lever */}
      <button
        type="button"
        onClick={pull}
        disabled={spinning}
        aria-label="Pull the lever"
        className="group mt-6 -ml-1 flex flex-col items-center outline-none focus-visible:[&>span:first-child]:ring-3 focus-visible:[&>span:first-child]:ring-ring/60"
      >
        <span className={cn("size-7 rounded-full bg-[radial-gradient(circle_at_35%_30%,#6b6b70,#1c1c1f_60%,#09090b)] shadow-md transition-transform duration-300", spinning && "translate-y-20")} />
        <span className={cn("h-24 w-1.5 origin-bottom rounded-full bg-linear-to-r from-neutral-500 via-neutral-200 to-neutral-400 transition-transform duration-300", spinning && "scale-y-[0.15]")} />
        <span className="h-4 w-4 rounded-sm bg-[linear-gradient(#3a3a3e,#18181a)]" />
      </button>
    </div>
  )
}

export { SlotMachine }
