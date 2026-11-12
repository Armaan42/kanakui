import { Button } from "@/components/ui/button"
import { BlurText } from "@/registry/default/ui/blur-text"
import { ParticleGalaxy } from "@/registry/default/ui/particle-galaxy"

/** A full-height hero over a turning particle galaxy. */
export function Hero11() {
  return (
    <section className="dark relative isolate flex min-h-[40rem] items-center overflow-hidden border-b bg-background text-foreground">
      <ParticleGalaxy className="absolute inset-0 -z-20 h-full" label="Spiral galaxy backdrop" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,color-mix(in_oklch,var(--background)_80%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <BlurText
          as="h1"
          text="Explore what you can build next"
          className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          A short promise to the people you build for. Replace it with your own.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-11 px-6">
            Start exploring
          </Button>
          <Button size="lg" variant="outline" className="h-11 bg-background/60 px-6 backdrop-blur">
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  )
}
