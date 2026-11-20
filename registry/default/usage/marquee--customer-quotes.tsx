import { Marquee } from "@/registry/default/ui/marquee"

export const meta = {
  title: "Customer quotes",
  description: "Two marquee rows of short quotes moving in opposite directions, pausing on hover so people can read them.",
}

// Sample quotes from made-up people and companies. Replace them with real customers who agreed to be quoted.
const QUOTES = [
  { quote: "We closed our books four days faster in the first month.", name: "Amara Osei", role: "Finance lead, Copperleaf" },
  { quote: "The approval flow alone saved our ops team a weekly meeting.", name: "Jonas Keller", role: "COO, Tidewell" },
  { quote: "Setup took an afternoon. Our old tool took a quarter.", name: "Priya Natarajan", role: "Head of ops, Oakline" },
  { quote: "Finally, one place where sales and finance agree on the numbers.", name: "Marcus Hale", role: "CFO, Brightwater" },
  { quote: "Support answered in minutes, and with an actual fix.", name: "Sofie Lindqvist", role: "Founder, Paperkite" },
  { quote: "Our auditors asked which tool we used. That never happens.", name: "Diego Alvarez", role: "Controller, Halden" },
]

function QuoteCard({ quote, name, role }: (typeof QUOTES)[number]) {
  return (
    <figure className="w-80 rounded-xl border bg-card p-5">
      <blockquote className="text-sm leading-6">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
          {name.split(" ").map((part) => part[0]).join("")}
        </span>
        <span className="text-sm">
          <span className="block font-medium">{name}</span>
          <span className="block text-muted-foreground">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function CustomerQuotes() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Finance teams that switched to Kestrel</h2>
        <p className="mt-3 text-muted-foreground">What changed in their first quarter.</p>
      </div>
      <div className="mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <Marquee pauseOnHover duration="50s">
          {QUOTES.slice(0, 3).map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse duration="55s">
          {QUOTES.slice(3).map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
