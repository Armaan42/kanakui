"use client"

import * as React from "react"
import { Check, Copy, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CopyState = "idle" | "copied" | "error"

interface CopyButtonProps {
  value: string
  /** Accessible name, e.g. "Copy install command". */
  label?: string
  /** Visible text. When set, renders a small text button instead of an icon button. */
  text?: string
  className?: string
}

export function CopyButton({ value, label = "Copy to clipboard", text, className }: CopyButtonProps) {
  const [state, setState] = React.useState<CopyState>("idle")

  React.useEffect(() => {
    if (state === "idle") return
    const timeout = setTimeout(() => setState("idle"), 2000)
    return () => clearTimeout(timeout)
  }, [state])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
    } catch {
      setState("error")
    }
  }

  const icon =
    state === "copied" ? <Check aria-hidden="true" /> : state === "error" ? <X aria-hidden="true" /> : <Copy aria-hidden="true" />

  return (
    <Button
      type="button"
      variant="ghost"
      size={text ? "sm" : "icon-sm"}
      onClick={copy}
      aria-label={text ? undefined : label}
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      {icon}
      {text ? (state === "copied" ? "Copied" : text) : null}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Copied" : state === "error" ? "Copy failed. Select the text and copy it manually." : ""}
      </span>
    </Button>
  )
}
