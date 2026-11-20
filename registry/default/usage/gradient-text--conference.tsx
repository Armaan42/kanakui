import { CalendarDays, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GradientText } from "@/registry/default/ui/gradient-text"

export const meta = {
  title: "Conference page",
  description: "Gradient text on a single word of a conference hero, with the event details and schedule doing the rest of the work.",
}

// The conference, speakers and venue are made up.
const SCHEDULE = [
  { time: "09:30", title: "Designing for slow internet", speaker: "Mei Lin" },
  { time: "11:00", title: "What we learned shipping a design system to 40 teams", speaker: "Jonas Keller" },
  { time: "14:00", title: "Accessible motion, in practice", speaker: "Priya Natarajan" },
  { time: "16:00", title: "Panel: small studios, big clients", speaker: "Four studio leads" },
]

export default function Conference() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Halden Design Week, in <GradientText colors={["#c2410c", "#be185d", "#7c3aed"]}>Lisbon</GradientText>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">Two days of talks and workshops on interface design, for 400 people in a former tram depot.</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="size-4 text-muted-foreground" />
            14–15 May 2027
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 text-muted-foreground" />
            The Old Tram Depot, Lisbon
          </li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">Get a ticket · €240</Button>
          <Button size="lg" variant="outline">
            Apply to speak
          </Button>
        </div>
      </section>
      <section aria-labelledby="day-one" className="mt-14">
        <h2 id="day-one" className="font-semibold">
          Day one
        </h2>
        <ol className="mt-3 divide-y border-y">
          {SCHEDULE.map((talk) => (
            <li key={talk.time} className="flex gap-6 py-3 text-sm">
              <span className="w-12 shrink-0 text-muted-foreground tabular-nums">{talk.time}</span>
              <span>
                <span className="block font-medium">{talk.title}</span>
                <span className="text-muted-foreground">{talk.speaker}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
