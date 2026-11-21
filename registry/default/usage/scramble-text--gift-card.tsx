"use client"

import * as React from "react"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrambleText } from "@/registry/default/ui/scramble-text"

export const meta = {
  title: "Gift card reveal",
  description: "Scramble text decoding a gift card code when the recipient opens it, on a shop's redeem page.",
}

// The shop, sender and code are made up.
export default function GiftCard() {
  const [revealed, setRevealed] = React.useState(false)

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-6 py-12 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-muted">
        <Gift aria-hidden="true" className="size-5" />
      </span>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Jonas sent you a €50 gift card</h1>
      <p className="mt-2 text-sm text-muted-foreground">“Happy birthday! Buy yourself something nice from Halden Goods.”</p>
      <div className="mt-8 rounded-xl border border-dashed bg-card p-6">
        <p className="text-sm text-muted-foreground">Your code</p>
        {revealed ? (
          <ScrambleText as="p" trigger="mount" text="HALD-7Q4K-2XRM" className="mt-2 font-mono text-2xl font-semibold tracking-wider" />
        ) : (
          <Button className="mt-3" onClick={() => setRevealed(true)}>
            Reveal code
          </Button>
        )}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Use it at checkout. It never expires and works on sale items.</p>
    </div>
  )
}
