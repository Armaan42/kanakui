import { Button } from "@/components/ui/button"
import { BeamRain } from "@/registry/default/ui/beam-rain"

/** A closing call to action on a dark panel where beams fall and burst into sparks. */
export function Cta05() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="dark relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-background px-6 pt-20 pb-24 text-center text-foreground sm:pt-24 sm:pb-28">
        <BeamRain />
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">Ready when you are</h2>
          <p className="mt-4 text-pretty text-muted-foreground">Start free and upgrade when you need more. Replace with your own offer.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-6">
              Get started
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-6">
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
