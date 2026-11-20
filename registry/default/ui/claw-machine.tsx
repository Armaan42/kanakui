"use client"

import * as React from "react"
import { Bird, Cat, ChevronLeft, ChevronRight, Coins, Dog, Fish, Ghost, Rabbit, Turtle, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Prize = { id: number; name: string; icon: LucideIcon; color: string; x: number }

interface ClawMachineProps extends React.ComponentProps<"div"> {
  /** Tries per coin. */
  credits?: number
  /** Chance (0–1) that a prize under the claw is held all the way to the chute. */
  grip?: number
  onWin?: (prize: string) => void
}

const PRIZES: Prize[] = [
  { id: 0, name: "Cat", icon: Cat, color: "#f472b6", x: 28 },
  { id: 1, name: "Dog", icon: Dog, color: "#fbbf24", x: 42 },
  { id: 2, name: "Rabbit", icon: Rabbit, color: "#a78bfa", x: 56 },
  { id: 3, name: "Fish", icon: Fish, color: "#38bdf8", x: 70 },
  { id: 4, name: "Bird", icon: Bird, color: "#4ade80", x: 84 },
  { id: 5, name: "Turtle", icon: Turtle, color: "#2dd4bf", x: 35 },
  { id: 6, name: "Ghost", icon: Ghost, color: "#e5e7eb", x: 63 },
]
/** Where each prize sits in the pile, in percent of the glass. */
const LAYER = [0, 0, 0, 0, 0, 1, 1]
const CHUTE = 10

type Phase = "idle" | "down" | "grab" | "up" | "carry" | "drop"

/**
 * A claw machine. Steer the claw with the arrows, press Drop, and it dives,
 * grabs, and (if it holds on) carries the prize to the chute.
 */
function ClawMachine({ credits: perCoin = 3, grip = 0.7, onWin, className, ...props }: ClawMachineProps) {
  const [x, setX] = React.useState(50)
  const [phase, setPhase] = React.useState<Phase>("idle")
  const [prizes, setPrizes] = React.useState(PRIZES)
  const [held, setHeld] = React.useState<Prize | null>(null)
  const [won, setWon] = React.useState<Prize[]>([])
  const [credits, setCredits] = React.useState(perCoin)
  const [message, setMessage] = React.useState("Steer the claw, then drop it.")
  const timers = React.useRef<number[]>([])
  const repeat = React.useRef<number | undefined>(undefined)

  React.useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id))
      window.clearInterval(repeat.current)
    },
    []
  )

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
  const busy = phase !== "idle"

  const steer = (by: number) => setX((value) => Math.min(92, Math.max(18, value + by)))

  const hold = (by: number) => {
    if (busy) return
    steer(by)
    window.clearInterval(repeat.current)
    repeat.current = window.setInterval(() => steer(by), 60)
  }
  const release = () => window.clearInterval(repeat.current)

  const drop = () => {
    if (busy || credits === 0) return
    setCredits((value) => value - 1)
    const target = prizes.filter((prize) => Math.abs(prize.x - x) < 6).sort((a, b) => LAYER[b.id] - LAYER[a.id] || Math.abs(a.x - x) - Math.abs(b.x - x))[0]
    // Whether the claw holds on is decided as it closes.
    const keeps = target ? Math.random() < grip : false
    const slipsAt = Math.random() < 0.5 ? "up" : "carry"
    setMessage("Down it goes…")
    setPhase("down")
    later(() => {
      setPhase("grab")
      if (target) {
        setHeld(target)
        setPrizes((list) => list.filter((prize) => prize.id !== target.id))
      }
    }, 900)
    later(() => setPhase("up"), 1300)
    if (target && !keeps && slipsAt === "up") {
      later(() => {
        setHeld(null)
        setPrizes((list) => [...list, target])
        setMessage(`So close! The ${target.name.toLowerCase()} slipped.`)
      }, 1700)
    }
    later(() => {
      setPhase("carry")
      setX(CHUTE)
    }, 2300)
    if (target && !keeps && slipsAt === "carry") {
      later(() => {
        setHeld(null)
        setPrizes((list) => [...list, target])
        setMessage(`Argh, the ${target.name.toLowerCase()} fell out on the way.`)
      }, 2700)
    }
    later(() => {
      setPhase("drop")
      if (target && keeps) {
        setWon((list) => [...list, target])
        setMessage(`You won the ${target.name.toLowerCase()}!`)
        onWin?.(target.name)
      } else if (!target) setMessage("Nothing there. Try lining up over a prize.")
      setHeld(null)
    }, 3300)
    later(() => setPhase("idle"), 3800)
  }

  const cable = phase === "down" || phase === "grab" ? 72 : 10
  const closed = phase === "grab" || phase === "up" || phase === "carry"

  return (
    <div data-slot="claw-machine" className={cn("flex w-80 max-w-full flex-col gap-4", className)} {...props}>
      <div className="rounded-[1.75rem] bg-linear-to-b from-fuchsia-500 via-pink-600 to-rose-700 p-3 shadow-[0_20px_34px_-18px_rgb(0_0_0/0.8),inset_0_2px_0_rgb(255_255_255/0.3)]">
        <div className="mb-2 flex items-center justify-between px-2 text-white">
          <span className="font-black tracking-[0.2em] uppercase">Grab it</span>
          <span className="rounded-md bg-black/30 px-2 py-0.5 font-mono text-xs tabular-nums">Credits {credits}</span>
        </div>
        {/* The glass. */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-linear-to-b from-sky-950 to-indigo-950 [container-type:size] shadow-[inset_0_0_0_3px_rgb(255_255_255/0.15)]">
          <span aria-hidden="true" className="absolute inset-x-0 top-[6%] h-1.5 bg-neutral-400" />
          {/* Chute. */}
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-[30%] w-[20%] border-t-4 border-r-4 border-neutral-300/80 bg-black/40" />
          {/* The pile. */}
          {prizes.map((prize) => (
            <span
              key={prize.id}
              aria-hidden="true"
              className="absolute grid size-[17%] -translate-x-1/2 place-items-center rounded-full shadow-[inset_-4px_-6px_8px_rgb(0_0_0/0.25),0_3px_5px_rgb(0_0_0/0.4)]"
              style={{ left: `${prize.x}%`, bottom: `${LAYER[prize.id] ? 15 : 2}%`, background: prize.color }}
            >
              <prize.icon className="size-[55%] text-black/70" />
            </span>
          ))}
          {/* Claw. */}
          <div
            aria-hidden="true"
            className="absolute top-[6%] flex -translate-x-1/2 flex-col items-center transition-[left] ease-in-out"
            style={{ left: `${x}%`, transitionDuration: phase === "carry" ? "900ms" : "120ms" }}
          >
            <span className="w-0.5 bg-neutral-300 transition-[height] duration-[900ms] ease-in-out" style={{ height: `${cable}cqh` }} />
            <span className="h-3 w-8 rounded-sm bg-linear-to-b from-neutral-200 to-neutral-500" />
            <span className="relative h-7 w-12">
              <span className={cn("absolute top-0 left-1 h-7 w-1.5 origin-top rounded-full bg-neutral-300 transition-transform duration-300", closed ? "rotate-12" : "rotate-[35deg]")} />
              <span className={cn("absolute top-0 right-1 h-7 w-1.5 origin-top rounded-full bg-neutral-300 transition-transform duration-300", closed ? "-rotate-12" : "-rotate-[35deg]")} />
              {held ? (
                <span className="absolute top-3 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full shadow-md" style={{ background: held.color }}>
                  <held.icon className="size-6 text-black/70" />
                </span>
              ) : null}
            </span>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-120 from-white/15 via-transparent to-transparent" />
        </div>

        {/* Controls. */}
        <div className="mt-3 flex items-center gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction < 0 ? "Move left" : "Move right"}
              disabled={busy}
              onPointerDown={() => hold(direction * 2)}
              onPointerUp={release}
              onPointerLeave={release}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  steer(direction * 4)
                }
              }}
              className="grid size-11 place-items-center rounded-full bg-neutral-900 text-white shadow-[0_3px_0_#000] outline-none active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-50"
            >
              {direction < 0 ? <ChevronLeft aria-hidden="true" className="size-5" /> : <ChevronRight aria-hidden="true" className="size-5" />}
            </button>
          ))}
          <button
            type="button"
            onClick={drop}
            disabled={busy || credits === 0}
            className="ml-auto h-11 rounded-full bg-yellow-400 px-6 font-black tracking-wider text-neutral-900 uppercase shadow-[0_4px_0_#a16207] outline-none active:translate-y-0.5 active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-50"
          >
            Drop
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p role="status" className="flex-1 text-sm">
          {credits === 0 && !busy ? `${message} Out of credits.` : message}
        </p>
        {credits === 0 && !busy ? (
          <button
            type="button"
            onClick={() => {
              setCredits(perCoin)
              setMessage("Coin in. Good luck!")
            }}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Coins aria-hidden="true" className="size-3.5" />
            Insert coin
          </button>
        ) : null}
      </div>
      {won.length ? (
        <ul aria-label="Prizes won" className="flex flex-wrap gap-2">
          {won.map((prize) => (
            <li key={prize.id} className="flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-1 text-sm">
              <span className="grid size-6 place-items-center rounded-full" style={{ background: prize.color }}>
                <prize.icon aria-hidden="true" className="size-3.5 text-black/70" />
              </span>
              {prize.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { ClawMachine }
