import * as React from "react"

import { cn } from "@/lib/utils"

interface TimelineEntry {
  id: string
  /** Shown above the title, e.g. a date or version. Use a `<time>`-friendly string. */
  date: string
  /** Machine-readable date for the `<time>` element, e.g. "2026-11-10". */
  dateTime?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Highlight this entry's marker, e.g. the latest release. */
  current?: boolean
}

interface TimelineProps extends Omit<React.ComponentProps<"ol">, "children"> {
  entries: TimelineEntry[]
}

/**
 * A vertical timeline for changelogs, roadmaps or history. An ordered list
 * with a connecting line and markers; dates use `<time>`. Works in Server
 * Components.
 */
function Timeline({ entries, className, ...props }: TimelineProps) {
  return (
    <ol data-slot="timeline" className={cn("relative space-y-8 border-l pl-6", className)} {...props}>
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 -left-[1.95rem] size-3 rounded-full border-2 border-background",
              entry.current ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/50"
            )}
          />
          <time dateTime={entry.dateTime} className="font-mono text-xs text-muted-foreground">
            {entry.date}
          </time>
          <h3 className="mt-1 font-medium">
            {entry.title}
            {entry.current ? <span className="sr-only"> (current)</span> : null}
          </h3>
          {entry.description ? <div className="mt-1.5 text-sm text-muted-foreground">{entry.description}</div> : null}
        </li>
      ))}
    </ol>
  )
}

export { Timeline, type TimelineEntry, type TimelineProps }
