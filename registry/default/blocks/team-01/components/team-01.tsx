// Placeholder people. Replace with your real team (and their consent to be listed).
const team = [
  { name: "Ananya Iyer", role: "Co-founder & CEO" },
  { name: "Marcus Webb", role: "Co-founder & CTO" },
  { name: "Lucía Moreno", role: "Head of Design" },
  { name: "Kenji Sato", role: "Engineering Lead" },
  { name: "Fatima Noor", role: "Product Manager" },
  { name: "Jonas Berg", role: "Developer Relations" },
  { name: "Chloé Martin", role: "Customer Success" },
  { name: "Ravi Kapoor", role: "Platform Engineer" },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

/** Team members as a grid of avatars, names and roles: two columns on phones, four on desktops. */
export function Team01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">The team</h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A small group of people who care about craft. Say a sentence about how you work.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {team.map((person) => (
            <li key={person.name}>
              <div
                aria-hidden="true"
                className="flex aspect-square items-center justify-center rounded-xl border bg-muted text-2xl font-semibold text-muted-foreground"
              >
                {initials(person.name)}
              </div>
              <h3 className="mt-3 font-medium">{person.name}</h3>
              <p className="text-sm text-muted-foreground">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
