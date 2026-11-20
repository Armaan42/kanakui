"use client"

import * as React from "react"
import { Package, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface BalanceScaleProps extends React.ComponentProps<"div"> {
  /** Grams in the first mystery parcel. */
  mystery?: number
  /** Brass weights you can put on the pan, in grams. */
  weights?: number[]
}

const ARM = 120

/**
 * A balance scale with a mystery parcel. Add brass weights to the other pan
 * until the beam levels, and you've found out what the parcel weighs.
 */
function BalanceScale({ mystery = 13, weights = [1, 2, 5, 10, 20], className, ...props }: BalanceScaleProps) {
  const [parcel, setParcel] = React.useState(mystery)
  const [pan, setPan] = React.useState<{ id: number; grams: number }[]>([])
  const nextId = React.useRef(0)
  const total = pan.reduce((sum, item) => sum + item.grams, 0)
  const difference = parcel - total
  // Heavier side goes down; the tilt eases off for big differences.
  // A heavier parcel tips the beam anticlockwise (negative), dropping the left pan.
  const tilt = -Math.sign(difference) * Math.min(16, Math.sqrt(Math.abs(difference)) * 4)
  const drop = Math.sin((tilt * Math.PI) / 180) * ARM
  const balanced = difference === 0

  const add = (grams: number) => {
    nextId.current += 1
    setPan((list) => [...list, { id: nextId.current, grams }])
  }

  return (
    <div data-slot="balance-scale" className={cn("flex w-full max-w-md flex-col gap-5", className)} {...props}>
      <svg viewBox="-170 -40 340 250" className="w-full" role="img" aria-label={balanced ? `Balanced: the parcel weighs ${parcel} grams` : `The ${difference > 0 ? "parcel" : "weights"} side is heavier`}>
        {/* Stand. */}
        <path d="M-60 205 L60 205 L40 190 L-40 190 Z" fill="#78350f" />
        <rect x="-5" y="20" width="10" height="172" fill="url(#balance-brass)" />
        <defs>
          <linearGradient id="balance-brass" x1="0" x2="1">
            <stop offset="0" stopColor="#92400e" />
            <stop offset="0.5" stopColor="#fcd34d" />
            <stop offset="1" stopColor="#92400e" />
          </linearGradient>
        </defs>
        {/* Beam. */}
        <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "0px 20px", transition: "transform 900ms cubic-bezier(.3,1.5,.5,1)" }}>
          <rect x={-ARM - 6} y="16" width={ARM * 2 + 12} height="8" rx="4" fill="url(#balance-brass)" />
          <path d="M-8 30 L0 4 L8 30" fill="#b45309" />
        </g>
        <circle cy="20" r="7" fill="#fcd34d" stroke="#78350f" strokeWidth="2" />
        {/* Pans hang straight down from the ends of the beam. */}
        {([-1, 1] as const).map((side) => (
          <g key={side} style={{ transform: `translate(${side * ARM}px, ${side * drop}px)`, transition: "transform 900ms cubic-bezier(.3,1.5,.5,1)" }}>
            <line x1="0" y1="20" x2="-40" y2="110" stroke="#a16207" strokeWidth="1.2" />
            <line x1="0" y1="20" x2="40" y2="110" stroke="#a16207" strokeWidth="1.2" />
            <path d="M-48 110 Q0 132 48 110 Z" fill="url(#balance-brass)" />
            {side === -1 ? (
              <g transform="translate(-20 72)">
                <rect width="40" height="38" rx="3" fill="#d6a76b" stroke="#92400e" />
                <path d="M0 12 H40 M20 0 V38" stroke="#92400e" strokeWidth="2" />
                <text x="20" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="#451a03">?</text>
              </g>
            ) : (
              pan.map((item, i) => {
                const width = 12 + Math.sqrt(item.grams) * 4
                const height = 8 + Math.sqrt(item.grams) * 3
                const x = -38 + ((i * 19) % 64)
                const y = 108 - height - Math.floor(i / 4) * 12
                return (
                  <g key={item.id}>
                    <rect x={x} y={y} width={width} height={height} rx="2" fill="url(#balance-brass)" stroke="#78350f" strokeWidth="0.8" />
                    <text x={x + width / 2} y={y + height / 2 + 3} textAnchor="middle" fontSize="7" fontWeight="700" fill="#451a03">
                      {item.grams}
                    </text>
                  </g>
                )
              })
            )}
          </g>
        ))}
      </svg>

      <div className="flex flex-wrap items-center gap-2">
        {weights.map((grams) => (
          <button
            key={grams}
            type="button"
            onClick={() => add(grams)}
            className="h-9 rounded-full border px-3 font-mono text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            +{grams} g
          </button>
        ))}
      </div>
      {pan.length ? (
        <ul aria-label="Weights on the pan" className="flex flex-wrap gap-1.5">
          {pan.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={`Take off ${item.grams} gram weight`}
                onClick={() => setPan((list) => list.filter((entry) => entry.id !== item.id))}
                className="h-7 rounded-md bg-amber-100 px-2 font-mono text-xs text-amber-950 outline-none hover:bg-amber-200 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {item.grams} g ✕
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <p role="status" className="text-sm">
          {balanced ? (
            <span className="font-medium text-emerald-700 dark:text-emerald-400">Balanced! The parcel weighs {parcel} g.</span>
          ) : (
            `${total} g on the pan. ${difference > 0 ? "The parcel is heavier." : "Too much, the weights are heavier."}`
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setParcel(1 + Math.floor(Math.random() * 37))
            setPan([])
          }}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {balanced ? <Package aria-hidden="true" className="size-3.5" /> : <RotateCcw aria-hidden="true" className="size-3.5" />}
          New parcel
        </button>
      </div>
    </div>
  )
}

export { BalanceScale }
