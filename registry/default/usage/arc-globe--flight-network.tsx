import { ArcGlobe } from "@/registry/default/ui/arc-globe"

export const meta = {
  title: "Airline route map",
  description: "The arc globe showing an airline's routes out of its hub, beside the list of destinations and flight times.",
}

// The airline, routes and times are made up; the coordinates are the real cities.
const LISBON: [number, number] = [38.72, -9.14]
const ROUTES = [
  { city: "New York", to: [40.71, -74.0] as [number, number], time: "8h 05m" },
  { city: "São Paulo", to: [-23.55, -46.63] as [number, number], time: "10h 20m" },
  { city: "Luanda", to: [-8.84, 13.23] as [number, number], time: "7h 30m" },
  { city: "Dubai", to: [25.2, 55.27] as [number, number], time: "7h 45m" },
  { city: "London", to: [51.51, -0.13] as [number, number], time: "2h 40m" },
]

export default function FlightNetwork() {
  return (
    <section className="dark bg-background px-6 py-16 text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm text-muted-foreground">Copperleaf Air · from Lisbon</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Five continents, one stop</h2>
          <p className="mt-4 text-muted-foreground">Every route starts at our Lisbon hub, with connections under two hours.</p>
          <ul className="mt-8 divide-y border-y text-sm">
            {ROUTES.map((route) => (
              <li key={route.city} className="flex items-center justify-between py-2.5">
                <span>Lisbon → {route.city}</span>
                <span className="text-muted-foreground tabular-nums">{route.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <ArcGlobe
          className="aspect-square w-full max-w-xl justify-self-center"
          routes={ROUTES.map((route) => ({ from: LISBON, to: route.to }))}
          startLongitude={-20}
          label="A globe with flight routes arcing from Lisbon to New York, São Paulo, Luanda, Dubai and London"
        />
      </div>
    </section>
  )
}
