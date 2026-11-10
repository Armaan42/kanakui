"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingProps {
  /** Accessible name, e.g. "Rate this template". */
  label: string
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  /** Number of stars. */
  max?: number
  /** Show the value without letting people change it. */
  readOnly?: boolean
  className?: string
}

/**
 * Star rating built on native radio buttons, so arrow keys, Tab and screen
 * readers work out of the box. Hovering previews a value. In read-only mode
 * it is a single labelled image ("4 out of 5 stars").
 */
function Rating({ label, value: controlled, defaultValue = 0, onValueChange, max = 5, readOnly = false, className }: RatingProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [hover, setHover] = React.useState<number | null>(null)
  const value = controlled ?? internal
  const name = React.useId()
  const shown = hover ?? value

  const stars = Array.from({ length: max }, (_, i) => i + 1)

  if (readOnly) {
    return (
      <div role="img" aria-label={`${label}: ${value} out of ${max} stars`} data-slot="rating" className={cn("flex gap-0.5", className)}>
        {stars.map((star) => (
          <Star key={star} aria-hidden="true" className={cn("size-5", star <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")} />
        ))}
      </div>
    )
  }

  return (
    <fieldset data-slot="rating" className={cn("inline-block", className)} onPointerLeave={() => setHover(null)}>
      <legend className="sr-only">{label}</legend>
      <div className="flex gap-0.5">
        {stars.map((star) => (
          <label key={star} className="cursor-pointer" onPointerEnter={() => setHover(star)}>
            <input
              type="radio"
              name={name}
              value={star}
              checked={value === star}
              onChange={() => {
                if (controlled === undefined) setInternal(star)
                onValueChange?.(star)
              }}
              className="peer sr-only"
            />
            <span className="sr-only">
              {star} {star === 1 ? "star" : "stars"}
            </span>
            <Star
              aria-hidden="true"
              className={cn(
                "size-6 rounded-sm transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                star <= shown ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
              )}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export { Rating, type RatingProps }
