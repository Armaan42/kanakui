"use client"

import * as React from "react"
import { RotateCcw, Stamp } from "lucide-react"

import { cn } from "@/lib/utils"

type Phase = "open" | "pouring" | "stamping" | "sealed" | "broken"

interface WaxSealProps extends React.ComponentProps<"div"> {
  /** One to three letters pressed into the wax. */
  initials?: string
  /** Wax colour. */
  color?: string
  /** The letter inside, shown once the seal is broken. */
  children?: React.ReactNode
  onSeal?: () => void
  onOpen?: () => void
}

/** A blob of wax: a circle whose edge wobbles, the same every time. */
const BLOB = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2
  const radius = 44 * (1 + 0.07 * Math.sin(i * 2.7) + 0.04 * Math.cos(i * 5.3))
  return `${50 + Math.cos(angle) * radius},${50 + Math.sin(angle) * radius}`
}).join(" ")

function Seal({ initials, color, id }: { initials: string; color: string; id: string }) {
  return (
    <svg viewBox="0 0 100 100" className="size-full overflow-visible">
      <defs>
        <radialGradient id={`${id}-wax`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor={`color-mix(in oklab, ${color} 60%, white)`} />
          <stop offset="0.45" stopColor={color} />
          <stop offset="1" stopColor={`color-mix(in oklab, ${color} 55%, black)`} />
        </radialGradient>
      </defs>
      <polygon points={BLOB} fill={`url(#${id}-wax)`} strokeLinejoin="round" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="rgb(0 0 0 / 0.28)" strokeWidth="2" />
      <circle cx="50.8" cy="50.8" r="30" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
      <text x="51" y="58" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontStyle="italic" fill="rgb(255 255 255 / 0.25)">
        {initials}
      </text>
      <text x="50" y="57" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontStyle="italic" fill="rgb(0 0 0 / 0.35)">
        {initials}
      </text>
    </svg>
  )
}

/**
 * An envelope sealed with wax. Press Seal: the wax pours, the stamp presses
 * your initials in. Break the seal and the letter slides out.
 */
function WaxSeal({ initials = "AV", color = "#9b1c1c", children, onSeal, onOpen, className, ...props }: WaxSealProps) {
  const [phase, setPhase] = React.useState<Phase>("open")
  const timers = React.useRef<number[]>([])
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const letters = initials.slice(0, 3)

  React.useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  const seal = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (still) {
      setPhase("sealed")
      onSeal?.()
      return
    }
    setPhase("pouring")
    later(() => setPhase("stamping"), 600)
    later(() => {
      setPhase("sealed")
      onSeal?.()
    }, 1500)
  }

  const open = () => {
    setPhase("broken")
    onOpen?.()
  }

  const busy = phase === "pouring" || phase === "stamping"
  const status = { open: "The envelope is open.", pouring: "Pouring the wax…", stamping: "Pressing the seal…", sealed: `Sealed with ${letters}.`, broken: "The seal is broken. The letter is out." }[phase]

  return (
    <div data-slot="wax-seal" className={cn("flex w-full max-w-sm flex-col items-center gap-5", className)} {...props}>
      {/* The wrapper grows a space on top when the letter comes out, so it never covers what's above. */}
      <div className={cn("relative w-full transition-[padding] duration-700 motion-reduce:transition-none", phase === "broken" && "pt-[40%]")}>
        {/* The letter. */}
        <div
          className={cn(
            "absolute inset-x-[6%] bottom-[5%] aspect-[1.6] overflow-hidden rounded-sm bg-[#fffdf7] p-5 font-serif text-sm leading-6 text-neutral-800 shadow-md transition-transform duration-700 ease-out motion-reduce:transition-none",
            phase === "broken" ? "-translate-y-[68%]" : "translate-y-0"
          )}
          aria-hidden={phase !== "broken"}
        >
          {children}
        </div>
        {/* The envelope back. */}
        <div className="relative aspect-[1.55] w-full rounded-md bg-[#efe3cc] shadow-[0_18px_30px_-16px_rgb(0_0_0/0.5)]">
          <svg aria-hidden="true" viewBox="0 0 155 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <path d="M0 100 L77.5 52 L155 100 Z" fill="#e6d6b8" />
            <path d="M0 0 L77.5 52 L0 100 Z" fill="#eadcc0" />
            <path d="M155 0 L77.5 52 L155 100 Z" fill="#eadcc0" />
            <path d="M0 0 L77.5 58 L155 0 Z" fill="#f3e9d6" stroke="rgb(0 0 0 / 0.08)" strokeWidth="0.6" />
          </svg>

          {/* Seal. */}
          <div className="absolute top-[58%] left-1/2 size-24 -translate-1/2">
            {phase !== "open" ? (
              <div className={cn("absolute inset-0", phase === "pouring" && "animate-wax-seal-pour motion-reduce:animate-none")}>
                {phase === "broken" ? (
                  <>
                    <div className="absolute inset-0 animate-wax-seal-left [clip-path:polygon(0_0,52%_0,46%_40%,55%_62%,48%_100%,0_100%)] motion-reduce:animate-none">
                      <Seal initials={letters} color={color} id={`${id}-l`} />
                    </div>
                    <div className="absolute inset-0 animate-wax-seal-right [clip-path:polygon(52%_0,100%_0,100%_100%,48%_100%,55%_62%,46%_40%)] motion-reduce:animate-none">
                      <Seal initials={letters} color={color} id={`${id}-r`} />
                    </div>
                  </>
                ) : (
                  <Seal initials={phase === "pouring" ? "" : letters} color={color} id={id} />
                )}
              </div>
            ) : null}
            {/* The stamp. */}
            {phase === "stamping" ? (
              <div aria-hidden="true" className="absolute bottom-1/2 left-1/2 flex -translate-x-1/2 animate-wax-seal-stamp flex-col items-center motion-reduce:animate-none">
                <span className="size-9 rounded-full bg-[radial-gradient(circle_at_35%_30%,#a16207,#451a03)]" />
                <span className="h-14 w-4 bg-linear-to-r from-amber-900 via-amber-700 to-amber-900" />
                <span className="h-3 w-16 rounded-sm bg-linear-to-b from-yellow-500 to-yellow-800" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {phase === "open" || busy ? (
          <button
            type="button"
            onClick={seal}
            disabled={busy}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
          >
            <Stamp aria-hidden="true" className="size-4" />
            Seal the letter
          </button>
        ) : phase === "sealed" ? (
          <button type="button" onClick={open} className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
            Break the seal
          </button>
        ) : (
          <button type="button" onClick={() => setPhase("open")} className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
            <RotateCcw aria-hidden="true" className="size-4" />
            Start again
          </button>
        )}
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {status}
      </p>
    </div>
  )
}

export { WaxSeal }
