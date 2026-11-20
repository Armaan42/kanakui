"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Op = "+" | "−" | "×" | "÷"

const SEGMENTS: Record<string, string> = {
  "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcdfg", "-": "g", E: "adefg", " ": "",
}
const SHAPES: Record<string, string> = {
  a: "M2.4 0.6h7.2l-1 1.6h-5.2z",
  b: "M10.2 1.2l-1.1 1.6v6.2l1.1 0.9z",
  c: "M10.2 10.1l-1.1 0.9v6.2l1.1 1.6z",
  d: "M2.4 19.4h7.2l-1 -1.6h-5.2z",
  e: "M1.8 10.1l1.1 0.9v6.2l-1.1 1.6z",
  f: "M1.8 1.2l1.1 1.6v6.2l-1.1 0.9z",
  g: "M2.6 10l1-0.8h4.8l1 0.8-1 0.8h-4.8z",
}

function Digit({ char, dot }: { char: string; dot: boolean }) {
  const lit = SEGMENTS[char] ?? ""
  return (
    <svg viewBox="0 0 13 20" className="h-full w-auto">
      <g transform="skewX(-6) translate(1.5 0)">
        {Object.entries(SHAPES).map(([name, d]) => (
          <path key={name} d={d} className={lit.includes(name) ? "fill-neutral-900" : "fill-neutral-900/[0.07]"} />
        ))}
      </g>
      <circle cx="12" cy="18.8" r="0.9" className={dot ? "fill-neutral-900" : "fill-neutral-900/[0.07]"} />
    </svg>
  )
}

const MAX = 8

function format(value: number) {
  if (!Number.isFinite(value) || Math.abs(value) >= 10 ** MAX) return "E"
  if (Math.abs(value) < 1e-7) return "0"
  const whole = String(Math.trunc(Math.abs(value))).length
  return String(Number(value.toFixed(Math.max(0, MAX - whole))))
}

function compute(a: number, op: Op, b: number) {
  if (op === "+") return a + b
  if (op === "−") return a - b
  if (op === "×") return a * b
  return b === 0 ? Infinity : a / b
}

const KEYS: { label: string; kind: "digit" | "op" | "fn" | "eq"; wide?: boolean; name?: string }[] = [
  { label: "C", kind: "fn", name: "Clear" }, { label: "±", kind: "fn", name: "Change sign" }, { label: "%", kind: "fn", name: "Percent" }, { label: "÷", kind: "op", name: "Divide" },
  { label: "7", kind: "digit" }, { label: "8", kind: "digit" }, { label: "9", kind: "digit" }, { label: "×", kind: "op", name: "Multiply" },
  { label: "4", kind: "digit" }, { label: "5", kind: "digit" }, { label: "6", kind: "digit" }, { label: "−", kind: "op", name: "Subtract" },
  { label: "1", kind: "digit" }, { label: "2", kind: "digit" }, { label: "3", kind: "digit" }, { label: "+", kind: "op", name: "Add" },
  { label: "0", kind: "digit", wide: true }, { label: ".", kind: "digit", name: "Decimal point" }, { label: "=", kind: "eq", name: "Equals" },
]
const KEYBOARD: Record<string, string> = { "+": "+", "-": "−", "*": "×", x: "×", "/": "÷", "=": "=", Enter: "=", Escape: "C", Delete: "C", "%": "%" }

/**
 * An 80s solar calculator with a seven-segment LCD. It works like a pocket
 * calculator: eight digits, chained operations, and E for errors. Type on
 * your keyboard while a key has focus.
 */
