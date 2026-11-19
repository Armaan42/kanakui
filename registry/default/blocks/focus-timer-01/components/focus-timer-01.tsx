"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Hourglass } from "@/registry/default/ui/hourglass"
import { KitchenTimer } from "@/registry/default/ui/kitchen-timer"

const TASKS = ["Outline the launch post", "Reply to design review", "Fix the onboarding copy", "Plan tomorrow"]

/** A focus page: a 25-minute work timer, a five-minute break hourglass and today's short list. */
export function FocusTimer01() {
  const [done, setDone] = React.useState<string[]>([])
  const [sessions, setSessions] = React.useState(0)

  return (
    <section aria-labelledby="focus-timer-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 id="focus-timer-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            One thing at a time
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Twist the timer to 25 minutes and work until it rings. Then turn the hourglass over and step away for five.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-card-foreground">
            <h3 className="self-start text-sm font-medium text-muted-foreground">Focus</h3>
            <KitchenTimer onDone={() => setSessions((count) => count + 1)} />
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-card-foreground">
            <h3 className="self-start text-sm font-medium text-muted-foreground">Break</h3>
            <Hourglass duration={300} />
          </div>
          <div className="rounded-2xl border bg-card p-6 text-card-foreground">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
              <p className="font-mono text-xs text-muted-foreground tabular-nums">
                {sessions} {sessions === 1 ? "session" : "sessions"}
              </p>
            </div>
            <ul className="mt-4 space-y-1">
              {TASKS.map((task) => {
                const checked = done.includes(task)
                return (
                  <li key={task}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-muted/60">
                      <input type="checkbox" checked={checked} onChange={() => setDone(checked ? done.filter((t) => t !== task) : [...done, task])} className="size-4 accent-primary" />
                      <span className={cn(checked && "text-muted-foreground line-through")}>{task}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <p aria-live="polite" className="mt-4 text-xs text-muted-foreground tabular-nums">
              {done.length} of {TASKS.length} done
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
