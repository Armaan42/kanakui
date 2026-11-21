import { WorldClock } from "@/registry/default/ui/world-clock"

export const meta = {
  title: "Distributed team page",
  description: "The world clock on a team's directory page, so people can see who is awake before they message.",
}

// The team is made up.
const PEOPLE = [
  { name: "Lena Okafor", city: "Lisbon", hours: "09:00–17:30" },
  { name: "Jonas Keller", city: "Berlin", hours: "08:30–17:00" },
  { name: "Priya Natarajan", city: "Bengaluru", hours: "10:00–18:30" },
  { name: "Tomás Rivera", city: "Mexico City", hours: "09:00–18:00" },
]

export default function DistributedTeam() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
      <p className="mt-1 text-sm text-muted-foreground">Oakline is spread across four time zones. Overlap is 15:00–17:00 Lisbon time.</p>
      <WorldClock
        className="mt-8"
        zones={[
          { city: "Lisbon", timeZone: "Europe/Lisbon" },
          { city: "Berlin", timeZone: "Europe/Berlin" },
          { city: "Bengaluru", timeZone: "Asia/Kolkata" },
          { city: "Mexico City", timeZone: "America/Mexico_City" },
        ]}
      />
      <ul className="mt-8 divide-y rounded-xl border bg-card text-sm">
        {PEOPLE.map((person) => (
          <li key={person.name} className="flex items-center justify-between gap-4 px-4 py-3">
            <span>
              <span className="font-medium">{person.name}</span>
              <span className="block text-muted-foreground">{person.city}</span>
            </span>
            <span className="text-muted-foreground tabular-nums">Works {person.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
