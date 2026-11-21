import { Button } from "@/components/ui/button"
import { RetroGrid } from "@/registry/default/ui/retro-grid"

export const meta = {
  title: "Game jam event page",
  description: "The retro grid as the floor of a game jam's hero, with the schedule and prizes below.",
}

// The event, venue and prizes are made up.
const SCHEDULE = [
  ["Fri 18:00", "Theme announced, teams form"],
  ["Sat 10:00", "Mentor hours"],
  ["Sun 15:00", "Builds due"],
  ["Sun 17:00", "Playtest and awards"],
]

export default function GameJam() {
  return (
    <div>
      <section className="relative isolate flex min-h-[26rem] items-center overflow-hidden px-6 py-20">
        <RetroGrid />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">Paperkite Game Jam · 48 hours</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Make a game in a weekend</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">Solo or in teams of up to four. Any engine, any style. Pizza on Saturday, judges on Sunday.</p>
          <Button size="lg" className="mt-8">
            Register · free
          </Button>
        </div>
      </section>
      <section aria-labelledby="schedule" className="mx-auto grid max-w-4xl gap-10 px-6 pb-16 md:grid-cols-2">
        <div>
          <h2 id="schedule" className="font-semibold">
            Schedule
          </h2>
          <ol className="mt-3 divide-y border-y text-sm">
            {SCHEDULE.map(([when, what]) => (
              <li key={when} className="flex gap-4 py-2.5">
                <span className="w-24 shrink-0 text-muted-foreground">{when}</span>
                {what}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-semibold">Prizes</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Best game: a year of studio space at the Basement</li>
            <li>Best art: a drawing tablet</li>
            <li>Players&apos; choice: a pinball night for the team</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
