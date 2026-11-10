"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface NumberStepperProps {
  /** Visible label. */
  label: string
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

/**
 * A number field with − and + buttons, e.g. for quantities. Built on a
 * native number input, so arrow keys, typing and screen readers work as
 * usual. Values are clamped to `min`/`max`, and the buttons disable at the limits.
 */
function NumberStepper({ label, value: controlled, defaultValue = 0, onValueChange, min = 0, max = 99, step = 1, className }: NumberStepperProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const value = controlled ?? internal
  const id = React.useId()

  const set = (next: number) => {
    const clamped = Math.min(Math.max(next, min), max)
    if (controlled === undefined) setInternal(clamped)
    onValueChange?.(clamped)
  }

  const button =
    "inline-flex size-9 items-center justify-center text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-40"

  return (
    <div data-slot="number-stepper" className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex w-fit items-center overflow-hidden rounded-lg border">
        <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => set(value - step)} className={button}>
          <Minus aria-hidden="true" className="size-4" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (!Number.isNaN(next)) set(next)
          }}
          className="h-9 w-14 border-x bg-transparent text-center text-sm tabular-nums outline-none focus-visible:bg-muted/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button type="button" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => set(value + step)} className={button}>
          <Plus aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}

export { NumberStepper, type NumberStepperProps }
