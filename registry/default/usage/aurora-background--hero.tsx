import { CalendarDays, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/registry/default/ui/aurora-background"

export const meta = {
  title: "Travel hero",
  description: "The aurora as a subtle backdrop behind a tour company's hero, with the text and trip details kept readable on top.",
}

// The tour company and trip are made up.
export default function AuroraHero() {
  return (
    <AuroraBackground className="bg-background">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <p className="text-sm font-medium text-muted-foreground">Tidewell Arctic Tours · Tromsø</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Four nights chasing the northern lights
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Small groups, a local guide and a minibus that drives to wherever the sky is clear. If we don&apos;t see the
          aurora, the next trip is free.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">Check dates</Button>
          <Button size="lg" variant="outline">
            See the itinerary
          </Button>
        </div>
        <dl className="mx-auto mt-12 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {[
            { icon: CalendarDays, term: "Season", value: "October to March" },
            { icon: Users, term: "Group size", value: "Up to 8 people" },
            { icon: MapPin, term: "From", value: "€1,290 per person" },
          ].map(({ icon: Icon, term, value }) => (
            <div key={term} className="rounded-lg border bg-background/70 p-4 backdrop-blur-sm">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon aria-hidden="true" className="size-4" />
                {term}
              </dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </AuroraBackground>
  )
}
