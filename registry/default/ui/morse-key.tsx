"use client"

import * as React from "react"
import { Eraser } from "lucide-react"

import { cn } from "@/lib/utils"

interface MorseKeyProps extends React.ComponentProps<"div"> {
  /** Length of a dot in milliseconds. A dash is a press longer than two dots. */
  unit?: number
  /** Play a tone while the key is down. */
  sound?: boolean
  defaultValue?: string
  onValueChange?: (text: string) => void
}

const LETTERS: Record<string, string> = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G", "....": "H", "..": "I",
  ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R",
  "...": "S", "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z",
  "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4", ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9",
}
const ALPHABET = Object.entries(LETTERS).filter(([, letter]) => /[A-Z]/.test(letter))

type Mark = { id: number; kind: "." | "-" | " " }

/**
 * A brass telegraph key. Tap for a dot, hold for a dash, pause to finish a
 * letter, and pause longer for a space. The paper tape shows what you sent.
 */
function MorseKey({ unit = 120, sound = true, defaultValue = "", onValueChange, className, ...props }: MorseKeyProps) {
  const [text, setText] = React.useState(defaultValue)
  const [pattern, setPattern] = React.useState("")
  const [down, setDown] = React.useState(false)
  const [tape, setTape] = React.useState<Mark[]>([])
  const [note, setNote] = React.useState("")
  const textRef = React.useRef(defaultValue)
  const patternRef = React.useRef("")
  const downAt = React.useRef<number | null>(null)
  const markId = React.useRef(0)
  const timers = React.useRef<{ letter?: number; word?: number }>({})
  const audio = React.useRef<{ ctx: AudioContext; gain: GainNode; tone: OscillatorNode } | null>(null)

  React.useEffect(
    () => () => {
      window.clearTimeout(timers.current.letter)
      window.clearTimeout(timers.current.word)
    },
    []
  )

  const write = (next: string) => {
    textRef.current = next
    setText(next)
    onValueChange?.(next)
  }

  const mark = (kind: Mark["kind"]) => {
    markId.current += 1
    const id = markId.current
    setTape((marks) => [...marks.slice(-39), { id, kind }])
  }

  const toneOn = () => {
    if (!sound) return
    try {
      const ctx = audio.current?.ctx ?? new AudioContext()
      const gain = ctx.createGain()
      const tone = ctx.createOscillator()
      tone.frequency.value = 640
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.008)
      tone.connect(gain).connect(ctx.destination)
      tone.start()
      audio.current = { ctx, gain, tone }
    } catch {
      // No Web Audio: key silently.
    }
  }

  const toneOff = () => {
    const current = audio.current
    if (!current) return
    const now = current.ctx.currentTime
    current.gain.gain.cancelScheduledValues(now)
    current.gain.gain.setValueAtTime(current.gain.gain.value, now)
    current.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012)
    current.tone.stop(now + 0.02)
  }

  const endLetter = () => {
    const sent = patternRef.current
    patternRef.current = ""
    setPattern("")
    const letter = LETTERS[sent]
    if (letter) {
      write(textRef.current + letter)
      setNote("")
    } else {
      setNote(`${sent.replaceAll(".", "·").replaceAll("-", "–")} isn't a letter.`)
    }
    timers.current.word = window.setTimeout(() => {
      if (textRef.current && !textRef.current.endsWith(" ")) {
        write(`${textRef.current} `)
        mark(" ")
      }
    }, unit * 9)
  }

  const press = (time: number) => {
    if (downAt.current !== null) return
    window.clearTimeout(timers.current.letter)
    window.clearTimeout(timers.current.word)
    downAt.current = time
    setDown(true)
    toneOn()
  }

  const release = (time: number) => {
    if (downAt.current === null) return
    const held = time - downAt.current
    downAt.current = null
    setDown(false)
    toneOff()
    const symbol = held < unit * 2.2 ? "." : "-"
    patternRef.current += symbol
    setPattern(patternRef.current)
    mark(symbol)
    timers.current.letter = window.setTimeout(endLetter, unit * 5)
  }

  const clear = () => {
    window.clearTimeout(timers.current.letter)
    window.clearTimeout(timers.current.word)
    patternRef.current = ""
    setPattern("")
    setTape([])
    setNote("")
    write("")
  }

  return (
    <div data-slot="morse-key" className={cn("flex w-80 max-w-full flex-col gap-4", className)} {...props}>
      {/* Paper tape. */}
      <div aria-hidden="true" className="relative h-9 overflow-hidden rounded-sm bg-[#f6efdc] shadow-[inset_0_1px_3px_rgb(0_0_0/0.25)]">
        <div className="absolute inset-y-0 right-3 flex items-center gap-1.5">
          {tape.map((item) =>
            item.kind === " " ? (
              <span key={item.id} className="w-4" />
            ) : (
              <span key={item.id} className={cn("h-2 rounded-full bg-neutral-800", item.kind === "." ? "w-2" : "w-6")} />
            )
          )}
        </div>
        <span className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-[#f6efdc] to-transparent" />
      </div>

      {/* The key. */}
      <button
        type="button"
        aria-label="Telegraph key. Hold Space: short for a dot, long for a dash."
        aria-pressed={down}
        onPointerDown={(event) => {
          if (event.button !== 0) return
          event.currentTarget.setPointerCapture(event.pointerId)
          press(event.timeStamp)
        }}
        onPointerUp={(event) => release(event.timeStamp)}
        onPointerCancel={(event) => release(event.timeStamp)}
        onKeyDown={(event) => {
          if (event.key !== " " && event.key !== "Enter") return
          event.preventDefault()
          if (!event.repeat) press(event.timeStamp)
        }}
        onKeyUp={(event) => {
          if (event.key !== " " && event.key !== "Enter") return
          event.preventDefault()
          release(event.timeStamp)
        }}
        onBlur={(event) => release(event.timeStamp)}
        onContextMenu={(event) => event.preventDefault()}
        className="group relative h-36 w-full cursor-pointer touch-none rounded-2xl outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        {/* Wooden base. */}
        <span className="absolute inset-x-0 bottom-0 h-14 rounded-xl bg-linear-to-b from-amber-700 via-amber-800 to-amber-950 shadow-[0_14px_22px_-12px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.2)]">
          <span className="absolute inset-x-3 top-1.5 h-px bg-amber-950/40" />
        </span>
        {/* Contact and lamp. */}
        <span className="absolute bottom-14 left-[22%] h-3 w-5 -translate-x-1/2 rounded-t-sm bg-linear-to-b from-yellow-200 to-yellow-700" />
        <span className="absolute right-4 bottom-14 h-2 w-6 rounded-t-sm bg-linear-to-b from-neutral-400 to-neutral-700" />
        <span
          className={cn(
            "absolute right-5 bottom-16 size-4 rounded-full border border-neutral-700 bg-neutral-600 transition-[background-color,box-shadow] duration-75",
            down && "bg-amber-300 shadow-[0_0_14px_4px_rgb(252_211_77/0.8)]"
          )}
        />
        {/* Pivot post. */}
        <span className="absolute right-[16%] bottom-14 h-10 w-6 rounded-t-md bg-linear-to-r from-yellow-700 via-yellow-200 to-yellow-700" />
        {/* The lever. */}
        <span
          className={cn(
            "absolute right-[14%] bottom-21 left-[14%] h-3 origin-[92%_50%] rounded-full bg-linear-to-b from-yellow-100 via-yellow-500 to-yellow-800 shadow-[0_3px_4px_rgb(0_0_0/0.35)] transition-transform duration-75 motion-reduce:transition-none",
            down && "-rotate-3"
          )}
        >
          <span className="absolute -top-6 left-0 h-6 w-2 translate-x-3 bg-linear-to-r from-yellow-700 via-yellow-200 to-yellow-700" />
          <span className="absolute -top-11 left-0 h-6 w-14 -translate-x-1 rounded-[50%] bg-[radial-gradient(ellipse_at_40%_30%,#525252,#0a0a0a_70%)] shadow-[0_4px_6px_rgb(0_0_0/0.45)] group-hover:brightness-125" />
          <span className="absolute -top-1 right-[3%] size-5 -translate-y-1 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fef9c3,#a16207)]" />
        </span>
      </button>

      <div className="flex items-start gap-2">
        <output aria-live="polite" className="min-h-12 flex-1 rounded-lg border bg-muted/40 px-3 py-2 font-mono text-lg leading-snug tracking-widest break-all">
          {text || pattern ? text : <span className="text-sm tracking-normal text-muted-foreground">Tap a dot, hold a dash.</span>}
          {pattern ? <span className="text-muted-foreground">{pattern.replaceAll(".", "·").replaceAll("-", "–")}</span> : null}
        </output>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear the message"
          className="grid size-12 shrink-0 place-items-center rounded-lg border text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Eraser aria-hidden="true" className="size-4" />
        </button>
      </div>
      <p role="status" className="sr-only">
        {note}
      </p>
      {note ? (
        <p aria-hidden="true" className="-mt-2 text-xs text-muted-foreground">
          {note}
        </p>
      ) : null}

      <details className="group/table rounded-lg border px-3 py-2 text-sm">
        <summary className="cursor-pointer rounded-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50">Morse alphabet</summary>
        <ul className="mt-3 grid grid-cols-3 gap-x-3 gap-y-1.5 font-mono text-xs sm:grid-cols-4">
          {ALPHABET.map(([code, letter]) => (
            <li key={letter} className="flex justify-between gap-2">
              <span className="font-semibold">{letter}</span>
              <span className="text-muted-foreground">{code.replaceAll(".", "·").replaceAll("-", "–")}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export { MorseKey }
