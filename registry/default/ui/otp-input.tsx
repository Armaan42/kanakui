"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface OtpInputProps {
  /** Number of characters. */
  length?: number
  /** Controlled value. */
  value?: string
  /** Called with the full value whenever it changes. */
  onValueChange?: (value: string) => void
  /** Called once every box is filled. */
  onComplete?: (value: string) => void
  /** Accept letters as well as digits. */
  alphanumeric?: boolean
  /** Accessible name for the group, e.g. "Verification code". */
  label?: string
  disabled?: boolean
  className?: string
}

/**
 * One-time code entry as separate boxes. Typing moves forward, Backspace moves
 * back, the arrow keys move between boxes, and pasting a whole code fills
 * every box. The first box offers the OS's one-time-code autofill.
 */
function OtpInput({
  length = 6,
  value: controlled,
  onValueChange,
  onComplete,
  alphanumeric = false,
  label = "Verification code",
  disabled,
  className,
}: OtpInputProps) {
  const [uncontrolled, setUncontrolled] = React.useState("")
  const value = (controlled ?? uncontrolled).slice(0, length)
  const refs = React.useRef<(HTMLInputElement | null)[]>([])
  const pattern = alphanumeric ? /[^a-zA-Z0-9]/g : /\D/g

  function update(next: string) {
    const clean = next.replace(pattern, "").slice(0, length).toUpperCase()
    if (controlled === undefined) setUncontrolled(clean)
    onValueChange?.(clean)
    if (clean.length === length) onComplete?.(clean)
    return clean
  }

  function focus(index: number) {
    refs.current[Math.max(0, Math.min(index, length - 1))]?.focus()
  }

  function onInput(index: number, raw: string) {
    const typed = raw.replace(pattern, "")
    if (!typed) return
    const chars = value.padEnd(length, " ").split("")
    // Several characters at once (autofill or paste into one box) fill forward.
    typed.split("").forEach((char, offset) => {
      if (index + offset < length) chars[index + offset] = char
    })
    const next = update(chars.join("").replace(/\s+$/, ""))
    focus(Math.min(index + typed.length, next.length, length - 1))
  }

  function onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault()
      const chars = value.split("")
      if (chars[index]) {
        chars.splice(index, 1)
        update(chars.join(""))
        focus(index)
      } else if (index > 0) {
        chars.splice(index - 1, 1)
        update(chars.join(""))
        focus(index - 1)
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      focus(index - 1)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      focus(index + 1)
    }
  }

  function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const next = update(event.clipboardData.getData("text"))
    focus(next.length)
  }

  return (
    <div role="group" aria-label={label} data-slot="otp-input" className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node
          }}
          value={value[index] ?? ""}
          onChange={(event) => onInput(index, event.target.value.slice(-length))}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          onFocus={(event) => event.target.select()}
          inputMode={alphanumeric ? "text" : "numeric"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={length}
          disabled={disabled}
          aria-label={`Character ${index + 1} of ${length}`}
          className={cn(
            "size-11 rounded-lg border bg-transparent text-center font-mono text-lg outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
          )}
        />
      ))}
    </div>
  )
}

export { OtpInput, type OtpInputProps }
