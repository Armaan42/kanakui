"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Keyboard, type KeyboardKeyPress } from "@/registry/default/ui/keyboard"

export const meta = {
  title: "Typing practice",
  description: "The keyboard under a typing lesson: type the sentence (or click the keys) and correct letters turn dark as you go.",
}

const SENTENCE = "the quick ferry leaves at six"

export default function TypingPractice() {
  const [typed, setTyped] = React.useState("")
  const [mistakes, setMistakes] = React.useState(0)
  const done = typed.length === SENTENCE.length

  const onKeyPress = (key: KeyboardKeyPress) => {
    if (done) return
    const expected = SENTENCE[typed.length]
    const char = key.code === "Space" ? " " : key.code.startsWith("Key") ? key.code.slice(3).toLowerCase() : null
    if (char === null) return
    if (char === expected) setTyped((t) => t + char)
    else setMistakes((m) => m + 1)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Lesson 4 · Home row and spaces</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Type the sentence</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setTyped("")
            setMistakes(0)
          }}
        >
          <RotateCcw aria-hidden="true" />
          Start over
        </Button>
      </div>
      <p className="mt-6 rounded-xl border bg-card p-5 font-mono text-2xl tracking-wide" aria-label={`Sentence to type: ${SENTENCE}`}>
        <span>{typed}</span>
        <span className="text-muted-foreground underline decoration-foreground underline-offset-8">{SENTENCE[typed.length] ?? ""}</span>
        <span className="text-muted-foreground">{SENTENCE.slice(typed.length + 1)}</span>
      </p>
      <p role="status" className="mt-3 text-sm text-muted-foreground">
        {done ? `Done with ${mistakes} ${mistakes === 1 ? "mistake" : "mistakes"}.` : `${typed.length} of ${SENTENCE.length} characters · ${mistakes} mistakes`}
      </p>
      <Keyboard className="mt-8" onKeyPress={onKeyPress} />
    </div>
  )
}
