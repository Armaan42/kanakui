import * as React from "react"

import { cn } from "@/lib/utils"

interface DotsLoaderProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Announced to screen readers. */
  label?: string
}

/**
 * Three dots that rise and fall in turn, e.g. for "typing…" or inline
 * loading. Dots inherit the text color and scale with the font size.
 * With reduced motion they fade instead of moving.
 */
function DotsLoader({ label = "Loading", className, ...props }: DotsLoaderProps) {
  return (
    <span role="status" data-slot="dots-loader" className={cn("inline-flex items-center gap-[0.25em]", className)} {...props}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          aria-hidden="true"
          className="size-[0.4em] animate-dots-loader rounded-full bg-current motion-reduce:animate-pulse"
          style={{ animationDelay: `${index * 0.15}s` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { DotsLoader, type DotsLoaderProps }
