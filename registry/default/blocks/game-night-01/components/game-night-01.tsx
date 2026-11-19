"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CoinFlip } from "@/registry/default/ui/coin-flip"
import { DiceRoller } from "@/registry/default/ui/dice-roller"

const PLAYERS = ["Ana", "Leo", "Priya", "Sam"]

/** A game-night scoreboard: flip for who starts, roll the dice and add each roll to a player. */
export function GameNight01() {
  const [scores, setScores] = React.useState<Record<string, number>>(() => Object.fromEntries(PLAYERS.map((name) => [name, 0])))
  const [last, setLast] = React.useState<number | null>(null)
  const [first, setFirst] = React.useState<string | null>(null)
  const leader = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]

  return (
    <section aria-labelledby="game-night-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="game-night-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Game night
          </h2>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {first ? `${first} goes first.` : "Flip to see who goes first."}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border bg-card p-6 text-card-foreground">
            <h3 className="self-start text-sm font-medium text-muted-foreground">Who starts?</h3>
            <CoinFlip heads="Ana & Leo" tails="Priya & Sam" onFlip={(side) => setFirst(side === "heads" ? "Ana" : "Priya")} />
          </div>
          <div className="flex flex-col items-center gap-6 rounded-2xl border bg-card p-6 text-card-foreground">
            <h3 className="self-start text-sm font-medium text-muted-foreground">Roll</h3>
            <DiceRoller onRoll={(values) => setLast(values.reduce((sum, value) => sum + value, 0))} className="py-6" />
          </div>
          <div className="rounded-2xl border bg-card p-6 text-card-foreground">
            <h3 className="text-sm font-medium text-muted-foreground">Scores</h3>
            <ul className="mt-4 divide-y">
              {PLAYERS.map((name) => (
                <li key={name} className="flex items-center gap-3 py-2.5">
                  <span className={cn("flex-1 text-sm", leader[1] > 0 && leader[0] === name && "font-semibold")}>{name}</span>
                  <span className="w-10 text-right font-mono tabular-nums">{scores[name]}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={last === null}
                    aria-label={last === null ? `Roll first, then add to ${name}` : `Add ${last} to ${name}`}
                    onClick={() => {
                      if (last === null) return
                      setScores((current) => ({ ...current, [name]: current[name] + last }))
                      setLast(null)
                    }}
                  >
                    <Plus aria-hidden="true" className="size-3.5" />
                    {last ?? ""}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
