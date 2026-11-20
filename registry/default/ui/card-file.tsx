"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FileCard {
  name: string
  role?: string
  phone?: string
  email?: string
  note?: string
}

interface CardFileProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  cards: FileCard[]
  defaultIndex?: number
  onCardChange?: (card: FileCard, index: number) => void
}

const AHEAD = 4
const BEHIND = 2
const DRAG_STEP = 34
const mod = (value: number, by: number) => ((value % by) + by) % by

/**
 * A rotary card file. Scroll, drag, press the arrow keys or jump with the
 * letter tabs, and the cards tumble over the drum.
 */
function CardFile({ cards, defaultIndex = 0, onCardChange, className, ...props }: CardFileProps) {
  const [position, setPosition] = React.useState(defaultIndex)
  const drum = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ y: number; base: number } | null>(null)
  const count = cards.length
  const index = mod(position, count)
  const card = cards[index]
  const letters = [...new Set(cards.map((item) => item.name[0].toUpperCase()))]

  const stateRef = React.useRef({ count, onCardChange, cards })
  React.useEffect(() => {
    stateRef.current = { count, onCardChange, cards }
  })

  const goTo = React.useCallback((next: number) => {
    const { count, onCardChange, cards } = stateRef.current
    setPosition(next)
    onCardChange?.(cards[mod(next, count)], mod(next, count))
  }, [])

  const positionRef = React.useRef(position)
  React.useEffect(() => {
    positionRef.current = position
  }, [position])

  React.useEffect(() => {
    const element = drum.current
    if (!element) return
    let pending = 0
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      pending += event.deltaY
      if (Math.abs(pending) < 40) return
      goTo(positionRef.current + Math.sign(pending))
      pending = 0
    }
    element.addEventListener("wheel", onWheel, { passive: false })
    return () => element.removeEventListener("wheel", onWheel)
  }, [goTo])

  return (
    <div data-slot="card-file" className={cn("flex w-full max-w-md items-center gap-2", className)} {...props}>
      <div role="group" aria-label="Jump to letter" className="flex max-h-72 shrink-0 flex-col flex-wrap gap-0.5">
        {letters.map((letter) => {
          const active = card.name[0].toUpperCase() === letter
          return (
            <button
              key={letter}
              type="button"
              aria-pressed={active}
              aria-label={`Jump to ${letter}`}
              onClick={() => {
                const target = cards.findIndex((item) => item.name[0].toUpperCase() === letter)
                goTo(position + (mod(target - index + Math.floor(count / 2), count) - Math.floor(count / 2)))
              }}
              className={cn("grid size-6 place-items-center rounded-[4px] font-mono text-[11px] font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50", active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}
            >
              {letter}
            </button>
          )
        })}
      </div>

      <div className="min-w-0 flex-1">
        <div
          ref={drum}
          role="group"
          tabIndex={0}
          aria-roledescription="card file"
          aria-label="Contacts. Use the up and down arrow keys to turn the cards."
          onKeyDown={(event) => {
            const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0
            if (!step) return
            event.preventDefault()
            goTo(position + step)
          }}
          onPointerDown={(event) => {
            if ((event.target as HTMLElement).closest("a")) return
            event.currentTarget.setPointerCapture(event.pointerId)
            drag.current = { y: event.clientY, base: position }
          }}
          onPointerMove={(event) => {
            if (!drag.current) return
            const next = drag.current.base + Math.round((drag.current.y - event.clientY) / DRAG_STEP)
            if (next !== position) goTo(next)
          }}
          onPointerUp={() => {
            drag.current = null
          }}
          onPointerCancel={() => {
            drag.current = null
          }}
          className="relative h-72 cursor-grab touch-none overflow-hidden rounded-xl bg-muted outline-none select-none active:cursor-grabbing focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {cards.map((item, i) => {
            const offset = mod(i - position + Math.floor(count / 2), count) - Math.floor(count / 2)
            if (offset > AHEAD || offset < -BEHIND) return null
            const active = offset === 0
            const fallen = offset < 0
            return (
              <article
                key={`${item.name}-${i}`}
                aria-hidden={!active}
                style={{
                  zIndex: fallen ? 20 : 10 - offset,
                  opacity: fallen ? 0 : 1 - offset * 0.1,
                  transform: fallen ? "perspective(900px) rotateX(-96deg)" : `perspective(900px) translateY(${-offset * 20}px) scale(${1 - offset * 0.04}) rotateX(${offset * 5}deg)`,
                }}
                className={cn(
                  "absolute inset-x-5 bottom-9 flex h-40 origin-bottom flex-col rounded-md bg-[#fdfaf1] p-4 text-neutral-800 shadow-[0_-1px_4px_rgb(0_0_0/0.22)] ring-1 ring-black/10 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
                  !active && "pointer-events-none"
                )}
              >
                <h3 className="truncate border-b border-red-300 pb-1 font-serif text-lg font-semibold">{item.name}</h3>
                {item.role ? <p className="mt-1 truncate text-xs text-neutral-600">{item.role}</p> : null}
                <div className="mt-auto space-y-0.5 text-xs">
                  {item.phone ? (
                    <a href={`tel:${item.phone.replace(/[^+\d]/g, "")}`} tabIndex={active ? 0 : -1} className="flex items-center gap-1.5 truncate underline-offset-2 hover:underline">
                      <Phone aria-hidden="true" className="size-3 shrink-0" />
                      {item.phone}
                    </a>
                  ) : null}
                  {item.email ? (
                    <a href={`mailto:${item.email}`} tabIndex={active ? 0 : -1} className="flex items-center gap-1.5 truncate underline-offset-2 hover:underline">
                      <Mail aria-hidden="true" className="size-3 shrink-0" />
                      {item.email}
                    </a>
                  ) : null}
                  {item.note ? <p className="truncate text-neutral-600 italic">{item.note}</p> : null}
                </div>
              </article>
            )
          })}
          <span aria-hidden="true" className="absolute inset-x-2 bottom-7 z-30 h-2 rounded-full bg-linear-to-b from-neutral-300 via-neutral-500 to-neutral-700 shadow-sm" />
          <span aria-hidden="true" className="absolute bottom-2 left-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-t-md bg-linear-to-b from-neutral-600 to-neutral-800" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button type="button" aria-label="Previous card" onClick={() => goTo(position - 1)} className="grid size-8 place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
            <ChevronUp aria-hidden="true" className="size-4" />
          </button>
          <p aria-live="polite" className="truncate text-xs text-muted-foreground">
            {card.name}, {index + 1} of {count}
          </p>
          <button type="button" aria-label="Next card" onClick={() => goTo(position + 1)} className="grid size-8 place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
            <ChevronDown aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export { CardFile }
