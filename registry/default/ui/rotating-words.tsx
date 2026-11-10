"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface RotatingWordsProps {
  /** Words to cycle through. */
  words: string[]
  /** Milliseconds each word stays visible. */
  interval?: number
  className?: string
}

/**
 * Swaps one word for the next with a vertical slide. Pauses while hovered.
 * Screen readers hear the full list once. With reduced motion the first word
 * is shown without rotating.
 */
function RotatingWords({ words, interval = 2500, className }: RotatingWordsProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (reduceMotion || paused || words.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [reduceMotion, paused, words.length, interval])

  const word = reduceMotion ? words[0] : words[index]

  return (
    <span
      data-slot="rotating-words"
      className={cn("relative inline-flex overflow-hidden align-bottom", className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export { RotatingWords, type RotatingWordsProps }
