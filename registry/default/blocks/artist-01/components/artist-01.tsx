"use client"

import * as React from "react"
import { AudioLines } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VinylPlayer } from "@/registry/default/ui/vinyl-player"

// Cover: Unsplash (free under the Unsplash License). The artist, album and shows are made up.
const COVER = "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop&auto=format&q=80"

const tracks = [
  { title: "Tidal Bloom", length: "3:34" },
  { title: "Glass Harbour", length: "4:02" },
  { title: "Slow Signal", length: "3:18" },
  { title: "Paper Lanterns", length: "4:45" },
  { title: "Undertow", length: "3:51" },
  { title: "Last Light Over Lisbon", length: "5:12" },
]

const shows = [
  { date: "14 Mar", day: "Sat", city: "London", venue: "The Roundhouse", status: "few-left" },
  { date: "18 Mar", day: "Wed", city: "Paris", venue: "La Cigale", status: "on-sale" },
  { date: "21 Mar", day: "Sat", city: "Berlin", venue: "Columbia Theater", status: "sold-out" },
  { date: "25 Mar", day: "Wed", city: "Amsterdam", venue: "Paradiso", status: "on-sale" },
] as const

/** An artist section: the record on a turntable, the tracklist and upcoming shows. */
export function Artist01() {
  const [playing, setPlaying] = React.useState(false)

  return (
    <section aria-labelledby="artist-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="lg:sticky lg:top-24">
          <VinylPlayer
            className="mx-auto"
            title="Tidal Bloom"
            artist="Mara Lune"
            cover={{ src: COVER, alt: "Album cover: swirls of pink and teal paint" }}
            playing={playing}
            onPlayingChange={setPlaying}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">New album · out now</p>
          <h2 id="artist-01-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Mara Lune: Tidal Bloom
          </h2>
          <p className="mt-4 max-w-prose leading-7 text-muted-foreground">
            Recorded over one winter in a converted boathouse, <em>Tidal Bloom</em> is Mara’s warmest record yet: tape
            loops, a borrowed upright piano and the sea, always somewhere in the mix.
          </p>

          <h3 className="mt-10 text-sm font-semibold">Tracklist</h3>
          <ol className="mt-3 divide-y rounded-xl border">
            {tracks.map((track, index) => {
              const current = playing && index === 0
              return (
                <li key={track.title} className={cn("flex items-center gap-4 px-4 py-3 text-sm", current && "bg-muted/60")}>
                  <span className="w-5 font-mono text-xs text-muted-foreground tabular-nums">
                    {current ? <AudioLines aria-label="Now playing" className="size-4 text-fuchsia-600 dark:text-fuchsia-400" /> : index + 1}
                  </span>
                  <span className={cn("flex-1", current && "font-medium")}>{track.title}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">{track.length}</span>
                </li>
              )
            })}
          </ol>

          <h3 className="mt-10 text-sm font-semibold">On tour</h3>
          <ul className="mt-3 divide-y rounded-xl border">
            {shows.map((show) => (
              <li key={show.date} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                <span className="w-14 text-center leading-tight">
                  <span className="block text-xs text-muted-foreground uppercase">{show.day}</span>
                  <span className="block text-sm font-semibold">{show.date}</span>
                </span>
                <span className="min-w-0 flex-1 text-sm">
                  <span className="block font-medium">{show.city}</span>
                  <span className="block text-muted-foreground">{show.venue}</span>
                </span>
                {show.status === "sold-out" ? (
                  <span className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground line-through">Sold out</span>
                ) : (
                  <Button size="sm" variant={show.status === "few-left" ? "default" : "outline"} asChild>
                    <a href="#">{show.status === "few-left" ? "Last tickets" : "Tickets"}</a>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
