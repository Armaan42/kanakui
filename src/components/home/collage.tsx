"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"

import { ComponentPreview } from "@/components/site/component-preview"
import { cn } from "@/lib/utils"

const DottedGlobe = dynamic(() => import("@/registry/default/ui/dotted-globe").then((m) => m.DottedGlobe), { ssr: false })

/** Loads /view/<name> at the iframe's own width (so the block lays out responsively) once it's near. */
function LiveBlock({ name, theme, scale = 1, className }: { name: string; theme: "light" | "dark"; scale?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [near, setNear] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {near ? (
        <iframe
          src={`/view/${name}?theme=${theme}`}
          title={`${name} preview`}
          tabIndex={-1}
          aria-hidden="true"
          inert
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})` }}
        />
      ) : null}
    </div>
  )
}

/**
 * One card in the collage, with dashed guide lines running along its top and
 * bottom edges across the whole section. Light cards switch to the light
 * theme inside the dark stage.
 */
function Tile({
  label,
  href,
  light = false,
  labelEnd = false,
  className,
  children,
}: {
  label: string
  href: string
  light?: boolean
  /** Put the label on the right, for tiles that bleed off the left edge. */
  labelEnd?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("relative flex flex-col", labelEnd && "items-end")}>
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-[200vw] top-0 border-t border-dashed border-white/10" />
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-[200vw] bottom-7 border-t border-dashed border-white/10" />
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)]",
          light ? "light border-black/5 bg-background text-foreground" : "border-white/10 bg-card",
          className
        )}
      >
        {children}
      </div>
      <Link
        href={href}
        className="mt-2 inline-flex h-5 items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <ArrowUpRight aria-hidden="true" className="size-3" />
      </Link>
    </div>
  )
}

function Column({ y, className, children }: { y?: MotionValue<number>; className?: string; children: React.ReactNode }) {
  return (
    <motion.div data-collage-column="" style={y ? { y } : undefined} className={cn("flex flex-col gap-10 lg:px-4", className)}>
      {children}
    </motion.div>
  )
}

const LARGE = "(min-width: 1024px)"

/** Whether the viewport is at least Tailwind's `lg` width. False during server rendering. */
function useIsLarge() {
  return React.useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(LARGE)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia(LARGE).matches,
    () => false
  )
}

function GlobeCard() {
  return (
    <div className="relative h-96">
      <div className="p-6">
        <p className="text-lg font-medium tracking-tight">Real 3D, in a card</p>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          A WebGL globe you can drag, that pauses off screen and holds still with reduced motion.
        </p>
      </div>
      <div className="absolute inset-x-0 -bottom-40 flex justify-center">
        <DottedGlobe dots={1800} speed={0.2} className="w-80 text-blue-600" label="Dotted globe" />
      </div>
    </div>
  )
}

/**
 * A wall of real kanakui blocks and components at staggered heights, with
 * guide lines between them. On large screens the columns drift at different
 * speeds as the section scrolls; with reduced motion, and on small screens
 * (where the wall becomes a shorter, simple stack), they stay put. Tiles shown
 * only in the wall aren't rendered at all on small screens. Everything in the
 * wall is live.
 */
export function Collage({ heading }: { heading: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5 })
  const y1 = useTransform(progress, [0, 1], [90, -90])
  const y2 = useTransform(progress, [0, 1], [-30, 70])
  const y3 = useTransform(progress, [0, 1], [60, -60])
  const y4 = useTransform(progress, [0, 1], [-10, 110])
  const large = useIsLarge()
  const move = !reduceMotion && large

  const loginTile = (
    <Tile label="login-01" href="/blocks/login-01" light labelEnd>
      <LiveBlock name="login-01" theme="light" className="h-[34rem]" />
    </Tile>
  )
  const otpTile = (
    <Tile label="otp-input" href="/components/otp-input" labelEnd>
      <ComponentPreview name="otp-input" className="h-56 bg-card bg-none" />
    </Tile>
  )
  const globeTile = (
    <Tile label="dotted-globe" href="/components/dotted-globe" light>
      <GlobeCard />
    </Tile>
  )
  const stackTile = (
    <Tile label="card-stack" href="/components/card-stack" light>
      <ComponentPreview name="card-stack" className="h-80 bg-none" />
    </Tile>
  )
  const orbitTile = (
    <Tile label="orbiting-circles" href="/components/orbiting-circles">
      <ComponentPreview name="orbiting-circles" className="h-80 bg-card bg-none" />
    </Tile>
  )
  const ratingTile = (
    <Tile label="rating" href="/components/rating" light>
      <ComponentPreview name="rating" className="h-44 bg-none" />
    </Tile>
  )
  const pricingTile = (
    <Tile label="pricing-01" href="/blocks/pricing-01" light>
      <LiveBlock name="pricing-01" theme="light" className="h-[44rem]" />
    </Tile>
  )

  return (
    <div
      ref={ref}
      className="relative flex flex-col gap-10 px-4 pt-20 pb-16 sm:px-6 lg:left-1/2 lg:grid lg:w-[max(100%,80rem)] lg:-translate-x-1/2 lg:grid-cols-[1fr_1fr_1.25fr_1.25fr] lg:gap-0 lg:p-0"
    >
      <div className="lg:col-span-2 lg:row-start-1 lg:px-12 lg:pt-24 lg:pb-12 xl:px-20">{heading}</div>

      <div className="lg:col-start-1 lg:row-start-2 lg:-ml-14 lg:border-r lg:border-dashed lg:border-white/10 lg:pt-8">
        <Column y={move ? y1 : undefined}>
          {loginTile}
          {large ? otpTile : null}
        </Column>
      </div>
      <div className="lg:col-start-2 lg:row-start-2 lg:border-r lg:border-dashed lg:border-white/10 lg:pt-28">
        <Column y={move ? y2 : undefined}>
          {globeTile}
          {stackTile}
        </Column>
      </div>

      <div className="flex flex-col gap-10 lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:gap-0">
        <div className="lg:border-b lg:border-dashed lg:border-white/10 lg:px-4 lg:pt-16 lg:pb-10">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                hero-08 · running live
              </span>
            </div>
            <LiveBlock name="hero-08" theme="dark" scale={0.62} className="aspect-[16/8.4]" />
          </div>
          <Link
            href="/blocks/hero-08"
            className="mt-2 inline-flex h-5 items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            hero-08
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </Link>
        </div>
        <div className="grid flex-1 lg:grid-cols-2">
          <div className="lg:border-r lg:border-dashed lg:border-white/10 lg:pt-10">
            <Column y={move ? y3 : undefined}>
              {orbitTile}
              {large ? ratingTile : null}
            </Column>
          </div>
          {large ? (
            <div className="lg:-mr-16 lg:pt-4">
              <Column y={move ? y4 : undefined}>{pricingTile}</Column>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
