"use client"

import * as React from "react"

import { Dartboard } from "@/registry/default/ui/dartboard"

export const meta = {
  title: "Darts league scorer",
  description: "The dartboard in a local darts league's scoring app, keeping a log of each throw in the leg.",
}

// The league and players are made up.
export default function DartsLeague() {
  const [throws, setThrows] = React.useState<{ score: number; label: string }[]>([])

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-start gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <Dartboard className="mx-auto" start={301} onThrow={(score, label) => setThrows((list) => [{ score, label }, ...list])} />
      <div>
        <p className="text-sm text-muted-foreground">Ridgeway Thursday League · Week 9</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Leg 2: Mei Lin to throw</h1>
        <p className="mt-2 text-muted-foreground">301, double out. Mei leads the match 1–0 against Tomás.</p>
        <h2 className="mt-6 text-sm font-medium">This leg</h2>
        <ol className="mt-2 divide-y border-y text-sm">
          {throws.length === 0 ? (
            <li className="py-3 text-muted-foreground">No darts thrown yet. Click the board to throw.</li>
          ) : (
            throws.slice(0, 6).map((t, i) => (
              <li key={throws.length - i} className="flex justify-between py-3">
                <span>Dart {throws.length - i}</span>
                <span className="tabular-nums">
                  {t.label} · {t.score}
                </span>
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  )
}
