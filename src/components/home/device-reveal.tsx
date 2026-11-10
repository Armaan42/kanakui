"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

const FRAME_WIDTH = 1280
const FRAME_HEIGHT = 800

/** A live, non-interactive render of /view/<name>, scaled to fit its box. Loads when near. */
function LiveFrame({ name, title }: { name: string; title: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState<number | null>(null)
  const [near, setNear] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const resize = new ResizeObserver(([entry]) => entry && setScale(entry.contentRect.width / FRAME_WIDTH))
    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          visible.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    resize.observe(node)
    visible.observe(node)
    return () => {
      resize.disconnect()
      visible.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className="relative aspect-16/10 overflow-hidden rounded-[1.1rem] bg-background">
      {near && scale ? (
        <iframe
          src={`/view/${name}`}
          title={`${title}, running live`}
          tabIndex={-1}
          aria-hidden="true"
          inert
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})` }}
        />
      ) : null}
    </div>
  )
}

/**
 * A big screen, tipped back in 3D, that swings upright as it scrolls into
 * view, with a real block running inside. Flat and still with reduced motion.
 */
export function DeviceReveal({
  name,
  title,
  href,
  children,
}: {
  name: string
  title: string
  href: string
  /** The section heading, which rises as the screen straightens. */
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  const rotateX = useTransform(progress, [0, 1], [38, 0])
  const scale = useTransform(progress, [0, 1], [0.86, 1])
  const screenY = useTransform(progress, [0, 1], [80, 0])
  const headingY = useTransform(progress, [0, 1], [70, 0])
  const glow = useTransform(progress, [0.4, 1], [0, 1])

  return (
    <div ref={ref} className="perspective-[1200px]">
      <motion.div style={reduceMotion ? undefined : { y: headingY }} className="mx-auto max-w-3xl text-center">
        {children}
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { rotateX, scale, y: screenY }}
        className="relative mx-auto mt-14 max-w-5xl origin-bottom transform-3d"
      >
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: glow }}
          className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.17_290/0.35),oklch(0.75_0.13_220/0.15)_45%,transparent_70%)] blur-2xl"
        />
        <div className="rounded-[1.6rem] border border-white/10 bg-neutral-900 p-2 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7)] ring-1 ring-black/40 sm:p-3">
          <LiveFrame name={name} title={title} />
        </div>
        <div className="mt-4 flex justify-center">
          <Link href={href} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Open {title} <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
