import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GridPattern } from "@/registry/default/ui/grid-pattern"

export const meta = {
  title: "Developer tool hero",
  description: "A faded grid pattern with a few highlighted cells behind a developer tool's hero and its install command.",
}

// The tool is made up.
export default function DeveloperHero() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24">
      <GridPattern fade highlight={[[4, 2], [9, 1], [14, 3], [6, 5], [17, 6]]} />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm text-muted-foreground">Ridgeway Queue · open source</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Background jobs that retry themselves</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Add a job in one line. Failed jobs back off, retry and land in a dead-letter queue you can replay from the dashboard.
        </p>
        <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-3 rounded-lg border bg-background/80 px-4 py-2.5 font-mono text-sm backdrop-blur">
          <span>
            <span className="text-muted-foreground">$ </span>npm install ridgeway-queue
          </span>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            Read the quickstart
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline">
            View examples
          </Button>
        </div>
      </div>
    </section>
  )
}
