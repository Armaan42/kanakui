"use client"

import * as React from "react"
import { Volume2, VolumeX } from "lucide-react"

import { Keyboard, type KeyboardKeyPress } from "@/registry/default/ui/keyboard"

export default function KeyboardDemo() {
  const [recent, setRecent] = React.useState<(KeyboardKeyPress & { id: number })[]>([])
  const [sound, setSound] = React.useState(false)
  const nextId = React.useRef(0)

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between gap-4">
        <p aria-live="polite" className="flex min-h-7 flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {recent.length === 0
            ? "Click a key, or type on your keyboard."
            : recent.map((key) => (
                <kbd key={key.id} className="rounded-md border bg-muted px-1.5 py-0.5 font-sans text-xs text-foreground">
                  {key.name}
                </kbd>
              ))}
        </p>
        <button
          type="button"
          aria-pressed={sound}
          onClick={() => setSound((on) => !on)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {sound ? <Volume2 aria-hidden="true" className="size-3.5" /> : <VolumeX aria-hidden="true" className="size-3.5" />}
          Sound {sound ? "on" : "off"}
        </button>
      </div>
      <Keyboard
        sound={sound}
        onKeyPress={(key) => setRecent((all) => [...all, { ...key, id: nextId.current++ }].slice(-8))}
      />
    </div>
  )
}
