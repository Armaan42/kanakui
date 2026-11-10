"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { GradientText } from "@/registry/default/ui/gradient-text"

/**
 * The hero headline's last words: each one in gradient text, sliding up to
 * the next every few seconds. All words share one grid cell sized by the
 * longest, so the headline never reflows. Screen readers hear the full list
 * once; with reduced motion only the first word shows.
 */
export function HeroRotatingWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "")

  React.useEffect(() => {
    if (reduceMotion || words.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [reduceMotion, words.length, interval])

  const word = reduceMotion ? words[0] : words[index]

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.12em] align-bottom [clip-path:inset(0)]">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap lg:text-left"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <GradientText>{word}</GradientText>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
