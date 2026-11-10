"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
}

interface AccordionSmoothProps {
  items: AccordionItem[]
  /** Allow several items open at once. */
  multiple?: boolean
  /** Items open at first. */
  defaultOpen?: string[]
  className?: string
}

/**
 * An accordion whose panels open with a smooth height animation (CSS grid
 * rows, no measuring). Headers are buttons with `aria-expanded` and
 * `aria-controls`. Opens instantly with reduced motion.
 */
function AccordionSmooth({ items, multiple = false, defaultOpen = [], className }: AccordionSmoothProps) {
  const [open, setOpen] = React.useState<string[]>(defaultOpen)
  const id = React.useId()

  function toggle(itemId: string) {
    setOpen((current) => {
      const isOpen = current.includes(itemId)
      if (isOpen) return current.filter((x) => x !== itemId)
      return multiple ? [...current, itemId] : [itemId]
    })
  }

  return (
    <div data-slot="accordion-smooth" className={cn("w-full divide-y rounded-xl border", className)}>
      {items.map((item) => {
        const expanded = open.includes(item.id)
        const buttonId = `${id}-button-${item.id}`
        const panelId = `${id}-panel-${item.id}`
        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none", expanded && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden" inert={!expanded ? true : undefined}>
                <div className="px-4 pb-4 text-sm text-muted-foreground">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { AccordionSmooth, type AccordionItem, type AccordionSmoothProps }
