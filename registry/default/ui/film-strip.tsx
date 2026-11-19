"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface FilmFrame {
  src: string
  alt: string
  caption?: string
}

interface FilmStripProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  frames: FilmFrame[]
  defaultIndex?: number
  /** Printed along the film edge. */
  stock?: string
  onSelect?: (index: number) => void
}

const SPROCKETS =
  "repeating-linear-gradient(90deg, transparent 0 7px, #efe9dc 7px 17px, transparent 17px 24px)"

/**
 * A strip of 35mm negatives. Frames stay negative until you pick one, which
 * develops it into the print above. Drag or scroll along the strip, or use
 * the arrow keys.
 */
function FilmStrip({ frames, defaultIndex = 0, stock = "SAFETY FILM 400", onSelect, className, ...props }: FilmStripProps) {
  const [index, setIndex] = React.useState(defaultIndex)
  const scroller = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const suppressClick = React.useRef(false)
  const current = frames[index]

  const select = (next: number, focus = false) => {
    const box = scroller.current
    const button = box?.querySelectorAll<HTMLButtonElement>("button")[next]
    setIndex(next)
    onSelect?.(next)
    if (!box || !button) return
    if (focus) button.focus({ preventScroll: true })
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    box.scrollTo({ left: button.offsetLeft - (box.clientWidth - button.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <div data-slot="film-strip" className={cn("w-full max-w-2xl", className)} {...props}>
      <figure className="mx-auto mb-5 w-full max-w-md bg-white p-2.5 pb-3 text-neutral-700 shadow-[0_14px_34px_-14px_rgb(0_0_0/0.5)] ring-1 ring-black/5">
        <img key={current.src} src={current.src} alt={current.alt} draggable={false} className="aspect-[3/2] w-full bg-neutral-200 object-cover" />
        <figcaption aria-live="polite" className="mt-2.5 flex items-baseline justify-between gap-3 font-mono text-[11px]">
          <span className="truncate">{current.caption ?? current.alt}</span>
          <span className="shrink-0 text-neutral-500 tabular-nums">
            {index + 1}/{frames.length}
          </span>
        </figcaption>
      </figure>

      <div
        ref={scroller}
        role="group"
        aria-label="Film frames"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || !scroller.current) return
          drag.current = { x: event.clientX, left: scroller.current.scrollLeft, moved: false }
        }}
        onPointerMove={(event) => {
          const state = drag.current
          const box = scroller.current
          if (!state || !box) return
          const distance = event.clientX - state.x
          if (Math.abs(distance) > 4) state.moved = true
          box.scrollLeft = state.left - distance
        }}
        onPointerUp={() => {
          suppressClick.current = drag.current?.moved ?? false
          drag.current = null
        }}
        onPointerLeave={() => {
          drag.current = null
        }}
        onKeyDown={(event) => {
          const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
          if (!step) return
          event.preventDefault()
          select((index + step + frames.length) % frames.length, true)
        }}
        className="relative cursor-grab overflow-x-auto rounded-sm bg-[#1b1512] [scrollbar-width:none] select-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <div className="w-max">
          <div aria-hidden="true" className="h-2.5 w-full" style={{ backgroundImage: SPROCKETS, backgroundClip: "content-box", paddingBlock: 2 }} />
          <div aria-hidden="true" className="flex gap-28 px-3 font-mono text-[8px] tracking-widest whitespace-nowrap text-amber-500/80">
            {frames.map((frame, i) => (
              <span key={frame.src}>
                {stock} {i + 1}A
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 px-1.5 py-1">
            {frames.map((frame, i) => {
              const active = i === index
              return (
                <button
                  key={frame.src}
                  type="button"
                  tabIndex={active ? 0 : -1}
                  aria-pressed={active}
                  aria-label={`Frame ${i + 1}: ${frame.alt}`}
                  onClick={() => {
                    if (suppressClick.current) suppressClick.current = false
                    else select(i)
                  }}
                  className="group relative h-20 w-28 shrink-0 overflow-hidden rounded-[3px] outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:h-24 sm:w-36"
                >
                  <img
                    src={frame.src}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    className={cn(
                      "size-full object-cover transition-[filter] duration-500 motion-reduce:transition-none",
                      active ? "" : "[filter:invert(1)_hue-rotate(180deg)_sepia(0.45)_contrast(0.8)] group-hover:[filter:invert(0.75)_hue-rotate(180deg)_sepia(0.2)]"
                    )}
                  />
                </button>
              )
            })}
          </div>
          <div aria-hidden="true" className="h-2.5 w-full" style={{ backgroundImage: SPROCKETS, backgroundClip: "content-box", paddingBlock: 2 }} />
        </div>
      </div>
    </div>
  )
}

export { FilmStrip }
