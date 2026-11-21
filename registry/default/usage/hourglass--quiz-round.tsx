"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Hourglass } from "@/registry/default/ui/hourglass"

export const meta = {
  title: "Pub quiz round",
  description: "The hourglass as the answer timer in a quiz app's round; when it runs out, the answers lock.",
}

// The quiz and question are made up.
const OPTIONS = ["Lisbon", "Porto", "Coimbra", "Faro"]

export default function QuizRound() {
  const [choice, setChoice] = React.useState<string | null>(null)
  const [locked, setLocked] = React.useState(false)

  return (
    <div className="mx-auto grid max-w-3xl items-center gap-10 px-6 py-12 md:grid-cols-[1fr_auto]">
      <div>
        <p className="text-sm text-muted-foreground">Thursday quiz · Round 3 · Question 4</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Port wine takes its name from which city?</h1>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                disabled={locked}
                aria-pressed={choice === option}
                onClick={() => setChoice(option)}
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-left text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60",
                  choice === option ? "border-foreground bg-foreground text-background" : "hover:bg-muted"
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {locked ? (choice ? `Locked in: ${choice}.` : "Time's up. No answer this round.") : "Answers lock when the sand runs out."}
        </p>
      </div>
      <Hourglass duration={20} onDone={() => setLocked(true)} className="mx-auto" />
    </div>
  )
}
