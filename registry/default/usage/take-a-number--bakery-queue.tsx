"use client"

import * as React from "react"

import { TakeANumber } from "@/registry/default/ui/take-a-number"

export const meta = {
  title: "Bakery counter queue",
  description: "The take-a-number machine on a bakery's order screen: customers pull a ticket and see how long the wait is.",
}

// The bakery and wait times are made up.
const SERVING = 41

export default function BakeryQueue() {
  const [ticket, setTicket] = React.useState<number | null>(null)
  const ahead = ticket === null ? 0 : ticket - SERVING

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <TakeANumber serving={SERVING} nextTicket={44} sound={false} onTake={setTicket} className="mx-auto" />
      <div>
        <p className="text-sm text-muted-foreground">Halden Bakery · Rua do Almada</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Take a number, we&apos;ll call you</h1>
        <p className="mt-2 text-muted-foreground">Bread and pastries at the front counter. Cakes to order at the end, ask for Inês.</p>
        <div role="status" className="mt-6 rounded-xl border bg-card p-5">
          {ticket === null ? (
            <p className="text-muted-foreground">About 2 minutes per customer. Fresh pastries come out at 7am and 11am.</p>
          ) : (
            <>
              <p className="text-lg font-semibold">Your number is {ticket}</p>
              <p className="mt-1 text-muted-foreground">
                {ahead} {ahead === 1 ? "person" : "people"} ahead of you, roughly {ahead * 2} minutes.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
