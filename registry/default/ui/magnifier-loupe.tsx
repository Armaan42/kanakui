"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface MagnifierLoupeProps extends React.ComponentProps<"figure"> {
  src: string
  alt: string
  /** How much the lens enlarges. */
  zoom?: number
  /** Lens diameter in pixels. */
  lens?: number
  caption?: string
}

/**
 * A magnifying glass over a photo. Move the pointer (or a finger) across the
 * image to inspect it; with the keyboard, focus the image and use the arrow
 * keys. Escape puts the glass down.
 */
function MagnifierLoupe({ src, alt, zoom = 2.5, lens = 168, caption, className, ...props }: MagnifierLoupeProps) {
  const frame = React.useRef<HTMLDivElement>(null)
  const [point, setPoint] = React.useState<{ x: number; y: number; w: number; h: number } | null>(null)

  const place = (clientX: number, clientY: number) => {
    const box = frame.current?.getBoundingClientRect()
    if (!box) return
    setPoint({ x: Math.min(Math.max(clientX - box.left, 0), box.width), y: Math.min(Math.max(clientY - box.top, 0), box.height), w: box.width, h: box.height })
  }

  const nudge = (dx: number, dy: number) => {
    const box = frame.current?.getBoundingClientRect()
    if (!box) return
    setPoint((current) => {
      const start = current ?? { x: box.width / 2, y: box.height / 2, w: box.width, h: box.height }
      return { x: Math.min(Math.max(start.x + dx, 0), box.width), y: Math.min(Math.max(start.y + dy, 0), box.height), w: box.width, h: box.height }
    })
  }

  return (
    <figure data-slot="magnifier-loupe" className={cn("w-full max-w-lg", className)} {...props}>
      <div
        ref={frame}
        role="img"
        aria-label={`${alt}. Move over the image, or use the arrow keys, to magnify.`}
        tabIndex={0}
        onPointerMove={(event) => place(event.clientX, event.clientY)}
        onPointerDown={(event) => place(event.clientX, event.clientY)}
        onPointerLeave={(event) => event.pointerType === "mouse" && setPoint(null)}
        onFocus={() => nudge(0, 0)}
        onBlur={() => setPoint(null)}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 40 : 12
          const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }
          if (event.key === "Escape") return setPoint(null)
          const move = moves[event.key]
          if (!move) return
          event.preventDefault()
          nudge(...move)
        }}
        className={cn("relative touch-none overflow-hidden rounded-xl bg-muted outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50", point && "cursor-none")}
      >
        <img src={src} alt="" draggable={false} className="block aspect-[4/3] w-full object-cover" />
        {point ? (
          <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: point.x - lens / 2, top: point.y - lens / 2, width: lens, height: lens }}>
            {/* Handle, angled down and to the right like a real glass. */}
            <span className="absolute top-[86%] left-[86%] h-24 w-5 origin-top -rotate-45 rounded-b-full bg-linear-to-r from-neutral-800 via-neutral-600 to-neutral-900 shadow-lg" />
            <span className="absolute top-[82%] left-[82%] h-5 w-6 origin-top -rotate-45 rounded-sm bg-linear-to-r from-neutral-400 via-neutral-200 to-neutral-500" />
            <span
              className="absolute inset-0 rounded-full shadow-[0_10px_30px_rgb(0_0_0/0.4),inset_0_0_0_5px_#d4d4d8,inset_0_0_0_7px_#52525b,inset_0_0_22px_rgb(0_0_0/0.35)]"
              style={{
                backgroundImage: `url("${src}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${point.w * zoom}px ${point.h * zoom}px`,
                backgroundPosition: `${-(point.x * zoom - lens / 2)}px ${-(point.y * zoom - lens / 2)}px`,
              }}
            />
            <span className="absolute top-[14%] left-[18%] h-8 w-12 -rotate-30 rounded-full bg-white/25 blur-[2px]" />
          </div>
        ) : null}
      </div>
      {caption ? <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  )
}

export { MagnifierLoupe }
