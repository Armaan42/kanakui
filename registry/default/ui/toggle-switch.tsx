"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ToggleSwitchProps extends Omit<React.ComponentProps<"button">, "onChange" | "value"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Visible label. Without it, pass `aria-label`. */
  label?: React.ReactNode
  size?: "sm" | "md"
}

/**
 * An on/off switch (`role="switch"` with `aria-checked`) whose thumb slides
 * with a little overshoot. Clicking the label toggles it too. Space and Enter
 * work because it is a real button.
 */
function ToggleSwitch({ checked: controlled, defaultChecked = false, onCheckedChange, label, size = "md", className, id, disabled, ...props }: ToggleSwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked)
  const checked = controlled ?? internal
  const generatedId = React.useId()
  const switchId = id ?? generatedId
  const small = size === "sm"

  const toggle = () => {
    if (disabled) return
    if (controlled === undefined) setInternal(!checked)
    onCheckedChange?.(!checked)
  }

  return (
    <span data-slot="toggle-switch" className={cn("inline-flex items-center gap-2.5", className)}>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors outline-none",
          "focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          small ? "h-5 w-9" : "h-6 w-11",
          checked ? "bg-primary" : "bg-muted-foreground/30"
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
            small ? "size-4" : "size-5",
            checked ? (small ? "translate-x-4" : "translate-x-5") : "translate-x-0"
          )}
        />
      </button>
      {label ? (
        <label htmlFor={switchId} className={cn("text-sm select-none", disabled ? "opacity-50" : "cursor-pointer")}>
          {label}
        </label>
      ) : null}
    </span>
  )
}

export { ToggleSwitch, type ToggleSwitchProps }
