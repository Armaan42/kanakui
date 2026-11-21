"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Abacus } from "@/registry/default/ui/abacus"

export const meta = {
  title: "Kids' maths lesson",
  description: "The abacus in a primary school maths app: the child sets the beads to match the number, and the lesson checks it.",
}

// The app and lesson are made up.
const TARGET = 347

export default function MathsLesson() {
  const [value, setValue] = React.useState(0)
  const done = value === TARGET

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Brightwater Maths · Year 3 · Place value</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Show three hundred and forty-seven</h1>
      <p className="mt-2 text-muted-foreground">Slide the beads to the bar. The top bead on each rod counts five, the beads below count one.</p>
      <div className="mt-8 flex justify-center">
        <Abacus rods={3} defaultValue={0} onValueChange={setValue} />
      </div>
      <div role="status" className="mt-8 flex items-center justify-center gap-2 text-sm">
        {done ? (
          <>
            <Check aria-hidden="true" className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">That&apos;s it: 3 hundreds, 4 tens and 7 ones.</span>
          </>
        ) : (
          <span className="text-muted-foreground">Your abacus shows {value}.</span>
        )}
      </div>
    </div>
  )
}
