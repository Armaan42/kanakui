"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  /** Maximum tilt angle in degrees. */
  maxTilt?: number
  /** Scale applied while hovered. Set to 1 to disable. */
  hoverScale?: number
}

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 }

function AnimatedCard({
  className,
  maxTilt = 8,
  hoverScale = 1.02,
  style,
  onPointerMove,
  onPointerLeave,
  children,
  ...props
}: AnimatedCardProps) {
  const reduceMotion = useReducedMotion()

  // Pointer position normalised to 0..1 within the card. 0.5 = centre.
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]), SPRING)
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]), SPRING)

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerMove?.(event)
    // Tilt only follows a mouse. Touch and pen would fight with scrolling.
    if (reduceMotion || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerLeave?.(event)
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  return (
    <motion.div
      data-slot="animated-card"
      className={cn(
        "relative rounded-xl border bg-card text-card-foreground shadow-sm will-change-transform",
        className
      )}
      style={
        reduceMotion
          ? style
          : { rotateX, rotateY, transformPerspective: 900, ...style }
      }
      whileHover={reduceMotion ? undefined : { scale: hoverScale }}
      transition={{ type: "spring", ...SPRING }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { AnimatedCard, type AnimatedCardProps }
