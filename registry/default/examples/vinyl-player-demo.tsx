import { VinylPlayer } from "@/registry/default/ui/vinyl-player"

// Cover: Unsplash (free under the Unsplash License). Artist and track are made up.
export default function VinylPlayerDemo() {
  return (
    <VinylPlayer
      className="w-[min(26rem,calc(100vw-3rem))]"
      title="Tidal Bloom"
      artist="Mara Lune"
      cover={{
        src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop&auto=format&q=80",
        alt: "Album cover: swirls of pink and teal paint",
      }}
    />
  )
}
