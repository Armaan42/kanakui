import { TextReveal } from "@/registry/default/ui/text-reveal"

export const meta = {
  title: "About page",
  description: "Text reveal on the opening statement of a studio's about page, followed by the facts that back it up.",
}

// The studio and its history are made up.
const FACTS = [
  { term: "Founded", value: "2014, in a spare room in Porto" },
  { term: "People", value: "11 designers and engineers" },
  { term: "Clients", value: "Libraries, museums and public services" },
  { term: "Office", value: "Rua das Flores 28, Lisbon" },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm text-muted-foreground">About Copperleaf Studio</p>
      <TextReveal
        as="h1"
        text="We design public services that people use once a year and still understand the first time."
        className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
      />
      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div className="space-y-4 leading-7 text-muted-foreground">
          <p>Tax returns, library cards, school applications: the forms that matter most are the ones people fill in least often. Nobody remembers how they worked last year.</p>
          <p>So we test with people who have never seen the service, write in plain words and keep every step on one screen when we can.</p>
        </div>
        <dl className="divide-y border-y text-sm">
          {FACTS.map((fact) => (
            <div key={fact.term} className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">{fact.term}</dt>
              <dd className="text-right">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
