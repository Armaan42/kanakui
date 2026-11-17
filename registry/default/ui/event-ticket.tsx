"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface EventTicketProps extends React.ComponentProps<"div"> {
  event: string
  /** e.g. "Sat, 14 Mar 2026". */
  date: string
  /** e.g. "Doors 19:00". */
  time: string
  venue: string
  /** e.g. "Floor · GA". */
  seat?: string
  image?: { src: string; alt: string }
  /** Ticket code: printed under the barcode, and the barcode is drawn from it. */
  code: string
  torn?: boolean
  defaultTorn?: boolean
  onTornChange?: (torn: boolean) => void
}

const NOTCH = 12
/** Half-circle notches cut into the top and bottom of an edge (the perforation). */
const notchMask = (side: "left" | "right") => {
  const x = side === "right" ? "100%" : "0%"
  const circle = (y: string) => `radial-gradient(circle ${NOTCH}px at ${x} ${y}, transparent ${NOTCH - 0.5}px, #000 ${NOTCH}px)`
  return {
    maskImage: `${circle("0%")}, ${circle("100%")}`,
    maskSize: "100% 51%",
    maskPosition: "top, bottom",
    maskRepeat: "no-repeat",
  } satisfies React.CSSProperties
}

/** Bar widths for a barcode-looking pattern, stable for a given code. */
function bars(code: string) {
  const widths: number[] = []
  for (const char of code) {
    const n = char.charCodeAt(0)
    widths.push(1 + (n % 3), 1 + ((n >> 2) % 2), 1 + ((n >> 3) % 3), 1)
  }
  return widths
}

const TEAR_DISTANCE = 70

/**
 * A ticket with a perforated stub. Drag the stub to the right to tear it
 * off (a short drag springs back), or click, tap, Enter or Space to tear it.
 */
function EventTicket({
  event,
  date,
  time,
  venue,
  seat = "General admission",
  image,
  code,
  torn: tornProp,
  defaultTorn = false,
  onTornChange,
  className,
  ...props
}: EventTicketProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultTorn)
  const torn = tornProp ?? uncontrolled
  const [drag, setDrag] = React.useState<number | null>(null)
  const start = React.useRef(0)
  const moved = React.useRef(false)

  const tear = () => {
    setDrag(null)
    setUncontrolled(true)
    onTornChange?.(true)
  }

  const offset = drag ?? 0
  const stubTransform = torn
    ? "translate(70px, 46px) rotate(16deg)"
    : `translateX(${offset}px) rotate(${offset * 0.12}deg)`

  return (
    <div data-slot="event-ticket" data-torn={torn || undefined} className={cn("flex w-full max-w-xl drop-shadow-[0_18px_22px_rgb(0_0_0/0.16)] select-none dark:drop-shadow-[0_18px_22px_rgb(0_0_0/0.6)]", className)} {...props}>
      {/* Main part */}
      <div
        className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-l-2xl bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
        style={notchMask("right")}
      >
        {image ? <img src={image.src} alt={image.alt} className="h-28 w-full object-cover sm:h-32" draggable={false} /> : null}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-lg leading-tight font-semibold tracking-tight text-balance sm:text-xl">{event}</p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <dt className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">Date</dt>
              <dd className="font-medium">{date}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">Time</dt>
              <dd className="font-medium">{time}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">Venue</dt>
              <dd className="font-medium">{venue}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Stub: a button you can drag, click or press to tear off. */}
      <button
        type="button"
        aria-label={torn ? "Stub torn off" : `Tear off the stub, ${seat}`}
        disabled={torn}
        onPointerDown={(e) => {
          if (torn) return
          e.currentTarget.setPointerCapture(e.pointerId)
          start.current = e.clientX
          moved.current = false
          setDrag(0)
        }}
        onPointerMove={(e) => {
          if (drag === null) return
          const dx = Math.max(0, e.clientX - start.current)
          if (dx > 4) moved.current = true
          setDrag(dx)
        }}
        onPointerUp={() => {
          if (drag === null) return
          if (drag > TEAR_DISTANCE) tear()
          else setDrag(null)
        }}
        onPointerCancel={() => setDrag(null)}
        onClick={() => {
          // A drag ends with a click too; only a tap or a key press tears here.
          if (!moved.current && !torn) tear()
          moved.current = false
        }}
        className={cn(
          "relative flex w-[30%] max-w-40 shrink-0 cursor-grab touch-pan-y flex-col items-center justify-between rounded-r-2xl border-l-2 border-dashed border-neutral-300 bg-white px-3 py-5 text-neutral-900 outline-none active:cursor-grabbing dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
          "focus-visible:ring-3 focus-visible:ring-ring/50",
          drag === null && "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none",
          torn && "pointer-events-none opacity-0 duration-700 ease-in"
        )}
        style={{ ...notchMask("left"), transform: stubTransform, transformOrigin: "0% 100%" }}
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400 uppercase">Admit one</span>
        <span className="text-center text-sm leading-tight font-medium">{seat}</span>
        <span className="flex w-full flex-col items-center gap-1.5">
          <span aria-hidden="true" className="flex h-10 w-full items-stretch justify-center gap-px overflow-hidden">
            {bars(code).map((w, i) => (
              <span key={i} className={i % 2 ? "bg-transparent" : "bg-current"} style={{ width: w }} />
            ))}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-neutral-500 dark:text-neutral-400">{code}</span>
        </span>
      </button>
      <p aria-live="polite" className="sr-only">
        {torn ? "Stub torn off." : ""}
      </p>
    </div>
  )
}

export { EventTicket }
