import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/registry/default/ui/aurora-background"
import { Sparkles } from "@/registry/default/ui/sparkles"

/** A call to action over a soft aurora with a sparkling keyword. */
export function Cta04() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <AuroraBackground className="mx-auto max-w-6xl rounded-2xl border bg-card">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Make your launch <Sparkles>shine</Sparkles>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">Everything you need for launch day, in one place.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-10 px-6">
              Get started
            </Button>
            <Button size="lg" variant="outline" className="h-10 bg-background/60 px-6">
              See pricing
            </Button>
          </div>
        </div>
      </AuroraBackground>
    </section>
  )
}
