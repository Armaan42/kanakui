"use client"

import * as React from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

interface LikeButtonProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  liked?: boolean
  defaultLiked?: boolean
  onLikedChange?: (liked: boolean) => void
  /** Optional count shown next to the heart. It goes up or down by one as the button toggles. */
  count?: number
  /** Accessible name, e.g. "Like this post". */
  label?: string
}

/**
 * A heart toggle that pops and bursts when liked. Exposes its state with
 * `aria-pressed`; the burst is decorative and skipped with reduced motion.
 */
function LikeButton({ liked: controlled, defaultLiked = false, onLikedChange, count, label = "Like", className, onClick, ...props }: LikeButtonProps) {
  const [internal, setInternal] = React.useState(defaultLiked)
  const [burstKey, setBurstKey] = React.useState(0)
  const liked = controlled ?? internal
  const shownCount = count === undefined ? undefined : count + (liked && !defaultLiked ? 1 : !liked && defaultLiked ? -1 : 0)

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={label}
      data-slot="like-button"
      onClick={(event) => {
        onClick?.(event)
        const next = !liked
        if (controlled === undefined) setInternal(next)
        onLikedChange?.(next)
        if (next) setBurstKey((k) => k + 1)
      }}
      className={cn(
        "group relative inline-flex h-9 items-center gap-1.5 rounded-full border bg-background px-3 text-sm font-medium outline-none transition-colors",
        "hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
        liked && "border-rose-500/40 text-rose-500",
        className
      )}
      {...props}
    >
      <span className="relative inline-flex">
        <Heart
          aria-hidden="true"
          className={cn("size-4 transition-transform", liked && "animate-like-pop fill-current motion-reduce:animate-none")}
          key={`heart-${burstKey}`}
        />
        {liked && burstKey > 0 ? (
          <span key={burstKey} aria-hidden="true" className="pointer-events-none absolute inset-0 motion-reduce:hidden">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 size-1 animate-like-burst rounded-full bg-rose-500"
                style={{ "--burst-angle": `${i * 60}deg` } as React.CSSProperties}
              />
            ))}
          </span>
        ) : null}
      </span>
      {shownCount !== undefined ? <span className="tabular-nums">{shownCount}</span> : null}
    </button>
  )
}

export { LikeButton, type LikeButtonProps }
