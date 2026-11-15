"use client"

import * as React from "react"
import {
  FastForward,
  Globe,
  LayoutGrid,
  Mic,
  Moon,
  Play,
  Rewind,
  Search,
  Sun,
  SunDim,
  Volume1,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

/** What `onKeyPress` receives. */
export interface KeyboardKeyPress {
  /** The `KeyboardEvent.code` of the key, e.g. `"KeyA"` or `"MetaLeft"`. */
  code: string
  /** Human-readable name, e.g. `"A"` or `"Command"`. */
  name: string
  /**
   * `click`: an on-screen key was clicked, tapped, or activated with Enter or
   * Space while focused. `keyboard`: the key was typed on a real keyboard.
   */
  source: "click" | "keyboard"
}

type Legend =
  | { kind: "char"; main: string }
  | { kind: "pair"; shift: string; main: string }
  | { kind: "word"; word: string; align: "left" | "right" }
  | { kind: "mod"; symbol: string; word: string }
  | { kind: "fn"; icon: LucideIcon; label: string }
  | { kind: "globe" }
  | { kind: "touch" }
  | { kind: "arrow"; dir: "up" | "down" | "left" | "right" }
  | { kind: "blank" }

interface KeyDef {
  code: string
  name: string
  /** Width in key units (a letter key is 1). */
  w?: number
  legend: Legend
}

const char = (code: string, main: string): KeyDef => ({ code, name: main, legend: { kind: "char", main } })
const pair = (code: string, shift: string, main: string, name = main): KeyDef => ({
  code,
  name,
  legend: { kind: "pair", shift, main },
})
const fnKey = (n: number, icon: LucideIcon): KeyDef => ({ code: `F${n}`, name: `F${n}`, legend: { kind: "fn", icon, label: `F${n}` } })
const mod = (code: string, name: string, symbol: string, w = 1): KeyDef => ({
  code,
  name,
  w,
  legend: { kind: "mod", symbol, word: name.toLowerCase() },
})

/** A compact Mac layout. Every row adds up to 14.5 key units. */
const ROWS: KeyDef[][] = [
  [
    { code: "Escape", name: "Escape", w: 1.5, legend: { kind: "word", word: "esc", align: "left" } },
    fnKey(1, SunDim),
    fnKey(2, Sun),
    fnKey(3, LayoutGrid),
    fnKey(4, Search),
    fnKey(5, Mic),
    fnKey(6, Moon),
    fnKey(7, Rewind),
    fnKey(8, Play),
    fnKey(9, FastForward),
    fnKey(10, VolumeX),
    fnKey(11, Volume1),
    fnKey(12, Volume2),
    { code: "TouchID", name: "Touch ID", legend: { kind: "touch" } },
  ],
  [
    pair("Backquote", "~", "`", "Backtick"),
    pair("Digit1", "!", "1"),
    pair("Digit2", "@", "2"),
    pair("Digit3", "#", "3"),
    pair("Digit4", "$", "4"),
    pair("Digit5", "%", "5"),
    pair("Digit6", "^", "6"),
    pair("Digit7", "&", "7"),
    pair("Digit8", "*", "8"),
    pair("Digit9", "(", "9"),
    pair("Digit0", ")", "0"),
    pair("Minus", "_", "-", "Minus"),
    pair("Equal", "+", "=", "Equals"),
    { code: "Backspace", name: "Delete", w: 1.5, legend: { kind: "word", word: "delete", align: "right" } },
  ],
  [
    { code: "Tab", name: "Tab", w: 1.5, legend: { kind: "word", word: "tab", align: "left" } },
    ..."QWERTYUIOP".split("").map((l) => char(`Key${l}`, l)),
    pair("BracketLeft", "{", "[", "Left bracket"),
    pair("BracketRight", "}", "]", "Right bracket"),
    pair("Backslash", "|", "\\", "Backslash"),
  ],
  [
    { code: "CapsLock", name: "Caps Lock", w: 1.75, legend: { kind: "word", word: "caps lock", align: "left" } },
    ..."ASDFGHJKL".split("").map((l) => char(`Key${l}`, l)),
    pair("Semicolon", ":", ";", "Semicolon"),
    pair("Quote", '"', "'", "Quote"),
    { code: "Enter", name: "Return", w: 1.75, legend: { kind: "word", word: "return", align: "right" } },
  ],
  [
    { code: "ShiftLeft", name: "Shift", w: 2.25, legend: { kind: "word", word: "shift", align: "left" } },
    ..."ZXCVBNM".split("").map((l) => char(`Key${l}`, l)),
    pair("Comma", "<", ",", "Comma"),
    pair("Period", ">", ".", "Period"),
    pair("Slash", "?", "/", "Slash"),
    { code: "ShiftRight", name: "Right Shift", w: 2.25, legend: { kind: "word", word: "shift", align: "right" } },
  ],
]

const BOTTOM_LEFT: KeyDef[] = [
  { code: "Fn", name: "Function", legend: { kind: "globe" } },
  mod("ControlLeft", "Control", "⌃"),
  mod("AltLeft", "Option", "⌥"),
  mod("MetaLeft", "Command", "⌘", 1.25),
  { code: "Space", name: "Space", w: 5, legend: { kind: "blank" } },
  mod("MetaRight", "Command", "⌘", 1.25),
  mod("AltRight", "Option", "⌥"),
]

const ARROWS = {
  left: { code: "ArrowLeft", name: "Left arrow", legend: { kind: "arrow", dir: "left" } },
  up: { code: "ArrowUp", name: "Up arrow", legend: { kind: "arrow", dir: "up" } },
  down: { code: "ArrowDown", name: "Down arrow", legend: { kind: "arrow", dir: "down" } },
  right: { code: "ArrowRight", name: "Right arrow", legend: { kind: "arrow", dir: "right" } },
} satisfies Record<string, KeyDef>

/** Keys a real keyboard reports that this layout shows once. */
const ALIASES: Record<string, string> = { ControlRight: "ControlLeft", OSLeft: "MetaLeft", OSRight: "MetaRight" }

const NAMES = new Map([...ROWS.flat(), ...BOTTOM_LEFT, ...Object.values(ARROWS)].map((k) => [k.code, k.name]))

/** Width of a key `w` units wide, including the gaps it spans. */
const width = (w = 1) => `calc(var(--u) * ${w} + var(--g) * ${w - 1})`

function Triangle({ dir }: { dir: "up" | "down" | "left" | "right" }) {
  const rotate = { up: 0, right: 90, down: 180, left: 270 }[dir]
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className="size-[calc(var(--u)*0.2)]" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M5 2 9 8H1Z" fill="currentColor" />
    </svg>
  )
}

