"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

const BEAMS = [
  { left: 6, length: 72, duration: 6.5, delay: 0 },
  { left: 17, length: 110, duration: 8, delay: 2.4 },
  { left: 29, length: 56, duration: 5.5, delay: 4.1 },
  { left: 41, length: 96, duration: 9, delay: 1.2 },
  { left: 58, length: 64, duration: 6, delay: 3.3 },
  { left: 70, length: 120, duration: 7.5, delay: 0.6 },
  { left: 82, length: 80, duration: 6.8, delay: 5 },
  { left: 93, length: 60, duration: 5.8, delay: 2 },
]

interface Burst {
  id: number
  left: number
  sparks: { x: number; y: number; size: number }[]
}

let nextId = 0

/**
 * Beams of light fall to the floor of their container and burst into sparks
 * when they land. Decorative: hidden from assistive technology, paused while
 * off screen, and absent with reduced motion. Place inside a `relative`,
 * `overflow-hidden` element.
 */
export function BeamRain() {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [height, setHeight] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  const [bursts, setBursts] = React.useState<Burst[]>([])

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const resize = new ResizeObserver(([entry]) => entry && setHeight(entry.contentRect.height))
    const seen = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)))
    resize.observe(node)
    seen.observe(node)
    return () => {
      resize.disconnect()
      seen.disconnect()
    }
  }, [])

  const land = (left: number) => {
    const burst: Burst = {
      id: nextId++,
      left,
      sparks: Array.from({ length: 12 }, () => ({
        x: (Math.random() - 0.5) * 120,
        y: -(20 + Math.random() * 60),
        size: 2 + Math.random() * 2,
      })),
    }
    setBursts((all) => [...all, burst])
    setTimeout(() => setBursts((all) => all.filter((b) => b.id !== burst.id)), 1000)
  }

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {!reduceMotion && height > 0
        ? BEAMS.map((beam) => (
            <span
              key={beam.left}
              onAnimationIteration={() => land(beam.left)}
              className="absolute top-0 w-px animate-beam-fall rounded-full bg-linear-to-b from-transparent via-violet-300/80 to-cyan-100 shadow-[0_0_6px_0_oklch(0.8_0.12_250/0.7)]"
              style={
                {
                  left: `${beam.left}%`,
                  height: beam.length,
                  "--beam-fall": `${height - beam.length}px`,
                  // Set directly: variables inside the shared animation value
                  // would resolve at :root and every beam would fall in step.
                  animationDuration: `${beam.duration}s`,
                  animationDelay: `${beam.delay}s`,
                  animationPlayState: visible ? "running" : "paused",
                } as React.CSSProperties
              }
            />
          ))
        : null}

      {bursts.map((burst) => (
        <span key={burst.id} className="absolute bottom-0" style={{ left: `${burst.left}%` }}>
          <motion.span
            className="absolute bottom-0 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_bottom,oklch(0.85_0.12_250/0.8),transparent_70%)] blur-sm"
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {burst.sparks.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-linear-to-b from-white to-violet-300"
              style={{ width: spark.size, height: spark.size }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: spark.x, y: spark.y, opacity: 0 }}
              transition={{ duration: 0.6 + Math.abs(spark.y) / 150, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </span>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-violet-300/60 to-transparent" />
      <div className="absolute inset-x-[10%] bottom-0 h-16 bg-[radial-gradient(ellipse_at_bottom,oklch(0.7_0.15_280/0.25),transparent_70%)]" />
    </div>
  )
}
