"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InstantPhoto {
  src: string
  alt: string
  /** Handwritten-style caption under the photo. */
  caption?: string
}

interface PhotoStackProps extends React.ComponentProps<"div"> {
  photos: InstantPhoto[]
}

const THROW_DISTANCE = 90
/** Resting tilt of the cards under the top one. */
const TILTS = [-2, 5, -7, 3]
const HANDWRITING = '"Segoe Print", "Bradley Hand", "Marker Felt", "Chalkboard SE", cursive'

/**
 * A stack of instant photos. Drag (or swipe) the top photo off the stack to
 * see the next, or use the "Next photo" button or the arrow keys. Each photo
 * develops as it reaches the top.
 */
function PhotoStack({ photos, className, ...props }: PhotoStackProps) {
  const [order, setOrder] = React.useState(() => photos.map((_, i) => i))
  const [drag, setDrag] = React.useState<{ x: number; y: number } | null>(null)
  const [thrown, setThrown] = React.useState<{ index: number; direction: number } | null>(null)
  const start = React.useRef({ x: 0, y: 0 })

  const top = order[0]
  const next = (direction = 1) => {
    if (thrown || order.length < 2) return
    setThrown({ index: top, direction })
    setDrag(null)
    // Once it has flown off, put it at the bottom of the stack.
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]])
      setThrown(null)
    }, 320)
  }

  const current = photos[top]

  return (
    <div data-slot="photo-stack" className={cn("flex w-full max-w-xs flex-col items-center gap-6", className)} {...props}>
      <div
        className="relative aspect-[4/5] w-full touch-pan-y select-none"
        role="group"
        aria-roledescription="photo stack"
        aria-label={`Photo ${top + 1} of ${photos.length}. Arrow keys show the next photo.`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault()
            next(1)
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault()
            next(-1)
          }
        }}
      >
        {order
          .slice(0, 4)
          .reverse()
          .map((photoIndex) => {
            const depth = order.indexOf(photoIndex)
            const photo = photos[photoIndex]
            const isTop = depth === 0
            const isThrown = thrown?.index === photoIndex
            const dx = isTop && drag ? drag.x : 0
            const dy = isTop && drag ? drag.y : 0
            const transform = isThrown
              ? `translate(${thrown.direction * 140}%, -10%) rotate(${thrown.direction * 24}deg)`
              : `translate(${dx}px, ${dy}px) rotate(${TILTS[depth % TILTS.length] + dx * 0.06}deg) scale(${1 - depth * 0.03})`
            return (
              <figure
                key={photoIndex}
                aria-hidden={!isTop}
                className={cn(
                  "absolute inset-0 m-0 flex flex-col rounded-[3px] bg-[#fbfaf7] p-[6%] pb-0 shadow-[0_1px_2px_rgb(0_0_0/0.15),0_12px_28px_-12px_rgb(0_0_0/0.45)]",
                  isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
                  !(isTop && drag) && "transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
                  isThrown && "opacity-0"
                )}
                style={{ transform, zIndex: 10 - depth }}
                onPointerDown={(event) => {
                  if (!isTop || thrown) return
                  event.currentTarget.setPointerCapture(event.pointerId)
                  start.current = { x: event.clientX, y: event.clientY }
                  setDrag({ x: 0, y: 0 })
                }}
                onPointerMove={(event) => {
                  if (!isTop || !drag) return
                  setDrag({ x: event.clientX - start.current.x, y: (event.clientY - start.current.y) * 0.4 })
                }}
                onPointerUp={() => {
                  if (!isTop || !drag) return
                  if (Math.abs(drag.x) > THROW_DISTANCE) next(Math.sign(drag.x))
                  else setDrag(null)
                }}
                onPointerCancel={() => setDrag(null)}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-200">
                  <img
                    key={isTop ? `top-${order.join()}` : photoIndex}
                    src={photo.src}
                    alt={isTop ? photo.alt : ""}
                    draggable={false}
                    className={cn("size-full object-cover", isTop && "animate-photo-stack-develop motion-reduce:animate-none")}
                  />
                  <span aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_12px_rgb(0_0_0/0.25)]" />
                </div>
                <figcaption
                  className="flex flex-1 items-center justify-center px-1 text-center text-lg leading-tight text-neutral-700"
                  style={{ fontFamily: HANDWRITING }}
                >
                  {photo.caption}
                </figcaption>
              </figure>
            )
          })}
      </div>

      {photos.length > 1 ? (
        <button
          type="button"
          onClick={() => next(1)}
          className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3.5 py-1.5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Next photo <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      ) : null}
      <p aria-live="polite" className="sr-only">
        {current ? `${current.caption ? `${current.caption}. ` : ""}${current.alt}` : ""}
      </p>
    </div>
  )
}

export { PhotoStack }
