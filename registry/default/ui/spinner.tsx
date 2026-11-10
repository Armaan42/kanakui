import * as React from "react"

import { cn } from "@/lib/utils"

const SIZES = { sm: "size-4", md: "size-6", lg: "size-8" } as const

interface SpinnerProps extends Omit<React.ComponentProps<"span">, "children"> {
  size?: keyof typeof SIZES
  /** Announced to screen readers. */
  label?: string
}

/**
 * A circular loading indicator. Inherits the text color. Announced as a
 * status message. With reduced motion it spins slowly instead of stopping,
 * so it still reads as "in progress".
 */
function Spinner({ size = "md", label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span role="status" data-slot="spinner" className={cn("inline-flex", className)} {...props}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(SIZES[size], "animate-spin motion-reduce:[animation-duration:3s]")}
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path d="M21.5 12A9.5 9.5 0 0 0 12 2.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner, type SpinnerProps }
