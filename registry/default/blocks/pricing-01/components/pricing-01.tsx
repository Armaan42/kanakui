"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { pricingPlans } from "@/registry/default/blocks/pricing-01/components/pricing-01-plans"

type Billing = "monthly" | "yearly"

/**
 * Three pricing tiers with a monthly/yearly switch. Plans live in
 * pricing-01-plans.ts. Prices are shown in USD; change `formatPrice` for
 * another currency.
 */
export function Pricing01() {
  const [billing, setBilling] = React.useState<Billing>("monthly")

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Simple, predictable pricing</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Start free, upgrade when you need more. Every plan includes all core features.
          </p>
        </div>

        <div role="group" aria-label="Billing period" className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-lg border bg-muted/50 p-1">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={billing === option}
              onClick={() => setBilling(option)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                billing === option ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option === "monthly" ? "Monthly" : "Yearly"}
              {option === "yearly" ? <span className="ml-1.5 text-xs text-emerald-600 dark:text-emerald-400">Save 20%</span> : null}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly
            return (
              <li
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-xl border bg-card p-6",
                  plan.highlighted && "border-foreground/30 shadow-sm ring-1 ring-foreground/10"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-medium text-background">Most popular</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">{formatPrice(price)}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </p>
                <p className="mt-1 h-5 text-xs text-muted-foreground">
                  {billing === "yearly" && price > 0 ? `Billed ${formatPrice(price * 12)} per year` : ""}
                </p>
                <Button className="mt-6 w-full" variant={plan.highlighted ? "default" : "outline"}>
                  {plan.cta}
                </Button>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)
}
