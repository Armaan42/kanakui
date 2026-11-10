import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GridPattern } from "@/registry/default/ui/grid-pattern"

/** A boxed call to action with a faded grid background and two actions. */
export function Cta01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center sm:px-12">
          <GridPattern fade size={28} highlight={[[2, 1], [5, 3], [9, 2], [14, 1]]} className="text-foreground/[0.08]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Ready to ship your next page?</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Start free. Upgrade when your project grows. Cancel any time.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="h-10 px-5">
                Create an account
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" className="h-10 px-5">
                Talk to sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
