"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type TextRevealTag = "h1" | "h2" | "h3" | "p" | "span"

interface TextRevealProps {
  /** The text to reveal, word by word. */
  text: string
  /** Element to render. */
  as?: TextRevealTag
  /** Seconds before the first word starts. */
  delay?: number
  /** Seconds between words. */
  stagger?: number
  /** Animate every time it enters the viewport instead of once. */
  repeat?: boolean
  className?: string
}

/**
 * Fades, unblurs and lifts each word into place when the text scrolls into
 * view. The text stays real text, so it is selectable and read normally by
 * screen readers. Renders static text when the user prefers reduced motion.
 */
function TextReveal({ text, as: Tag = "p", delay = 0, stagger = 0.06, repeat = false, className }: TextRevealProps) {
  const reduceMotion = useReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)

  if (reduceMotion) {
    return (
      <Tag data-slot="text-reveal" className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag data-slot="text-reveal" className={cn(className)}>
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            initial={{ opacity: 0, filter: "blur(8px)", y: "0.35em" }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: !repeat, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay + index * stagger }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  )
}

export { TextReveal, type TextRevealProps }
