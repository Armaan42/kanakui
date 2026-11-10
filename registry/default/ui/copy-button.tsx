"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

interface CopyButtonProps extends Omit<React.ComponentProps<"button">, "value" | "onCopy"> {
  /** Text to copy. */
  value: string
  /** Milliseconds the "copied" state is shown. */
  timeout?: number
  /** Called after a successful copy. */
  onCopy?: (value: string) => void
}

/**
 * Copies `value` to the clipboard and confirms with a check mark. The result
 * ("Copied" or "Copy failed") is announced to screen readers. Pass children
 * for a text button, or none for an icon button with an `aria-label`.
 */
function CopyButton({ value, timeout = 2000, onCopy, className, children, type = "button", ...props }: CopyButtonProps) {
  const [state, setState] = React.useState<"idle" | "copied" | "failed">("idle")

  React.useEffect(() => {
    if (state === "idle") return
    const timer = setTimeout(() => setState("idle"), timeout)
    return () => clearTimeout(timer)
  }, [state, timeout])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
      onCopy?.(value)
    } catch {
      setState("failed")
    }
  }

  return (
    <button
      type={type}
      data-slot="copy-button"
      data-state={state}
      onClick={copy}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md border bg-background px-2 text-sm font-medium outline-none",
        "transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      {state === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {children}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  )
}

export { CopyButton, type CopyButtonProps }
