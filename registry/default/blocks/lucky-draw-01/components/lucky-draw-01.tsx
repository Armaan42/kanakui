"use client"

import * as React from "react"
import { Gift } from "lucide-react"

import { SlotMachine } from "@/registry/default/ui/slot-machine"

const PRIZES = [
  { win: "Three of a kind", prize: "A year of Pro, on us" },
  { win: "A pair", prize: "20% off your next order" },
  { win: "Anything else", prize: "Free shipping this week" },
]

/**
 * A giveaway with a slot machine. For real prizes, decide the result on your
 * server and only animate it in the browser.
 */
export function LuckyDraw01() {
  const [result, setResult] = React.useState<string | null>(null)

  return (
    <section aria-labelledby="lucky-draw-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <Gift aria-hidden="true" className="size-4" />
            Birthday week
          </p>
          <h2 id="lucky-draw-01-title" className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            One pull. Everyone wins something.
          </h2>
          <dl className="mt-8 divide-y border-y">
            {PRIZES.map((row) => (
              <div key={row.win} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{row.win}</dt>
                <dd className="text-right font-medium">{row.prize}</dd>
              </div>
            ))}
          </dl>
          <p role="status" className="mt-6 min-h-6 text-sm font-medium">
            {result}
          </p>
        </div>
        <SlotMachine
          className="mx-auto"
          onResult={(symbols, win) => {
            const pair = new Set(symbols).size === 2
            setResult(win ? `Jackpot! ${PRIZES[0].prize}.` : pair ? `A pair: ${PRIZES[1].prize.toLowerCase()}.` : `You won ${PRIZES[2].prize.toLowerCase()}.`)
          }}
        />
      </div>
    </section>
  )
}
