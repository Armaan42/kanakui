import { ArrowRight, BookOpen, CheckCircle2, Circle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/registry/default/ui/shimmer-button"

export const meta = {
  title: "Landing page hero",
  description: "The shimmer button as the primary call to action in a product hero, next to a quieter secondary link.",
}

// The product, team and tasks are made up.
const TASKS = [
  { title: "Finalise Q3 launch brief", owner: "LO", due: "Today", done: true },
  { title: "Review onboarding copy", owner: "TR", due: "Tomorrow", done: false },
  { title: "Ship billing page redesign", owner: "ML", due: "Thu", done: false },
  { title: "Customer interviews: round 2", owner: "AR", due: "Fri", done: false },
]

export default function SaasHero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Kestrel for teams</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Manage your entire workflow in one place.</h1>
        <p className="mt-5 max-w-lg text-lg text-muted-foreground">
          Bring your team, projects, and analytics together with a single workspace.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ShimmerButton>
            Get started
            <ArrowRight aria-hidden="true" />
          </ShimmerButton>
          <Button variant="ghost" size="lg" asChild>
            <a href="#docs">
              <BookOpen aria-hidden="true" />
              View documentation
            </a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Free for teams of up to five. No card needed.</p>
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">This week</p>
          <span className="text-xs text-muted-foreground">1 of 4 done</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/4 rounded-full bg-foreground" />
        </div>
        <ul className="mt-4 divide-y">
          {TASKS.map((task) => (
            <li key={task.title} className="flex items-center gap-3 py-3 text-sm">
              {task.done ? (
                <CheckCircle2 aria-label="Done" className="size-4 shrink-0 text-foreground" />
              ) : (
                <Circle aria-label="To do" className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span className={task.done ? "flex-1 text-muted-foreground line-through" : "flex-1"}>{task.title}</span>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                <Clock aria-hidden="true" className="size-3" />
                {task.due}
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-muted text-[10px] font-medium">{task.owner}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
