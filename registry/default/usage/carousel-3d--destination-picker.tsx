import { Button } from "@/components/ui/button"
import { Carousel3d } from "@/registry/default/ui/carousel-3d"

export const meta = {
  title: "Destination picker",
  description: "The 3D carousel as the destination picker on a travel site's hero, with the booking actions beside it.",
}

// Sample photos. Swap in your own. The trips and prices are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&fit=crop&auto=format&q=75`
const PLACES = [
  { name: "Kyoto", note: "8 days from €2,180", id: "1493976040374-85c8e12f0c0e", alt: "A pagoda at the end of an old street in Kyoto at dusk" },
  { name: "Dolomites", note: "6 days from €1,340", id: "1501785888041-af3ef285b470", alt: "A rowing boat on a turquoise mountain lake" },
  { name: "Isle of Skye", note: "5 days from €990", id: "1470071459604-3b5ec3a7fe05", alt: "Green hills and cliffs under low cloud" },
  { name: "Santorini", note: "4 days from €860", id: "1533105079780-92b9be482077", alt: "White steps leading down to a blue sea" },
  { name: "Venice", note: "3 days from €640", id: "1523906834658-6e24ef2386f9", alt: "The Rialto Bridge over the Grand Canal" },
  { name: "Iceland", note: "7 days from €1,890", id: "1476610182048-b716b8518aae", alt: "A waterfall over green cliffs at sunset" },
]

export default function DestinationPicker() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="text-sm text-muted-foreground">Tidewell Trips · spring 2027</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Where would you like to go?</h1>
        <p className="mt-4 text-lg text-muted-foreground">Small-group trips with a local guide, flights included from Lisbon and London.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">See all trips</Button>
          <Button size="lg" variant="outline">
            Talk to a planner
          </Button>
        </div>
      </div>
      <Carousel3d
        label="Destinations"
        items={PLACES.map((place) => ({
          id: place.name,
          label: place.name,
          content: (
            <div className="relative h-full overflow-hidden">
              <img src={photo(place.id)} alt={place.alt} width={480} height={600} className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4 pt-12 text-white">
                <p className="text-lg font-semibold">{place.name}</p>
                <p className="text-xs text-white/85">{place.note}</p>
              </div>
            </div>
          ),
        }))}
      />
    </section>
  )
}
