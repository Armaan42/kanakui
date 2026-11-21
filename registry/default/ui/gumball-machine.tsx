"use client"

import * as React from "react"
import { RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"

type Gumball = { name: string; value: string }

interface GumballMachineProps extends React.ComponentProps<"div"> {
  /** Gumballs in the globe to start with (up to about 40). */
  count?: number
  colors?: Gumball[]
  onDispense?: (gumball: Gumball) => void
}

const COLORS: Gumball[] = [
  { name: "cherry", value: "#c2342c" },
  { name: "tangerine", value: "#de7a33" },
  { name: "lemon", value: "#e6c25a" },
  { name: "mint", value: "#9bc4a4" },
  { name: "blueberry", value: "#5f7fa6" },
  { name: "plum", value: "#7e4f78" },
  { name: "rose", value: "#dfa39a" },
  { name: "vanilla", value: "#efe8da" },
]

/** Ball size, as a percentage of the globe's width. */
const BALL = 13
/** Places for balls inside the globe, packed from the bottom up. */
const SLOTS = (() => {
  // Each row is centred and as wide as the sphere allows at that height, starting at the very bottom.
  const reach = 46 - BALL / 2
  const slots: { x: number; y: number }[] = []
  let previous = 0
  for (let y = 50 + reach - 0.5; y > 50 - reach; y -= BALL * 0.87) {
    const half = Math.sqrt(reach ** 2 - (y - 50) ** 2)
    let n = Math.floor((half * 2) / BALL) + 1
    // Alternate odd and even rows so each row nests in the gaps of the one below.
    if (n > 1 && n % 2 === previous % 2) n -= 1
    previous = n
    for (let i = 0; i < n; i++) slots.push({ x: 50 + (i - (n - 1) / 2) * BALL, y })
  }
  return slots
    .sort((a, b) => b.y - a.y || Math.abs(a.x - 50) - Math.abs(b.x - 50))
    .map((slot, i) => ({ x: slot.x + (((i * 37) % 7) - 3) * 0.35, y: slot.y + (((i * 53) % 5) - 2) * 0.3 }))
})()

const shade = (color: string) =>
  `radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.9) 0 6%, transparent 13%), radial-gradient(circle at 40% 35%, ${color}, color-mix(in oklab, ${color} 55%, black))`

/**
 * A gumball machine. Turn the crank a full circle (drag it round, or press it)
 * and a gumball drops down the chute; the rest settle into the gap.
 */
function GumballMachine({ count = 30, colors = COLORS, onDispense, className, ...props }: GumballMachineProps) {
  const total = Math.min(count, SLOTS.length)
  const [next, setNext] = React.useState(0)
  const [turn, setTurn] = React.useState(0)
  const [spinning, setSpinning] = React.useState(false)
  const [tray, setTray] = React.useState<{ id: number; gumball: Gumball } | null>(null)
  const [eaten, setEaten] = React.useState(0)
  const crankRef = React.useRef<HTMLButtonElement>(null)
  const nextRef = React.useRef(0)
  const drag = React.useRef<{ last: number; wound: number; moved: number } | null>(null)
  const turnRef = React.useRef(0)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  // Step through the colours by a stride that shares no factor with their count, so every colour turns up.
  const stride = [5, 7, 11, 13].find((step) => colors.length % step !== 0) ?? 1
  const colorOf = (id: number) => colors[(id * stride + 3) % colors.length]
  const left = total - next

  const dispense = () => {
    const id = nextRef.current
    if (id >= total) return
    nextRef.current = id + 1
    setNext(id + 1)
    const gumball = colorOf(id)
    setTray({ id, gumball })
    onDispense?.(gumball)
  }

  const angleOf = (event: React.PointerEvent) => {
    const box = crankRef.current!.getBoundingClientRect()
    return (Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY) * 180) / Math.PI
  }

  const spin = () => {
    if (spinning || left === 0) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setSpinning(true)
    turnRef.current = Math.ceil((turnRef.current + 1) / 360) * 360
    setTurn(turnRef.current)
    timer.current = window.setTimeout(
      () => {
        setSpinning(false)
        dispense()
      },
      still ? 0 : 700
    )
  }

  const status =
    left === 0 && !tray
      ? "The machine is empty."
      : tray
        ? `A ${tray.gumball.name} gumball rolled out. ${left} left.`
        : `${left} gumballs left.`

  return (
    <div data-slot="gumball-machine" className={cn("flex w-64 max-w-full flex-col items-center", className)} {...props}>
      {/* Cap. */}
      <div aria-hidden="true" className="relative z-10 -mb-3 flex flex-col items-center">
        <span className="size-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f0b3a8,#9e2a22_60%,#4a0f0b)]" />
        <span className="-mt-1 h-7 w-24 rounded-t-full bg-linear-to-b from-[#b3322a] to-[#6b1712] shadow-[inset_0_2px_0_rgb(255_255_255/0.25)]" />
        <span className="h-2 w-28 rounded-sm bg-linear-to-b from-[#7a1a14] to-[#3a0b08]" />
      </div>

      {/* Globe. */}
      <div aria-hidden="true" className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-white/50 bg-white/30 shadow-[inset_0_-10px_30px_rgb(0_0_0/0.15),inset_0_0_0_6px_rgb(255_255_255/0.15),0_10px_30px_-10px_rgb(0_0_0/0.3)] dark:bg-white/8">
        {Array.from({ length: total - next }, (_, i) => {
          const id = next + i
          const slot = SLOTS[i]
          return (
            <span
              key={id}
              className="absolute -translate-1/2 rounded-full shadow-[0_2px_3px_rgb(0_0_0/0.3)] transition-[left,top] duration-500 ease-in motion-reduce:transition-none"
              style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${BALL}%`, height: `${BALL}%`, background: shade(colorOf(id).value) }}
            />
          )
        })}
        <span className="pointer-events-none absolute top-[9%] left-[16%] h-[34%] w-[22%] -rotate-30 rounded-[50%] bg-linear-to-b from-white/75 to-white/0" />
        <span className="pointer-events-none absolute right-[14%] bottom-[16%] h-[10%] w-[10%] rounded-full bg-white/30 blur-[2px]" />
      </div>

      {/* Body. */}
      <div className="relative -mt-4 flex h-44 w-[82%] flex-col items-center rounded-t-2xl rounded-b-[2rem] bg-linear-to-b from-[#b3322a] via-[#8c2019] to-[#5c120d] pt-5 shadow-[0_18px_30px_-14px_rgb(0_0_0/0.6),inset_0_2px_0_rgb(255_255_255/0.3),inset_0_-8px_14px_rgb(0_0_0/0.3)]">
        <span aria-hidden="true" className="absolute top-0 h-3 w-[86%] rounded-b-lg bg-black/35" />
        <button
          ref={crankRef}
          type="button"
          aria-label="Turn the crank"
          disabled={left === 0}
          onPointerDown={(event) => {
            if (spinning || left === 0 || event.button !== 0) return
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { last: angleOf(event), wound: 0, moved: 0 }
          }}
          onPointerMove={(event) => {
            const current = drag.current
            if (!current) return
            const angle = angleOf(event)
            const delta = ((((angle - current.last + 180) % 360) + 360) % 360) - 180
            current.last = angle
            current.moved += Math.abs(delta)
            // A ratchet: the crank only turns clockwise.
            if (delta <= 0) return
            current.wound += delta
            turnRef.current += delta
            setTurn(turnRef.current)
            if (current.wound >= 360) {
              current.wound -= 360
              dispense()
            }
          }}
          onPointerUp={() => {
            const current = drag.current
            drag.current = null
            if (current && current.moved < 6) spin()
          }}
          onPointerCancel={() => {
            drag.current = null
          }}
          onClick={(event) => {
            if (event.detail === 0) spin()
          }}
          className="relative grid size-24 cursor-grab touch-none place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d4d4d4_40%,#737373)] shadow-[0_4px_8px_rgb(0_0_0/0.45),inset_0_-3px_6px_rgb(0_0_0/0.25)] outline-none select-none focus-visible:ring-4 focus-visible:ring-sky-400 active:cursor-grabbing disabled:cursor-not-allowed"
        >
          <span
            aria-hidden="true"
            className="absolute inset-2 rounded-full"
            style={{ rotate: `${turn}deg`, transition: spinning ? "rotate 700ms cubic-bezier(.45,.05,.35,1)" : "none" }}
          >
            <span className="absolute top-1/2 left-1/2 h-4 w-[92%] -translate-1/2 rounded-full bg-linear-to-b from-neutral-200 via-neutral-500 to-neutral-700 shadow-[0_2px_3px_rgb(0_0_0/0.4)]" />
            <span className="absolute top-1/2 right-0 size-6 -translate-y-1/2 translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#6b6b70,#1c1c1f_60%,#09090b)] shadow-[0_2px_4px_rgb(0_0_0/0.45)]" />
          </span>
          <span aria-hidden="true" className="relative size-6 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#a3a3a3)] shadow-[0_1px_2px_rgb(0_0_0/0.5)]" />
        </button>
        <span aria-hidden="true" className="mt-2 text-[11px] font-medium text-white/70">25¢</span>

        {/* Chute. */}
        <div className="absolute bottom-4 h-14 w-20 overflow-hidden rounded-t-2xl rounded-b-md bg-linear-to-b from-neutral-950 to-neutral-800 shadow-[inset_0_4px_8px_rgb(0_0_0/0.8)]">
          {tray ? (
            <button
              key={tray.id}
              type="button"
              aria-label={`Take the ${tray.gumball.name} gumball`}
              onClick={() => {
                setTray(null)
                setEaten((value) => value + 1)
              }}
              className="absolute bottom-1.5 left-1/2 size-8 -translate-x-1/2 animate-gumball-machine-drop rounded-full outline-none focus-visible:ring-3 focus-visible:ring-sky-400 motion-reduce:animate-none"
              style={{ background: shade(tray.gumball.value) }}
            />
          ) : null}
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-linear-to-b from-neutral-400 to-neutral-600 opacity-80" />
        </div>
      </div>
      <div aria-hidden="true" className="-mt-2 h-5 w-[92%] rounded-b-2xl rounded-t-md bg-linear-to-b from-neutral-700 to-neutral-950 shadow-[0_10px_18px_-8px_rgb(0_0_0/0.6)]" />

      <div className="mt-5 flex min-h-9 items-center gap-3">
        <p role="status" className="text-center text-sm text-muted-foreground">
          {status}
          {eaten ? ` ${eaten} taken.` : ""}
        </p>
        {left === 0 && !tray ? (
          <button
            type="button"
            onClick={() => {
              nextRef.current = 0
              setNext(0)
              setEaten(0)
            }}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border bg-background px-3 text-sm shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <RefreshCw aria-hidden="true" className="size-3.5" />
            Refill
          </button>
        ) : null}
      </div>
    </div>
  )
}

export { GumballMachine }
export type { Gumball }
