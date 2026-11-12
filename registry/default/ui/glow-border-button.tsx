import * as React from "react"

import { cn } from "@/lib/utils"

interface GlowBorderButtonProps extends React.ComponentProps<"button"> {
  /** Colors of the light that circles the border. Any CSS colors. */
  colors?: [string, string]
}

/**
 * A button with a light that keeps circling its border. The light stops (and
 * the border stays visible) with reduced motion. Requires the
 * `animate-glow-border-spin` theme variable and keyframes, which the CLI adds.
 */
function GlowBorderButton({
  colors = ["oklch(0.78 0.16 300)", "oklch(0.8 0.13 220)"],
  className,
  children,
  type = "button",
  style,
  ...props
}: GlowBorderButtonProps) {
  return (
    <button
      type={type}
      data-slot="glow-border-button"
      className={cn(
        "group relative inline-flex h-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-border p-px text-sm font-medium outline-none select-none",
        "transition-[translate] focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{ "--glow-a": colors[0], "--glow-b": colors[1], ...style } as React.CSSProperties}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 aspect-square w-[max(200%,8rem)] -translate-x-1/2 -translate-y-1/2 animate-glow-border-spin bg-[conic-gradient(from_0deg,transparent_0%,var(--glow-a)_15%,var(--glow-b)_30%,transparent_45%)] motion-reduce:animate-none"
      />
      <span className="relative inline-flex size-full items-center justify-center gap-2 rounded-[11px] bg-background px-6 text-foreground transition-colors group-hover:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        {children}
      </span>
    </button>
  )
}

export { GlowBorderButton, type GlowBorderButtonProps }
