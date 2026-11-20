"use client"

import * as React from "react"
import { Hammer, RotateCcw, Vibrate } from "lucide-react"

import { cn } from "@/lib/utils"

interface PiggyBankProps extends React.ComponentProps<"div"> {
  /** The savings goal. */
  goal?: number
  /** Coin values you can drop in. */
  coins?: number[]
  /** Currency symbol shown before amounts. */
  currency?: string
  sound?: boolean
  onSave?: (total: number) => void
}

const BODY = "M60 70 C60 38 92 22 130 22 C176 22 206 44 206 82 C206 110 186 128 156 132 L150 150 H134 L132 134 H100 L98 150 H82 L80 130 C66 122 60 100 60 70 Z"

/**
 * A see-through piggy bank with a savings goal. Drop coins in the slot and
 * watch the gold rise; shake it to hear the coins, and break it open once
 * you hit the goal.
 */
function PiggyBank({ goal = 50, coins = [1, 2, 5, 10], currency = "$", sound = true, onSave, className, ...props }: PiggyBankProps) {
  const [saved, setSaved] = React.useState(0)
  const [drops, setDrops] = React.useState<{ id: number; value: number }[]>([])
  const [wobble, setWobble] = React.useState(0)
  const [broken, setBroken] = React.useState(false)
  const nextId = React.useRef(0)
  const audio = React.useRef<AudioContext | null>(null)
  // A small seeded sequence, so each clink is a little different without Math.random.
  const jitter = React.useRef(7)
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")

  const clink = (count = 1) => {
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const next = () => {
        jitter.current = (jitter.current * 16807) % 2147483647
        return jitter.current / 2147483647
      }
      for (let i = 0; i < count; i++) {
        const at = ctx.currentTime + 0.25 + i * (0.06 + next() * 0.05)
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.frequency.value = 2600 + next() * 1400
        gain.gain.setValueAtTime(0.0001, at)
        gain.gain.exponentialRampToValueAtTime(0.06, at + 0.004)
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.25)
        tone.connect(gain).connect(ctx.destination)
        tone.start(at)
        tone.stop(at + 0.3)
      }
    } catch {
      // No Web Audio.
    }
  }

  const drop = (value: number) => {
    if (broken) return
    nextId.current += 1
    const coin = { id: nextId.current, value }
    setDrops((list) => [...list.slice(-4), coin])
    const total = saved + value
    setSaved(total)
    setWobble((count) => count + 1)
    onSave?.(total)
    clink()
  }

  const level = Math.min(1, saved / goal)
  const reached = saved >= goal

  return (
    <div data-slot="piggy-bank" className={cn("flex w-80 max-w-full flex-col items-center gap-4", className)} {...props}>
      <div className="relative w-full">
        {/* Coins falling into the slot. */}
        {drops.map((coin) => (
          <span
            key={coin.id}
            aria-hidden="true"
            className="absolute top-0 left-[47%] z-10 grid size-7 animate-piggy-bank-coin place-items-center rounded-full border-2 border-yellow-600 bg-yellow-400 font-mono text-[10px] font-bold text-yellow-900 motion-reduce:hidden"
          >
            {coin.value}
          </span>
        ))}
        <svg viewBox="40 0 190 170" className="mt-6 w-full" role="img" aria-label={broken ? `A broken piggy bank and ${currency}${saved} in savings` : `Piggy bank, ${currency}${saved} of ${currency}${goal} saved`}>
          <defs>
            <clipPath id={`${id}-body`}>
              <path d={BODY} />
            </clipPath>
          </defs>
          <g key={wobble} className={cn(wobble > 0 && !broken && "animate-piggy-bank-wobble motion-reduce:animate-none")} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
            {broken ? (
              <g>
                <path d="M60 70 C60 38 92 22 130 22 L120 60 L132 80 L112 132 H100 L98 150 H82 L80 130 C66 122 60 100 60 70 Z" fill="#f9a8d4" stroke="#db2777" strokeWidth="2" transform="rotate(-14 90 140) translate(-14 6)" />
                <path d="M130 22 C176 22 206 44 206 82 C206 110 186 128 156 132 L150 150 H134 L132 134 H112 L132 80 L120 60 Z" fill="#f9a8d4" stroke="#db2777" strokeWidth="2" transform="rotate(12 150 140) translate(14 6)" />
                {Array.from({ length: 9 }, (_, i) => (
                  <ellipse key={i} cx={96 + i * 10} cy={156 - (i % 3) * 3} rx="7" ry="3" fill="#facc15" stroke="#a16207" />
                ))}
              </g>
            ) : (
              <>
                <path d={BODY} fill="rgb(251 207 232 / 0.5)" />
                {/* Savings, rising inside the glass. */}
                <g clipPath={`url(#${id}-body)`}>
                  <rect x="40" y={150 - level * 128} width="200" height={level * 128 + 2} fill="#facc15" className="transition-[y,height] duration-700" />
                  {Array.from({ length: Math.round(level * 24) }, (_, i) => (
                    <ellipse key={i} cx={70 + ((i * 37) % 130)} cy={146 - Math.floor(i / 5) * 24 - ((i * 13) % 9)} rx="9" ry="3.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
                  ))}
                </g>
                <path d={BODY} fill="none" stroke="#db2777" strokeWidth="2.5" />
                <ellipse cx="208" cy="80" rx="10" ry="13" fill="#f9a8d4" stroke="#db2777" strokeWidth="2.5" />
                <circle cx="205" cy="76" r="2" fill="#9d174d" />
                <circle cx="205" cy="85" r="2" fill="#9d174d" />
                <circle cx="182" cy="58" r="3.5" fill="#1f2937" />
                <path d="M160 30 L172 8 L182 36 Z" fill="#f9a8d4" stroke="#db2777" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M60 64 C46 60 44 46 54 48 C62 50 54 60 46 58" fill="none" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="118" y="24" width="26" height="4" rx="2" fill="#831843" />
                <ellipse cx="96" cy="44" rx="14" ry="6" fill="rgb(255 255 255 / 0.35)" transform="rotate(-20 96 44)" />
              </>
            )}
          </g>
        </svg>
      </div>

      <div className="w-full">
        <div className="flex justify-between text-sm">
          <span className="font-semibold tabular-nums">
            {currency}
            {saved}
          </span>
          <span className="text-muted-foreground">
            Goal {currency}
            {goal}
          </span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-yellow-400 transition-[width] duration-700" style={{ width: `${level * 100}%` }} />
        </div>
      </div>

      {broken ? (
        <button
          type="button"
          onClick={() => {
            setBroken(false)
            setSaved(0)
            setDrops([])
          }}
          className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          New piggy bank
        </button>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {coins.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => drop(value)}
              aria-label={`Drop in ${currency}${value}`}
              className="grid size-11 place-items-center rounded-full border-2 border-yellow-600 bg-yellow-300 font-mono text-sm font-bold text-yellow-950 shadow-[0_3px_0_#a16207] outline-none active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-500"
            >
              {value}
            </button>
          ))}
          <button
            type="button"
            aria-label="Shake it"
            disabled={saved === 0}
            onClick={() => {
              setWobble((count) => count + 1)
              clink(Math.min(12, 2 + Math.round(saved / 5)))
            }}
            className="grid size-11 place-items-center rounded-full border text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
          >
            <Vibrate aria-hidden="true" className="size-4" />
          </button>
          {reached ? (
            <button
              type="button"
              onClick={() => setBroken(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Hammer aria-hidden="true" className="size-4" />
              Break it open
            </button>
          ) : null}
        </div>
      )}
      <p role="status" className="text-center text-sm">
        {broken ? `You saved ${currency}${saved}. Well done!` : reached ? "Goal reached!" : saved ? `${currency}${goal - saved} to go.` : "Drop a coin in the slot."}
      </p>
    </div>
  )
}

export { PiggyBank }
