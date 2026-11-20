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

/** A brass coin face, used for the drop buttons and the falling coins. */
function Coin({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn("grid place-items-center rounded-full font-semibold text-[#5a3d0c] tabular-nums", className)}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, transparent 58%, rgb(90 61 12 / 0.25) 60%, transparent 63%), linear-gradient(145deg, #f6e2a8, #d4a645 45%, #a8781f)",
        boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.6), inset 0 -1px 0 rgb(0 0 0 / 0.2), 0 1px 2px rgb(0 0 0 / 0.3)",
      }}
    >
      {value}
    </span>
  )
}

/**
 * A frosted-glass piggy bank with a savings goal. Drop coins in the slot and
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
  const glass = `url(#${id}-glass)`

  return (
    <div data-slot="piggy-bank" className={cn("flex w-80 max-w-full flex-col gap-4", className)} {...props}>
      <div className="relative w-full">
        {/* Coins falling into the slot. */}
        {drops.map((coin) => (
          <span key={coin.id} aria-hidden="true" className="absolute top-0 left-[47%] z-10 animate-piggy-bank-coin motion-reduce:hidden">
            <Coin value={coin.value} className="size-7 text-[10px]" />
          </span>
        ))}
        <svg viewBox="40 0 190 170" className="mt-6 w-full" role="img" aria-label={broken ? `A broken piggy bank and ${currency}${saved} in savings` : `Piggy bank, ${currency}${saved} of ${currency}${goal} saved`}>
          <defs>
            <clipPath id={`${id}-body`}>
              <path d={BODY} />
            </clipPath>
            <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="rgb(255 255 255 / 0.75)" />
              <stop offset="1" stopColor="rgb(214 211 205 / 0.45)" />
            </linearGradient>
            <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8c46a" />
              <stop offset="1" stopColor="#b08327" />
            </linearGradient>
          </defs>
          <ellipse cx="132" cy="154" rx="70" ry="5" className="fill-foreground/10" />
          <g key={wobble} className={cn(wobble > 0 && !broken && "animate-piggy-bank-wobble motion-reduce:animate-none")} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
            {broken ? (
              <g>
                <path d="M60 70 C60 38 92 22 130 22 L120 60 L132 80 L112 132 H100 L98 150 H82 L80 130 C66 122 60 100 60 70 Z" fill={glass} className="stroke-foreground/30" strokeWidth="1.25" transform="rotate(-14 90 140) translate(-14 6)" />
                <path d="M130 22 C176 22 206 44 206 82 C206 110 186 128 156 132 L150 150 H134 L132 134 H112 L132 80 L120 60 Z" fill={glass} className="stroke-foreground/30" strokeWidth="1.25" transform="rotate(12 150 140) translate(14 6)" />
                {Array.from({ length: 9 }, (_, i) => (
                  <ellipse key={i} cx={96 + i * 10} cy={156 - (i % 3) * 3} rx="7" ry="2.6" fill="#f0d27f" stroke="#9a6f1e" strokeWidth="0.75" />
                ))}
              </g>
            ) : (
              <>
                <path d={BODY} fill={glass} />
                {/* Savings, rising inside the glass. */}
                <g clipPath={`url(#${id}-body)`}>
                  <rect x="40" y={150 - level * 128} width="200" height={level * 128 + 2} fill={`url(#${id}-gold)`} className="transition-[y,height] duration-700" />
                  {Array.from({ length: Math.round(level * 24) }, (_, i) => (
                    <ellipse key={i} cx={70 + ((i * 37) % 130)} cy={146 - Math.floor(i / 5) * 24 - ((i * 13) % 9)} rx="9" ry="3" fill="#f0d27f" stroke="#9a6f1e" strokeWidth="0.75" />
                  ))}
                  {/* Inner shading, so it reads as a solid glass form. */}
                  <path d={BODY} fill="none" stroke="rgb(0 0 0 / 0.08)" strokeWidth="14" />
                </g>
                <path d={BODY} fill="none" className="stroke-foreground/25" strokeWidth="1.25" />
                <ellipse cx="208" cy="80" rx="9" ry="12" fill={glass} className="stroke-foreground/25" strokeWidth="1.25" />
                <ellipse cx="205.5" cy="76" rx="1.4" ry="2" className="fill-foreground/45" />
                <ellipse cx="205.5" cy="85" rx="1.4" ry="2" className="fill-foreground/45" />
                <circle cx="182" cy="58" r="2.6" className="fill-foreground/80" />
                <path d="M158 31 C159 22 164 13 171 11 C175 18 179 27 180 36 Z" fill={glass} className="stroke-foreground/25" strokeWidth="1.25" strokeLinejoin="round" />
                <path d="M60 66 C50 62 48 52 55 53" fill="none" className="stroke-foreground/30" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="119" y="24.5" width="24" height="3" rx="1.5" className="fill-foreground/70" />
                <path d="M84 40 C92 32 104 28 116 28" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </g>
        </svg>
      </div>

      <div>
        <div role="status" className="flex items-baseline justify-between gap-3">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">
            {currency}
            {saved}
          </span>
          <span className="text-sm text-muted-foreground tabular-nums">
            {broken ? "Broken open" : reached ? "Goal reached" : `${currency}${goal - saved} to go of ${currency}${goal}`}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-foreground transition-[width] duration-700" style={{ width: `${level * 100}%` }} />
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
          className="inline-flex h-9 items-center gap-2 self-start rounded-md border bg-background px-3 text-sm shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          New piggy bank
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {coins.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => drop(value)}
              aria-label={`Drop in ${currency}${value}`}
              className="rounded-full outline-none transition-transform active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Coin value={value} className="size-10 text-sm" />
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              aria-label="Shake it"
              disabled={saved === 0}
              onClick={() => {
                setWobble((count) => count + 1)
                clink(Math.min(12, 2 + Math.round(saved / 5)))
              }}
              className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
            >
              <Vibrate aria-hidden="true" className="size-4" />
              Shake
            </button>
            {reached ? (
              <button
                type="button"
                onClick={() => setBroken(true)}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Hammer aria-hidden="true" className="size-4" />
                Break it open
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export { PiggyBank }
