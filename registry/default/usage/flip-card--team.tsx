import { FlipCard } from "@/registry/default/ui/flip-card"

export const meta = {
  title: "Team page",
  description: "Flip cards on a team page: the front shows the person, the back what they work on and how to reach them.",
}

// Sample portraits. Swap in your own. The people are made up.
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&crop=faces&auto=format&q=80`
const TEAM = [
  { name: "Lena Okafor", role: "Head of design", img: "1438761681033-6461ffad8d80", back: "Leads the public-services team. Ask her about forms that people fill in once a year.", email: "lena@copperleaf.example" },
  { name: "Tomás Rivera", role: "Engineering lead", img: "1500648767791-00dcc994a43e", back: "Runs accessibility testing and the component library every project starts from.", email: "tomas@copperleaf.example" },
  { name: "Priya Natarajan", role: "Research", img: "1494790108377-be9c29b29330", back: "Plans the sessions with people who have never seen the service before.", email: "priya@copperleaf.example" },
]

export default function TeamPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-3xl font-semibold tracking-tight">The people behind Copperleaf</h2>
      <p className="mt-2 text-muted-foreground">Hover a card, or use its flip button, to see what each person works on.</p>
      <ul className="mt-10 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((person) => (
          <li key={person.name} className="w-full max-w-sm">
            <FlipCard
              flipOnHover
              flipLabel={`More about ${person.name}`}
              front={
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <img src={face(person.img)} alt="" width={400} height={400} className="size-24 rounded-full object-cover" />
                  <p className="mt-4 font-semibold">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              }
              back={
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{person.back}</p>
                  </div>
                  <a href={`mailto:${person.email}`} className="text-sm font-medium underline underline-offset-4">
                    {person.email}
                  </a>
                </div>
              }
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
