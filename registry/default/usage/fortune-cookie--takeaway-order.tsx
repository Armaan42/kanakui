"use client"

import * as React from "react"
import { Bike } from "lucide-react"

import { FortuneCookie } from "@/registry/default/ui/fortune-cookie"

export const meta = {
  title: "Takeaway order tracker",
  description: "The fortune cookie on a takeaway restaurant's order tracking page, with a little surprise while the food is on its way.",
}

// The restaurant, order and fortunes are made up.
const FORTUNES = [
  "A short walk after dinner will lead to a good idea.",
  "The person who orders extra dumplings is always right.",
  "Call someone you haven't spoken to in a while.",
  "Something you lost will turn up in a coat pocket.",
]

export default function TakeawayOrder() {
  const [fortune, setFortune] = React.useState<string | null>(null)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-start gap-3">
        <Bike aria-hidden="true" className="mt-1 size-6 shrink-0 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">On its way, about 18 minutes</h1>
          <p className="mt-1 text-muted-foreground">Golden Lantern order #2291: dumplings, mapo tofu and two bowls of rice. Your rider is Carlos.</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border bg-card p-6 text-center">
        <p className="text-sm font-medium">While you wait, crack open your cookie</p>
        <FortuneCookie className="mx-auto mt-4" fortunes={FORTUNES} onOpen={setFortune} />
        {fortune ? (
          <p className="mt-4 text-sm text-muted-foreground">A real one comes in the bag too.</p>
        ) : null}
      </div>
    </div>
  )
}
