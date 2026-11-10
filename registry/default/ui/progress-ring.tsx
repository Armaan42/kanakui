import * as React from "react"

import { cn } from "@/lib/utils"

interface ProgressRingProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Progress from 0 to `max`. */
  value: number
  max?: number
  /** Diameter in pixels. */
  size?: number
  /** Ring thickness in pixels. */
  strokeWidth?: number
  /** Accessible name, e.g. "Upload progress". */
  label: string
  /** Content in the middle. Defaults to the percentage. */
  children?: React.ReactNode
}

/**
 * Circular progress with the value in the middle. Exposed as a progressbar
 * with its current value. The ring animates between values unless the user
 * prefers reduced motion.
 */
function ProgressRing({ value, max = 100, size = 96, strokeWidth = 8, label, children, className, ...props }: ProgressRingProps) {
  const clamped = Math.min(Math.max(value, 0), max)
  const percent = Math.round((clamped / max) * 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      data-slot="progress-ring"
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / max)}
          className="stroke-foreground transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
        />
      </svg>
      <span aria-hidden="true" className="absolute text-sm font-semibold tabular-nums">
        {children ?? `${percent}%`}
      </span>
    </div>
  )
}

export { ProgressRing, type ProgressRingProps }
