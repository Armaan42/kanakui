"use client"

import * as React from "react"

import { PostageStamp } from "@/registry/default/ui/postage-stamp"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=420&h=525&fit=crop&auto=format&q=75`

const places = [
  { title: "Paris", country: "France", value: "€1.40", date: "03 MAY 26", image: photo("1502602898657-3e91760cbb34"), alt: "The Eiffel Tower above the Seine at dusk", tilt: "-rotate-2" },
  { title: "Santorini", country: "Greece", value: "€1.10", date: "19 JUN 26", image: photo("1533105079780-92b9be482077"), alt: "White houses and steps above a blue sea", tilt: "rotate-1" },
  { title: "Venice", country: "Italy", value: "€1.30", date: "27 JUN 26", image: photo("1523906834658-6e24ef2386f9"), alt: "The Rialto Bridge over the Grand Canal", tilt: "rotate-2" },
  { title: "Kyoto", country: "Japan", value: "¥110", date: "08 APR 26", image: photo("1493976040374-85c8e12f0c0e"), alt: "A pagoda at the end of an old street in Kyoto", tilt: "-rotate-1" },
  { title: "Dubai", country: "UAE", value: "5 AED", date: "14 FEB 26", image: photo("1512453979798-5ea266f8880c"), alt: "The Dubai skyline and motorways at sunrise", tilt: "rotate-1" },
  { title: "Tokyo", country: "Japan", value: "¥140", date: "11 APR 26", image: photo("1540959733332-eab4deabeeaf"), alt: "A neon-lit shopping street in Tokyo at night", tilt: "-rotate-2" },
]

/** A travel collection: press each stamp to postmark the places you've been. */
export function Destinations01() {
  const [visited, setVisited] = React.useState(["Kyoto", "Tokyo"])

  return (
    <section aria-labelledby="destinations-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm text-muted-foreground">The travel album</p>
            <h2 id="destinations-01-title" className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Collect the places you’ve been
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">Press a stamp to postmark it. Your album keeps count.</p>
          </div>
          <p aria-live="polite" className="font-mono text-sm text-muted-foreground tabular-nums">
            {visited.length} of {places.length} visited
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-2 justify-items-center gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {places.map((place) => (
            <li key={place.title} className={place.tilt}>
              <PostageStamp
                src={place.image}
                alt={place.alt}
                title={place.title}
                country={place.country}
                value={place.value}
                postmark={{ place: place.title, date: place.date }}
                cancelled={visited.includes(place.title)}
                onCancelledChange={(cancelled) =>
                  setVisited((current) => (cancelled ? [...current, place.title] : current.filter((name) => name !== place.title)))
                }
                className="w-40 lg:w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
