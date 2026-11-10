import * as React from "react"

import { cn } from "@/lib/utils"

type ShimmerButtonProps = React.ComponentProps<"button">

/**
 * A primary button with a light sweep across its surface.
 * The animation stops when the user prefers reduced motion.
 * Requires the `animate-shimmer` theme variable and `shimmer` keyframes,
 * which the CLI adds to your CSS on install.
 */
function ShimmerButton({ className, type = "button", ...props }: ShimmerButtonProps) {
  return (
    <button
      type={type}
      data-slot="shimmer-button"
      className={cn(
        "relative inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/20 px-4 text-sm font-medium whitespace-nowrap text-primary-foreground outline-none select-none",
        "bg-[linear-gradient(110deg,var(--primary)_40%,color-mix(in_oklch,var(--primary-foreground)_30%,var(--primary))_50%,var(--primary)_60%)] bg-size-[200%_100%] animate-shimmer motion-reduce:animate-none",
        "transition-[translate,box-shadow] focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { ShimmerButton, type ShimmerButtonProps }
