"use client"

import * as React from "react"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface AnimatedTab {
  value: string
  label: React.ReactNode
  content: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: AnimatedTab[]
  /** Initially selected tab. Defaults to the first. */
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Accessible name for the tab list. */
  label: string
  className?: string
}

/**
 * Tabs with an underline that slides to the selected tab and panels that
 * fade in. Follows the WAI-ARIA tabs pattern: arrow keys, Home and End move
 * between tabs, and each panel is labelled by its tab.
 */
function AnimatedTabs({ tabs, defaultValue, onValueChange, label, className }: AnimatedTabsProps) {
  const [value, setValue] = React.useState(defaultValue ?? tabs[0]?.value)
  const reduceMotion = useReducedMotion()
  const id = React.useId()
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  function select(next: string, index: number) {
    setValue(next)
    onValueChange?.(next)
    refs.current[index]?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = tabs.length - 1
    const target =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : undefined
    if (target === undefined) return
    event.preventDefault()
    const tab = tabs[target]
    if (tab) select(tab.value, target)
  }

  const active = tabs.find((tab) => tab.value === value) ?? tabs[0]

  return (
    <div data-slot="animated-tabs" className={cn("w-full", className)}>
      <LayoutGroup id={id}>
        <div role="tablist" aria-label={label} className="flex gap-1 border-b">
          {tabs.map((tab, index) => {
            const selected = tab.value === active?.value
            return (
              <button
                key={tab.value}
                ref={(node) => {
                  refs.current[index] = node
                }}
                id={`${id}-tab-${tab.value}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${id}-panel-${tab.value}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.value, index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {selected ? (
                  <motion.span
                    layoutId="animated-tabs-underline"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      </LayoutGroup>
      {active ? (
        <motion.div
          key={active.value}
          id={`${id}-panel-${active.value}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active.value}`}
          tabIndex={0}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pt-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {active.content}
        </motion.div>
      ) : null}
    </div>
  )
}

export { AnimatedTabs, type AnimatedTab, type AnimatedTabsProps }
