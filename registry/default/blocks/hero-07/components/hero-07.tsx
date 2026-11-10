import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ParticleWave } from "@/registry/default/ui/particle-wave"

/** Centered hero over a rolling 3D particle wave (WebGL). Copy and actions are placeholders. */
export function Hero07() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <ParticleWave className="absolute inset-x-0 bottom-0 h-80 text-muted-foreground" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-background/40 to-transparent" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-48 text-center sm:px-6 sm:pt-32 sm:pb-56">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Signals from every corner of your product</h1>
        <p className="mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          One sentence about what your product measures and why it matters to the people using it.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="h-10 px-5">
            Start tracking
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" className="h-10 px-5">
            Live demo
          </Button>
        </div>
      </div>
    </section>
  )
}