function KeyLegend({ legend, capsOn }: { legend: Legend; capsOn: boolean }) {
  const corner = "absolute text-[calc(var(--u)*0.19)] leading-none"
  switch (legend.kind) {
    case "char":
      return <span className="m-auto text-[calc(var(--u)*0.25)] leading-none">{legend.main}</span>
    case "pair":
      return (
        <span className="m-auto flex flex-col items-center gap-[calc(var(--u)*0.08)] text-[calc(var(--u)*0.21)] leading-none">
          <span>{legend.shift}</span>
          <span>{legend.main}</span>
        </span>
      )
    case "word":
      return (
        <>
          {legend.word === "caps lock" ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-[calc(var(--u)*0.14)] left-[calc(var(--u)*0.16)] size-[calc(var(--u)*0.09)] rounded-full transition-colors",
                capsOn ? "bg-emerald-500 shadow-[0_0_6px_1px_rgb(16_185_129/0.7)]" : "bg-neutral-300 dark:bg-neutral-600"
              )}
            />
          ) : null}
          <span
            className={cn(
              corner,
              "bottom-[calc(var(--u)*0.14)]",
              legend.align === "left" ? "left-[calc(var(--u)*0.16)]" : "right-[calc(var(--u)*0.16)]"
            )}
          >
            {legend.word}
          </span>
        </>
      )
    case "mod":
      return (
        <>
          <span className={cn(corner, "top-[calc(var(--u)*0.14)] left-[calc(var(--u)*0.16)]")}>{legend.symbol}</span>
          <span className={cn(corner, "bottom-[calc(var(--u)*0.14)] left-[calc(var(--u)*0.16)]")}>{legend.word}</span>
        </>
      )
    case "fn": {
      const Icon = legend.icon
      return (
        <span className="m-auto flex flex-col items-center gap-[calc(var(--u)*0.07)] text-[calc(var(--u)*0.18)] leading-none">
          <Icon aria-hidden="true" className="size-[calc(var(--u)*0.2)]" strokeWidth={1.75} />
          {legend.label}
        </span>
      )
    }
    case "globe":
      return (
        <>
          <span className={cn(corner, "top-[calc(var(--u)*0.14)] left-[calc(var(--u)*0.16)]")}>fn</span>
          <Globe
            aria-hidden="true"
            strokeWidth={1.75}
            className="absolute bottom-[calc(var(--u)*0.13)] left-[calc(var(--u)*0.15)] size-[calc(var(--u)*0.22)]"
          />
        </>
      )
    case "touch":
      return <span aria-hidden="true" className="m-auto size-[calc(var(--u)*0.52)] rounded-full ring-1 ring-neutral-300 dark:ring-neutral-600" />
    case "arrow":
      return (
        <span className="m-auto">
          <Triangle dir={legend.dir} />
        </span>
      )
    default:
      return null
  }
}

