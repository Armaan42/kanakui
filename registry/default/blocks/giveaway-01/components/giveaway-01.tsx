"use client"

import * as React from "react"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PrizeWheel, type WheelSegment } from "@/registry/default/ui/prize-wheel"

const segments: WheelSegment[] = [
  { label: "10% off", color: "#1f1f22" },
  { label: "Free tote", color: "#f2ede3" },
  { label: "5% off", color: "#1f1f22" },
  { label: "Free ship", color: "#f2ede3" },
  { label: "20% off", color: "#e2531b" },
  { label: "Stickers", color: "#f2ede3" },
  { label: "15% off", color: "#1f1f22" },
  { label: "Mystery", color: "#f2ede3" },
]

const rules = ["One spin per person, this weekend only.", "Prizes apply to orders over $30.", "Your code arrives by email and lasts 14 days."]

/** A spin-to-win giveaway: the wheel, the rules, and an email form to claim the prize. */
export function Giveaway01() {
  const [prize, setPrize] = React.useState<string | null>(null)
  const [claimed, setClaimed] = React.useState(false)
  const id = React.useId()

  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate overflow-hidden py-24 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex justify-center">
          <PrizeWheel className="w-[min(22rem,calc(100vw-3rem))]" segments={segments} onResult={(s) => setPrize(s.label)} />
        </div>

        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-400">
            <Gift aria-hidden="true" className="size-4" /> Weekend giveaway
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Spin to win something nice.
          </h2>
          <p className="mt-4 text-muted-foreground">Every spin wins: discounts, free shipping or a little extra in your next box.</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-600" />
                {rule}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border bg-card p-5">
            {claimed ? (
              <p role="status" className="text-sm">
                Done! Your <strong>{prize}</strong> code is on its way to your inbox.
              </p>
            ) : prize ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setClaimed(true)
                }}
              >
                <label htmlFor={`${id}-email`} className="text-sm font-medium">
                  You won <strong>{prize}</strong>! Where should we send it?
                </label>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Input id={`${id}-email`} type="email" required autoComplete="email" placeholder="you@example.com" />
                  <Button type="submit">Claim prize</Button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground">Press Spin on the wheel to see what you win.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
