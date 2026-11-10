import { GradientText } from "@/registry/default/ui/gradient-text"
import { RetroGrid } from "@/registry/default/ui/retro-grid"
import { SlideArrowButton } from "@/registry/default/ui/slide-arrow-button"

/** Centered hero over a receding retro grid, with a gradient headline and one action. */
export function Hero04() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <RetroGrid />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36">
        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          <GradientText>Build the future</GradientText>
        </h1>
        <p className="mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          A short, confident line about what you make. One sentence is plenty here.
        </p>
        <SlideArrowButton className="mt-10">Join the waitlist</SlideArrowButton>
      </div>
    </section>
  )
}
