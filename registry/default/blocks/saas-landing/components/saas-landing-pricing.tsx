"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

/** Prices are per month in USD; `null` means "talk to sales". */
const plans = [
  {
    name: "Starter",
    description: "For side projects and teams finding product-market fit.",
    price: { monthly: 0, yearly: 0 },
    cta: "Start for free",
    href: "#",
    features: ["Up to 10,000 monthly tracked users", "Funnels, retention and paths", "1 year of data history", "3 team members", "Community support"],
  },
  {
    name: "Growth",
    description: "For product teams that ship and learn every week.",
    price: { monthly: 59, yearly: 49 },
    cta: "Start 14-day trial",
    href: "#",
    highlighted: true,
    features: [
      "Up to 100,000 monthly tracked users",
      "5,000 session replays a month",
      "AI Insights and smart alerts",
      "Unlimited history and team members",
      "Warehouse sync",
      "Email and chat support",
    ],
  },
  {
    name: "Enterprise",
    description: "For companies with advanced security and scale needs.",
    price: null,
    cta: "Talk to sales",
    href: "#",
    features: ["Unlimited tracked users", "SSO, SCIM and audit logs", "EU or US data residency", "99.99% uptime SLA", "Dedicated success manager"],
  },
]

export function SaasLandingPricing() {
  const [billing, setBilling] = React.useState<Billing>("yearly")

  return (
    <section id="pricing" aria-labelledby="saas-landing-pricing" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-saas-primary">Pricing</p>
          <h2 id="saas-landing-pricing" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start free. Upgrade when it pays for itself.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Every plan includes unlimited events, dashboards and seats for viewers.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div role="group" aria-label="Billing period" className="inline-flex rounded-full border bg-muted/50 p-1 text-sm">
            {(["monthly", "yearly"] as const).map((period) => (
              <button
                key={period}
                type="button"
                aria-pressed={billing === period}
                onClick={() => setBilling(period)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  billing === period ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {period === "monthly" ? "Monthly" : "Yearly"}
                {period === "yearly" ? (
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">−17%</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = plan.price?.[billing]
            return (
              <li
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card p-8",
                  plan.highlighted && "border-foreground/20 shadow-xl ring-1 ring-foreground/10 lg:-my-3 lg:py-11"
                )}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  {price === undefined ? (
                    <span className="text-4xl font-semibold tracking-tight">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">${price}</span>
                      <span className="text-sm text-muted-foreground">/ month</span>
                    </>
                  )}
                </p>
                <p className="mt-1 h-5 text-xs text-muted-foreground">
                  {price === undefined
                    ? "Annual contract, invoiced"
                    : price === 0
                      ? "Free forever"
                      : billing === "yearly"
                        ? `$${price * 12} billed yearly`
                        : "Billed monthly"}
                </p>
                <Button className="mt-6" variant={plan.highlighted ? "default" : "outline"} asChild>
                  <a href={plan.href}>{plan.cta}</a>
                </Button>
                <ul className="mt-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-saas-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prices in USD, excluding tax. Startups under two years old and nonprofits get 50% off.{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-4">
            Apply here
          </a>
          .
        </p>
      </div>
    </section>
  )
}
