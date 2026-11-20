import { Activity, Users, Workflow } from "lucide-react"

import { AnimatedCard } from "@/registry/default/ui/animated-card"

export const meta = {
  title: "Features section",
  description: "Three animated cards side by side in a product features section, each with its own detail.",
}

// The product and figures are made up.
const FEATURES = [
  {
    icon: Activity,
    title: "Real-time analytics",
    text: "See sign-ups, revenue and churn update as they happen, without waiting for a nightly report.",
    detail: (
      <div className="flex h-12 items-end gap-1" aria-hidden="true">
        {[40, 55, 35, 70, 60, 85, 75, 95].map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-foreground/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },
  {
    icon: Workflow,
    title: "Automated workflows",
    text: "When a deal closes, create the onboarding project, invite the customer and post in the team channel.",
    detail: (
      <ol className="space-y-1.5 text-xs text-muted-foreground">
        <li>1. Deal marked won</li>
        <li>2. Onboarding project created</li>
        <li>3. Welcome email sent</li>
      </ol>
    ),
  },
  {
    icon: Users,
    title: "Team collaboration",
    text: "Comment on any chart or task, mention a teammate and keep the decision next to the data.",
    detail: (
      <div className="flex -space-x-2" aria-label="Five people collaborating">
        {["LO", "TR", "ML", "AR", "MK"].map((n) => (
          <span key={n} className="grid size-8 place-items-center rounded-full border-2 border-card bg-muted text-[11px] font-medium">
            {n}
          </span>
        ))}
      </div>
    ),
  },
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Analytics, automation and collaboration in one workspace</h2>
        <p className="mt-4 text-muted-foreground">Northlight replaces the dashboard, the automation tool and the status meeting.</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text, detail }) => (
          <AnimatedCard key={title} className="flex flex-col p-6">
            <span className="grid size-10 place-items-center rounded-lg border bg-background">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-5 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            <div className="mt-6 border-t pt-5">{detail}</div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  )
}
