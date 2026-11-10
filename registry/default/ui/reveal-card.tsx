import * as React from "react"

import { cn } from "@/lib/utils"

interface RevealCardProps extends Omit<React.ComponentProps<"article">, "title"> {
  /** Visual at the top of the card: an image, video or illustration. */
  media: React.ReactNode
  /** Always-visible title. */
  title: React.ReactNode
  /** Details that slide up over the media on hover or keyboard focus. */
  children: React.ReactNode
}

/**
 * A media card whose details slide up on hover or when anything inside gets
 * keyboard focus. On touch screens (no hover) the details are always shown.
 * With reduced motion the details appear without sliding.
 */
function RevealCard({ media, title, children, className, ...props }: RevealCardProps) {
  return (
    <article
      data-slot="reveal-card"
      className={cn("group relative w-full max-w-sm overflow-hidden rounded-xl border bg-card", className)}
      {...props}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">{media}</div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 translate-y-[calc(100%-3.5rem)] bg-card/95 p-4 backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none",
          "group-hover:translate-y-0 group-focus-within:translate-y-0 [@media(hover:none)]:translate-y-0"
        )}
      >
        <h3 className="flex h-6 items-center font-medium">{title}</h3>
        <div className="mt-3 text-sm text-muted-foreground">{children}</div>
      </div>
    </article>
  )
}

export { RevealCard, type RevealCardProps }
