import { Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RippleBackground } from "@/registry/default/ui/ripple-background"

/** A centered call to action with an icon and pulsing rings behind it. */
export function Cta02() {
  return (
    <section className="relative overflow-hidden border-y bg-background py-24 sm:py-32">
      <RippleBackground rings={7} size={140} step={110} />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <span className="inline-flex size-12 items-center justify-center rounded-full border bg-card">
          <Rocket aria-hidden="true" className="size-5" />
        </span>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Launch in minutes, not weeks</h2>
        <p className="mt-4 text-pretty text-muted-foreground">Everything you need to go live today. Free to start.</p>
        <Button size="lg" className="mt-8 h-10 px-6">
          Get started for free
        </Button>
      </div>
    </section>
  )
}
