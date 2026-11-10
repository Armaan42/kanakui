"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

export interface BlockWallTile {
  name: string
  title: string
  href: string
}

/**
 * Rows of block screenshots on a tilted plane. As the section scrolls into
 * view the plane straightens out and the rows slide in opposite directions.
 * With reduced motion the rows sit flat and still. Each tile is a link to the
 * block's page; the screenshots follow the site theme.
 */
export function BlockWall({ rows }: { rows: BlockWallTile[][] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  const rotateX = useTransform(progress, [0, 0.5], [32, 0])
  const rotateZ = useTransform(progress, [0, 0.5], [-12, 0])
  const scale = useTransform(progress, [0, 0.5], [0.85, 1])
  const y = useTransform(progress, [0, 0.5], [-60, 0])
  const opacity = useTransform(progress, [0, 0.25], [0.3, 1])
  const toRight = useTransform(progress, [0, 1], [-220, 220])
  const toLeft = useTransform(progress, [0, 1], [220, -220])

  return (
    <div ref={ref} className="relative overflow-hidden py-12 perspective-[1400px]">
      <motion.div
        style={reduceMotion ? undefined : { rotateX, rotateZ, scale, y, opacity }}
        className="flex flex-col gap-4 transform-3d sm:gap-6"
      >
        {rows.map((row, index) => (
          <div key={index} className="flex justify-center">
            <motion.ul
              style={reduceMotion ? undefined : { x: index % 2 ? toLeft : toRight }}
              className="flex w-max gap-4 sm:gap-6"
            >
              {row.map((tile) => (
                <li key={tile.name}>
                  <Link
                    href={tile.href}
                    className="group relative block aspect-16/10 w-64 overflow-hidden rounded-xl border bg-card shadow-lg shadow-black/5 transition-[translate,border-color] outline-none hover:-translate-y-1 hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-80 motion-reduce:hover:translate-y-0"
                  >
                    <Image
                      src={`/thumbnails/${tile.name}-light.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 320px, 256px"
                      className="object-cover object-top dark:hidden"
                    />
                    <Image
                      src={`/thumbnails/${tile.name}-dark.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 320px, 256px"
                      className="hidden object-cover object-top dark:block"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 to-transparent px-4 pt-8 pb-3 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      {tile.title}
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
        ))}
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--background),transparent_12%,transparent_88%,var(--background)),linear-gradient(to_top,var(--background),transparent_25%)]"
      />
    </div>
  )
}
