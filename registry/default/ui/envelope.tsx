"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface EnvelopeProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The letter. Any content, including links and buttons. */
  children: React.ReactNode
  /** Names the envelope for screen readers, e.g. "Invitation from Maya". */
  label: string
  /** Shown on the front, e.g. the recipient's name. */
  to?: string
  /** Envelope color: any CSS color. Shades for the flap and pocket are mixed from it. */
  color?: string
  /** Controlled open state. Leave unset to open on hover and toggle on click. */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * An envelope that opens when hovered (or clicked, tapped, or toggled with
 * Enter or Space): the flap folds back and the letter slides up out of it.
 * The letter is hidden from keyboard and screen readers until it's out.
 */
function Envelope({
  children,
  label,
  to,
  color = "oklch(0.93 0.035 75)",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  style,
  ...props
}: EnvelopeProps) {
  const [hovered, setHovered] = React.useState(false)
  const [pinned, setPinned] = React.useState(defaultOpen)
  const open = openProp ?? (hovered || pinned)
  const letterId = React.useId()

  return (
    <div
      data-slot="envelope"
      data-open={open || undefined}
      onPointerEnter={(event) => event.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={(event) => event.pointerType !== "touch" && setHovered(false)}
      className={cn("group/envelope relative w-80 pt-[56%] select-none", className)}
      style={
        {
          "--env": color,
          "--env-dark": `color-mix(in oklch, ${color} 88%, black)`,
          "--env-darker": `color-mix(in oklch, ${color} 80%, black)`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative aspect-[3/2] w-full perspective-[900px]">
        {/* Inside back of the envelope */}
        <div aria-hidden="true" className="absolute inset-0 rounded-md bg-(--env-darker) shadow-[0_24px_40px_-24px_rgb(0_0_0/0.45)]" />

        {/* The letter, slid up out of the pocket when open. */}
        <div
          id={letterId}
          inert={!open}
          className={cn(
            "absolute inset-x-[5%] top-[6%] bottom-[4%] z-10 overflow-hidden rounded-sm bg-white p-[6%] text-left text-neutral-800 shadow-[0_2px_8px_rgb(0_0_0/0.15)]",
            "transition-transform duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] motion-reduce:transition-none",
            "delay-0 group-data-open/envelope:-translate-y-[88%] group-data-open/envelope:delay-200"
          )}
        >
          {children}
        </div>

        {/* Front pocket: left, right and bottom folds. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute inset-0 rounded-md bg-(--env-dark) [clip-path:polygon(0_0,52%_55%,0_100%)]" />
          <div className="absolute inset-0 rounded-md bg-(--env-dark) [clip-path:polygon(100%_0,48%_55%,100%_100%)]" />
          <div className="absolute inset-0 rounded-md bg-(--env) shadow-[0_-1px_0_rgb(255_255_255/0.5)_inset] [clip-path:polygon(0_100%,50%_42%,100%_100%)]" />
          {to ? (
            <p className="absolute inset-x-0 bottom-[14%] text-center font-serif text-sm text-neutral-700/80 italic">{to}</p>
          ) : null}
        </div>

        {/* Flap: folds back (behind the letter) when open. The toggle sits on it. */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 z-30 h-[58%] origin-top transform-3d",
            "transition-[transform,z-index] duration-300 ease-out motion-reduce:transition-none",
            "delay-300 group-data-open/envelope:z-0 group-data-open/envelope:[transform:rotateX(180deg)] group-data-open/envelope:delay-0"
          )}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-(--env) drop-shadow-[0_2px_2px_rgb(0_0_0/0.12)] [clip-path:polygon(0_0,100%_0,50%_100%)] backface-hidden" />
          <div aria-hidden="true" className="absolute inset-0 bg-(--env-dark) [clip-path:polygon(0_0,100%_0,50%_100%)] [transform:rotateY(180deg)] backface-hidden" />
          {/* Wax seal */}
          <span
            aria-hidden="true"
            className="absolute top-[86%] left-1/2 grid size-9 -translate-1/2 place-items-center rounded-full bg-radial-[at_35%_30%] from-rose-500 to-rose-800 font-serif text-sm text-rose-100 shadow-[0_2px_4px_rgb(0_0_0/0.35)] transition-opacity duration-200 group-data-open/envelope:opacity-0"
          >
            ✦
          </span>
        </div>

        {/* The toggle covers the closed envelope. */}
        <button
          type="button"
          aria-label={label}
          aria-expanded={open}
          aria-controls={letterId}
          onClick={() => {
            setPinned(!pinned)
            onOpenChange?.(!pinned)
          }}
          className="absolute inset-0 z-40 cursor-pointer rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50 group-data-open/envelope:top-[60%]"
        />
      </div>
    </div>
  )
}

export { Envelope }
