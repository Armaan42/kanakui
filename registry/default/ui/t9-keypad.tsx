"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface T9KeypadProps extends React.ComponentProps<"div"> {
  defaultValue?: string
  /** Characters allowed, counted down on the screen like an old text message. */
  maxLength?: number
  /** How long to wait before a tapped letter is locked in, in milliseconds. */
  delay?: number
  onValueChange?: (text: string) => void
}

type Mode = "Abc" | "abc" | "ABC" | "123"

const LETTERS: Record<string, string> = { "1": ".,?!'1", "2": "abc2", "3": "def3", "4": "ghi4", "5": "jkl5", "6": "mno6", "7": "pqrs7", "8": "tuv8", "9": "wxyz9", "0": " 0" }
const MODES: Mode[] = ["Abc", "abc", "ABC", "123"]
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"]

/**
 * An old phone keypad with multi-tap typing: press 2 three times for "c", wait
 * a moment (or press another key) to lock it in. * deletes and # changes
 * between sentence case, lower case, capitals and numbers.
 */
function T9Keypad({ defaultValue = "", maxLength = 160, delay = 900, onValueChange, className, ...props }: T9KeypadProps) {
  const [text, setText] = React.useState(defaultValue)
  const [pending, setPending] = React.useState<{ key: string; index: number } | null>(null)
  const [mode, setMode] = React.useState<Mode>("Abc")
  const [lit, setLit] = React.useState<string | null>(null)
  const textRef = React.useRef(defaultValue)
  const pendingRef = React.useRef<{ key: string; index: number; at: number } | null>(null)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const charFor = (key: string, index: number, before: string) => {
    const options = LETTERS[key]
    const char = options[index % options.length]
    const sentenceStart = before.length === 0 || /[.!?]\s+$/.test(before)
    if (mode === "ABC" || (mode === "Abc" && sentenceStart)) return char.toUpperCase()
    return char
  }

  const write = (next: string) => {
    textRef.current = next
    setText(next)
    onValueChange?.(next)
  }

  const commit = () => {
    const current = pendingRef.current
    if (!current) return
    pendingRef.current = null
    setPending(null)
    window.clearTimeout(timer.current)
    write(textRef.current + charFor(current.key, current.index, textRef.current))
  }

  const press = (key: string, time: number) => {
    setLit(key)
    if (key === "#") {
      commit()
      setMode(MODES[(MODES.indexOf(mode) + 1) % MODES.length])
      return
    }
    if (key === "*") {
      if (pendingRef.current) {
        pendingRef.current = null
        setPending(null)
        window.clearTimeout(timer.current)
      } else write(textRef.current.slice(0, -1))
      return
    }
    const current = pendingRef.current
    if (current && current.key === key && time - current.at < delay && mode !== "123") {
      const next = { key, index: current.index + 1, at: time }
      pendingRef.current = next
      setPending({ key, index: next.index })
    } else {
      commit()
      if (textRef.current.length >= maxLength) return
      if (mode === "123") return write(textRef.current + key)
      pendingRef.current = { key, index: 0, at: time }
      setPending({ key, index: 0 })
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(commit, delay)
  }

  const preview = pending ? charFor(pending.key, pending.index, text) : ""
  const left = maxLength - text.length - (preview ? 1 : 0)

  return (
    <div
      data-slot="t9-keypad"
      onKeyDown={(event) => {
        const key = event.key === "Backspace" ? "*" : event.key
        if (!KEYS.includes(key) || event.repeat) return
        event.preventDefault()
        press(key, event.timeStamp)
      }}
      onKeyUp={() => setLit(null)}
      className={cn("w-64 max-w-full rounded-[2.25rem] bg-linear-to-b from-slate-600 via-slate-700 to-slate-900 p-4 pt-6 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.8),inset_0_2px_0_rgb(255_255_255/0.2)]", className)}
      {...props}
    >
      <span aria-hidden="true" className="mx-auto mb-3 block h-1.5 w-14 rounded-full bg-slate-950" />
      <div className="rounded-lg bg-slate-950 p-2">
        <div className="flex h-28 flex-col rounded-sm bg-[linear-gradient(170deg,#c8d6a6,#9fb37d)] p-2 font-mono text-neutral-900 shadow-[inset_0_2px_6px_rgb(0_0_0/0.45)]">
          <div className="flex justify-between text-[10px] font-bold">
            <span>{mode}</span>
            <span className="tabular-nums">{left}</span>
          </div>
          <output aria-live="polite" aria-label="Message" className="mt-1 line-clamp-4 text-sm leading-[1.15rem] break-words">
            {text}
            {preview ? <span className="bg-neutral-900 text-[#c8d6a6]">{preview}</span> : null}
            <span aria-hidden="true" className="animate-t9-keypad-caret motion-reduce:animate-none">
              ▏
            </span>
          </output>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-2.5">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            aria-label={key === "*" ? "Delete" : key === "#" ? `Mode: ${mode}` : `${key} ${LETTERS[key] === " 0" ? "space" : LETTERS[key].slice(0, -1)}`}
            data-lit={lit === key || undefined}
            onClick={(event) => press(key, event.timeStamp)}
            onPointerUp={() => setLit(null)}
            className="flex h-11 flex-col items-center justify-center rounded-[45%] bg-linear-to-b from-slate-200 to-slate-400 leading-none text-slate-900 shadow-[0_3px_0_#1e293b] outline-none transition-transform duration-75 active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-400 data-lit:translate-y-0.5 data-lit:shadow-none"
          >
            <span className="text-base font-bold">{key === "*" ? "⌫" : key === "#" ? "Aa" : key}</span>
            <span className="mt-0.5 text-[9px] font-semibold tracking-wider uppercase">
              {key === "0" ? "space" : key === "1" ? ".,?!" : key === "*" || key === "#" ? "" : LETTERS[key].slice(0, -1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { T9Keypad }
