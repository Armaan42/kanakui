"use client"

import * as React from "react"

/**
 * Tracks the pointer relative to an element and exposes it as CSS custom
 * properties, without causing React re-renders:
 *
 * - `--pointer-x` / `--pointer-y`: position in px from the element's top-left
 * - `--pointer-active`: `1` while the pointer is over the element, else `0`
 *
 * Updates are batched to at most one per animation frame.
 *
 * @returns a callback ref to attach to the element you want to track.
 */
export function usePointerPosition<T extends HTMLElement>(): React.RefCallback<T> {
  return React.useCallback((node: T | null) => {
    if (!node) return

    let frame = 0
    let clientX = 0
    let clientY = 0

    const write = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      node.style.setProperty("--pointer-x", `${clientX - rect.left}px`)
      node.style.setProperty("--pointer-y", `${clientY - rect.top}px`)
    }

    const onMove = (event: PointerEvent) => {
      clientX = event.clientX
      clientY = event.clientY
      if (!frame) frame = requestAnimationFrame(write)
    }

    const onEnter = (event: PointerEvent) => {
      onMove(event)
      node.style.setProperty("--pointer-active", "1")
    }

    const onLeave = () => {
      node.style.setProperty("--pointer-active", "0")
    }

    node.addEventListener("pointermove", onMove, { passive: true })
    node.addEventListener("pointerenter", onEnter)
    node.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener("pointermove", onMove)
      node.removeEventListener("pointerenter", onEnter)
      node.removeEventListener("pointerleave", onLeave)
    }
  }, [])
}
