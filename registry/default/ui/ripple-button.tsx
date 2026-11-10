"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface RippleButtonProps extends React.ComponentProps<"button"> {
  /** Ripple color. Any CSS color. Defaults to the text color at low opacity. */
  rippleColor?: string
}

/**
 * A button that sends a ripple out from the point where it was pressed.
 * Keyboard presses ripple from the center. No ripple with reduced motion.
 */
function RippleButton({ className, rippleColor, type = "button", onPointerDown, onKeyDown, children, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const nextId = React.useRef(0)

  function addRipple(element: HTMLElement, clientX?: number, clientY?: number) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = (clientX ?? rect.left + rect.width / 2) - rect.left - size / 2
    const y = (clientY ?? rect.top + rect.height / 2) - rect.top - size / 2
    const id = nextId.current++
    setRipples((current) => [...current, { id, x, y, size }])
  }

  return (
    <button
      type={type}
      data-slot="ripple-button"
      className={cn(
        "relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-medium whitespace-nowrap text-primary-foreground outline-none select-none",
        "transition-[translate,background-color] hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        addRipple(event.currentTarget, event.clientX, event.clientY)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if ((event.key === "Enter" || event.key === " ") && !event.repeat) addRipple(event.currentTarget)
      }}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute animate-ripple rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: rippleColor ?? "color-mix(in oklch, currentColor 30%, transparent)",
          }}
          onAnimationEnd={() => setRipples((current) => current.filter((r) => r.id !== ripple.id))}
        />
      ))}
    </button>
  )
}

export { RippleButton, type RippleButtonProps }
