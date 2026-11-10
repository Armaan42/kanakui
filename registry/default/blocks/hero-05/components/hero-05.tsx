import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Meteors } from "@/registry/default/ui/meteors"
import { RotatingWords } from "@/registry/default/ui/rotating-words"

/** A launch-style hero inside a framed panel with falling meteors and a rotating keyword. */
export function Hero05() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-card px-6 py-20 text-center sm:py-28">
        <Meteors count={24} />
        <div className="relative mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Launch week · Day 1
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Ship <RotatingWords words={["faster", "safer", "together"]} className="text-muted-foreground" />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Tell people what launched today and why it matters to them.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-10 px-5">
              Read the announcement
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" className="h-10 px-5">
              Watch the demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
