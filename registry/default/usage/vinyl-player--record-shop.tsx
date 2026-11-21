import { Button } from "@/components/ui/button"
import { VinylPlayer } from "@/registry/default/ui/vinyl-player"

export const meta = {
  title: "Record shop listing",
  description: "The vinyl player as the listen-before-you-buy preview on an independent record shop's product page.",
}

// Sample cover. Swap in your own. The shop, artist and album are made up.
const COVER = "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=600&fit=crop&auto=format&q=80"
const TRACKS = ["Low Tide", "Harbour Lights", "Ferry at Six", "Salt", "The Long Crossing", "Home by Dark"]

export default function RecordShop() {
  return (
    <div className="mx-auto grid max-w-5xl items-start gap-10 px-6 py-12 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <VinylPlayer cover={{ src: COVER, alt: "Album cover: swirls of pink and blue paint" }} title="Salt and Signal" artist="Ines Varga" />
      <div>
        <p className="text-sm text-muted-foreground">Copperleaf Records · New in</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Salt and Signal</h1>
        <p className="mt-1 text-muted-foreground">Ines Varga · 12″ LP · 180 g · gatefold sleeve</p>
        <p className="mt-6 text-2xl font-semibold tabular-nums">€29</p>
        <Button size="lg" className="mt-4 w-full sm:w-auto">
          Add to basket
        </Button>
        <h2 className="mt-8 text-sm font-medium">Side A</h2>
        <ol className="mt-2 divide-y border-y text-sm">
          {TRACKS.map((track, i) => (
            <li key={track} className="flex gap-4 py-2">
              <span className="w-5 text-muted-foreground tabular-nums">{i + 1}</span>
              {track}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
