"use client"

import * as React from "react"
import { Delete, Phone, PhoneOff } from "lucide-react"

import { cn } from "@/lib/utils"

interface RotaryPhoneProps extends React.ComponentProps<"div"> {
  /** Longest number the dial accepts. */
  maxDigits?: number
  /** Play the dial's clicks as it winds back. */
  sound?: boolean
  onNumberChange?: (number: string) => void
  onCall?: (number: string) => void
}

/** The finger stop, in degrees clockwise from twelve o'clock. */
const STOP = 120
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const LETTERS: Record<number, string> = { 2: "ABC", 3: "DEF", 4: "GHI", 5: "JKL", 6: "MNO", 7: "PQRS", 8: "TUV", 9: "WXYZ", 0: "OPER" }
/** Pulses a digit sends: 1 is one click, 0 is ten. */
const pulses = (digit: number) => (digit === 0 ? 10 : digit)
/** How far the wheel turns to bring a digit's hole to the stop. */
const travelOf = (digit: number) => (pulses(digit) + 1) * 30
const at = (angle: number, radius: number) => ({
  left: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
  top: `${50 - radius * Math.cos((angle * Math.PI) / 180)}%`,
})
const wrap = (degrees: number) => ((((degrees + 180) % 360) + 360) % 360) - 180
const format = (number: string) =>
  number.length <= 3 ? number : number.length <= 7 ? `${number.slice(0, 3)} ${number.slice(3)}` : `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`

/** The finger wheel: a ring with ten holes cut out of it. */
const WHEEL = [
  "M50 2a48 48 0 1 0 0.001 0Z",
  "M50 22a28 28 0 1 1 -0.001 0Z",
  ...DIGITS.map((digit) => {
    const angle = ((STOP - travelOf(digit)) * Math.PI) / 180
    const x = 50 + 38 * Math.sin(angle)
    const y = 50 - 38 * Math.cos(angle)
    return `M${x} ${y - 7.4}a7.4 7.4 0 1 0 0.001 0Z`
  }),
].join("")

/**
 * A rotary dial. Put a finger in a hole and turn the wheel to the metal stop;
 * it winds back and dials the digit, clicking once per pulse. Tapping a hole
 * (or pressing it from the keyboard) turns the wheel for you.
 */
