"use client"

import * as React from "react"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PrizeWheel, type WheelSegment } from "@/registry/default/ui/prize-wheel"

const segments: WheelSegment[] = [
  { label: "10% off", color: "#f43f5e" },
  { label: "Free tote", color: "#f59e0b" },
  { label: "5% off", color: "#10b981" },
  { label: "Free ship", color: "#3b82f6" },
  { label: "20% off", color: "#a855f7" },
  { label: "Sticker", color: "#14b8a6" },
  { label: "15% off", color: "#ec4899" },
  { label: "Mystery", color: "#6366f1" },
]

const rules = ["One spin per person, this weekend only.", "Prizes apply to orders over $30.", "Your code arrives by email and lasts 14 days."]

/** A spin-to-win giveaway: the wheel, the rules, and an email form to claim the prize. */
export function Giveaway01() {
  const [prize, setPrize] = React.useState<string | null>(null)
  const [claimed, setClaimed] = React.useState(false)
  const id = React.useId()

  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_30%_40%,rgb(244_63_94/0.12),transparent),radial-gradient(50%_50%_at_80%_60%,rgb(99_102_241/0.12),transparent)]" />
      <div className="mx-auto grid max-w-5xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex justify-center">
          <PrizeWheel className="w-[min(22rem,calc(100vw-3rem))]" segments={segments} onResult={(s) => setPrize(s.label)} />
        </div>

        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400">
            <Gift aria-hidden="true" className="size-4" /> Weekend giveaway
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Spin to win something nice.
          </h2>
          <p className="mt-4 text-muted-foreground">Every spin wins: discounts, free shipping or a little extra in your next box.</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-500" />
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
