"use client"

import * as React from "react"
import { Plane } from "lucide-react"

import { cn } from "@/lib/utils"

interface Airport {
  /** IATA code, e.g. "LHR". */
  code: string
  city: string
}

interface BoardingPassProps extends Omit<React.ComponentProps<"button">, "children"> {
  airline: string
  flight: string
  from: Airport
  to: Airport
  /** e.g. "Tue, 7 Apr". */
  date: string
  departs: string
  arrives: string
  passenger: string
  seat: string
  gate: string
  boarding: string
  /** e.g. "Economy" or "Business". */
  cabin?: string
  /** Booking reference; also drawn into the code. */
  reference: string
  /** Rows on the back, e.g. baggage and meal. */
  details?: { label: string; value: string }[]
}

const NOTCH = 12
const notchMask = {
  maskImage: `radial-gradient(circle ${NOTCH}px at 0 75%, transparent ${NOTCH - 0.5}px, #000 ${NOTCH}px), radial-gradient(circle ${NOTCH}px at 100% 75%, transparent ${NOTCH - 0.5}px, #000 ${NOTCH}px)`,
  maskSize: "51% 100%",
  maskPosition: "left, right",
  maskRepeat: "no-repeat",
} satisfies React.CSSProperties

/** A 21×21 code pattern with three finder squares, stable for a given text. Decorative, not scannable. */
function codeCells(text: string) {
  let seed = 0
  for (const char of text) seed = (seed * 31 + char.charCodeAt(0)) >>> 0
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 2 ** 32
  }
  const finder = (r: number, c: number) => {
    const inBox = (r0: number, c0: number) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7
    for (const [r0, c0] of [
      [0, 0],
      [0, 14],
      [14, 0],
    ]) {
      if (inBox(r0, c0)) {
        const rr = r - r0
        const cc = c - c0
        return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4)
      }
    }
    return null
  }
  return Array.from({ length: 21 * 21 }, (_, i) => {
    const r = Math.floor(i / 21)
    const c = i % 21
    return finder(r, c) ?? random() > 0.52
  })
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-[10px] tracking-widest text-neutral-600 uppercase">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  )
}

/**
 * A boarding pass: route, passenger, seat and gate, a perforated stub with a
 * code, and fare details on the back. Click, tap, Enter or Space flips it.
 */
function BoardingPass({
  airline,
  flight,
  from,
  to,
  date,
  departs,
  arrives,
  passenger,
  seat,
  gate,
  boarding,
  cabin = "Economy",
  reference,
  details = [],
  className,
  onClick,
  ...props
}: BoardingPassProps) {
  const [flipped, setFlipped] = React.useState(false)
  const cells = React.useMemo(() => codeCells(`${flight}${seat}${reference}`), [flight, seat, reference])
  const face = "absolute inset-0 overflow-hidden rounded-3xl backface-hidden"

  return (
    <div className={cn("w-full max-w-sm perspective-[1400px]", className)}>
      <button
        type="button"
        data-slot="boarding-pass"
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Fare details for flight ${flight}. Show boarding pass`
            : `Boarding pass, ${airline} flight ${flight}, ${from.city} to ${to.city}, ${date}. Seat ${seat}, gate ${gate}, boarding ${boarding}. Show fare details`
        }
        onClick={(event) => {
          onClick?.(event)
          setFlipped((value) => !value)
        }}
        className="relative block aspect-[0.78] w-full cursor-pointer rounded-3xl text-left outline-none transform-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0.1,0.2,1)] focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
        style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
        {...props}
      >
        {/* Soft shadow, just behind the card (the notched faces can't carry one). */}
        <span aria-hidden="true" className="absolute inset-x-6 top-10 bottom-0 rounded-3xl bg-black/25 blur-2xl [transform:translateZ(-2px)] dark:bg-black/60" />
        {/* Front */}
        <span className={cn(face, "flex flex-col bg-white text-neutral-900")} style={notchMask}>
          <span className="flex items-center justify-between bg-sky-600 px-6 py-4 text-white">
            <span className="text-sm font-semibold tracking-tight">{airline}</span>
            <span className="font-mono text-sm">{flight}</span>
          </span>

          <span className="flex items-center justify-between px-6 pt-6">
            <span>
              <span className="block text-4xl font-semibold tracking-tight">{from.code}</span>
              <span className="block text-xs text-neutral-600">{from.city}</span>
              <span className="mt-1 block font-mono text-sm">{departs}</span>
            </span>
            <span aria-hidden="true" className="relative mx-3 flex-1 border-t-2 border-dashed border-neutral-300">
              <Plane className="absolute top-1/2 left-1/2 size-5 -translate-1/2 rotate-45 fill-sky-600 text-sky-600" />
            </span>
            <span className="text-right">
              <span className="block text-4xl font-semibold tracking-tight">{to.code}</span>
              <span className="block text-xs text-neutral-600">{to.city}</span>
              <span className="mt-1 block font-mono text-sm">{arrives}</span>
            </span>
          </span>

          <dl className="grid grid-cols-3 gap-x-4 gap-y-4 px-6 pt-6 text-sm">
            <Field label="Passenger" value={passenger} className="col-span-2" />
            <Field label="Date" value={date} />
            <Field label="Seat" value={seat} />
            <Field label="Gate" value={gate} />
            <Field label="Boards" value={boarding} />
          </dl>

          {/* Perforation, level with the notches. */}
          <span aria-hidden="true" className="absolute inset-x-5 top-[75%] border-t-2 border-dashed border-neutral-200" />

          <span className="absolute inset-x-0 top-[75%] bottom-0 flex items-center justify-between gap-4 px-6">
            <span className="text-sm">
              <span className="block text-[10px] tracking-widest text-neutral-600 uppercase">{cabin}</span>
              <span className="block font-mono font-semibold tracking-wider">{reference}</span>
            </span>
            <span aria-hidden="true" className="grid aspect-square h-[62%] grid-cols-[repeat(21,1fr)]">
              {cells.map((on, i) => (
                <span key={i} className={on ? "bg-neutral-900" : ""} />
              ))}
            </span>
          </span>
        </span>

        {/* Back */}
        <span className={cn(face, "flex flex-col bg-neutral-50 p-6 text-neutral-900 [transform:rotateY(180deg)] dark:bg-neutral-100")}>
          <span className="text-sm font-semibold">Fare &amp; baggage</span>
          <span className="text-xs text-neutral-600">
            {airline} · {flight} · {cabin}
          </span>
          <dl className="mt-5 divide-y divide-neutral-200 text-sm">
            {details.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-neutral-600">{row.label}</dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
          <span className="mt-auto text-[11px] leading-relaxed text-neutral-600">
            Gate closes 20 minutes before departure. Have your passport ready at the gate.
          </span>
        </span>
      </button>
    </div>
  )
}

export { BoardingPass }
