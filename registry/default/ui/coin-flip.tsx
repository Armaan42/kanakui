"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface CoinFlipProps extends React.ComponentProps<"div"> {
  heads?: string
  tails?: string
  onFlip?: (side: "heads" | "tails") => void
}

/**
 * A coin you can toss. It spins up, turns over and over, and lands on a fair,
 * random side. Keeps a running tally.
 */
function CoinFlip({ heads = "Heads", tails = "Tails", onFlip, className, ...props }: CoinFlipProps) {
  const [turn, setTurn] = React.useState(0)
  const [tosses, setTosses] = React.useState(0)
  const [tally, setTally] = React.useState({ heads: 0, tails: 0 })
  const side = (turn / 180) % 2 === 0 ? "heads" : "tails"

  const flip = () => {
    const result = Math.random() < 0.5 ? "heads" : "tails"
    const current = (turn / 180) % 2 === 0 ? "heads" : "tails"
    setTurn(turn + 1800 + (result === current ? 0 : 180))
    setTosses((value) => value + 1)
    setTally((value) => ({ ...value, [result]: value[result] + 1 }))
    onFlip?.(result)
  }

  const face = (label: string, back?: boolean) => (
    <span
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fde68a,#d97706_60%,#92400e)] shadow-[inset_0_0_0_5px_#fbbf24,inset_0_0_0_7px_#b45309] [backface-visibility:hidden]"
      style={back ? { transform: "rotateX(180deg)" } : undefined}
    >
      <span className="font-serif text-sm font-bold tracking-widest text-amber-950 uppercase">{label}</span>
    </span>
  )

  return (
    <div data-slot="coin-flip" className={cn("flex flex-col items-center gap-5", className)} {...props}>
      <div className="relative h-40 [perspective:700px]">
        <button
          type="button"
          onClick={flip}
          aria-label={`Coin showing ${side === "heads" ? heads : tails}. Press to flip.`}
          key={tosses}
          className={cn("relative mt-16 size-24 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/60", tosses > 0 && "animate-coin-flip-toss motion-reduce:animate-none")}
        >
          <span className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.65,.3,1)] [transform-style:preserve-3d] motion-reduce:transition-none" style={{ transform: `rotateX(${turn}deg)` }}>
            {face(heads)}
            {face(tails, true)}
          </span>
        </button>
      </div>
      <button type="button" onClick={flip} className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50">
        Flip
      </button>
      <p role="status" className="font-mono text-xs text-muted-foreground tabular-nums">
        {tosses ? `${side === "heads" ? heads : tails}. ${heads} ${tally.heads} · ${tails} ${tally.tails}` : "Call it in the air"}
      </p>
    </div>
  )
}

export { CoinFlip }
