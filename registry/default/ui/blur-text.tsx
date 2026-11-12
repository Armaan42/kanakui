import * as React from "react"

type BlurTextElement = "h1" | "h2" | "h3" | "p" | "span"

interface BlurTextProps {
  /** The text to reveal. */
  text: string
  /** Element to render. */
  as?: BlurTextElement
  /** Milliseconds before the first word starts. */
  delay?: number
  /** Milliseconds between words. */
  stagger?: number
  className?: string
}

/**
 * Text whose words rise out of a blur one after another. Pure CSS: it plays
 * once on load, shows without JavaScript, works in Server Components, and
 * appears straight away with reduced motion. The text stays plain text for
 * screen readers and search engines.
 */
function BlurText({ text, as: Component = "p", delay = 0, stagger = 90, className }: BlurTextProps) {
  const words = text.split(" ")
  return (
    <Component data-slot="blur-text" className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            className="inline-block animate-blur-in motion-reduce:animate-none"
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Component>
  )
}

export { BlurText, type BlurTextProps }
