"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { MusicEqualizer } from "@/registry/default/ui/music-equalizer"

// Sample photos. Swap in your own. The artist and album are made up.
const COVER = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop&auto=format&q=80"

const tracks = [
  { title: "Afterglow", length: "3:42", note: "Warm low end, soft top", gains: [6, 4, 1, -1, 0, 1, 2, 3] },
  { title: "Night Bus", length: "4:08", note: "Tight kick, forward vocal", gains: [4, 2, -2, 0, 3, 4, 2, 1] },
  { title: "Paper Moons", length: "2:57", note: "Open and airy", gains: [-2, -1, 0, 1, 1, 3, 5, 7] },
  { title: "Slow Signal", length: "5:21", note: "Deep sub, dark mids", gains: [9, 6, 2, -3, -2, 0, 1, 2] },
  { title: "Home by Morning", length: "3:36", note: "Close and acoustic", gains: [0, 1, 2, 3, 4, 2, 1, 0] },
]

/** A music release page: cover, track list and the mastering curve of each track. */
export function Release01() {
  const [active, setActive] = React.useState(0)
  const [gains, setGains] = React.useState(tracks[0].gains)

  return (
    <section aria-labelledby="release-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <img src={COVER} alt="Album cover: a hand over glowing purple DJ decks" className="aspect-square w-full rounded-xl bg-muted object-cover shadow-xl" />
          <h2 id="release-01-title" className="mt-6 text-3xl font-semibold tracking-tight">
            Low Light
          </h2>
          <p className="mt-1 text-muted-foreground">Mara Voss · Album · 5 tracks</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <a href="#">Stream the album</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#">Buy on vinyl</a>
            </Button>
          </div>
        </div>
        <div className="min-w-0">
          <ol>
            {tracks.map((track, i) => (
              <li key={track.title} className="border-b first:border-t">
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => {
                    setActive(i)
                    setGains(track.gains)
                  }}
                  className="group flex w-full items-center gap-4 px-2 py-3 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-pressed:bg-muted"
                >
                  <span className="w-5 font-mono text-xs text-muted-foreground tabular-nums group-aria-pressed:text-foreground/80">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{track.title}</span>
                    <span className="block truncate text-sm text-muted-foreground group-aria-pressed:text-foreground/80">{track.note}</span>
                  </span>
                  <span className="font-mono text-sm text-muted-foreground tabular-nums group-aria-pressed:text-foreground/80">{track.length}</span>
                </button>
              </li>
            ))}
          </ol>
          <h3 className="mt-9 mb-3 text-sm font-medium">Mastering curve: {tracks[active].title}</h3>
          <MusicEqualizer value={gains} onValueChange={setGains} className="max-w-none" />
        </div>
      </div>
    </section>
  )
}
