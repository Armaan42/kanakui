import { Heart, Image as ImageIcon, MapPin, Search, Settings, Share2, Trash2 } from "lucide-react"

import { Dock } from "@/registry/default/ui/dock"

export const meta = {
  title: "Photo library app",
  description: "The dock as the tool bar of a photo library, floating over the grid of photos.",
}

// Sample photos. Swap in your own.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=480&fit=crop&auto=format&q=70`
const PHOTOS = [
  { id: "1490806843957-31f4c9a91c65", alt: "Mount Fuji framed by cherry blossoms" },
  { id: "1493976040374-85c8e12f0c0e", alt: "A pagoda at the end of an old street in Kyoto" },
  { id: "1501785888041-af3ef285b470", alt: "A rowing boat on a turquoise mountain lake" },
  { id: "1476610182048-b716b8518aae", alt: "A waterfall over green cliffs" },
  { id: "1470071459604-3b5ec3a7fe05", alt: "Green hills and cliffs under low cloud" },
  { id: "1506905925346-21bda4d32df4", alt: "Snowy peaks above a sea of clouds" },
  { id: "1523906834658-6e24ef2386f9", alt: "The Rialto Bridge over the Grand Canal" },
  { id: "1533105079780-92b9be482077", alt: "White steps leading down to the sea" },
]

export default function PhotoLibrary() {
  return (
    <div className="relative min-h-svh pb-28">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h1 className="font-semibold">Trips 2026</h1>
          <p className="text-sm text-muted-foreground">{PHOTOS.length} photos · Japan, Iceland, Italy, Greece</p>
        </div>
      </header>
      <ul className="grid grid-cols-2 gap-1 p-1 sm:grid-cols-3 lg:grid-cols-4">
        {PHOTOS.map((p) => (
          <li key={p.id}>
            <img src={photo(p.id)} alt={p.alt} width={480} height={480} className="aspect-square w-full object-cover" />
          </li>
        ))}
      </ul>
      <div className="fixed inset-x-0 bottom-4 flex justify-center px-4">
        <Dock
          label="Library tools"
          items={[
            { label: "All photos", icon: <ImageIcon /> },
            { label: "Favourites", icon: <Heart /> },
            { label: "Places", icon: <MapPin /> },
            { label: "Search", icon: <Search /> },
            { label: "Share", icon: <Share2 /> },
            { label: "Recently deleted", icon: <Trash2 /> },
            { label: "Settings", icon: <Settings /> },
          ]}
        />
      </div>
    </div>
  )
}
