"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollDeviceProps {
  /** What runs on the screen: a screenshot, a video or live UI. */
  children: React.ReactNode
  /** Starting tilt in degrees. */
  tilt?: number
  className?: string
}

/**
 * A large screen, tipped back in 3D, that swings upright as it scrolls into
 * view. Put anything on the screen. It stays flat and still with reduced
 * motion.
 */
function ScrollDevice({ children, tilt = 38, className }: ScrollDeviceProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const rotateX = useTransform(progress, [0, 1], [tilt, 0])
  const scale = useTransform(progress, [0, 1], [0.86, 1])
  const y = useTransform(progress, [0, 1], [80, 0])

  return (
    <div ref={ref} data-slot="scroll-device" className={cn("perspective-[1200px]", className)}>
      <motion.div style={reduceMotion ? undefined : { rotateX, scale, y }} className="origin-bottom transform-3d">
        <div className="rounded-[1.6rem] border border-foreground/10 bg-neutral-900 p-2 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)] sm:p-3">
          <div className="relative aspect-16/10 overflow-hidden rounded-[1.1rem] bg-background">{children}</div>
        </div>
      </motion.div>
    </div>
  )
}

export { ScrollDevice, type ScrollDeviceProps }
