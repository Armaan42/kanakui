"use client"

import * as React from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FilmStrip } from "@/registry/default/ui/film-strip"

export const meta = {
  title: "Client proofing gallery",
  description: "The film strip as the picker in a photographer's proofing gallery: choose a frame, see it large and mark favourites.",
}

// Sample photos. Swap in your own. The photographer and client are made up.
const photo = (id: string, w = 900, h = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`
const FRAMES = [
  { src: photo("1469371670807-013ccf25f16a"), alt: "Chairs and flower arrangements set out for an outdoor ceremony", caption: "01 · The ceremony set-up" },
  { src: photo("1519741497674-611481863552"), alt: "A couple holding a bouquet in warm evening light", caption: "02 · Golden hour" },
  { src: photo("1533105079780-92b9be482077"), alt: "White steps leading down to a blue sea", caption: "03 · The walk to the beach" },
  { src: photo("1507525428034-b723cf961d3e"), alt: "A calm beach at sunset", caption: "04 · Sunset" },
]

export default function ClientProofing() {
  const [index, setIndex] = React.useState(0)
  const [favourites, setFavourites] = React.useState<Set<number>>(new Set([1]))
  const frame = FRAMES[index]
  const isFavourite = favourites.has(index)

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Proofs from Ana Ribeiro Photography</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Lena and Tomás · Santorini</h1>
        </div>
        <p className="text-sm text-muted-foreground">{favourites.size} of 25 favourites chosen</p>
      </div>
      <img src={frame.src} alt={frame.alt} width={900} height={600} className="mt-6 aspect-[3/2] w-full rounded-xl object-cover" />
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm">{frame.caption}</p>
        <Button
          variant={isFavourite ? "default" : "outline"}
          size="sm"
          aria-pressed={isFavourite}
          onClick={() =>
            setFavourites((set) => {
              const next = new Set(set)
              if (next.has(index)) next.delete(index)
              else next.add(index)
              return next
            })
          }
        >
          <Heart aria-hidden="true" className={isFavourite ? "fill-current" : undefined} />
          {isFavourite ? "Favourite" : "Add to favourites"}
        </Button>
      </div>
      <FilmStrip className="mt-6" frames={FRAMES} defaultIndex={0} onSelect={setIndex} />
    </div>
  )
}
