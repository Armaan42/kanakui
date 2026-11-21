"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { GumballMachine } from "@/registry/default/ui/gumball-machine"

export const meta = {
  title: "Sweet shop pick-a-flavour",
  description: "The gumball machine on a sweet shop's site: turn the crank for a free flavour to add to your order.",
}

// The shop and flavours are made up.
const FLAVOURS = [
  { name: "Sour cherry", value: "#c2342c" },
  { name: "Blood orange", value: "#de7a33" },
  { name: "Lemon sherbet", value: "#e6c25a" },
  { name: "Garden mint", value: "#9bc4a4" },
  { name: "Blueberry", value: "#5f7fa6" },
]

export default function SweetShop() {
  const [won, setWon] = React.useState<string | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <GumballMachine className="mx-auto" count={30} colors={FLAVOURS} onDispense={(gumball) => setWon(gumball.name)} />
      <div>
        <p className="text-sm text-muted-foreground">Halden Sweets · Since 1962</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">A free flavour with every order</h1>
        <p className="mt-2 text-muted-foreground">Turn the crank and we&apos;ll add a bag of whichever flavour drops out. One turn per order.</p>
        <div role="status" className="mt-6 rounded-xl border bg-card p-5 text-sm">
          {won ? (
            <>
              <p className="font-medium">{won}. Good choice.</p>
              <p className="mt-1 text-muted-foreground">A 100 g bag has been added to your basket for free.</p>
            </>
          ) : (
            <p className="text-muted-foreground">Five flavours, all made in our kitchen.</p>
          )}
        </div>
        <Button className="mt-4" variant="outline" disabled={!won}>
          Go to basket
        </Button>
      </div>
    </div>
  )
}
