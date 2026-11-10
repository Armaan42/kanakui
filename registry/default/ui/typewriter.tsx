"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface TypewriterProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Words or phrases to type, one after another. */
  words: string[]
  /** Milliseconds per typed character. */
  typeSpeed?: number
  /** Milliseconds per deleted character. */
  deleteSpeed?: number
  /** Milliseconds to wait after a word is fully typed. */
  pause?: number
  /** Start over after the last word. When false, the last word stays. */
  loop?: boolean
  /** Show a blinking caret. */
  cursor?: boolean
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/** Tracks the user's reduced-motion setting. The server assumes motion is allowed. */
function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION)
      query.addEventListener("change", onChange)
      return () => query.removeEventListener("change", onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )
}

/**
 * Types each word, pauses, deletes it and moves to the next. Screen readers
 * read all words once instead of every keystroke. With reduced motion, the
 * first word is shown without animation.
 */
function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1600,
  loop = true,
  cursor = true,
  className,
  ...props
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = React.useState(0)
  const [length, setLength] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const word = words[wordIndex % Math.max(words.length, 1)] ?? ""
  const isLast = wordIndex === words.length - 1

  React.useEffect(() => {
    if (reducedMotion || words.length === 0) return
    let delay = deleting ? deleteSpeed : typeSpeed
    let next: () => void

    if (!deleting && length < word.length) {
      next = () => setLength((l) => l + 1)
    } else if (!deleting && length === word.length) {
      if (isLast && !loop) return
      delay = pause
      next = () => setDeleting(true)
    } else if (deleting && length > 0) {
      next = () => setLength((l) => l - 1)
    } else {
      next = () => {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    }
    const timeout = setTimeout(next, delay)
    return () => clearTimeout(timeout)
  }, [length, deleting, word, isLast, loop, pause, typeSpeed, deleteSpeed, reducedMotion, words.length])

  const visible = reducedMotion ? (words[0] ?? "") : word.slice(0, length)

  return (
    <span data-slot="typewriter" className={cn("inline", className)} {...props}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {visible}
        {cursor ? (
          <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.12em] animate-typewriter-caret bg-current motion-reduce:animate-none" />
        ) : null}
      </span>
    </span>
  )
}

export { Typewriter, type TypewriterProps }
