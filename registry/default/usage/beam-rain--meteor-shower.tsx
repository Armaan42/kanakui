import { CalendarPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BeamRain } from "@/registry/default/ui/beam-rain"

export const meta = {
  title: "Meteor shower watch party",
  description: "Beam rain as the falling-stars backdrop of an observatory's event page for a meteor shower night.",
}

// The observatory and event are made up.
export default function MeteorShower() {
  return (
    <div className="dark bg-background text-foreground">
      <section className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden px-6 py-20 text-center">
        <BeamRain colors={["rgb(148 163 184 / 0)", "#e0f2fe"]} />
        <div className="max-w-xl">
          <p className="text-sm text-muted-foreground">Ridgeway Observatory · Public night</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Watch the Geminids from the hill</h1>
          <p className="mt-3 text-muted-foreground">
            Saturday 12 December, from 9pm. Bring a blanket; we&apos;ll bring telescopes, hot chocolate and someone who knows the sky.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button>Book a free place</Button>
            <Button variant="outline">
              <CalendarPlus aria-hidden="true" />
              Add to calendar
            </Button>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-3xl gap-6 border-t px-6 py-10 text-sm sm:grid-cols-3">
        <div>
          <p className="font-medium">Getting here</p>
          <p className="mt-1 text-muted-foreground">Shuttle from the village square every 30 minutes.</p>
        </div>
        <div>
          <p className="font-medium">If it&apos;s cloudy</p>
          <p className="mt-1 text-muted-foreground">We move to the planetarium dome. We&apos;ll text you by 6pm.</p>
        </div>
        <div>
          <p className="font-medium">Children</p>
          <p className="mt-1 text-muted-foreground">Welcome. Under 12s stay with an adult.</p>
        </div>
      </div>
    </div>
  )
}
