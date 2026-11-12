"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface BeamRainProps {
  /** Number of beams. */
  count?: number
  /** Beam color, from tail to head. Any CSS colors. */
  colors?: [string, string]
  className?: string
}

interface Burst {
  id: number
  left: number
  sparks: { x: number; y: number; size: number }[]
}

/** Fixed, pseudo-random beams so server and browser render the same thing. */
function makeBeams(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    left: ((i + 0.5) / count) * 100 + (((i * 37) % 7) - 3),
    length: 56 + ((i * 53) % 70),
    duration: 5.5 + ((i * 29) % 40) / 10,
    delay: ((i * 17) % 50) / 10,
  }))
}

/**
 * Beams of light fall to the floor of their container and burst into sparks
 * when they land. Place inside a `relative` element. Decorative: hidden from
 * assistive technology, paused while off screen, and absent with reduced
 * motion. Requires the `animate-beam-rain-fall` theme variable and keyframes,
 * which the CLI adds.
 */
function BeamRain({ count = 8, colors = ["oklch(0.8 0.14 295)", "oklch(0.92 0.08 210)"], className }: BeamRainProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [height, setHeight] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  const [bursts, setBursts] = React.useState<Burst[]>([])
  const nextId = React.useRef(0)
  const beams = React.useMemo(() => makeBeams(count), [count])

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
      id: nextId.current++,
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
    <div
      ref={ref}
      aria-hidden="true"
      data-slot="beam-rain"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      style={{ "--beam-a": colors[0], "--beam-b": colors[1] } as React.CSSProperties}
    >
      {!reduceMotion && height > 0
        ? beams.map((beam, i) => (
            <span
              key={i}
              onAnimationIteration={() => land(beam.left)}
              className="absolute top-0 w-px animate-beam-rain-fall rounded-full bg-linear-to-b from-transparent via-(--beam-a) to-(--beam-b) shadow-[0_0_6px_0_var(--beam-b)]"
              style={
                {
                  left: `${beam.left}%`,
                  height: beam.length,
                  "--beam-rain-distance": `${height - beam.length}px`,
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
            className="absolute bottom-0 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_bottom,var(--beam-b),transparent_70%)] blur-sm"
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {burst.sparks.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-(--beam-b)"
              style={{ width: spark.size, height: spark.size }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: spark.x, y: spark.y, opacity: 0 }}
              transition={{ duration: 0.6 + Math.abs(spark.y) / 150, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </span>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-(--beam-a) to-transparent opacity-60" />
    </div>
  )
}

export { BeamRain, type BeamRainProps }
