import { Carousel3d } from "@/registry/default/ui/carousel-3d"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&fit=crop&auto=format&q=75`

const PLACES = [
  { name: "Kyoto", note: "Japan", id: "1493976040374-85c8e12f0c0e", alt: "A pagoda at the end of an old street in Kyoto at dusk" },
  { name: "Mount Fuji", note: "Japan", id: "1490806843957-31f4c9a91c65", alt: "Mount Fuji framed by cherry blossoms" },
  { name: "Skógafoss", note: "Iceland", id: "1476610182048-b716b8518aae", alt: "A waterfall over green cliffs at sunset" },
  { name: "Lake Braies", note: "Italy", id: "1501785888041-af3ef285b470", alt: "A rowing boat on a turquoise mountain lake" },
  { name: "Venice", note: "Italy", id: "1523906834658-6e24ef2386f9", alt: "The Rialto Bridge over the Grand Canal" },
  { name: "Isle of Skye", note: "Scotland", id: "1470071459604-3b5ec3a7fe05", alt: "Green hills and cliffs under low cloud at sunrise" },
]

export default function Carousel3dDemo() {
  return (
    <Carousel3d
      label="Places to go this year"
      items={PLACES.map((place) => ({
        id: place.name,
        label: place.name,
        content: (
          <div className="relative h-full overflow-hidden">
            <img src={photo(place.id)} alt={place.alt} width={480} height={600} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10 text-white">
              <p className="text-lg font-semibold tracking-tight">{place.name}</p>
              <p className="text-xs text-white/80">{place.note}</p>
            </div>
          </div>
        ),
      }))}
    />
  )
}
