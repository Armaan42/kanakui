import { ScrollProgress } from "@/registry/default/ui/scroll-progress"

export const meta = {
  title: "Blog article",
  description: "The scroll progress bar pinned under a blog's header, filling as the reader moves through a long article.",
}

// The blog and article are made up.
const SECTIONS = [
  {
    heading: "Start with the bill, not the menu",
    body: [
      "Most teams pick a cloud provider for the free credits and only look at the bill a year later. By then the architecture has hardened around whatever was cheapest to start, not cheapest to run.",
      "Before you choose, write down the three numbers that will drive your costs: how much data you store, how much you move between regions, and how many hours your servers sit idle.",
    ],
  },
  {
    heading: "Idle time is the quiet cost",
    body: [
      "In the last audit we did for a 40-person company, 61% of compute hours were spent waiting: staging environments left on over weekends, preview builds nobody opened, a test database sized for launch day.",
      "Schedules fix most of it. Turn staging off at 20:00 and on at 07:00, delete preview environments after three days, and review instance sizes once a quarter.",
    ],
  },
  {
    heading: "Moving data costs more than storing it",
    body: [
      "Storage is cheap and getting cheaper. Transfer is not. A dashboard that pulls a full table across regions every five minutes can cost more than the database it reads from.",
      "Keep the reader next to the data, cache aggressively, and send summaries instead of rows.",
    ],
  },
  {
    heading: "Make one person own the number",
    body: [
      "Shared costs drift because nobody owns them. Give each service an owner, put its monthly cost in the same channel as its error alerts, and celebrate the deletions as much as the launches.",
    ],
  },
]

export default function BlogArticle() {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 text-sm">
          <span className="font-semibold">Oakline Engineering</span>
          <span className="text-muted-foreground">9 min read</span>
        </div>
        <ScrollProgress label="Article progress" className="absolute inset-x-0 -bottom-px" />
      </header>
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-muted-foreground">Infrastructure · 14 November 2026</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">How we cut our cloud bill by a third without moving providers</h1>
        <p className="mt-4 text-lg text-muted-foreground">Four habits that matter more than which provider you picked.</p>
        {SECTIONS.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className="mt-4 leading-7">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  )
}
