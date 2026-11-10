import * as React from "react"

import { cn } from "@/lib/utils"

interface KbdProps extends React.ComponentProps<"kbd"> {
  /** Render as a pressed-looking key (raised bottom edge). */
  raised?: boolean
}

/** A keyboard key, e.g. ⌘ or K. Uses the semantic `<kbd>` element. */
function Kbd({ raised = true, className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-md border bg-muted px-1.5 font-mono text-xs font-medium text-foreground",
        raised && "border-b-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * A key combination such as ⌘ + K. Each key is its own `<kbd>` inside a
 * parent `<kbd>`, which is how HTML represents key combinations.
 */
function KbdCombo({ keys, className }: { keys: string[]; className?: string }) {
  return (
    <kbd data-slot="kbd-combo" className={cn("inline-flex items-center gap-1 font-sans", className)}>
      {keys.map((key, index) => (
        <React.Fragment key={`${key}-${index}`}>
          {index > 0 ? (
            <span aria-hidden="true" className="text-xs text-muted-foreground">
              +
            </span>
          ) : null}
          <Kbd>{key}</Kbd>
        </React.Fragment>
      ))}
    </kbd>
  )
}

export { Kbd, KbdCombo, type KbdProps }
