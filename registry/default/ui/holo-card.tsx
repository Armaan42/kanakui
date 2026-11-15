"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface HoloCardProps extends Omit<React.ComponentProps<"button">, "children"> {
  /** Card holder's name. */
  name: string
  /** The last four digits; the rest are shown as dots. */
  last4: string
  /** Expiry, e.g. "08/29". */
  expires: string
  /** Wordmark in the top corner. */
  brand?: string
  /** Security code on the back. Use a placeholder; never a real one. */
  cvc?: string
  /** Largest tilt in degrees. */
  max?: number
}

function Chip() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[9.5cqw] w-[13cqw] overflow-hidden rounded-[18%] bg-linear-to-br from-amber-200 via-yellow-400 to-amber-600 shadow-[inset_0_0_0_1px_rgb(120_80_0/0.35)]"
    >
      <span className="absolute inset-x-0 top-1/3 h-px bg-amber-800/40" />
      <span className="absolute inset-x-0 top-2/3 h-px bg-amber-800/40" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-amber-800/40" />
      <span className="absolute inset-[30%] rounded-sm border border-amber-800/40" />
    </span>
  )
}

/**
 * A payment card with a holographic foil: the rainbow sheen and the glare
 * follow the pointer as the card tilts. Click, tap, Enter or Space flips it
 * over. With reduced motion it neither tilts nor animates the flip.
 */
function HoloCard({ name, last4, expires, brand = "Aurora", cvc = "123", max = 14, className, style, onClick, ...props }: HoloCardProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const frame = React.useRef(0)
  const [flipped, setFlipped] = React.useState(false)

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const track = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const card = ref.current
    if (!card) return
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const px = (clientX - rect.left) / rect.width
      const py = (clientY - rect.top) / rect.height
      card.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`)
      card.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`)
      card.style.setProperty("--px", `${px * 100}%`)
      card.style.setProperty("--py", `${py * 100}%`)
      card.style.setProperty("--shine", "1")
    })
  }

  const reset = () => {
    cancelAnimationFrame(frame.current)
    const card = ref.current
    if (!card) return
    card.style.setProperty("--rx", "0deg")
    card.style.setProperty("--ry", "0deg")
    card.style.setProperty("--shine", "0")
  }

  const face = "absolute inset-0 overflow-hidden rounded-[4.5%/7%] backface-hidden"

  return (
    <div className={cn("@container w-full max-w-sm perspective-[1200px]", className)} style={style}>
      <button
        ref={ref}
        type="button"
        data-slot="holo-card"
        aria-pressed={flipped}
        aria-label={flipped ? `${brand} card back. Show front` : `${brand} card ending ${last4}, ${name}, expires ${expires}. Show back`}
        onPointerMove={track}
        onPointerLeave={reset}
        onClick={(event) => {
          onClick?.(event)
          setFlipped((value) => !value)
        }}
        className={cn(
          "relative block aspect-[1.586] w-full cursor-pointer rounded-[4.5%/7%] text-left outline-none transform-3d focus-visible:ring-3 focus-visible:ring-ring/50",
          "transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none",
          "[transform:rotateX(var(--rx,0deg))_rotateY(calc(var(--ry,0deg)+var(--flip,0deg)))]"
        )}
        style={{ "--flip": flipped ? "180deg" : "0deg" } as React.CSSProperties}
        {...props}
      >
        {/* Front */}
        <span
          className={cn(
            face,
            "bg-[radial-gradient(120%_120%_at_0%_0%,#3b3f4a_0%,#16181d_55%,#0b0c0f_100%)] text-white shadow-[0_30px_50px_-25px_rgb(0_0_0/0.65),inset_0_0_0_1px_rgb(255_255_255/0.08)]"
          )}
        >
          {/* Holographic foil, strongest under the pointer. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-[calc(0.18+var(--shine,0)*0.32)] mix-blend-color-dodge transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(115deg, transparent 25%, rgb(255 0 180 / 0.35) 38%, rgb(0 220 255 / 0.35) 48%, rgb(120 255 120 / 0.3) 58%, rgb(255 230 0 / 0.3) 68%, transparent 80%)",
              backgroundSize: "250% 250%",
              backgroundPosition: "var(--px, 30%) var(--py, 30%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-(--shine,0) transition-opacity duration-300 motion-reduce:hidden"
            style={{ background: "radial-gradient(circle at var(--px,50%) var(--py,50%), rgb(255 255 255 / 0.28), transparent 45%)" }}
          />
          <span className="absolute inset-0 flex flex-col p-[7%]">
            <span className="flex items-start justify-between">
              <span className="text-[clamp(0.8rem,4.2cqw,1.1rem)] font-semibold tracking-tight">{brand}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[7cqw] fill-none stroke-white/80" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8.5 7.5a6.5 6.5 0 0 1 0 9M12 5a10 10 0 0 1 0 14M5 10a3 3 0 0 1 0 4" />
              </svg>
            </span>
            <span className="mt-[5cqw]">
              <Chip />
            </span>
            <span className="mt-auto font-mono text-[clamp(0.85rem,5cqw,1.35rem)] tracking-[0.14em] text-white/95 [text-shadow:0_1px_0_rgb(0_0_0/0.6)]">
              •••• •••• •••• {last4}
            </span>
            <span className="mt-[4%] flex items-end justify-between text-[clamp(0.6rem,2.8cqw,0.8rem)] tracking-wider text-white/75 uppercase">
              <span className="truncate">{name}</span>
              <span className="shrink-0">
                <span className="mr-1.5 text-[0.75em] text-white/50">Valid thru</span>
                {expires}
              </span>
            </span>
          </span>
        </span>

        {/* Back */}
        <span className={cn(face, "[transform:rotateY(180deg)] bg-linear-to-br from-[#2a2d35] to-[#0c0d10] text-white")}>
          <span aria-hidden="true" className="absolute inset-x-0 top-[11%] h-[18%] bg-black" />
          <span className="absolute inset-x-[7%] top-[38%] flex h-[15%] items-center">
            <span
              aria-hidden="true"
              className="h-full flex-1 rounded-l-sm bg-[repeating-linear-gradient(-45deg,#e7e5e4_0_6px,#d6d3d1_6px_12px)]"
            />
            <span className="flex h-full items-center rounded-r-sm bg-white px-3 font-mono text-sm text-neutral-900 italic">{cvc}</span>
          </span>
          <span className="absolute inset-x-[7%] bottom-[9%] text-[clamp(0.5rem,2.2cqw,0.65rem)] leading-relaxed text-white/50">
            This card is property of {brand}. If found, please return it to any branch. Use is subject to the cardholder agreement.
          </span>
        </span>
      </button>
    </div>
  )
}

export { HoloCard }