/** A short, soft "thock": filtered noise with a fast decay, generated on the fly. */
function useClickSound(enabled: boolean) {
  const context = React.useRef<AudioContext | null>(null)
  return React.useCallback(() => {
    if (!enabled || typeof window === "undefined") return
    const ac = (context.current ??= new AudioContext())
    const length = Math.floor(ac.sampleRate * 0.035)
    const buffer = ac.createBuffer(1, length, ac.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 4
    const source = ac.createBufferSource()
    source.buffer = buffer
    const filter = ac.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 1800 + Math.random() * 700
    filter.Q.value = 0.9
    const gain = ac.createGain()
    gain.gain.value = 0.35
    source.connect(filter).connect(gain).connect(ac.destination)
    source.start()
  }, [enabled])
}

/** The key next to `from` in an arrow-key direction, judged by on-screen position. */
function neighbor(from: HTMLElement, key: string, keys: HTMLElement[]) {
  const a = from.getBoundingClientRect()
  const ax = a.left + a.width / 2
  const ay = a.top + a.height / 2
  let best: HTMLElement | undefined
  let bestScore = Infinity
  for (const el of keys) {
    if (el === from) continue
    const r = el.getBoundingClientRect()
    const dx = r.left + r.width / 2 - ax
    const dy = r.top + r.height / 2 - ay
    const along = key === "ArrowRight" ? dx : key === "ArrowLeft" ? -dx : key === "ArrowDown" ? dy : -dy
    if (along <= 1) continue
    const across = key === "ArrowRight" || key === "ArrowLeft" ? Math.abs(dy) : Math.abs(dx)
    const score = along + across * 3
    if (score < bestScore) {
      bestScore = score
      best = el
    }
  }
  return best
}

export interface KeyboardProps extends Omit<React.ComponentProps<"div">, "onKeyPress"> {
  /** Called for every key press, from a click or tap or from the user's real keyboard. */
  onKeyPress?: (key: KeyboardKeyPress) => void
  /** Light up keys as they are pressed on the user's real keyboard. */
  listen?: boolean
  /** Play a soft click sound for each press. */
  sound?: boolean
}

/**
 * A compact keyboard whose keys press down when clicked or tapped, and light
 * up as you type on your own keyboard. It scales to its container's width.
 * Keys are real buttons: Tab moves into the keyboard, the arrow keys move
 * between keys, and Enter or Space presses the focused key.
 */
export function Keyboard({ onKeyPress, listen = true, sound = false, className, style, ...props }: KeyboardProps) {
  const [pressed, setPressed] = React.useState<ReadonlySet<string>>(() => new Set())
  const [capsOn, setCapsOn] = React.useState(false)
  const [focusCode, setFocusCode] = React.useState("Escape")
  const groupRef = React.useRef<HTMLDivElement>(null)
  const click = useClickSound(sound)
  const onKeyPressRef = React.useRef(onKeyPress)

  React.useEffect(() => {
    onKeyPressRef.current = onKeyPress
  }, [onKeyPress])

  const press = React.useCallback((code: string) => setPressed((all) => new Set(all).add(code)), [])
  const release = React.useCallback(
    (code: string) =>
      setPressed((all) => {
        if (!all.has(code)) return all
        const next = new Set(all)
        next.delete(code)
        return next
      }),
    []
  )

  // The user's real keyboard.
  React.useEffect(() => {
    if (!listen) return
    // Presses inside the component are arrow navigation or activating a
    // focused key; the key's own click handler reports those.
    const inside = (event: KeyboardEvent) => event.target instanceof Node && Boolean(groupRef.current?.contains(event.target))
    const onDown = (event: KeyboardEvent) => {
      if (inside(event)) return
      const code = ALIASES[event.code] ?? event.code
      if (!NAMES.has(code)) return
      if (!event.repeat) {
        click()
        onKeyPressRef.current?.({ code, name: NAMES.get(code) ?? code, source: "keyboard" })
      }
      press(code)
      setCapsOn(event.getModifierState?.("CapsLock") ?? false)
    }
    const onUp = (event: KeyboardEvent) => {
      const code = ALIASES[event.code] ?? event.code
      // While ⌘ is held, macOS doesn't send keyup for other keys: clear them all.
      if (code === "MetaLeft" || code === "MetaRight") setPressed(new Set())
      else release(code)
      setCapsOn(event.getModifierState?.("CapsLock") ?? false)
    }
    const clear = () => setPressed(new Set())
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    window.addEventListener("blur", clear)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
      window.removeEventListener("blur", clear)
    }
  }, [listen, click, press, release])

  const onArrowNavigate = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return
    const from = event.target
    if (!(from instanceof HTMLElement) || !from.dataset.code) return
    const keys = [...(groupRef.current?.querySelectorAll<HTMLElement>("[data-code]") ?? [])]
    const next = neighbor(from, event.key, keys)
    if (!next) return
    event.preventDefault()
    next.focus()
  }

  const renderKey = (key: KeyDef, height = "var(--u)") => {
    const isPressed = pressed.has(key.code)
    return (
      <button
        key={key.code}
        type="button"
        data-code={key.code}
        data-pressed={isPressed || undefined}
        aria-label={key.name}
        aria-pressed={key.code === "CapsLock" ? capsOn : undefined}
        tabIndex={focusCode === key.code ? 0 : -1}
        onFocus={() => setFocusCode(key.code)}
        onPointerDown={() => press(key.code)}
        onPointerUp={() => release(key.code)}
        onPointerLeave={() => release(key.code)}
        onPointerCancel={() => release(key.code)}
        onClick={(event) => {
          if (key.code === "CapsLock") setCapsOn((on) => !on)
          // Activated with Enter or Space while focused: show a brief press.
          if (event.detail === 0) {
            press(key.code)
            setTimeout(() => release(key.code), 120)
          }
          click()
          onKeyPress?.({ code: key.code, name: key.name, source: "click" })
        }}
        className={cn(
          "relative flex shrink-0 cursor-pointer rounded-[calc(var(--u)*0.15)] text-neutral-700 outline-none select-none",
          "bg-linear-to-b from-white to-neutral-50 shadow-[0_0_0_1px_rgb(0_0_0/0.07),0_1.5px_0_rgb(0_0_0/0.13),0_3px_4px_-2px_rgb(0_0_0/0.2)]",
          "transition-[translate,box-shadow,background-color] duration-75 hover:from-neutral-50 motion-reduce:transition-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "data-pressed:translate-y-[1.5px] data-pressed:from-neutral-100 data-pressed:to-neutral-100 data-pressed:shadow-[0_0_0_1px_rgb(0_0_0/0.08),inset_0_1px_2px_rgb(0_0_0/0.14)]",
          "dark:from-neutral-700 dark:to-neutral-800 dark:text-neutral-200 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.06),0_1.5px_0_rgb(0_0_0/0.7),0_3px_5px_-2px_rgb(0_0_0/0.6)] dark:hover:from-neutral-600",
          "dark:data-pressed:from-neutral-800 dark:data-pressed:to-neutral-800 dark:data-pressed:shadow-[0_0_0_1px_rgb(255_255_255/0.05),inset_0_1px_3px_rgb(0_0_0/0.6)]"
        )}
        style={{ width: width(key.w), height }}
      >
        <KeyLegend legend={key.legend} capsOn={capsOn} />
      </button>
    )
  }

  const half = "calc((var(--u) - var(--g)) / 2)"

  return (
    <div data-slot="keyboard" className={cn("@container w-full", className)} style={style} {...props}>
      <div
        ref={groupRef}
        role="group"
        aria-label="Keyboard"
        onKeyDown={onArrowNavigate}
        className="mx-auto flex w-fit flex-col gap-(--g) rounded-[calc(var(--u)*0.45)] bg-neutral-200 p-(--p) shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_0_0_1px_rgb(0_0_0/0.06),0_24px_48px_-24px_rgb(0_0_0/0.35)] dark:bg-neutral-900 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(255_255_255/0.08),0_24px_48px_-24px_rgb(0_0_0/0.8)]"
        style={
          {
            "--u": "min(6.15cqw, 3.25rem)",
            "--g": "calc(var(--u) * 0.09)",
            "--p": "calc(var(--u) * 0.22)",
          } as React.CSSProperties
        }
      >
        {ROWS.map((row, i) => (
          <div key={i} className="flex gap-(--g)">
            {row.map((key) => renderKey(key, i === 0 ? "calc(var(--u) * 0.82)" : undefined))}
          </div>
        ))}
        <div className="flex gap-(--g)">
          {BOTTOM_LEFT.map((key) => renderKey(key))}
          <div className="flex items-end gap-(--g)">
            {renderKey(ARROWS.left)}
            <div className="flex flex-col gap-(--g)">
              {renderKey(ARROWS.up, half)}
              {renderKey(ARROWS.down, half)}
            </div>
            {renderKey(ARROWS.right)}
          </div>
        </div>
      </div>
    </div>
  )
}
