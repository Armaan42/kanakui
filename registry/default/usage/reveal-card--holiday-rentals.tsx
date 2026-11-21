import { RevealCard } from "@/registry/default/ui/reveal-card"

export const meta = {
  title: "Holiday rental listings",
  description: "Reveal cards in a grid of holiday rentals: the photo first, the details sliding up on hover or focus.",
}

// Sample photos. Swap in your own. The listings and prices are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&auto=format&q=80`
const LISTINGS = [
  { title: "Mountain cabin", img: "1542718610-a1d656d1884c", alt: "A dark timber cabin on a hillside above a valley at sunset", text: "Two bedrooms, wood stove and a view of the valley.", price: "€140 a night" },
  { title: "Lakeside lodge", img: "1510798831971-661eb04b3739", alt: "A wooden lodge lit up beside a lake, with snow on the trees", text: "Sleeps eight, with a sauna and a private jetty.", price: "€320 a night" },
  { title: "Forest hut", img: "1449158743715-0a90ebb6d2d8", alt: "A small log hut among tall pine trees", text: "Off grid, solar power, the nearest road a ten-minute walk.", price: "€85 a night" },
]

export default function HolidayRentals() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-semibold tracking-tight">Cabins for a quiet winter</h2>
      <p className="mt-2 text-muted-foreground">Hand-picked by the Halden Stays team. Free cancellation up to 14 days before.</p>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {LISTINGS.map((listing) => (
          <li key={listing.title}>
            <RevealCard
              title={listing.title}
              media={<img src={photo(listing.img)} alt={listing.alt} width={800} height={600} className="size-full object-cover" />}
            >
              <p>{listing.text}</p>
              <p className="mt-2 font-medium text-foreground">{listing.price}</p>
            </RevealCard>
          </li>
        ))}
      </ul>
    </section>
  )
}
