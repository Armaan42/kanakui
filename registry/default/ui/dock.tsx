"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

interface DockItem {
  /** Accessible name and tooltip text. */
  label: string
  icon: React.ReactNode
  /** Render as a link when set; otherwise a button. */
  href?: string
  onClick?: () => void
}

interface DockProps {
  items: DockItem[]
  /** Item size at rest, in pixels. */
  size?: number
  /** Item size right under the pointer, in pixels. */
  magnification?: number
  /** Distance in pixels over which neighbours also grow. */
  distance?: number
  /** Accessible name for the toolbar. */
  label?: string
  className?: string
}

/**
 * A row of icons that grow as the mouse approaches, like the macOS dock.
 * Every item is a labelled link or button with a tooltip on hover and focus.
 * No magnification for touch, keyboard or reduced motion.
 */
function Dock({ items, size = 40, magnification = 64, distance = 140, label = "Dock", className }: DockProps) {
  const pointerX = useMotionValue(Infinity)
  const reduceMotion = useReducedMotion()

  return (
    <nav aria-label={label} data-slot="dock">
      <ul
        className={cn("flex h-[calc(var(--dock-size)+1rem)] items-end gap-2 rounded-2xl border bg-background/80 px-2 pb-2 backdrop-blur", className)}
        style={{ "--dock-size": `${size}px` } as React.CSSProperties}
        onPointerMove={(event) => {
          if (!reduceMotion && event.pointerType === "mouse") pointerX.set(event.clientX)
        }}
        onPointerLeave={() => pointerX.set(Infinity)}
      >
        {items.map((item) => (
          <DockIcon key={item.label} item={item} pointerX={pointerX} size={size} magnification={magnification} distance={distance} />
        ))}
      </ul>
    </nav>
  )
}

interface DockIconProps {
  item: DockItem
  pointerX: MotionValue<number>
  size: number
  magnification: number
  distance: number
}

function DockIcon({ item, pointerX, size, magnification, distance }: DockIconProps) {
  const ref = React.useRef<HTMLLIElement>(null)
  const offset = useTransform(pointerX, (x) => {
    const rect = ref.current?.getBoundingClientRect()
    return rect ? x - (rect.left + rect.width / 2) : Infinity
  })
  const width = useSpring(useTransform(offset, [-distance, 0, distance], [size, magnification, size]), {
    stiffness: 400,
    damping: 30,
    mass: 0.2,
  })

  const className =
    "peer flex size-full items-center justify-center rounded-xl border bg-muted/60 text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-[45%]"

  return (
    <motion.li ref={ref} className="relative aspect-square" style={{ width }}>
      {item.href ? (
        <a href={item.href} aria-label={item.label} className={className}>
          {item.icon}
        </a>
      ) : (
        <button type="button" aria-label={item.label} onClick={item.onClick} className={className}>
          {item.icon}
        </button>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md border bg-popover px-2 py-0.5 text-xs whitespace-nowrap text-popover-foreground opacity-0 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100"
      >
        {item.label}
      </span>
    </motion.li>
  )
}

export { Dock, type DockItem, type DockProps }
