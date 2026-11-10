import { Bot, Cloud, Code2, Database } from "lucide-react"

import { SpotlightCard } from "@/registry/default/ui/spotlight-card"

const features = [
  { icon: Code2, title: "Typed APIs", body: "End-to-end types from the database to the browser." },
  { icon: Database, title: "Managed data", body: "Backups, branching and point-in-time recovery included." },
  { icon: Cloud, title: "Edge delivery", body: "Pages render close to every visitor." },
  { icon: Bot, title: "Built-in assistant", body: "Ask questions about your project in plain language." },
]

/** Four feature cards with a soft light that follows the pointer. */
export function Features04() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">A platform that grows with you</h2>
          <p className="mt-4 text-pretty text-muted-foreground">Move your pointer across the cards.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, body }) => (
            <SpotlightCard key={title} className="p-6">
              <Icon aria-hidden="true" className="size-5" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
