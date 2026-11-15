"use client"

import * as React from "react"

import { Keyboard, type KeyboardKeyPress, type KeyboardSound } from "@/registry/default/ui/keyboard"
import { cn } from "@/lib/utils"

const SOUNDS: { value: KeyboardSound | "off"; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "thock", label: "Thock" },
  { value: "clicky", label: "Clicky" },
]

export default function KeyboardDemo() {
  const [recent, setRecent] = React.useState<(KeyboardKeyPress & { id: number })[]>([])
  const [sound, setSound] = React.useState<KeyboardSound | "off">("thock")
  const nextId = React.useRef(0)

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="flex min-h-7 flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {recent.length === 0
            ? "Click a key, or type on your keyboard."
            : recent.map((key) => (
                <kbd key={key.id} className="rounded-md border bg-muted px-1.5 py-0.5 font-sans text-xs text-foreground">
                  {key.name}
                </kbd>
              ))}
        </p>
        <div role="group" aria-label="Sound" className="flex shrink-0 items-center gap-0.5 rounded-lg border p-0.5 text-xs">
          {SOUNDS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={sound === option.value}
              onClick={() => setSound(option.value)}
              className={cn(
                "rounded-md px-2.5 py-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                sound === option.value ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <Keyboard
        sound={sound === "off" ? false : sound}
        onKeyPress={(key) => setRecent((all) => [...all, { ...key, id: nextId.current++ }].slice(-8))}
      />
    </div>
  )
}
