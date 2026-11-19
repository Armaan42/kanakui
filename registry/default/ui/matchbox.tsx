"use client"

import * as React from "react"
import { Flame } from "lucide-react"

import { cn } from "@/lib/utils"

interface MatchboxProps extends React.ComponentProps<"div"> {
  /** Big line on the label. */
  title?: string
  /** Small line on the label. */
  subtitle?: string
  /** Matches in the box. */
  count?: number
  /** How long a match burns, in milliseconds. */
  burnTime?: number
  onStrike?: (remaining: number) => void
}

/**
 * A matchbox. Slide the tray open, strike a match and watch it burn down.
 * When the box is empty, it's empty until the component remounts.
 */
function Matchbox({ title = "Good Light", subtitle = "Safety matches", count = 12, burnTime = 6000, onStrike, className, ...props }: MatchboxProps) {
  const [open, setOpen] = React.useState(false)
  const [left, setLeft] = React.useState(count)
  const [lit, setLit] = React.useState(false)
  const [status, setStatus] = React.useState("")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const strike = () => {
    if (!open || lit || left === 0) return
    const remaining = left - 1
    setLeft(remaining)
    setLit(true)
    setStatus(`Match lit. ${remaining} left.`)
    onStrike?.(remaining)
    timer.current = setTimeout(() => {
      setLit(false)
      setStatus("The match burned out.")
    }, burnTime)
  }

  return (
    <div data-slot="matchbox" className={cn("flex w-80 max-w-full flex-col items-center gap-4", className)} {...props}>
      <div className="relative h-14 w-full">
        <div aria-hidden="true" className={cn("absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center transition-all duration-300 motion-reduce:transition-none", lit ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}>
          {lit ? (
            <>
              <span className="pointer-events-none absolute -top-14 size-36 rounded-full bg-[radial-gradient(circle,rgb(251_191_36/0.32),transparent_65%)]" />
              <span className="animate-matchbox-flicker h-9 w-5 origin-bottom rounded-[50%_50%_46%_46%/68%_68%_32%_32%] bg-linear-to-t from-blue-500 via-amber-300 to-orange-500 blur-[0.5px] motion-reduce:animate-none" />
              <span className="-mt-1.5 size-3 rounded-full bg-neutral-900" />
              <span className="h-4 w-1 bg-amber-200" />
            </>
          ) : null}
        </div>
      </div>

      <div className="relative h-36 w-full">
        {/* Tray */}
        <div aria-hidden="true" className={cn("absolute top-2 bottom-2 w-[66%] overflow-hidden rounded-sm bg-[#d9c29a] shadow-[inset_0_0_0_3px_#c4a877,inset_0_6px_8px_rgb(92_64_26/0.35)] transition-[left] duration-500 ease-out motion-reduce:transition-none", open ? "left-[34%]" : "left-[17%]")}>
          <div className="flex h-full flex-col justify-center gap-[3px] py-2 pr-1.5 pl-2">
            {Array.from({ length: Math.min(count, 12) }, (_, i) => (
              <span key={i} className={cn("flex h-1.5 items-center justify-end transition-opacity duration-300", i < left ? "opacity-100" : "opacity-0")}>
                <span className="h-1 flex-1 rounded-l-sm bg-amber-100 shadow-[0_1px_0_rgb(120_83_30/0.4)]" />
                <span className="-ml-px h-1.5 w-2.5 rounded-full bg-red-700" />
              </span>
            ))}
          </div>
        </div>
        {/* Sleeve */}
        <div className={cn("absolute inset-y-0 flex w-[66%] flex-col overflow-hidden rounded-[3px] bg-[#c8372d] text-amber-50 shadow-[0_14px_22px_-12px_rgb(0_0_0/0.6)] ring-1 ring-black/15 transition-[left] duration-500 ease-out motion-reduce:transition-none", open ? "left-0" : "left-[17%]")}>
          <span aria-hidden="true" className="h-2.5 shrink-0 bg-[#3a2a25] bg-[radial-gradient(rgb(255_255_255/0.28)_0.5px,transparent_0.7px)] bg-size-[3px_3px]" />
          <div className="m-2 flex flex-1 flex-col items-center justify-center border border-amber-50/70 px-2 text-center">
            <Flame aria-hidden="true" className="mb-1 size-5" />
            <p className="font-serif text-lg leading-tight font-bold">{title}</p>
            <p className="mt-0.5 text-[9px] tracking-[0.18em] uppercase">{subtitle}</p>
          </div>
          <span aria-hidden="true" className="h-2.5 shrink-0 bg-[#3a2a25] bg-[radial-gradient(rgb(255_255_255/0.28)_0.5px,transparent_0.7px)] bg-size-[3px_3px]" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-md border px-3 py-1.5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          {open ? "Close box" : "Open box"}
        </button>
        <button type="button" disabled={!open || lit || left === 0} onClick={strike} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50">
          {left === 0 ? "Empty" : `Strike a match (${left})`}
        </button>
      </div>
      <p role="status" className="sr-only">
        {status}
      </p>
    </div>
  )
}

export { Matchbox }
