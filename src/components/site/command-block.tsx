"use client"

import * as React from "react"

import { CopyButton } from "@/components/site/copy-button"
import { usePackageManager } from "@/hooks/use-package-manager"
import { convertCommand, PACKAGE_MANAGERS } from "@/lib/package-manager"
import { cn } from "@/lib/utils"

interface CommandBlockProps {
  /** Written for npm (`npx …`, `npm install …`); other package managers are derived. */
  command: string
  /** Accessible name for the copy button. */
  copyLabel?: string
  /**
   * Show npm / pnpm / yarn / bun tabs above npm commands. Compact spots (the
   * homepage) turn them off but still show the reader's chosen package manager.
   */
  packageManagers?: boolean
  className?: string
}

/** A single terminal command with a copy button. Long commands scroll inside the block. */
export function CommandBlock({ command, copyLabel = "Copy command", packageManagers = true, className }: CommandBlockProps) {
  const [pm, setPm] = usePackageManager()
  const converted = convertCommand(command, pm)
  const shown = converted ?? command
  const tabs = packageManagers && converted !== null

  // A command wider than its box scrolls sideways; it then takes keyboard focus
  // so arrow keys can scroll it. Short commands stay out of the tab order.
  const preRef = React.useRef<HTMLPreElement>(null)
  const [overflows, setOverflows] = React.useState(false)
  React.useEffect(() => {
    const pre = preRef.current
    if (!pre) return
    const check = () => setOverflows(pre.scrollWidth > pre.clientWidth + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(pre)
    return () => observer.disconnect()
  }, [shown])

  const line = (
    <pre
      ref={preRef}
      tabIndex={overflows ? 0 : undefined}
      className="min-w-0 flex-1 overflow-x-auto rounded-lg px-4 py-3 font-mono text-[13px] leading-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
    >
      <code>
        <span aria-hidden="true" className="text-muted-foreground select-none">
          ${" "}
        </span>
        {shown}
      </code>
    </pre>
  )

  if (!tabs) {
    return (
      <div className={cn("flex min-w-0 items-center rounded-lg border bg-muted/40", className)}>
        {line}
        <CopyButton value={shown} label={copyLabel} className="mr-2 shrink-0" />
      </div>
    )
  }

  return (
    <div className={cn("min-w-0 rounded-lg border bg-muted/40", className)}>
      <div className="flex items-center gap-1 border-b py-1 pr-2 pl-1.5">
        <div role="group" aria-label="Package manager" className="flex items-center gap-0.5">
          {PACKAGE_MANAGERS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={pm === option}
              onClick={() => setPm(option)}
              className={cn(
                "rounded-md px-2 py-1 font-mono text-xs transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                pm === option
                  ? "bg-background text-foreground shadow-xs ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <CopyButton value={shown} label={copyLabel} className="ml-auto shrink-0" />
      </div>
      {line}
    </div>
  )
}
