import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/registry/default/ui/border-beam"

const included = [
  "Every component and block",
  "All future updates",
  "Use in unlimited projects",
  "Figma source files",
  "Priority email support",
  "Commercial license",
]

/** A single plan: one price, one action, everything included. The card has a moving border. */
export function Pricing03() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative mx-auto grid max-w-4xl overflow-hidden rounded-2xl border bg-card md:grid-cols-[1.4fr_1fr]">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">One plan. Everything included.</h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Pay once and get lifetime access. Replace this text with what your plan really includes.
            </p>
            <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 border-t bg-muted/40 p-8 text-center md:border-t-0 md:border-l">
            <p className="text-sm font-medium text-muted-foreground">Lifetime access</p>
            <p className="flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight">$149</span>
              <span className="text-sm text-muted-foreground">USD</span>
            </p>
            <Button size="lg" className="h-10 w-full max-w-60">
              Get access
            </Button>
            <p className="text-xs text-muted-foreground">One-time payment. 14-day refund.</p>
          </div>
          <BorderBeam duration="9s" />
        </div>
      </div>
    </section>
  )
}
