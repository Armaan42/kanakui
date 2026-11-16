import { BedDouble, CalendarDays, MapPin, Train } from "lucide-react"

import { BoardingPass } from "@/registry/default/ui/boarding-pass"

// Photos: Unsplash (free under the Unsplash License). The trip and airline are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&h=300&fit=crop&auto=format&q=75`

const days = [
  { day: "Day 1–2", place: "Tokyo", plan: "Land at Haneda, ramen in Shinjuku, neon walk through Akihabara.", image: photo("1540959733332-eab4deabeeaf"), alt: "A neon-lit shopping street in Tokyo at night" },
  { day: "Day 3", place: "Mount Fuji", plan: "Day trip to Lake Kawaguchi for the view, back by evening train.", image: photo("1490806843957-31f4c9a91c65"), alt: "Mount Fuji framed by cherry blossoms" },
  { day: "Day 4–5", place: "Kyoto", plan: "Shinkansen to Kyoto. Old streets of Higashiyama at dusk.", image: photo("1493976040374-85c8e12f0c0e"), alt: "A pagoda at the end of an old street in Kyoto" },
  { day: "Day 6", place: "Fushimi Inari", plan: "Early start to walk the torii gates before the crowds.", image: photo("1478436127897-769e1b3f0f36"), alt: "A tunnel of red torii gates" },
]

const summary = [
  { icon: CalendarDays, text: "7–14 April · 7 nights" },
  { icon: MapPin, text: "Tokyo, Fuji, Kyoto" },
  { icon: BedDouble, text: "3 hotels booked" },
  { icon: Train, text: "7-day rail pass" },
]

/** A trip overview: the boarding pass beside a day-by-day itinerary with photos. */
export function Trip01() {
  return (
    <section aria-labelledby="trip-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col items-center gap-3 lg:sticky lg:top-24">
          <BoardingPass
            airline="Skylark Air"
            flight="SK 208"
            from={{ code: "LHR", city: "London" }}
            to={{ code: "HND", city: "Tokyo" }}
            date="Tue, 7 Apr"
            departs="19:05"
            arrives="16:40 +1"
            passenger="Priya Natarajan"
            seat="24A"
            gate="B32"
            boarding="18:15"
            reference="K7PX2Q"
            details={[
              { label: "Fare", value: "Economy Flex" },
              { label: "Checked bag", value: "1 × 23 kg" },
              { label: "Seat", value: "Window" },
            ]}
          />
          <p className="text-xs text-muted-foreground">Tap the pass to see fare and baggage</p>
        </div>

        <div>
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">Your trip</p>
          <h2 id="trip-01-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Japan in spring
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {summary.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm">
                <Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />
                {text}
              </li>
            ))}
          </ul>

          <ol className="relative mt-10 space-y-5 border-l pl-6">
            {days.map((d) => (
              <li key={d.day} className="relative">
                <span aria-hidden="true" className="absolute top-5 -left-[1.95rem] size-3 rounded-full border-2 border-background bg-sky-500" />
                <article className="flex gap-4 rounded-2xl border bg-card p-3">
                  <img src={d.image} alt={d.alt} className="aspect-[4/3] w-28 shrink-0 rounded-xl object-cover sm:w-36" />
                  <div className="min-w-0 py-1">
                    <p className="text-xs font-medium text-muted-foreground">{d.day}</p>
                    <h3 className="font-semibold">{d.place}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{d.plan}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
