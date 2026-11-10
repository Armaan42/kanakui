"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type ScrambleTrigger = "view" | "hover" | "mount"

interface ScrambleTextProps {
  /** The final text. */
  text: string
  /** Element to render. */
  as?: "span" | "p" | "h1" | "h2" | "h3"
  /** When to scramble: on entering the viewport, on hover/focus, or on mount. */
  trigger?: ScrambleTrigger
  /** Milliseconds until every character has settled. */
  duration?: number
  /** Characters used for the scrambled state. */
  characters?: string
  className?: string
}

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*^?#"

/**
 * Resolves text from random characters, left to right, like a decoder.
 * Writes to the DOM directly (no re-render per frame). Screen readers get the
 * final text; nothing scrambles when the user prefers reduced motion.
 */
function ScrambleText({
  text,
  as: Tag = "span",
  trigger = "view",
  duration = 900,
  characters = DEFAULT_CHARACTERS,
  className,
}: ScrambleTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const frame = React.useRef(0)

  const run = React.useCallback(() => {
    const node = ref.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const settled = Math.floor(progress * text.length)
      node.textContent = Array.from(text, (char, index) =>
        index < settled || char === " " ? char : characters[Math.floor(Math.random() * characters.length)]
      ).join("")
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [text, duration, characters])

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (trigger === "mount") run()
    let observer: IntersectionObserver | undefined
    if (trigger === "view") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            run()
            observer?.disconnect()
          }
        },
        { threshold: 0.6 }
      )
      observer.observe(node)
    }
    return () => {
      observer?.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [trigger, run])

  const hoverProps = trigger === "hover" ? { onPointerEnter: run, onFocus: run } : {}

  return (
    <Tag data-slot="scramble-text" className={cn("font-mono", className)} {...hoverProps}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}

export { ScrambleText, type ScrambleTextProps }
