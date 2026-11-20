"use client"

import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

// Sample photos. Swap in your own. The building and tenants are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=900&fit=crop&auto=format&q=80`

const FLOORS = [
  { label: "G", name: "Lobby", about: "Reception and the parcel room. Visitors sign in here.", detail: "Open 7:00–20:00", src: photo("1497366216548-37526070297c"), alt: "A bright open lobby with a kitchen counter and a long corridor" },
  { label: "1", name: "Harbour Canteen", about: "Lunch from 12 to 3, coffee all day, and tables you can work at.", detail: "Suite 101", src: photo("1517248135467-4c7edcad34c4"), alt: "A restaurant with dark wooden floors, pendant lamps and tall chairs" },
  { label: "2", name: "Meeting rooms", about: "Six glass rooms for two to twelve people, booked at the front desk.", detail: "Rooms 2A–2F", src: photo("1497366754035-f200968a6e72"), alt: "Glass-walled meeting rooms along a polished corridor" },
  { label: "3", name: "Quiet lounge", about: "No calls and no meetings. Bring a book or a laptop and headphones.", detail: "Open to everyone", src: photo("1524758631624-e2822e304c36"), alt: "A light lounge with grey armchairs, a sofa and a black floor lamp" },
  { label: "4", name: "Fieldwork Studio", about: "A product design studio of forty people. Ring the bell by the door.", detail: "Suite 401", src: photo("1531973576160-7125cd663d86"), alt: "An open-plan office with long desks and strip lights on the ceiling" },
  { label: "5", name: "Brightline", about: "A developer tools startup. Demo day is the last Friday of the month.", detail: "Suite 501", src: photo("1552664730-d307ca884978"), alt: "A team meeting in a bright office, with sticky notes on the wall" },
  { label: "6", name: "Coworking", about: "Hot desks by the day or the month, with lockers and phone booths.", detail: "Day passes at reception", src: photo("1522071820081-009f0129c71c"), alt: "Four people working on laptops around a wooden table" },
]

const DOORS = 900
const PER_FLOOR = 650

