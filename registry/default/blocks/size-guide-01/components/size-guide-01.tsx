"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { TapeMeasure } from "@/registry/default/ui/tape-measure"

const SIZES = [
  { size: "XS", from: 13, to: 14.9, holes: "Holes 1–3" },
  { size: "S", from: 15, to: 16.4, holes: "Holes 2–5" },
  { size: "M", from: 16.5, to: 17.9, holes: "Holes 3–6" },
  { size: "L", from: 18, to: 19.4, holes: "Holes 4–7" },
  { size: "XL", from: 19.5, to: 21, holes: "Holes 5–8" },
]

/** A strap size guide: pull the tape to your wrist measurement and the right size lights up. */
export function SizeGuide01() {
  const [length, setLength] = React.useState(0)
  const [locked, setLocked] = React.useState(0)
  const reading = length || locked
  const match = SIZES.find((row) => reading >= row.from && reading <= row.to)

  return (
    <section aria-labelledby="size-guide-01-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 id="size-guide-01-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Find your strap size
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Wrap a soft tape or a strip of paper round your wrist, just below the bone. Then pull ours out to the same
            length (lock it with the button on the case) and we’ll match the size.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <TapeMeasure
            max={24}
            scale={20}
            onMeasure={(value) => {
              setLength(value)
              if (value) setLocked(value)
            }}
          />
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <caption className="sr-only">Strap sizes by wrist measurement</caption>
              <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">Size</th>
                  <th scope="col" className="px-4 py-2 font-medium">Wrist</th>
                  <th scope="col" className="px-4 py-2 font-medium">Fits on</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((row) => (
                  <tr key={row.size} aria-current={match?.size === row.size ? "true" : undefined} className={cn("border-t transition-colors", match?.size === row.size && "bg-primary text-primary-foreground")}>
                    <th scope="row" className="px-4 py-2.5 text-left font-semibold">{row.size}</th>
                    <td className="px-4 py-2.5 font-mono tabular-nums">
                      {row.from}–{row.to} cm
                    </td>
                    <td className={cn("px-4 py-2.5", match?.size === row.size ? "text-primary-foreground/85" : "text-muted-foreground")}>{row.holes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p role="status" className="border-t px-4 py-3 text-sm">
              {match ? (
                <>
                  Your size is <strong>{match.size}</strong> ({reading.toFixed(1)} cm).
                </>
              ) : reading ? (
                `${reading.toFixed(1)} cm is outside our straps. Write to us for a custom length.`
              ) : (
                "Pull the tape to measure."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
