"use client"

import * as React from "react"

import { GaltonBoard } from "@/registry/default/ui/galton-board"

export const meta = {
  title: "Statistics lesson",
  description: "The Galton board in an online statistics course, showing how lots of random bounces add up to a bell curve.",
}

// The course is made up.
export default function StatisticsLesson() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <GaltonBoard className="mx-auto" rows={8} onLand={() => setCount((n) => n + 1)} />
      <div>
        <p className="text-sm text-muted-foreground">Oakline Learning · Statistics 101 · Unit 5</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Why so many things are bell-shaped</h1>
        <p className="mt-2 text-muted-foreground">
          Each ball goes left or right at every peg, at random. To land at the edge it has to go the same way eight times in a row, which is rare.
          Most end up somewhere in the middle.
        </p>
        <p role="status" className="mt-6 rounded-xl border bg-card p-5 text-sm">
          {count < 30 ? (
            <span className="text-muted-foreground">Drop at least 30 balls and watch the shape appear. {count > 0 ? `${count} so far.` : ""}</span>
          ) : (
            <span>
              <span className="font-medium">{count} balls.</span> See the curve? Heights, test scores and measurement errors pile up the same way.
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
