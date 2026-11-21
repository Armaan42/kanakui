"use client"

import * as React from "react"

import { CoinFlip } from "@/registry/default/ui/coin-flip"

export const meta = {
  title: "Team chat decision",
  description: "The coin flip as a small app inside a team chat, settling who picks the Friday lunch spot.",
}

// The team and messages are made up.
export default function TeamLunch() {
  const [result, setResult] = React.useState<"heads" | "tails" | null>(null)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-muted-foreground"># lunch · Northlight</p>
      <ul className="mt-4 space-y-4 text-sm">
        <li>
          <p className="font-medium">Priya Raman</p>
          <p className="text-muted-foreground">Design picked last week. It&apos;s engineering&apos;s turn.</p>
        </li>
        <li>
          <p className="font-medium">Jonas Keller</p>
          <p className="text-muted-foreground">We had the noodle place, that doesn&apos;t count. Flip for it?</p>
        </li>
      </ul>
      <div className="mt-6 rounded-xl border bg-card p-6">
        <p className="text-sm font-medium">Who picks Friday lunch?</p>
        <CoinFlip className="mx-auto mt-4" heads="Design" tails="Engineering" onFlip={setResult} />
      </div>
      {result ? (
        <p role="status" className="mt-4 text-sm">
          <span className="font-medium">{result === "heads" ? "Design" : "Engineering"} picks.</span>{" "}
          <span className="text-muted-foreground">Post your suggestion by Thursday noon.</span>
        </p>
      ) : null}
    </div>
  )
}
