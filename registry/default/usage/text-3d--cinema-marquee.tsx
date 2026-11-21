import { Button } from "@/components/ui/button"
import { Text3d } from "@/registry/default/ui/text-3d"

export const meta = {
  title: "Retro cinema page",
  description: "3D text as the marquee title of an independent cinema's homepage, with tonight's screenings below.",
}

// The cinema, films and times are made up.
const SCREENINGS = [
  { time: "18:30", title: "The Long Crossing", note: "Documentary · 1h 32m" },
  { time: "20:45", title: "Harbour Lights", note: "Drama · 1h 58m · subtitled" },
  { time: "23:15", title: "Midnight Matinee: Double Feature", note: "Two 1970s thrillers on 35 mm" },
]

export default function CinemaMarquee() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="text-center">
        <Text3d as="h1" text="THE ENGINE SHED" className="text-5xl sm:text-7xl" />
        <p className="mt-4 text-muted-foreground">Independent cinema · one screen · 140 seats · bar open from 17:00</p>
      </div>
      <section aria-labelledby="tonight" className="mt-12">
        <h2 id="tonight" className="font-semibold">
          Tonight
        </h2>
        <ul className="mt-3 divide-y border-y">
          {SCREENINGS.map((s) => (
            <li key={s.time} className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
              <span className="w-14 font-mono text-lg tabular-nums">{s.time}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{s.title}</span>
                <span className="text-sm text-muted-foreground">{s.note}</span>
              </span>
              <Button size="sm" variant="outline">
                Book
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
