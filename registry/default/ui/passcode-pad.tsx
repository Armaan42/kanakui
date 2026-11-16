"use client"

import * as React from "react"
import { Delete, Lock, LockOpen } from "lucide-react"

import { cn } from "@/lib/utils"

interface PasscodePadProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  /** Number of digits. */
  length?: number
  /** Checks a complete code; return true to unlock. Can be async. */
  onSubmit: (code: string) => boolean | Promise<boolean>
  /** Heading above the dots. */
  title?: string
  /** Shown once unlocked. */
  successMessage?: string
}

const KEYS = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
] as const

/**
 * A lock-screen passcode pad. Tap the keys (or type digits; Backspace
 * deletes). A wrong code shakes the dots and clears; the right one unlocks.
 * Progress and the result are announced to screen readers.
 */
function PasscodePad({ length = 4, onSubmit, title = "Enter passcode", successMessage = "Unlocked", className, ...props }: PasscodePadProps) {
  const [digits, setDigits] = React.useState("")
  const [state, setState] = React.useState<"idle" | "checking" | "wrong" | "unlocked">("idle")
  const dotsRef = React.useRef<HTMLDivElement>(null)

  const press = async (digit: string) => {
    if (state === "checking" || state === "unlocked") return
    const next = (state === "wrong" ? "" : digits) + digit
    setState("idle")
    setDigits(next)
    if (next.length < length) return
    setState("checking")
    const ok = await onSubmit(next)
    if (ok) {
      setState("unlocked")
      return
    }
    setState("wrong")
    dotsRef.current?.animate(
      [0, -12, 10, -8, 6, -3, 0].map((x) => ({ transform: `translateX(${x}px)` })),
      { duration: 420, easing: "ease-out" }
    )
    setTimeout(() => setDigits(""), 420)
  }

  const remove = () => {
    if (state === "checking" || state === "unlocked") return
    setState("idle")
    setDigits((d) => d.slice(0, -1))
  }

  const status =
    state === "unlocked"
      ? successMessage
      : state === "wrong"
        ? "Wrong passcode. Try again."
        : `${digits.length} of ${length} digits entered`

  return (
    <div
      data-slot="passcode-pad"
      className={cn("flex w-full max-w-[18rem] flex-col items-center gap-7 select-none", className)}
      onKeyDown={(event) => {
        if (/^\d$/.test(event.key)) {
          event.preventDefault()
          void press(event.key)
        } else if (event.key === "Backspace") {
          event.preventDefault()
          remove()
        }
      }}
      {...props}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-full transition-colors",
            state === "unlocked" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
          )}
        >
          {state === "unlocked" ? <LockOpen aria-hidden="true" className="size-5" /> : <Lock aria-hidden="true" className="size-5" />}
        </span>
        <p className="text-base font-medium">{state === "unlocked" ? successMessage : title}</p>
        <div ref={dotsRef} aria-hidden="true" className="flex gap-4">
          {Array.from({ length }, (_, i) => (
            <span
              key={i}
              className={cn(
                "size-3.5 rounded-full border-2 transition-colors duration-150",
                state === "unlocked"
                  ? "border-emerald-500 bg-emerald-500"
                  : state === "wrong"
                    ? "border-red-500 bg-red-500"
                    : i < digits.length
                      ? "border-foreground bg-foreground"
                      : "border-foreground/40"
              )}
            />
          ))}
        </div>
        <p role="status" className="sr-only">
          {status}
        </p>
      </div>

      <div role="group" aria-label="Keypad" className="grid grid-cols-3 gap-4">
        {KEYS.map(([digit, letters]) => (
          <KeyButton key={digit} onPress={() => void press(digit)} label={digit} letters={letters} disabled={state === "unlocked"} />
        ))}
        <span />
        <KeyButton onPress={() => void press("0")} label="0" letters="" disabled={state === "unlocked"} />
        <button
          type="button"
          aria-label="Delete"
          onClick={remove}
          disabled={state === "unlocked" || digits.length === 0}
          className="grid size-[4.5rem] place-items-center rounded-full text-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-30"
        >
          <Delete aria-hidden="true" className="size-6" />
        </button>
      </div>
    </div>
  )
}

function KeyButton({ onPress, label, letters, disabled }: { onPress: () => void; label: string; letters: string; disabled: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onPress}
      disabled={disabled}
      className="flex size-[4.5rem] flex-col items-center justify-center rounded-full bg-muted/70 text-foreground transition-colors outline-none hover:bg-muted active:bg-foreground/15 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
    >
      <span className="text-[1.7rem] leading-none font-light">{label}</span>
      {letters ? <span className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground">{letters}</span> : null}
    </button>
  )
}

export { PasscodePad }
