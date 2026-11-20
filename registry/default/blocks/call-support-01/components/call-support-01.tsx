"use client"

import * as React from "react"
import { Clock, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { RotaryPhone } from "@/registry/default/ui/rotary-phone"

// The company, lines and hours are made up. 555-01xx numbers are reserved for fiction.
const LINES = [
  { digit: "1", name: "Sales", hours: "Mon–Fri, 9:00–18:00", phone: "+1 (555) 010-2201", about: "Pricing, demos and plans for larger teams." },
  { digit: "2", name: "Support", hours: "Every day, 8:00–22:00", phone: "+1 (555) 010-2202", about: "Something broken or confusing in the app." },
  { digit: "3", name: "Billing", hours: "Mon–Fri, 9:00–17:00", phone: "+1 (555) 010-2203", about: "Invoices, refunds and changing your card." },
  { digit: "0", name: "Operator", hours: "Mon–Fri, 9:00–17:00", phone: "+1 (555) 010-2200", about: "Not sure who you need? Start here." },
]

/** A contact section where visitors dial a department on a rotary phone. */
export function CallSupport01() {
  const [digit, setDigit] = React.useState<string | null>(null)
  const line = LINES.find((item) => item.digit === digit)

  return (
    <section aria-labelledby="call-support-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div>
          <h2 id="call-support-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Talk to a person
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Dial the line you need. Every call is answered by someone on our team in Lisbon, not a menu.
          </p>

          <ul className="mt-8 divide-y rounded-xl border">
            {LINES.map((item) => (
              <li
                key={item.digit}
                aria-current={item.digit === digit ? "true" : undefined}
                className="flex items-start gap-4 p-4 transition-colors aria-current:bg-muted"
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border font-serif text-lg font-bold",
                    item.digit === digit && "border-transparent bg-red-700 text-white"
                  )}
                >
                  {item.digit}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.about}</p>
                </div>
                <p className="hidden shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <Clock aria-hidden="true" className="size-3.5" />
                  {item.hours}
                </p>
              </li>
            ))}
          </ul>

          <div aria-live="polite" className="mt-6 min-h-24 rounded-xl bg-muted/50 p-4 text-sm">
            {line ? (
              <>
                <p className="font-medium">
                  {line.name} is on line {line.digit}.
                </p>
                <p className="mt-1 text-muted-foreground">Open {line.hours}. From your own phone, call:</p>
                <a
                  href={`tel:${line.phone.replace(/[^+\d]/g, "")}`}
                  className="mt-2 inline-flex items-center gap-2 rounded-md font-mono font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {line.phone}
                </a>
              </>
            ) : digit ? (
              <p>There’s no line on {digit}. Try 1, 2, 3 or 0.</p>
            ) : (
              <p className="text-muted-foreground">Dial a number on the phone to see who answers and when.</p>
            )}
          </div>
        </div>

        <RotaryPhone
          className="mx-auto"
          onNumberChange={(number) => setDigit(number.slice(-1) || null)}
        />
      </div>
    </section>
  )
}
