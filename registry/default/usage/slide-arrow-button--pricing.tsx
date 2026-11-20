"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { SlideArrowButton } from "@/registry/default/ui/slide-arrow-button"

export const meta = {
  title: "Pricing section",
  description: "Slide arrow buttons as plan calls to action in a pricing section with a monthly and yearly toggle and a highlighted plan.",
}

// The product and prices are made up.
const PLANS = [
  { name: "Starter", monthly: 0, yearly: 0, blurb: "For one person trying it out.", features: ["3 projects", "Basic analytics", "Community help"] },
  { name: "Team", monthly: 24, yearly: 19, blurb: "For teams shipping every week.", features: ["Unlimited projects", "Automations", "Shared dashboards", "Email support"], popular: true },
  { name: "Business", monthly: 59, yearly: 49, blurb: "For companies with compliance needs.", features: ["Everything in Team", "SSO and audit log", "Data residency", "Priority support"] },
]

export default function Pricing() {
  const [yearly, setYearly] = React.useState(true)

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple pricing for Northlight</h2>
        <p className="mt-3 text-muted-foreground">Per person, per month. Change or cancel any time.</p>
        <div role="group" aria-label="Billing period" className="mt-6 inline-flex rounded-lg border p-1 text-sm">
          {[false, true].map((isYearly) => (
            <button
              key={String(isYearly)}
              type="button"
              aria-pressed={yearly === isYearly}
              onClick={() => setYearly(isYearly)}
              className={cn(
                "rounded-md px-3 py-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                yearly === isYearly ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isYearly ? "Yearly · save 20%" : "Monthly"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div key={plan.name} className={cn("flex flex-col rounded-2xl border bg-card p-6", plan.popular && "border-foreground shadow-lg")}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{plan.name}</h3>
              {plan.popular ? <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs text-background">Most popular</span> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
            <p className="mt-6">
              <span className="text-4xl font-semibold tabular-nums">${yearly ? plan.yearly : plan.monthly}</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <SlideArrowButton className="mt-8 w-full justify-center">{plan.monthly === 0 ? "Start for free" : `Choose ${plan.name}`}</SlideArrowButton>
          </div>
        ))}
      </div>
    </section>
  )
}
