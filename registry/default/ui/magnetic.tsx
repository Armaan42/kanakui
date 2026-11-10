"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface MagneticProps {
  children: React.ReactNode
  /** How far the content follows the pointer, from 0 (not at all) to 1 (fully). */
  strength?: number
  /** Extra space around the content, in pixels, where the pull starts. */
  range?: number
  className?: string
}

const SPRING = { stiffness: 220, damping: 16, mass: 0.3 }

/**
 * Pulls its content toward the mouse pointer, then springs back when the
 * pointer leaves. Wrap a button, icon or link. Mouse only; no movement when
 * the user prefers reduced motion.
 */
function Magnetic({ children, strength = 0.35, range = 24, className }: MagneticProps) {
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      data-slot="magnetic"
      className={cn("inline-flex", className)}
      style={{ padding: range, margin: -range }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.div className="inline-flex" style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  )
}

export { Magnetic, type MagneticProps }
