"use client"

import * as React from "react"
import { Gift } from "lucide-react"

import { ClawMachine } from "@/registry/default/ui/claw-machine"

export const meta = {
  title: "Toy shop prize game",
  description: "The claw machine on a toy shop's website: win a capsule and the matching enamel pin is added to your order for free.",
}

// The shop and offer are made up.
export default function ToyShopGame() {
  const [prize, setPrize] = React.useState<string | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <ClawMachine className="mx-auto" credits={3} grip={0.6} onWin={setPrize} />
      <div>
        <p className="text-sm text-muted-foreground">Paperkite Toys · This week only</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Grab a free enamel pin</h1>
        <p className="mt-2 text-muted-foreground">
          Three tries. Catch a capsule and we&apos;ll pop the matching pin in with your order. Steer with the arrows, then press Drop.
        </p>
        <div role="status" className="mt-6 flex items-start gap-3 rounded-xl border bg-card p-5">
          <Gift aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          {prize ? (
            <p className="text-sm">
              <span className="font-medium">You won the {prize.toLowerCase()} pin.</span> It&apos;s been added to your basket at no cost.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">One prize per order. Pins are 25 mm, with a rubber back.</p>
          )}
        </div>
      </div>
    </div>
  )
}
