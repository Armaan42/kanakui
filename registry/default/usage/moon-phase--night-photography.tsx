import { MoonPhase } from "@/registry/default/ui/moon-phase"

export const meta = {
  title: "Night photography planner",
  description: "The moon phase in a stargazing trip planner, so you can step through the nights and pick the darkest sky.",
}

// The planner and trip are made up.
const TIPS = [
  { title: "Aim for a thin moon", text: "Under a quarter lit, the Milky Way stands out. A full moon washes out all but the brightest stars." },
  { title: "Check the moonset", text: "Even a bright moon is fine once it has set. Shoot in the hours after." },
  { title: "Leave the town lights behind", text: "Forty minutes' drive from the coast is usually enough." },
]

export default function NightPhotography() {
  return (
    <div className="mx-auto grid max-w-4xl items-start gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <MoonPhase defaultDate="2026-12-08" className="mx-auto" />
      <div>
        <p className="text-sm text-muted-foreground">Ridgeway Trips · Alentejo dark-sky weekend</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Pick your night</h1>
        <p className="mt-2 text-muted-foreground">Step through the dates to see how much of the moon will be lit, then book the night that suits you.</p>
        <ul className="mt-6 space-y-4">
          {TIPS.map((tip) => (
            <li key={tip.title}>
              <p className="font-medium">{tip.title}</p>
              <p className="text-sm text-muted-foreground">{tip.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
