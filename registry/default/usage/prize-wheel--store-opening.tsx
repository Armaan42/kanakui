"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { PrizeWheel } from "@/registry/default/ui/prize-wheel"

export const meta = {
  title: "Shop opening day",
  description: "The prize wheel on a shop's opening-day kiosk page: one spin per customer, with the prize to claim at the till.",
}

// The shop and prizes are made up.
const SEGMENTS = [
  { label: "Free coffee", color: "#1f1f22" },
  { label: "10% off", color: "#f2ede3" },
  { label: "Tote bag", color: "#1f1f22" },
  { label: "5% off", color: "#f2ede3" },
  { label: "€20 voucher", color: "#e2531b" },
  { label: "Postcards", color: "#f2ede3" },
]

export default function StoreOpening() {
  const [prize, setPrize] = React.useState<string | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-12 md:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Halden Goods · Porto · opening day</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Spin once, on the house</h1>
        <p className="mt-3 text-muted-foreground">Every customer today gets a spin, whether or not you buy anything. Show the prize at the till.</p>
        {prize ? (
          <div role="status" className="mt-6 rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">You won</p>
            <p className="text-xl font-semibold">{prize}</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setPrize(null)}>
              Next customer
            </Button>
          </div>
        ) : null}
      </div>
      <PrizeWheel className="mx-auto w-[min(20rem,calc(100vw-3rem))]" segments={SEGMENTS} onResult={(segment) => setPrize(segment.label)} />
    </div>
  )
}
