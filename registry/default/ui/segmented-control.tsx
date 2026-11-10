"use client"

import * as React from "react"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface SegmentedControlOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

interface SegmentedControlProps {
  options: SegmentedControlOption[]
  /** Controlled value. */
  value?: string
  /** Initial value when uncontrolled. Defaults to the first option. */
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Accessible name for the group, e.g. "View". */
  label: string
  className?: string
}

/**
 * A single-choice control with a highlight that slides to the selected
 * option. Behaves like a radio group: Tab focuses the selected option, and
 * the arrow keys, Home and End move the selection.
 */
function SegmentedControl({
  options,
  value: controlled,
  defaultValue,
  onValueChange,
  label,
  className,
}: SegmentedControlProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? options[0]?.value)
  const value = controlled ?? uncontrolled
  const reduceMotion = useReducedMotion()
  const groupId = React.useId()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  function select(next: string) {
    if (controlled === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0)
    const position = enabled.indexOf(index)
    const target =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? enabled[(position + 1) % enabled.length]
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? enabled[(position - 1 + enabled.length) % enabled.length]
      : event.key === "Home" ? enabled[0]
      : event.key === "End" ? enabled[enabled.length - 1]
      : undefined
    if (target === undefined) return
    event.preventDefault()
    const option = options[target]
    if (!option) return
    select(option.value)
    refs.current[target]?.focus()
  }

  return (
    <LayoutGroup id={groupId}>
      <div
        role="radiogroup"
        aria-label={label}
        data-slot="segmented-control"
        className={cn("inline-flex items-center gap-1 rounded-lg border bg-muted/50 p-1", className)}
      >
        {options.map((option, index) => {
          const selected = option.value === value
          return (
            <button
              key={option.value}
              ref={(node) => {
                refs.current[index] = node
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              disabled={option.disabled}
              onClick={() => select(option.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
                selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="segmented-control-indicator"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md bg-background shadow-xs"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                />
              ) : null}
              <span className="relative">{option.label}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

export { SegmentedControl, type SegmentedControlOption, type SegmentedControlProps }
