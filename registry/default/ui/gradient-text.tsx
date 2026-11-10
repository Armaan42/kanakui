import * as React from "react"

import { cn } from "@/lib/utils"

interface GradientTextProps extends React.ComponentProps<"span"> {
  /** Colors of the gradient, left to right. Defaults to a subtle sheen in the text color. */
  colors?: string[]
  /** Slowly move the gradient across the text. */
  animate?: boolean
}

/**
 * Text filled with a gradient. By default it is a quiet sheen of the current
 * foreground color, so it works in light and dark themes. The text stays real
 * text; the movement stops when the user prefers reduced motion.
 */
function GradientText({ colors, animate = true, className, style, ...props }: GradientTextProps) {
  const stops = colors?.length
    ? [...colors, colors[0]].join(", ")
    : "var(--foreground), color-mix(in oklch, var(--foreground) 45%, transparent), var(--foreground)"

  return (
    <span
      data-slot="gradient-text"
      className={cn(
        "inline-block bg-size-[200%_auto] bg-clip-text text-transparent",
        animate && "animate-gradient-text motion-reduce:animate-none",
        className
      )}
      style={{ backgroundImage: `linear-gradient(90deg, ${stops})`, ...style }}
      {...props}
    />
  )
}

export { GradientText, type GradientTextProps }