function RotaryPhone({ maxDigits = 10, sound = true, onNumberChange, onCall, className, ...props }: RotaryPhoneProps) {
  const [number, setNumber] = React.useState("")
  const [rotation, setRotation] = React.useState(0)
  const [motion, setMotion] = React.useState<{ duration: number; easing: string } | null>(null)
  const [calling, setCalling] = React.useState(false)
  const dialRef = React.useRef<HTMLDivElement>(null)
  const numberRef = React.useRef("")
  const busy = React.useRef(false)
  const drag = React.useRef<{ digit: number; last: number; rotation: number; moved: number } | null>(null)
  const timers = React.useRef<number[]>([])
  const audio = React.useRef<AudioContext | null>(null)
  const chrome = `${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}-chrome`

  React.useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const angleOf = (event: React.PointerEvent) => {
    const box = dialRef.current!.getBoundingClientRect()
    return (Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY) * 180) / Math.PI
  }

  const clicks = (count: number, over: number) => {
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const start = ctx.currentTime + 0.05
      const step = Math.max(over / 1000 - 0.1, 0.2) / count
      for (let i = 0; i < count; i++) {
        const when = start + i * step
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.type = "square"
        tone.frequency.value = 1400
        gain.gain.setValueAtTime(0.06, when)
        gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.025)
        tone.connect(gain).connect(ctx.destination)
        tone.start(when)
        tone.stop(when + 0.03)
      }
    } catch {
      // No Web Audio: dial silently.
    }
  }

  /** Finish turning the wheel to the stop (if needed), then let it wind back and dial. */
  const dial = (digit: number, from: number) => {
    if (busy.current) return
    if (numberRef.current.length >= maxDigits || calling) {
      setMotion({ duration: 300, easing: "ease-out" })
      setRotation(0)
      return
    }
    busy.current = true
    const travel = travelOf(digit)
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const forward = still || from >= travel - 12 ? 0 : 180 + (travel - from) * 1.3
    const back = still ? 0 : 260 + travel * 2.2
    setMotion({ duration: forward, easing: "ease-in-out" })
    setRotation(travel)
    later(() => {
      setMotion({ duration: back, easing: "cubic-bezier(.25,.1,.35,1)" })
      setRotation(0)
      clicks(pulses(digit), back)
      later(() => {
        const next = numberRef.current + digit
        numberRef.current = next
        setNumber(next)
        onNumberChange?.(next)
        busy.current = false
      }, back)
    }, forward)
  }

  const erase = () => {
    if (busy.current) return
    const next = numberRef.current.slice(0, -1)
    numberRef.current = next
    setNumber(next)
    setCalling(false)
    onNumberChange?.(next)
  }

  const status = calling
    ? `Calling ${format(number)}…`
    : number.length >= maxDigits
      ? `${format(number)}. That's the whole number.`
      : number
        ? `Dialled ${format(number)}`
        : "Put a finger in a hole and turn the dial to the metal stop."

  return (
    <div data-slot="rotary-phone" className={cn("flex w-72 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="w-full rounded-[2.75rem] bg-linear-160 from-red-500 via-red-700 to-red-950 p-4 shadow-[0_22px_40px_-18px_rgb(0_0_0/0.7),inset_0_2px_0_rgb(255_255_255/0.25),inset_0_-6px_12px_rgb(0_0_0/0.35)]">
        <div ref={dialRef} className="relative aspect-square w-full touch-none select-none">
          {/* The number plate, fixed under the wheel. */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,#fffaf0,#efe3c8_70%,#d6c6a3)] shadow-[inset_0_2px_6px_rgb(0_0_0/0.35)]">
            {DIGITS.map((digit) => (
              <span
                key={digit}
                aria-hidden="true"
                className="absolute flex -translate-1/2 flex-col items-center leading-none text-neutral-900"
                style={at(STOP - travelOf(digit), 38)}
              >
                <span className="font-serif text-lg font-bold">{digit}</span>
                {LETTERS[digit] ? <span className="mt-0.5 text-[7px] font-semibold tracking-wider text-red-800">{LETTERS[digit]}</span> : null}
              </span>
            ))}
          </div>

          {/* The finger wheel. */}
          <div
            className="absolute inset-0"
            style={{ rotate: `${rotation}deg`, transition: motion ? `rotate ${motion.duration}ms ${motion.easing}` : "none" }}
          >
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full drop-shadow-[0_3px_3px_rgb(0_0_0/0.45)]">
              <defs>
                <linearGradient id={chrome} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fafafa" />
                  <stop offset="0.45" stopColor="#a3a3a3" />
                  <stop offset="0.55" stopColor="#d4d4d4" />
                  <stop offset="1" stopColor="#525252" />
                </linearGradient>
              </defs>
              <path d={WHEEL} fillRule="evenodd" fill={`url(#${chrome})`} stroke="#404040" strokeWidth="0.4" />
            </svg>
            {DIGITS.map((digit) => (
              <button
                key={digit}
                type="button"
                aria-label={`Dial ${digit}`}
                onPointerDown={(event) => {
                  if (busy.current || event.button !== 0) return
                  event.currentTarget.setPointerCapture(event.pointerId)
                  drag.current = { digit, last: angleOf(event), rotation: 0, moved: 0 }
                  setMotion(null)
                }}
                onPointerMove={(event) => {
                  const current = drag.current
                  if (!current) return
                  const angle = angleOf(event)
                  const delta = wrap(angle - current.last)
                  current.last = angle
                  current.moved += Math.abs(delta)
                  current.rotation = Math.min(Math.max(current.rotation + delta, 0), travelOf(current.digit))
                  setRotation(current.rotation)
                }}
                onPointerUp={() => {
                  const current = drag.current
                  drag.current = null
                  if (!current) return
                  if (current.rotation >= travelOf(current.digit) - 12 || current.moved < 4) return dial(current.digit, current.rotation)
                  setMotion({ duration: 160 + current.rotation * 2, easing: "ease-out" })
                  setRotation(0)
                }}
                onPointerCancel={() => {
                  drag.current = null
                  setMotion({ duration: 300, easing: "ease-out" })
                  setRotation(0)
                }}
                onClick={(event) => {
                  // Keyboard presses only; pointer presses are handled above.
                  if (event.detail === 0) dial(digit, 0)
                }}
                onKeyDown={(event) => {
                  if (!/^\d$/.test(event.key)) return
                  event.preventDefault()
                  dial(Number(event.key), 0)
                }}
                className="absolute size-[14.8%] -translate-1/2 cursor-grab rounded-full shadow-[inset_0_3px_5px_rgb(0_0_0/0.45)] outline-none focus-visible:ring-3 focus-visible:ring-sky-400 active:cursor-grabbing"
                style={at(STOP - travelOf(digit), 38)}
              />
            ))}
          </div>

          {/* The centre card holds the number you're dialling. */}
          <div className="pointer-events-none absolute inset-[24%] grid place-items-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#ffffff,#f1ece0)] p-3 text-center shadow-[0_2px_4px_rgb(0_0_0/0.35),inset_0_0_0_3px_#b91c1c]">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.2em] text-red-800 uppercase">Number</p>
              <p className={cn("mt-1 font-mono text-sm leading-tight font-semibold text-neutral-900 tabular-nums", !number && "text-neutral-400")}>
                {number ? format(number) : "– – –"}
              </p>
            </div>
          </div>

          {/* The finger stop. */}
          <span
            aria-hidden="true"
            className="absolute h-[15%] w-[4.5%] -translate-1/2 rounded-full bg-linear-to-b from-neutral-100 via-neutral-400 to-neutral-700 shadow-[0_2px_3px_rgb(0_0_0/0.5)]"
            style={{ ...at(STOP, 46), rotate: `${STOP}deg` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (calling) return setCalling(false)
            setCalling(true)
            onCall?.(number)
          }}
          disabled={!number}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-white outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40",
            calling ? "bg-red-600 hover:bg-red-700" : "bg-emerald-700 hover:bg-emerald-800"
          )}
        >
          {calling ? <PhoneOff aria-hidden="true" className="size-4" /> : <Phone aria-hidden="true" className="size-4" />}
          {calling ? "Hang up" : "Call"}
        </button>
        <button
          type="button"
          onClick={erase}
          disabled={!number}
          aria-label="Delete the last digit"
          className="grid size-10 place-items-center rounded-full border text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <Delete aria-hidden="true" className="size-4" />
        </button>
      </div>
      <p role="status" className="min-h-5 text-center text-sm text-muted-foreground">
        {status}
      </p>
    </div>
  )
}

export { RotaryPhone }
