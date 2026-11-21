"use client"

import * as React from "react"

import { DiceRoller } from "@/registry/default/ui/dice-roller"

export const meta = {
  title: "Board game companion",
  description: "The dice roller in a board game companion app, for when the real dice have rolled under the sofa.",
}

// The players are made up.
const PLAYERS = ["Ana", "Leo", "Mei", "Tomás"]

export default function BoardGameNight() {
  const [turn, setTurn] = React.useState(0)
  const [last, setLast] = React.useState<{ player: string; total: number; double: boolean } | null>(null)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">Game night · Round 4</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{PLAYERS[turn]}&apos;s turn</h1>
      <ul aria-label="Players" className="mt-4 flex justify-center gap-2 text-sm">
        {PLAYERS.map((name, i) => (
          <li key={name} className={i === turn ? "rounded-full bg-foreground px-3 py-1 text-background" : "rounded-full border px-3 py-1 text-muted-foreground"}>
            {name}
          </li>
        ))}
      </ul>
      <DiceRoller
        className="mx-auto mt-10"
        count={2}
        onRoll={(values) => {
          const double = values[0] === values[1]
          setLast({ player: PLAYERS[turn], total: values[0] + values[1], double })
          if (!double) setTurn((t) => (t + 1) % PLAYERS.length)
        }}
      />
      <p role="status" className="mt-6 text-sm text-muted-foreground">
        {last ? `${last.player} moves ${last.total}.${last.double ? " Doubles, roll again!" : ""}` : "Roll two dice. Doubles get another go."}
      </p>
    </div>
  )
}
