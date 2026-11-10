"use client"

import * as React from "react"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/**
 * Converts any CSS color the browser understands (including oklch(), which
 * three.js can't parse) to an `rgb(r, g, b)` string by painting one pixel.
 */
function toRgb(cssColor: string): string {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const context = canvas.getContext("2d", { willReadFrequently: true })
  if (!context) return "rgb(255, 255, 255)"
  context.fillStyle = cssColor
  context.fillRect(0, 0, 1, 1)
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data
  return `rgb(${r}, ${g}, ${b})`
}

interface SceneState {
  /** The element's text color as `rgb()`, updated when the theme changes. */
  color: string
  /** True while the element is on screen and motion is allowed; use it to pause rendering. */
  active: boolean
  reducedMotion: boolean
}

/**
 * Shared state for 3D scenes: follows the CSS text color (so scenes match
 * light and dark themes), pauses when scrolled off screen, and respects the
 * user's reduced-motion setting.
 */
export function useSceneState<T extends HTMLElement>(ref: React.RefObject<T | null>): SceneState {
  const [color, setColor] = React.useState("rgb(255, 255, 255)")
  const [inView, setInView] = React.useState(false)
  const reducedMotion = React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION)
      query.addEventListener("change", onChange)
      return () => query.removeEventListener("change", onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const update = () => setColor(toRgb(getComputedStyle(node).color))
    const frame = requestAnimationFrame(update)
    // Theme switches toggle a class on <html>; re-read the color when that happens.
    const themeObserver = new MutationObserver(update)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    const visibility = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)))
    visibility.observe(node)
    return () => {
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      visibility.disconnect()
    }
  }, [ref])

  return { color, active: inView && !reducedMotion, reducedMotion }
}
