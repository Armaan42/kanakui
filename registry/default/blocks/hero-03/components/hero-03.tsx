import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DotPattern } from "@/registry/default/ui/dot-pattern"
import { Typewriter } from "@/registry/default/ui/typewriter"

/**
 * Bold centered hero with a typed, rotating keyword over a dot background.
 * Edit the fixed headline, the `words` list and the actions.
 */
export function Hero03() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <DotPattern fade className="text-foreground/20" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          The fastest way to build{" "}
          <span className="block sm:inline">
            <Typewriter words={["landing pages", "dashboards", "internal tools"]} className="text-muted-foreground" />
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          Explain in one sentence who it’s for and what they get. The rotating words above should complete that promise.
        </p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="h-10 px-5">
            Start building
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="ghost" className="h-10 px-5">
            See examples
          </Button>
        </div>
      </div>
    </section>
  )
}
