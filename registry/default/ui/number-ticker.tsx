"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Number to count up (or down) to. */
  value: number
  /** Number to start from. */
  from?: number
  /** Animation length in milliseconds. */
  duration?: number
  /** Digits after the decimal point. */
  decimals?: number
  /** BCP 47 locale for formatting, e.g. `en-IN`. Defaults to the visitor's locale. */
  locale?: string
  /** Extra `Intl.NumberFormat` options, e.g. `{ style: "currency", currency: "USD" }`. */
  formatOptions?: Intl.NumberFormatOptions
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Counts from `from` to `value` the first time it scrolls into view.
 * Updates the DOM directly (no re-render per frame). Screen readers get the
 * final value; with reduced motion the final value shows immediately.
 */
function NumberTicker({
  value,
  from = 0,
  duration = 2000,
  decimals = 0,
  locale,
  formatOptions,
  className,
  ...props
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const format = React.useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      ...formatOptions,
    })
    return (n: number) => formatter.format(n)
  }, [locale, decimals, formatOptions])

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = format(value)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          node.textContent = format(from + (value - from) * easeOutExpo(progress))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, from, duration, format])

  return (
    <span data-slot="number-ticker" className={cn("inline-block tabular-nums", className)} {...props}>
      <span ref={ref} aria-hidden="true">
        {format(from)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  )
}

export { NumberTicker, type NumberTickerProps }
