import * as React from "react"

import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.ComponentProps<"div"> {
  /** Three blob colors. Defaults to soft indigo, cyan and emerald. */
  colors?: [string, string, string]
  /** Overall strength, 0–1. */
  intensity?: number
}

const DEFAULT_COLORS: [string, string, string] = ["oklch(0.62 0.19 270)", "oklch(0.75 0.13 210)", "oklch(0.75 0.15 160)"]

/**
 * Soft, blurred color fields that drift slowly behind its children, like an
 * aurora. Kept subtle by default so text stays readable. Still with reduced
 * motion.
 */
function AuroraBackground({ colors = DEFAULT_COLORS, intensity = 0.35, className, children, ...props }: AuroraBackgroundProps) {
  const blobs = [
    "top-[-20%] left-[-10%] h-[70%] w-[60%]",
    "top-[10%] right-[-15%] h-[65%] w-[55%] [animation-delay:-6s]",
    "bottom-[-25%] left-[20%] h-[60%] w-[60%] [animation-delay:-12s]",
  ]
  return (
    <div data-slot="aurora-background" className={cn("relative isolate overflow-hidden", className)} {...props}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: intensity }}>
        {blobs.map((position, i) => (
          <span
            key={i}
            className={cn("absolute animate-aurora rounded-full blur-3xl motion-reduce:animate-none", position)}
            style={{ background: colors[i] }}
          />
        ))}
      </div>
      {children}
    </div>
  )
}

export { AuroraBackground, type AuroraBackgroundProps }
