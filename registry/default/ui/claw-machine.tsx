"use client"

import * as React from "react"
import { Bird, Cat, ChevronLeft, ChevronRight, Dog, Fish, Ghost, Rabbit, Turtle, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Prize = { id: number; name: string; icon: LucideIcon; color: string; x: number }

// Muted capsule shells: enamel tones, not candy.
const PRIZES: Prize[] = [
  { id: 0, name: "Cat", icon: Cat, color: "#c46a4a", x: 28 },
  { id: 1, name: "Dog", icon: Dog, color: "#d4a94e", x: 42 },
  { id: 2, name: "Rabbit", icon: Rabbit, color: "#7f9a83", x: 56 },
  { id: 3, name: "Fish", icon: Fish, color: "#5d7894", x: 70 },
  { id: 4, name: "Bird", icon: Bird, color: "#a8584f", x: 84 },
  { id: 5, name: "Turtle", icon: Turtle, color: "#8c8a5e", x: 35 },
  { id: 6, name: "Ghost", icon: Ghost, color: "#d9d2c4", x: 63 },
]
const LAYER = [0, 0, 0, 0, 0, 1, 1]
const CHUTE = 10

type Phase = "idle" | "down" | "grab" | "up" | "carry" | "drop"

function Capsule({ prize, className }: { prize: Prize; className?: string }) {
  return (
    <span
      className={cn("grid place-items-center rounded-full", className)}
      style={{
        background: `linear-gradient(to bottom, rgb(255 255 255 / 0.32) 0 47%, rgb(255 255 255 / 0.55) 47% 50%, ${prize.color} 50%)`,
        boxShadow: "inset -3px -5px 8px rgb(0 0 0 / 0.35), inset 3px 3px 6px rgb(255 255 255 / 0.35), 0 3px 6px rgb(0 0 0 / 0.45)",
      }}
    >
      <prize.icon className="size-[48%] text-neutral-900/75" strokeWidth={2.25} />
    </span>
  )
}

interface ClawMachineProps extends React.ComponentProps<"div"> {
  /** Tries per coin. */
  credits?: number
  /** Chance (0–1) that a prize under the claw is held all the way to the chute. */
  grip?: number
  onWin?: (prize: string) => void
}

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
  const [message, setMessage] = React.useState("Ready")
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
    const keeps = target ? Math.random() < grip : false
    const slipsAt = Math.random() < 0.5 ? "up" : "carry"
    setMessage("Dropping")
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
        setMessage(`The ${target.name.toLowerCase()} slipped`)
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
        setMessage(`The ${target.name.toLowerCase()} fell out`)
      }, 2700)
    }
    later(() => {
      setPhase("drop")
      if (target && keeps) {
        setWon((list) => [...list, target])
        setMessage(`Won the ${target.name.toLowerCase()}`)
        onWin?.(target.name)
      } else if (!target) setMessage("Missed")
      setHeld(null)
    }, 3300)
    later(() => setPhase("idle"), 3800)
  }

  const cable = phase === "down" || phase === "grab" ? 72 : 10
  const closed = phase === "grab" || phase === "up" || phase === "carry"
  const out = credits === 0 && !busy

  return (
    <div data-slot="claw-machine" className={cn("flex w-80 max-w-full flex-col gap-3", className)} {...props}>
      <div className="rounded-[1.4rem] bg-[linear-gradient(#2b2b2e,#18181a)] p-2.5 shadow-[0_24px_40px_-22px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.12)] ring-1 ring-black/40">
        {/* Lit marquee */}
        <div className="mb-2 flex items-center justify-between rounded-lg bg-[linear-gradient(#f6f1e7,#e6dfd1)] px-3 py-1.5 shadow-[inset_0_-1px_0_rgb(0_0_0/0.12)]">
          <span className="text-sm font-semibold tracking-tight text-neutral-900">Prize Crane</span>
          <span className="text-xs text-neutral-600">
            {perCoin} {perCoin === 1 ? "try" : "tries"} per coin
          </span>
        </div>

        {/* Glass */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_50%_-10%,#4a443c,#1d1b19_62%,#121110)] [container-type:size] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_10px_24px_rgb(0_0_0/0.6)]">
          <span aria-hidden="true" className="absolute inset-x-[8%] top-[2%] h-1 rounded-full bg-[#fff6e0]/80 blur-[1px]" />
          <span aria-hidden="true" className="absolute inset-x-0 top-[6%] h-1.5 bg-[linear-gradient(#9a9a9e,#5c5c60)]" />
          {/* Chute */}
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-[30%] w-[20%] border-t-2 border-r-2 border-white/25 bg-[linear-gradient(rgb(255_255_255/0.07),rgb(255_255_255/0.02))]" />
          {prizes.map((prize) => (
            <span key={prize.id} aria-hidden="true" className="absolute size-[17%] -translate-x-1/2" style={{ left: `${prize.x}%`, bottom: `${LAYER[prize.id] ? 15 : 2}%` }}>
              <Capsule prize={prize} className="size-full" />
            </span>
          ))}
          {/* Claw */}
          <div aria-hidden="true" className="absolute top-[6%] flex -translate-x-1/2 flex-col items-center transition-[left] ease-in-out" style={{ left: `${x}%`, transitionDuration: phase === "carry" ? "900ms" : "120ms" }}>
            <span className="w-px bg-neutral-300 transition-[height] duration-[900ms] ease-in-out" style={{ height: `${cable}cqh` }} />
            <span className="h-3 w-8 rounded-[3px] bg-[linear-gradient(#e4e4e7,#8b8b90)] shadow-[0_1px_2px_rgb(0_0_0/0.5)]" />
            <span className="relative h-7 w-12">
              <span className={cn("absolute top-0 left-1 h-7 w-1 origin-top rounded-full bg-[linear-gradient(90deg,#d4d4d8,#71717a)] transition-transform duration-300", closed ? "rotate-12" : "rotate-[35deg]")} />
              <span className={cn("absolute top-0 right-1 h-7 w-1 origin-top rounded-full bg-[linear-gradient(90deg,#d4d4d8,#71717a)] transition-transform duration-300", closed ? "-rotate-12" : "-rotate-[35deg]")} />
              {held ? <Capsule prize={held} className="absolute top-3 left-1/2 size-11 -translate-x-1/2" /> : null}
            </span>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-115 from-white/10 via-transparent via-40% to-transparent" />
        </div>

        {/* Control deck */}
        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-[#121214] p-2 shadow-[inset_0_1px_3px_rgb(0_0_0/0.8)]">
          <p role="status" className="flex h-9 min-w-0 flex-1 items-center justify-between rounded-md bg-[#0b0c0a] px-2.5 font-mono text-xs text-[#f3b15a] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <span className="truncate">{out ? "Insert coin" : message}</span>
            <span className="text-[#f3b15a]/70 tabular-nums" aria-label={`${credits} credits`}>
              ×{credits}
            </span>
          </p>
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
              className="grid size-9 place-items-center rounded-full bg-[linear-gradient(#3a3a3e,#232326)] text-neutral-200 shadow-[0_2px_0_#000,inset_0_1px_0_rgb(255_255_255/0.12)] outline-none active:translate-y-px active:shadow-none focus-visible:ring-2 focus-visible:ring-[#f3b15a] disabled:opacity-50"
            >
              {direction < 0 ? <ChevronLeft aria-hidden="true" className="size-4" /> : <ChevronRight aria-hidden="true" className="size-4" />}
            </button>
          ))}
          <button
            type="button"
            onClick={
              out
                ? () => {
                    setCredits(perCoin)
                    setMessage("Ready")
                  }
                : drop
            }
            disabled={busy}
            aria-label={out ? "Insert coin" : undefined}
            className="h-9 rounded-full bg-[linear-gradient(#ff7a3d,#e2531b)] px-4 text-sm font-semibold text-white shadow-[0_2px_0_#8a2e0b,inset_0_1px_0_rgb(255_255_255/0.3)] outline-none active:translate-y-px active:shadow-none focus-visible:ring-2 focus-visible:ring-[#f3b15a] disabled:opacity-60"
          >
            {out ? "Coin" : "Drop"}
          </button>
        </div>
      </div>

      {won.length ? (
        <ul aria-label="Prizes won" className="flex flex-wrap gap-1.5">
          {won.map((prize) => (
            <li key={prize.id} className="flex items-center gap-1.5 rounded-md border bg-card py-1 pr-2.5 pl-1 text-sm">
              <Capsule prize={prize} className="size-5" />
              {prize.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { ClawMachine }
