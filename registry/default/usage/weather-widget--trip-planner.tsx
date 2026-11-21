import { Backpack, Shirt, Umbrella } from "lucide-react"

import { WeatherWidget } from "@/registry/default/ui/weather-widget"

export const meta = {
  title: "Trip planner",
  description: "The weather widget in a trip planner, next to the packing list it informs.",
}

// The trip and forecast are made up.
export default function TripPlanner() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Trip · 12–16 March</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Lisbon with Ana and Jonas</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-[20rem_minmax(0,1fr)]">
        <WeatherWidget
          city="Lisbon"
          condition="rain"
          temperature={14}
          high={16}
          low={10}
          summary="Showers until Thursday, then sunny"
          forecast={[
            { day: "Thu", condition: "rain", high: 15, low: 10 },
            { day: "Fri", condition: "cloudy", high: 16, low: 11 },
            { day: "Sat", condition: "sunny", high: 19, low: 12 },
            { day: "Sun", condition: "sunny", high: 20, low: 12 },
          ]}
        />
        <section aria-labelledby="packing" className="rounded-xl border bg-card p-5">
          <h2 id="packing" className="font-medium">
            Packing suggestions
          </h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <Umbrella aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>
                <span className="font-medium">A small umbrella</span>
                <span className="block text-muted-foreground">Showers on your first two days; the hills get slippery.</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Shirt aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>
                <span className="font-medium">Layers, not a heavy coat</span>
                <span className="block text-muted-foreground">10° in the morning, up to 20° by Sunday afternoon.</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Backpack aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>
                <span className="font-medium">Shoes with grip</span>
                <span className="block text-muted-foreground">The tiled pavements are slick when wet.</span>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
