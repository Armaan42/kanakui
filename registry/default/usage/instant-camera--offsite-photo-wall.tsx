"use client"

import * as React from "react"

import { InstantCamera, type InstantPhoto } from "@/registry/default/ui/instant-camera"

export const meta = {
  title: "Team offsite photo wall",
  description: "The instant camera on a team's offsite page: each shot develops and gets pinned to the shared wall.",
}

// Sample photos. Swap in your own. The team and trip are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=480&fit=crop&auto=format&q=80`

const PHOTOS: InstantPhoto[] = [
  { src: photo("1501785888041-af3ef285b470"), alt: "Rowing boats on a turquoise lake below mountains", caption: "lake day" },
  { src: photo("1464822759023-fed622ff2c3b"), alt: "A wide valley below snow-capped mountains", caption: "the long walk" },
  { src: photo("1517248135467-4c7edcad34c4"), alt: "A restaurant with dark wooden floors, pendant lamps and tall chairs", caption: "team dinner" },
  { src: photo("1507525428034-b723cf961d3e"), alt: "Gentle waves on a beach at sunrise", caption: "last morning" },
]

export default function OffsitePhotoWall() {
  const [wall, setWall] = React.useState<InstantPhoto[]>([])

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 lg:grid-cols-[auto_minmax(0,1fr)]">
      <div>
        <p className="text-sm text-muted-foreground">Kestrel · Autumn offsite</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Three days in the mountains</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">Take a shot and it goes on the wall for everyone. Four exposures left in the pack.</p>
        <InstantCamera className="mt-8" photos={PHOTOS} film={4} onCapture={(shot) => setWall((list) => [...list, shot])} />
      </div>
      <section aria-labelledby="wall">
        <h2 id="wall" className="text-sm font-medium">
          The wall
        </h2>
        {wall.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No photos yet. Press the shutter to take the first one.</p>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {wall.map((shot, i) => (
              <li key={`${shot.src}-${i}`} className="bg-white p-2 pb-6 shadow-md" style={{ rotate: `${(i % 3) - 1}deg` }}>
                <img src={shot.src} alt={shot.alt} className="aspect-square w-full object-cover" />
                <p className="mt-2 text-center font-serif text-sm text-neutral-700">{shot.caption}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
