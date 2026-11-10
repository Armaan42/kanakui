import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface SlideArrowButtonProps extends React.ComponentProps<"button"> {
  /** Icon that slides in on hover. Defaults to an arrow. */
  icon?: React.ReactNode
}

/**
 * A pill button whose icon slides in from the left while the label moves
 * aside, on hover or keyboard focus. The movement is skipped with reduced
 * motion (the icon simply appears).
 */
function SlideArrowButton({ icon, type = "button", className, children, ...props }: SlideArrowButtonProps) {
  return (
    <button
      type={type}
      data-slot="slide-arrow-button"
      className={cn(
        "group relative inline-flex h-10 items-center overflow-hidden rounded-full border bg-background px-5 text-sm font-medium outline-none",
        "transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute left-4 -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none [&_svg]:size-4"
      >
        {icon ?? <ArrowRight />}
      </span>
      <span className="transition-transform duration-300 group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none">
        {children}
      </span>
    </button>
  )
}

export { SlideArrowButton, type SlideArrowButtonProps }
