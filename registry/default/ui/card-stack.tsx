"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface CardStackItem {
  id: string
  /** Announced when the card reaches the top. */
  label: string
  content: React.ReactNode
}

interface CardStackProps {
  items: CardStackItem[]
  /** Accessible name for the stack. */
  label?: string
  className?: string
}

const VISIBLE = 3

/**
 * Cards stacked with the next ones peeking out behind. "Next" sends the top
 * card to the back with a spring. Only the top card is interactive and its
 * label is announced. With reduced motion the cards swap without moving.
 */
function CardStack({ items, label = "Card stack", className }: CardStackProps) {
  const [order, setOrder] = React.useState(() => items.map((item) => item.id))
  const reduceMotion = useReducedMotion()
  const byId = new Map(items.map((item) => [item.id, item]))
  const top = byId.get(order[0] ?? "")

  return (
    <section aria-label={label} data-slot="card-stack" className={cn("flex w-full max-w-sm flex-col items-center gap-8", className)}>
      <div className="relative h-56 w-full">
        {order.slice(0, VISIBLE).map((id, depth) => {
          const item = byId.get(id)
          if (!item) return null
          const isTop = depth === 0
          return (
            <motion.div
              key={id}
              aria-hidden={!isTop}
              inert={!isTop ? true : undefined}
              className="absolute inset-x-0 top-0 h-48 overflow-hidden rounded-xl border bg-card p-5 shadow-sm"
              style={{ zIndex: VISIBLE - depth, transformOrigin: "top center" }}
              animate={{ y: depth * 14, scale: 1 - depth * 0.05, opacity: 1 - depth * 0.2 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
            >
              {item.content}
            </motion.div>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {top?.label}
        </p>
        <button
          type="button"
          onClick={() => setOrder((current) => [...current.slice(1), ...current.slice(0, 1)])}
          className="inline-flex h-9 items-center gap-1 rounded-full border bg-background px-4 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Next
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </section>
  )
}

export { CardStack, type CardStackItem, type CardStackProps }
