"use client"

import * as React from "react"
import { BedDouble, Check, Star, Waves, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WallCalendar, type CalendarSelection } from "@/registry/default/ui/wall-calendar"

// Photos: Unsplash (free under the Unsplash License). The hotel is made up.
const photo = (id: string, width: number, height: number) => `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=75`

const RATE = 240
const CLEANING = 45
const BOOKED = new Set(["2027-5-4", "2027-5-5", "2027-5-6", "2027-5-18", "2027-5-19", "2027-6-2", "2027-6-3"])
const isBooked = (date: Date) => BOOKED.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
const amenities = [
  { icon: BedDouble, text: "King bed" },
  { icon: Waves, text: "Pool access" },
  { icon: Wifi, text: "Fast Wi-Fi" },
]
const short = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })

/** A stay booking card: photos, a date range on a wall calendar and a live price. */
export function Booking01() {
  const [dates, setDates] = React.useState<CalendarSelection>({ from: new Date(2027, 5, 9), to: new Date(2027, 5, 13) })
  const [reserved, setReserved] = React.useState(false)
  const nights = dates.from && dates.to ? Math.round((dates.to.getTime() - dates.from.getTime()) / 86_400_000) : 0
  const blocked = Boolean(
    nights && Array.from({ length: nights }, (_, i) => new Date(dates.from!.getFullYear(), dates.from!.getMonth(), dates.from!.getDate() + i)).some(isBooked)
  )

  return (
    <section aria-labelledby="booking-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
        <div className="min-w-0">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
            <img src={photo("1566073771259-6a8506099945", 900, 640)} alt="A thatched villa beside a pool at sunset" className="col-span-2 row-span-2 size-full min-h-64 bg-muted object-cover" />
            <img src={photo("1582719478250-c89cae4dc85b", 420, 320)} alt="A bright bedroom opening onto trees" className="size-full bg-muted object-cover" />
            <img src={photo("1520250497591-112f2f40a3f4", 420, 320)} alt="A turquoise pool among palm trees" className="size-full bg-muted object-cover" />
          </div>
          <div className="mt-7 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="booking-01-title" className="text-3xl font-semibold tracking-tight">
                Pool Villa at Casa Palma
              </h2>
              <p className="mt-1 text-muted-foreground">Two guests · Garden side</p>
            </div>
            <p className="flex items-center gap-1 text-sm font-medium">
              <Star aria-hidden="true" className="size-4 fill-current" />
              4.9 <span className="font-normal text-muted-foreground">(212 stays)</span>
            </p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {amenities.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <item.icon aria-hidden="true" className="size-4" />
                {item.text}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            A quiet villa ten minutes from the beach, with morning shade on the terrace and the pool steps from your door.
          </p>
        </div>

        <div className="space-y-5">
          <WallCalendar
            mode="range"
            defaultMonth={new Date(2027, 5, 1)}
            selected={dates}
            onSelectedChange={(next) => {
              setDates(next)
              setReserved(false)
            }}
            isDateDisabled={isBooked}
            className="mx-auto"
          />
          <div className="rounded-xl border bg-card p-4 text-sm text-card-foreground">
            <p className="font-medium">{dates.from && dates.to ? `${short.format(dates.from)} to ${short.format(dates.to)}` : "Pick your check-out date"}</p>
            {nights > 0 ? (
              <dl className="mt-3 space-y-1.5 text-muted-foreground">
                <div className="flex justify-between">
                  <dt>
                    ${RATE} × {nights} {nights === 1 ? "night" : "nights"}
                  </dt>
                  <dd className="tabular-nums">${RATE * nights}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Cleaning</dt>
                  <dd className="tabular-nums">${CLEANING}</dd>
                </div>
                <div className="flex justify-between border-t pt-2 font-medium text-foreground">
                  <dt>Total</dt>
                  <dd className="tabular-nums">${RATE * nights + CLEANING}</dd>
                </div>
              </dl>
            ) : null}
            {blocked ? <p className="mt-3 text-destructive">Some of these nights are already booked.</p> : null}
            <Button type="button" className="mt-4 w-full" disabled={!nights || blocked} onClick={() => setReserved(true)}>
              {reserved ? <Check aria-hidden="true" className="size-4" /> : null}
              {reserved ? "Dates held" : "Reserve"}
            </Button>
            <p role="status" className="mt-2 min-h-4 text-center text-xs text-muted-foreground">
              {reserved ? "We’ll hold these dates for 24 hours." : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
