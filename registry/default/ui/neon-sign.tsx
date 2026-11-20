"use client"

import * as React from "react"
import { Power } from "lucide-react"

import { cn } from "@/lib/utils"

type NeonColor = { name: string; tube: string; glow: string }

interface NeonSignProps extends React.ComponentProps<"div"> {
  defaultText?: string
  /** Let visitors edit the sign's text. */
  editable?: boolean
  colors?: NeonColor[]
  /** Index of a letter that buzzes and flickers now and then, like a tired tube. */
  flickerAt?: number
}

const COLORS: NeonColor[] = [
  { name: "Pink", tube: "#ffe4f1", glow: "#ff2d95" },
  { name: "Blue", tube: "#e0f7ff", glow: "#18b4ff" },
  { name: "Green", tube: "#eaffe4", glow: "#39ff6a" },
  { name: "Amber", tube: "#fff4dc", glow: "#ffa31a" },
]

/**
 * A neon sign on a brick wall. It flickers on when switched on, one tired
 * letter buzzes now and then, and visitors can change the words and colour.
 */
function NeonSign({ defaultText = "Open late", editable = true, colors = COLORS, flickerAt = 2, className, ...props }: NeonSignProps) {
  const [text, setText] = React.useState(defaultText)
  const [on, setOn] = React.useState(true)
  const [color, setColor] = React.useState(0)
  const [boot, setBoot] = React.useState(0)
  const id = React.useId()
  const tone = colors[color % colors.length]
  const glow = on
    ? `0 0 2px ${tone.tube}, 0 0 6px ${tone.glow}, 0 0 14px ${tone.glow}, 0 0 28px ${tone.glow}, 0 0 56px ${tone.glow}`
    : "none"

  return (
    <div data-slot="neon-sign" className={cn("flex w-full max-w-xl flex-col gap-4", className)} {...props}>
      <div
        className="relative grid min-h-56 place-items-center overflow-hidden rounded-2xl px-6 py-12"
        style={{
          backgroundColor: "#2a1a17",
          backgroundImage:
            "linear-gradient(#1b100e 2px, transparent 2px), linear-gradient(90deg, #1b100e 2px, transparent 2px), linear-gradient(90deg, #1b100e 2px, transparent 2px)",
          backgroundSize: "56px 26px, 56px 52px, 56px 52px",
          backgroundPosition: "0 0, 0 0, 28px 26px",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700"
          style={{ background: `radial-gradient(ellipse at 50% 55%, ${tone.glow}55, transparent 65%)`, opacity: on ? 1 : 0 }}
        />
        {/* Mounting wires. */}
        <span aria-hidden="true" className="absolute top-0 left-[22%] h-10 w-px bg-neutral-500/60" />
        <span aria-hidden="true" className="absolute top-0 right-[22%] h-10 w-px bg-neutral-500/60" />
        <p
          key={`${boot}-${on}`}
          className={cn(
            "relative text-center text-5xl leading-tight font-semibold tracking-wide break-words sm:text-6xl",
            on && boot > 0 && "animate-neon-sign-boot motion-reduce:animate-none"
          )}
          style={{ color: on ? tone.tube : "#8a7670", textShadow: glow, fontFamily: "'Segoe Script', 'Snell Roundhand', 'Brush Script MT', cursive" }}
        >
          {[...text].map((letter, i) => (
            <span key={i} className={cn(on && i === flickerAt && "animate-neon-sign-buzz motion-reduce:animate-none")}>
              {letter}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={on}
          aria-label="Power"
          onClick={() => {
            setOn(!on)
            setBoot((value) => value + 1)
          }}
          className={cn(
            "grid size-10 place-items-center rounded-full border outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
            on ? "border-transparent bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Power aria-hidden="true" className="size-4" />
        </button>
        <div role="group" aria-label="Colour" className="flex gap-1.5">
          {colors.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={color === i}
              aria-label={item.name}
              onClick={() => setColor(i)}
              className="size-8 rounded-full border-2 border-transparent outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground"
              style={{ background: item.glow }}
            />
          ))}
        </div>
        {editable ? (
          <>
            <label htmlFor={id} className="sr-only">
              Sign text
            </label>
            <input
              id={id}
              value={text}
              maxLength={24}
              onChange={(event) => setText(event.target.value)}
              className="h-10 min-w-0 flex-1 basis-40 rounded-full border bg-transparent px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export { NeonSign }
export type { NeonColor }
