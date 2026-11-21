import { CalendarDays, MapPin, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Meteors } from "@/registry/default/ui/meteors"

export const meta = {
  title: "Stargazing night",
  description: "Meteors falling behind the hero of an observatory's stargazing night, kept faint so the details stay readable.",
}

// The observatory and event are made up.
export default function StargazingEvent() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background px-6 py-24 text-foreground">
      <Meteors count={24} />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm text-muted-foreground">Ridgeway Observatory · public night</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Watch the Geminids from the hill</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Telescopes, hot chocolate and an astronomer on hand to point things out. Up to 100 meteors an hour at the peak, if the sky stays clear.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="size-4 text-muted-foreground" />
            Sat 13 December, 21:00
          </li>
          <li className="flex items-center gap-2">
            <Moon aria-hidden="true" className="size-4 text-muted-foreground" />
            Thin crescent moon
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 text-muted-foreground" />
            Upper car park
          </li>
        </ul>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg">Book free tickets</Button>
          <Button size="lg" variant="outline">
            What to bring
          </Button>
        </div>
      </div>
    </section>
  )
}
