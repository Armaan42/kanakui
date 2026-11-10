"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  /** Show a strength meter and hint under the field. */
  showStrength?: boolean
}

const LEVELS = ["Too short", "Weak", "Fair", "Good", "Strong"] as const

/**
 * A rough guide, not a security check: rewards length and character variety.
 * Enforce your real password policy on the server.
 */
function scorePassword(password: string): number {
  if (password.length < 8) return 0
  let score = 1
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) score++
  return Math.min(score, 4)
}

/**
 * A password field with a show/hide toggle and an optional strength meter.
 * The toggle is a labelled button with `aria-pressed`; the strength hint is
 * announced politely as it changes.
 */
function PasswordInput({ showStrength = false, className, value, defaultValue, onChange, id, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)
  const [internal, setInternal] = React.useState(String(defaultValue ?? ""))
  const current = value !== undefined ? String(value) : internal
  const score = scorePassword(current)
  const generatedId = React.useId()
  const hintId = `${id ?? generatedId}-strength`

  return (
    <div data-slot="password-input" className={cn("w-full space-y-2", className)}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={(event) => {
            if (value === undefined) setInternal(event.target.value)
            onChange?.(event)
          }}
          aria-describedby={showStrength ? hintId : undefined}
          className={cn(
            "h-10 w-full rounded-lg border bg-transparent pr-10 pl-3 text-sm outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:opacity-50"
          )}
          {...props}
        />
        <button
          type="button"
          aria-label="Show password"
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-1.5 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {visible ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
        </button>
      </div>
      {showStrength ? (
        <div className="space-y-1.5">
          <div aria-hidden="true" className="grid grid-cols-4 gap-1">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={cn(
                  "h-1 rounded-full bg-muted transition-colors",
                  current && step <= score && (score <= 1 ? "bg-destructive" : score === 2 ? "bg-amber-500" : "bg-emerald-500")
                )}
              />
            ))}
          </div>
          <p id={hintId} aria-live="polite" className="text-xs text-muted-foreground">
            {current ? `Strength: ${LEVELS[score]}` : "Use 12 or more characters with a mix of letters, numbers and symbols."}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export { PasswordInput, scorePassword, type PasswordInputProps }