/** A building directory as an elevator: press a floor, the car travels there and the doors open on who's inside. */
export function OfficeDirectory01() {
  const [floor, setFloor] = React.useState(0)
  const [target, setTarget] = React.useState<number | null>(null)
  const [open, setOpen] = React.useState(true)
  const [direction, setDirection] = React.useState<"up" | "down" | null>(null)
  const targetRef = React.useRef<number | null>(null)
  const floorRef = React.useRef(0)
  const timer = React.useRef<number | undefined>(undefined)
  const audio = React.useRef<AudioContext | null>(null)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const ding = () => {
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      for (const [frequency, at] of [[1318.5, 0], [1046.5, 0.22]]) {
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.frequency.value = frequency
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + at)
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + at + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + 1.2)
        tone.connect(gain).connect(ctx.destination)
        tone.start(ctx.currentTime + at)
        tone.stop(ctx.currentTime + at + 1.3)
      }
    } catch {
      // No Web Audio: arrive quietly.
    }
  }

  /** Move one floor towards the target, then open the doors on arrival. */
  const travel = (speed: number) => {
    const goal = targetRef.current
    if (goal === null) return
    if (floorRef.current === goal) {
      targetRef.current = null
      setTarget(null)
      setDirection(null)
      setOpen(true)
      ding()
      return
    }
    const step = goal > floorRef.current ? 1 : -1
    setDirection(step > 0 ? "up" : "down")
    timer.current = window.setTimeout(() => {
      floorRef.current += step
      setFloor(floorRef.current)
      travel(speed)
    }, PER_FLOOR * speed)
  }

  const call = (index: number) => {
    const moving = targetRef.current !== null
    if (!moving && index === floorRef.current) return
    try {
      // Created on the click, so the browser lets the arrival chime play.
      audio.current ??= new AudioContext()
    } catch {
      // No Web Audio.
    }
    targetRef.current = index
    setTarget(index)
    setDirection(index > floorRef.current ? "up" : "down")
    // Already travelling: the next step heads for the new floor.
    if (moving) return
    const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1
    setOpen(false)
    timer.current = window.setTimeout(() => travel(speed), DOORS * speed)
  }

  const here = FLOORS[floor]
  const status =
    target !== null ? `Going ${direction} to ${FLOORS[target].label === "G" ? "the ground floor" : `floor ${FLOORS[target].label}`}.` : `Doors open: ${here.name}.`

  return (
    <section aria-labelledby="office-directory-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Harbour House, 14 Quay Street</p>
          <h2 id="office-directory-01-title" className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Who’s on which floor
          </h2>
          <p className="mt-3 text-muted-foreground">Press a floor to ride up and see who works there.</p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[minmax(0,1fr)_13rem]">
          {/* The car. */}
          <div className="rounded-2xl bg-linear-to-b from-zinc-300 to-zinc-500 p-3 shadow-[0_20px_36px_-18px_rgb(0_0_0/0.6)] dark:from-zinc-600 dark:to-zinc-800">
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-1.5 font-mono text-xl font-bold text-amber-400 shadow-[inset_0_2px_6px_rgb(0_0_0/0.8)] tabular-nums">
                <ArrowUp aria-hidden="true" className={cn("size-4", direction === "up" ? "opacity-100" : "opacity-20")} />
                <span aria-hidden="true" className="w-6 text-center">{here.label}</span>
                <ArrowDown aria-hidden="true" className={cn("size-4", direction === "down" ? "opacity-100" : "opacity-20")} />
              </div>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-neutral-900 shadow-[inset_0_0_0_4px_rgb(0_0_0/0.25)]">
              <div aria-hidden={!open} className={cn("absolute inset-0 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}>
                <img src={here.src} alt={here.alt} className="size-full object-cover" />
                <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/90 p-4 text-neutral-900 shadow-lg backdrop-blur-sm sm:inset-x-auto sm:left-4 sm:max-w-sm">
                  <p className="text-xs font-medium text-neutral-600">
                    {here.label === "G" ? "Ground floor" : `Floor ${here.label}`} · {here.detail}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold">{here.name}</p>
                  <p className="mt-1 text-sm text-neutral-700">{here.about}</p>
                </div>
              </div>
              {/* The doors. */}
              {(["left", "right"] as const).map((side) => (
                <span
                  key={side}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 w-1/2 bg-linear-to-r from-zinc-400 via-zinc-200 to-zinc-400 transition-transform ease-in-out motion-reduce:transition-none",
                    side === "left" ? "left-0 border-r border-zinc-500" : "right-0 border-l border-zinc-500",
                    open && (side === "left" ? "-translate-x-full" : "translate-x-full")
                  )}
                  style={{ transitionDuration: `${DOORS}ms` }}
                />
              ))}
            </div>
          </div>

          {/* The panel. */}
          <div className="flex flex-col gap-4 rounded-2xl bg-linear-to-b from-zinc-200 to-zinc-400 p-4 shadow-[0_20px_36px_-18px_rgb(0_0_0/0.6)] dark:from-zinc-700 dark:to-zinc-900">
            <div role="group" aria-label="Floors" className="grid grid-cols-4 gap-3 self-center md:grid-cols-2">
              {[...FLOORS.keys()].reverse().map((index) => {
                const item = FLOORS[index]
                const lit = target === index
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => call(index)}
                    aria-pressed={lit}
                    aria-label={`${item.label === "G" ? "Ground floor" : `Floor ${item.label}`}: ${item.name}`}
                    className={cn(
                      "grid size-14 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#a1a1aa_70%,#52525b)] font-mono text-lg font-bold text-zinc-800 shadow-[0_3px_6px_rgb(0_0_0/0.4),inset_0_0_0_3px_rgb(255_255_255/0.3)] outline-none transition-[box-shadow,color] focus-visible:ring-3 focus-visible:ring-sky-500 active:translate-y-px",
                      lit && "shadow-[0_0_0_3px_#f59e0b,0_0_18px_4px_rgb(245_158_11/0.55)]",
                      index === 0 && "md:col-span-2 md:justify-self-center"
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
            <p role="status" className="text-center text-xs text-zinc-800 dark:text-zinc-200">
              {status}
            </p>
          </div>
        </div>

        <ol className="mt-8 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {FLOORS.map((item) => (
            <li key={item.label} className="flex gap-3">
              <span className="w-4 shrink-0 font-mono text-muted-foreground">{item.label}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
