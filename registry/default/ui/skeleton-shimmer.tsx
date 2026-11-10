import * as React from "react"

import { cn } from "@/lib/utils"

/** A placeholder block with a light sweep. Size it with classes, e.g. `h-4 w-32`. */
function SkeletonShimmer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton-shimmer"
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-skeleton-shimmer after:bg-linear-to-r after:from-transparent after:via-foreground/[0.07] after:to-transparent motion-reduce:after:hidden",
        className
      )}
      {...props}
    />
  )
}

/**
 * Lines of placeholder text, the last one shorter. Wrap loading regions in an
 * element with `aria-busy="true"` and a visually hidden "Loading…" so screen
 * readers know content is coming.
 */
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonShimmer key={i} className={cn("h-3.5", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  )
}

export { SkeletonShimmer, SkeletonText }
