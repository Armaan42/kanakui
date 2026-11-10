"use client"

import * as React from "react"
import { RotateCw } from "lucide-react"

import { cn } from "@/lib/utils"

interface FlipCardProps {
  /** Content on the front face. */
  front: React.ReactNode
  /** Content on the back face. */
  back: React.ReactNode
  /** Accessible label for the flip button, e.g. "Show details". */
  flipLabel?: string
  /** Also flip while a mouse hovers the card. */
  flipOnHover?: boolean
  className?: string
}

/**
 * A card with two faces that turns over in 3D. A button flips it, so it works
 * with keyboard and touch; the hidden face is `inert` and `aria-hidden`.
 * With reduced motion the faces swap instantly instead of rotating.
 */
function FlipCard({ front, back, flipLabel = "Flip card", flipOnHover = false, className }: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const showBack = flipped || (flipOnHover && hovered)

  const face = "absolute inset-0 overflow-hidden rounded-xl border bg-card p-6 [backface-visibility:hidden]"

  return (
    <div
      data-slot="flip-card"
      className={cn("group relative h-64 w-full max-w-sm [perspective:1200px]", className)}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none",
          showBack && "[transform:rotateY(180deg)]"
        )}
      >
        <div className={face} aria-hidden={showBack} inert={showBack ? true : undefined}>
          {front}
        </div>
        <div className={cn(face, "[transform:rotateY(180deg)]")} aria-hidden={!showBack} inert={!showBack ? true : undefined}>
          {back}
        </div>
      </div>
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipLabel}
        onClick={() => setFlipped((value) => !value)}
        className="absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-md border bg-background/80 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <RotateCw aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}

export { FlipCard, type FlipCardProps }
