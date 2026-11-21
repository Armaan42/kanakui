import { Button } from "@/components/ui/button"
import { ParticleGalaxy } from "@/registry/default/ui/particle-galaxy"

export const meta = {
  title: "Planetarium show page",
  description: "The particle galaxy as the hero of a planetarium's show page, with showtimes beside it.",
}

// The planetarium, show and times are made up.
const TIMES = ["11:00", "13:30", "16:00", "19:30"]

export default function Planetarium() {
  return (
    <section className="dark bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Ridgeway Planetarium · new show</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Our galaxy, from the outside</h1>
          <p className="mt-4 text-lg text-muted-foreground">A 35-minute dome show on how we mapped the Milky Way without ever leaving it. Suitable for ages 8 and up.</p>
          <h2 className="mt-8 text-sm font-medium">Today&apos;s showtimes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TIMES.map((time) => (
              <li key={time}>
                <Button variant="outline" size="sm" className="tabular-nums">
                  {time}
                </Button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">€9, or free with museum entry.</p>
        </div>
        <ParticleGalaxy className="aspect-square w-full min-w-0 rounded-2xl" label="A spiral galaxy of glowing particles, slowly turning" />
      </div>
    </section>
  )
}
