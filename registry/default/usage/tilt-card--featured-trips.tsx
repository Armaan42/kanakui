import { TiltCard } from "@/registry/default/ui/tilt-card"

export const meta = {
  title: "Featured trips",
  description: "Tilt cards as the featured trips on a travel site, each with a photo, a short description and a price.",
}

// Sample photos. Swap in your own. The trips and prices are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=720&h=540&fit=crop&auto=format&q=80`
const TRIPS = [
  { title: "Spring in Kyoto", days: "8 days", price: "€2,180", img: "1490806843957-31f4c9a91c65", alt: "Mount Fuji framed by cherry blossoms", text: "Temples at dawn, a night in a ryokan and a day trip to see Fuji." },
  { title: "Dolomites by lake", days: "6 days", price: "€1,340", img: "1501785888041-af3ef285b470", alt: "A rowing boat on a turquoise mountain lake", text: "Easy hut-to-hut walks with a lake swim at the end of each day." },
  { title: "Isle of Skye", days: "5 days", price: "€990", img: "1470071459604-3b5ec3a7fe05", alt: "Green hills and cliffs under low cloud at sunrise", text: "Sea cliffs, fairy pools and a whisky tasting on the last night." },
]

export default function FeaturedTrips() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-semibold tracking-tight">Trips we&apos;re running this spring</h2>
      <p className="mt-2 text-muted-foreground">Groups of up to 12, with a local guide the whole way.</p>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {TRIPS.map((trip) => (
          <li key={trip.title}>
            <TiltCard className="h-full">
              <img src={photo(trip.img)} alt={trip.alt} width={720} height={540} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold">{trip.title}</h3>
                  <span className="text-sm text-muted-foreground">{trip.days}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{trip.text}</p>
                <p className="mt-4 text-sm">
                  From <span className="font-semibold tabular-nums">{trip.price}</span>
                </p>
              </div>
            </TiltCard>
          </li>
        ))}
      </ul>
    </section>
  )
}
