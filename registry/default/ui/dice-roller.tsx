"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface DiceRollerProps extends React.ComponentProps<"div"> {
  /** How many dice. */
  count?: number
  onRoll?: (values: number[]) => void
}

/** Pip positions on a 3 × 3 grid for each face. */
const PIPS: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] }
/** Rotation that brings each face to the front. */
const FACE: Record<number, [number, number]> = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] }
const SIDES: { value: number; transform: string }[] = [
  { value: 1, transform: "rotateY(0deg)" },
  { value: 2, transform: "rotateY(90deg)" },
  { value: 3, transform: "rotateX(90deg)" },
  { value: 4, transform: "rotateX(-90deg)" },
  { value: 5, transform: "rotateY(-90deg)" },
  { value: 6, transform: "rotateY(180deg)" },
]

/**
 * Dice that tumble in 3D. Press Roll (or a die) and each lands on a fair,
 * random face. The total is announced for screen readers.
 */
function DiceRoller({ count = 2, onRoll, className, ...props }: DiceRollerProps) {
  const [dice, setDice] = React.useState(() =>
    Array.from({ length: count }, (_, i) => {
      const value = ((i * 3 + 4) % 6) + 1
      return { value, x: FACE[value][0], y: FACE[value][1] }
    })
  )
  const [rolls, setRolls] = React.useState(0)

  const roll = () => {
    const next = dice.map((die) => {
      const value = 1 + Math.floor(Math.random() * 6)
      const [fx, fy] = FACE[value]
      const spins = 2 + Math.floor(Math.random() * 2)
      return { value, x: Math.ceil(die.x / 360) * 360 + spins * 360 + fx, y: Math.ceil(die.y / 360) * 360 + spins * 360 + fy }
    })
    setDice(next)
    setRolls((value) => value + 1)
    onRoll?.(next.map((die) => die.value))
  }

  const total = dice.reduce((sum, die) => sum + die.value, 0)

  return (
    <div data-slot="dice-roller" className={cn("flex flex-col items-center gap-6", className)} {...props}>
      <div className="flex gap-8 [perspective:600px]">
        {dice.map((die, i) => (
          <button
            key={i}
            type="button"
            onClick={roll}
            aria-label={`Die ${i + 1}: ${die.value}. Press to roll.`}
            className="relative size-16 outline-none [transform-style:preserve-3d] transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.3,1)] focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none"
            style={{ transform: `rotateX(${die.x}deg) rotateY(${die.y}deg)` }}
          >
            {SIDES.map((side) => (
              <span
                key={side.value}
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-3 grid-rows-3 place-items-center rounded-xl bg-linear-145 from-white to-neutral-200 p-2 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08),inset_0_-4px_8px_rgb(0_0_0/0.1)] [backface-visibility:hidden]"
                style={{ transform: `${side.transform} translateZ(32px)` }}
              >
                {Array.from({ length: 9 }, (_, cell) => (
                  <span key={cell} className={cn("size-2.5 rounded-full", PIPS[side.value].includes(cell) ? (side.value === 1 ? "size-3.5 bg-red-600" : "bg-neutral-900") : "")} />
                ))}
              </span>
            ))}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={roll} className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50">
          Roll
        </button>
        <p role="status" className="font-mono text-sm tabular-nums">
          {rolls ? `${dice.map((die) => die.value).join(" + ")} = ${total}` : "Ready"}
        </p>
      </div>
    </div>
  )
}

export { DiceRoller }
