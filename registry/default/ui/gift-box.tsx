"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

interface GiftBoxProps extends React.ComponentProps<"div"> {
  /** The coupon code revealed inside. */
  code: string
  /** What the code gets you, e.g. "15% off your next order". */
  reward: string
  /** Box color: any CSS color. The ribbon stays ivory. */
  color?: string
  onOpen?: () => void
}

const CONFETTI_COLORS = ["#f2ede3", "#d4a645", "#c46a4a", "#7f9a83", "#1f1f22", "#e8d9b8"]
/** Stable pseudo-random numbers in [0, 1), so every render places the confetti the same way. */
const spread = (i: number, salt: number) => {
  const n = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return n - Math.floor(n)
}
/** A confetti piece's landing offset: an upward fan, each piece at its own angle and distance. */
const burst = (i: number) => {
  const angle = (-90 + (spread(i, 1) - 0.5) * 150) * (Math.PI / 180)
  const distance = 90 + spread(i, 2) * 130
  return { x: Math.cos(angle) * distance * 1.3, y: Math.sin(angle) * distance }
}

/**
 * A wrapped gift. Click (or press Enter or Space) and the lid pops off,
 * confetti bursts out and a card with a coupon code rises from the box,
 * with a copy button. With reduced motion there's no confetti.
 */
function GiftBox({ code, reward, color = "#24382d", onOpen, className, style, ...props }: GiftBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked: the code is still visible to copy by hand.
    }
  }

  return (
    <div
      data-slot="gift-box"
      data-open={open || undefined}
      className={cn("group/gift relative flex w-64 flex-col items-center pt-36 select-none", className)}
      style={{ "--box": color, "--box-dark": `color-mix(in oklch, ${color} 78%, black)`, ...style } as React.CSSProperties}
      {...props}
    >
      {/* The reward card, rising out of the box. */}
      <div
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "absolute top-36 left-1/2 z-10 w-56 -translate-x-1/2 rounded-xl border bg-card p-4 text-center shadow-xl transition-[translate,opacity] duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none",
          open ? "-translate-y-[118%] opacity-100 delay-200" : "translate-y-6 opacity-0"
        )}
      >
        <p className="text-sm text-muted-foreground">Your gift</p>
        <p className="mt-1 font-semibold text-balance">{reward}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <code className="rounded-md border border-dashed bg-muted px-3 py-1.5 font-mono text-sm font-semibold tracking-wider">{code}</code>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : `Copy code ${code}`}
            className="grid size-8 place-items-center rounded-md border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {copied ? <Check aria-hidden="true" className="size-4 text-emerald-600" /> : <Copy aria-hidden="true" className="size-4" />}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? "Code copied" : ""}
        </p>
      </div>

      {/* Confetti */}
      {open ? (
        <div aria-hidden="true" className="pointer-events-none absolute top-40 left-1/2 z-20 motion-reduce:hidden">
          {Array.from({ length: 40 }, (_, i) => {
            const { x, y } = burst(i)
            return (
              <span
                key={i}
                className={cn("absolute animate-gift-box-confetti rounded-[2px]", i % 3 === 0 ? "h-1.5 w-3" : "size-2")}
                style={
                  {
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    "--x": `${x.toFixed(1)}px`,
                    "--y": `${y.toFixed(1)}px`,
                    "--r": `${(spread(i, 3) * 720 - 360).toFixed(0)}deg`,
                    animationDelay: `${(spread(i, 4) * 140).toFixed(0)}ms`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          if (open) return
          setOpen(true)
          onOpen?.()
        }}
        aria-label={open ? "Gift opened" : "Open the gift"}
        aria-disabled={open}
        className="relative z-30 h-40 w-48 cursor-pointer rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:cursor-default"
      >
        {/* Box */}
        <span aria-hidden="true" className="absolute inset-x-2 top-10 bottom-0 rounded-b-md bg-(--box) shadow-[inset_0_-12px_20px_rgb(0_0_0/0.2),inset_0_1px_0_rgb(255_255_255/0.08),0_18px_30px_-16px_rgb(0_0_0/0.5)]">
          <span className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-linear-to-r from-[#d9d0bd] via-[#fbf8f1] to-[#d9d0bd] shadow-[0_0_0_0.5px_rgb(0_0_0/0.08)]" />
        </span>
        {/* Lid with bow */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-4 h-8 transition-[translate,rotate,opacity] duration-700 ease-out motion-reduce:transition-none",
            open
              ? "translate-x-28 -translate-y-20 rotate-[38deg] opacity-0"
              : "group-hover/gift:-translate-y-1.5 group-hover/gift:rotate-[-2deg]"
          )}
        >
          <span className="absolute inset-0 rounded-md bg-(--box-dark) shadow-md">
            <span className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-linear-to-r from-[#d9d0bd] via-[#fbf8f1] to-[#d9d0bd] shadow-[0_0_0_0.5px_rgb(0_0_0/0.08)]" />
          </span>
          <span className="absolute bottom-[85%] left-1/2 h-10 w-24 -translate-x-1/2">
            <span className="absolute bottom-0 left-0 h-9 w-11 rotate-[-25deg] rounded-[50%_50%_40%_60%] border-[7px] border-[#efe8da] shadow-[0_1px_2px_rgb(0_0_0/0.2)]" />
            <span className="absolute right-0 bottom-0 h-9 w-11 rotate-[25deg] rounded-[50%_50%_60%_40%] border-[7px] border-[#efe8da] shadow-[0_1px_2px_rgb(0_0_0/0.2)]" />
            <span className="absolute bottom-0 left-1/2 size-5 -translate-x-1/2 rounded-full bg-[#e4dccb] shadow-[0_1px_2px_rgb(0_0_0/0.3)]" />
          </span>
        </span>
      </button>
    </div>
  )
}

export { GiftBox }
