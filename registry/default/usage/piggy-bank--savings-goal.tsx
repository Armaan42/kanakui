"use client"

import * as React from "react"

import { PiggyBank } from "@/registry/default/ui/piggy-bank"

export const meta = {
  title: "Kids' savings goal",
  description: "The piggy bank in a family banking app, where a child saves towards a goal and the recent deposits update.",
}

// The bank, child and goal are made up.
export default function SavingsGoal() {
  const [deposits, setDeposits] = React.useState<number[]>([])

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-12 md:grid-cols-2">
      <PiggyBank
        goal={60}
        currency="€"
        sound={false}
        // onSave gives the new total; the deposit is the difference from the running sum.
        onSave={(next) => setDeposits((list) => [...list, next - list.reduce((sum, value) => sum + value, 0)])}
      />
      <div>
        <p className="text-sm text-muted-foreground">Brightwater Kids · Leo&apos;s account</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Saving for a skateboard</h1>
        <p className="mt-2 text-muted-foreground">Leo drops coins in when he gets pocket money. Grandparents can add to it too.</p>
        <h2 className="mt-8 text-sm font-medium">This month</h2>
        <ul className="mt-2 divide-y border-y text-sm">
          {deposits.length === 0 ? (
            <li className="py-3 text-muted-foreground">No deposits yet.</li>
          ) : (
            deposits
              .slice(-4)
              .reverse()
              .map((value, i) => (
                <li key={`${deposits.length}-${i}`} className="flex justify-between py-3">
                  <span>Coin added</span>
                  <span className="tabular-nums">+€{value}</span>
                </li>
              ))
          )}
        </ul>
      </div>
    </div>
  )
}
