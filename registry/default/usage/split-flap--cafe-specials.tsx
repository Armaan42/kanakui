"use client"

import * as React from "react"

import { SplitFlap } from "@/registry/default/ui/split-flap"

export const meta = {
  title: "Café specials board",
  description: "Split-flap displays as a café's specials board on its website, flipping to the next dish every few seconds.",
}

// The café, dishes and prices are made up.
const SPECIALS = [
  { dish: "SQUASH SOUP", price: "6.50" },
  { dish: "FRENCH TOAST", price: "8.00" },
  { dish: "GRAIN BOWL", price: "9.50" },
  { dish: "COLD BREW", price: "3.80" },
]

export default function CafeSpecials() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SPECIALS.length), 4000)
    return () => clearInterval(id)
  }, [])

  const special = SPECIALS[index]

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-sm text-muted-foreground">Kiln Corner Café · Rua das Flores 12</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Today&apos;s specials</h1>
      <div className="mt-8 rounded-2xl bg-[#14130f] p-6 shadow-lg" aria-label={`Special: ${special.dish.toLowerCase()}, €${special.price}`} role="img">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SplitFlap value={special.dish} length={12} className="text-lg sm:text-2xl" />
          <SplitFlap value={special.price} length={5} className="text-lg sm:text-2xl" />
        </div>
      </div>
      <dl className="mt-8 grid gap-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Open</dt>
          <dd className="mt-1">Mon–Sat, 8:00–17:00</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Kitchen closes</dt>
          <dd className="mt-1">15:30</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Booking</dt>
          <dd className="mt-1">Walk-ins only</dd>
        </div>
      </dl>
    </section>
  )
}
