import * as React from "react"

import { cn } from "@/lib/utils"

const STATUS = {
  online: { color: "bg-emerald-500", label: "Online" },
  busy: { color: "bg-rose-500", label: "Busy" },
  away: { color: "bg-amber-500", label: "Away" },
  offline: { color: "bg-muted-foreground/50", label: "Offline" },
} as const

interface StatusDotProps extends Omit<React.ComponentProps<"span">, "children"> {
  status: keyof typeof STATUS
  /** Text shown next to the dot. Defaults to the status name; pass `false` to hide it (it stays available to screen readers). */
  label?: string | false
  /** Pulse the dot, e.g. for "live". */
  pulse?: boolean
}

/**
 * A colored status indicator with a text label, so meaning never relies on
 * color alone. The optional pulse stops with reduced motion. Works in Server
 * Components.
 */
function StatusDot({ status, label, pulse = false, className, ...props }: StatusDotProps) {
  const config = STATUS[status]
  const text = label === false ? null : (label ?? config.label)
  return (
    <span data-slot="status-dot" className={cn("inline-flex items-center gap-2 text-sm", className)} {...props}>
      <span aria-hidden="true" className="relative flex size-2.5">
        {pulse ? <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden", config.color)} /> : null}
        <span className={cn("relative size-2.5 rounded-full", config.color)} />
      </span>
      {text ? <span>{text}</span> : <span className="sr-only">{config.label}</span>}
    </span>
  )
}

export { StatusDot, type StatusDotProps }
