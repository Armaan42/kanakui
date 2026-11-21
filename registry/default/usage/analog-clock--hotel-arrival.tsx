import { BedDouble, KeyRound, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnalogClock } from "@/registry/default/ui/analog-clock"

export const meta = {
  title: "Hotel arrival page",
  description: "An analog clock showing the hotel's local time on a guest's arrival page, next to check-in details.",
}

// The hotel and booking are made up.
export default function HotelArrival() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Booking HS-20931 · 2 nights</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Welcome to Halden Stays, Lisbon</h1>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="flex flex-col items-center rounded-xl border bg-card p-6">
          <AnalogClock timeZone="Europe/Lisbon" label="Local time in Lisbon" />
        </div>
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3">
            <KeyRound aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              <span className="font-medium">Check-in from 15:00</span>
              <span className="block text-muted-foreground">Your door code arrives by text at 14:00 on the day.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <BedDouble aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              <span className="font-medium">Room 4, top floor</span>
              <span className="block text-muted-foreground">Double bed, river view, no lift. We can carry bags up for you.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              <span className="font-medium">Rua das Flores 28</span>
              <span className="block text-muted-foreground">Eight minutes on foot from the Baixa-Chiado metro.</span>
            </span>
          </li>
          <li>
            <Button>Message the host</Button>
          </li>
        </ul>
      </div>
    </div>
  )
}