function RetroCalculator({ className, ...props }: React.ComponentProps<"div">) {
  const [entry, setEntry] = React.useState("0")
  const [stored, setStored] = React.useState<number | null>(null)
  const [op, setOp] = React.useState<Op | null>(null)
  const [fresh, setFresh] = React.useState(true)
  const [pressed, setPressed] = React.useState<string | null>(null)

  const error = entry === "E"

  const press = (key: string) => {
    if (key === "C") {
      setEntry("0")
      setStored(null)
      setOp(null)
      setFresh(true)
      return
    }
    if (error) return
    const value = Number(entry)
    if (/^[\d.]$/.test(key)) {
      if (fresh) {
        setEntry(key === "." ? "0." : key)
        setFresh(false)
        return
      }
      if (key === "." && entry.includes(".")) return
      if (entry.replace(/[-.]/g, "").length >= MAX) return
      setEntry(entry === "0" && key !== "." ? key : entry + key)
      return
    }
    if (key === "±") return setEntry(format(-value))
    if (key === "%") return setEntry(format(stored !== null && (op === "+" || op === "−") ? (stored * value) / 100 : value / 100))
    if (key === "=") {
      if (stored === null || !op) return
      setEntry(format(compute(stored, op, value)))
      setStored(null)
      setOp(null)
      setFresh(true)
      return
    }
    const next = key as Op
    const result = stored !== null && op && !fresh ? compute(stored, op, value) : value
    setEntry(format(result))
    setStored(result)
    setOp(next)
    setFresh(true)
  }

  // Lay the display out right-aligned, with the decimal point riding on the digit before it.
  const cells: { char: string; dot: boolean }[] = []
  for (const char of entry) {
    if (char === ".") {
      if (cells.length) cells[cells.length - 1].dot = true
      else cells.push({ char: "0", dot: true })
    } else cells.push({ char, dot: false })
  }
  const display = [...Array.from({ length: Math.max(0, MAX + 1 - cells.length) }, () => ({ char: " ", dot: false })), ...cells]

  return (
    <div
      data-slot="retro-calculator"
      onKeyDown={(event) => {
        const key = /^[\d.]$/.test(event.key) ? event.key : KEYBOARD[event.key]
        if (!key) return
        event.preventDefault()
        setPressed(key)
        press(key)
      }}
      onKeyUp={() => setPressed(null)}
      className={cn("w-72 max-w-full rounded-[1.75rem] bg-linear-to-b from-stone-300 to-stone-400 p-4 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.6)]", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-stone-700">SOLAR 8</span>
        <span aria-hidden="true" className="flex h-5 w-24 gap-px overflow-hidden rounded-sm bg-amber-950 p-0.5">
          {[0, 1, 2, 3].map((cell) => (
            <span key={cell} className="flex-1 bg-linear-to-b from-amber-900 to-stone-900" />
          ))}
        </span>
      </div>
      <div className="mt-3 rounded-lg bg-stone-700 p-1.5 shadow-[inset_0_2px_4px_rgb(0_0_0/0.6)]">
        <output aria-live="polite" aria-label={`Display: ${error ? "Error" : entry}`} className="flex h-14 items-center justify-end gap-px rounded-sm bg-[linear-gradient(170deg,#c4cbb4,#a7af95)] px-2 py-2 shadow-[inset_0_2px_6px_rgb(0_0_0/0.35)]">
          <span aria-hidden="true" className="mr-auto self-start font-mono text-[9px] font-bold text-neutral-900/70">
            {op ?? ""}
          </span>
          {display.map((cell, i) => (
            <span key={i} aria-hidden="true" className="h-full">
              <Digit char={cell.char} dot={cell.dot} />
            </span>
          ))}
        </output>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {KEYS.map((key) => (
          <button
            key={key.label}
            type="button"
            aria-label={key.name}
            data-pressed={pressed === key.label || undefined}
            onClick={() => press(key.label)}
            className={cn(
              "h-11 rounded-lg font-mono text-base font-bold shadow-[0_3px_0_var(--key-edge)] outline-none transition-transform duration-75 active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-500 data-pressed:translate-y-0.5 data-pressed:shadow-none",
              key.wide && "col-span-2",
              key.kind === "digit" && "bg-stone-100 text-stone-900 [--key-edge:#a8a29e]",
              key.kind === "op" && "bg-stone-700 text-stone-100 [--key-edge:#292524]",
              key.kind === "fn" && "bg-stone-500 text-white [--key-edge:#44403c]",
              key.kind === "eq" && "bg-orange-600 text-white [--key-edge:#9a3412]"
            )}
          >
            {key.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export { RetroCalculator }
