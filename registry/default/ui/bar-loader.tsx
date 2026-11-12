import * as React from "react"

import { cn } from "@/lib/utils"

interface BarLoaderProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Accessible name, e.g. "Loading results". */
  label?: string
}

/**
 * A thin indeterminate progress bar, e.g. at the top of a page or card while
 * something loads. Exposed as a progressbar without a value. With reduced
 * motion the bar pulses in place instead of sliding.
 */
function BarLoader({ label = "Loading", className, ...props }: BarLoaderProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      data-slot="bar-loader"
      className={cn("relative h-1 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <span className="absolute inset-y-0 left-0 w-1/3 animate-bar-loader rounded-full bg-primary motion-reduce:w-full motion-reduce:animate-pulse" />
    </div>
  )
}

export { BarLoader, type BarLoaderProps }
