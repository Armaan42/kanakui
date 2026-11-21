"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { WallCalendar, type CalendarSelection } from "@/registry/default/ui/wall-calendar"

export const meta = {
  title: "Cabin booking",
  description: "The wall calendar picking a date range on a holiday rental page; booked nights are disabled and the price updates.",
}

// Sample photos. Swap in your own. The cabin, prices and bookings are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=360&fit=crop&auto=format&q=75`
const PHOTOS = [
  { src: photo("1542718610-a1d656d1884c"), alt: "A dark timber cabin on a hillside above a valley at sunset" },
  { src: photo("1449158743715-0a90ebb6d2d8"), alt: "A small log hut among tall pine trees" },
]
const NIGHTLY = 140
// Nights already booked in March 2027.
const BOOKED = new Set([5, 6, 7, 19, 20])

export default function CabinBooking() {
  const [selection, setSelection] = React.useState<CalendarSelection>({ from: null, to: null })
  const nights = selection.from && selection.to ? Math.round((selection.to.getTime() - selection.from.getTime()) / 86_400_000) : 0

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Mountain cabin · choose your dates</h1>
        <p className="mt-1 text-sm text-muted-foreground">Two nights minimum. Greyed-out dates are already booked.</p>
        <WallCalendar
          className="mt-6"
          mode="range"
          defaultMonth={new Date(2027, 2, 1)}
          photos={PHOTOS}
          weekStartsOn={1}
          locale="en-GB"
          onSelectedChange={setSelection}
          isDateDisabled={(date) => date.getMonth() === 2 && BOOKED.has(date.getDate())}
        />
      </div>
      <aside aria-labelledby="price" className="h-fit rounded-xl border bg-card p-5">
        <h2 id="price" className="font-medium">
          €{NIGHTLY} <span className="font-normal text-muted-foreground">a night</span>
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Nights</dt>
            <dd className="tabular-nums">{nights || "–"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Cleaning</dt>
            <dd className="tabular-nums">€40</dd>
          </div>
          <div className="flex justify-between border-t pt-2 font-medium">
            <dt>Total</dt>
            <dd className="tabular-nums">{nights ? `€${nights * NIGHTLY + 40}` : "–"}</dd>
          </div>
        </dl>
        <Button className="mt-5 w-full" disabled={nights < 2}>
          {nights >= 2 ? `Request ${nights} nights` : "Pick at least two nights"}
        </Button>
      </aside>
    </div>
  )
}
