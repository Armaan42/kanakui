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
  className?: string
}

export function CopyButton({ value, label = "Copy to clipboard", className }: CopyButtonProps) {
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

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={copy}
      aria-label={label}
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      {state === "copied" ? <Check aria-hidden="true" /> : state === "error" ? <X aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Copied" : state === "error" ? "Copy failed. Select the text and copy it manually." : ""}
      </span>
    </Button>
  )
}
