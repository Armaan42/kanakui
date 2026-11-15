"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface DepthCardProps extends React.ComponentProps<"div"> {
  /** Largest tilt in degrees as the pointer moves across the card. */
  max?: number
  /** Distance to the viewer in px. Smaller values exaggerate the depth. */
  perspective?: number
  /** Class for the outer element that holds the perspective, e.g. for layout. */
  containerClassName?: string
}

/**
 * A card that tilts toward the pointer while the `DepthCardItem`s inside it
 * rise off the surface, each to its own depth. Keyboard focus inside the card
 * lifts the items too (without tilting). Touch users and anyone who prefers
 * reduced motion see a flat card.
 */
function DepthCard({ max = 12, perspective = 1000, className, containerClassName, style, children, ...props }: DepthCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef(0)

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const setActive = (active: boolean) => {
    const card = ref.current
    if (!card) return
    if (active && !reduced()) card.setAttribute("data-active", "")
    else card.removeAttribute("data-active")
  }

  const resetTilt = () => {
    cancelAnimationFrame(frame.current)
    ref.current?.style.setProperty("--rx", "0deg")
    ref.current?.style.setProperty("--ry", "0deg")
  }

  return (
    <div
      className={cn("perspective-(--depth-card-perspective)", containerClassName)}
      style={{ "--depth-card-perspective": `${perspective}px` } as React.CSSProperties}
    >
      <div
        ref={ref}
        data-slot="depth-card"
        onPointerEnter={(event) => event.pointerType !== "touch" && setActive(true)}
        onPointerMove={(event) => {
          if (event.pointerType === "touch" || reduced()) return
          const card = ref.current
          if (!card) return
          const { clientX, clientY } = event
          cancelAnimationFrame(frame.current)
          frame.current = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect()
            const px = (clientX - rect.left) / rect.width
            const py = (clientY - rect.top) / rect.height
            card.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`)
            card.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`)
          })
        }}
        onPointerLeave={() => {
          resetTilt()
          if (!ref.current?.contains(document.activeElement)) setActive(false)
        }}
        onFocus={() => setActive(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) setActive(false)
        }}
        className={cn(
          "group/depth-card relative transform-3d",
          "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-200 ease-out will-change-transform",
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

interface DepthCardItemProps extends React.ComponentProps<"div"> {
  /** How far the item rises toward the viewer while the card is active, in px. */
  depth?: number
  /** Sideways and vertical shift while active, in px. */
  x?: number
  y?: number
  /** Extra rotation while active, in degrees. */
  rotateX?: number
  rotateY?: number
  rotateZ?: number
}

/**
 * A layer inside a `DepthCard`. It sits flat until the card is hovered or
 * focused, then rises to `depth` (and moves or turns by the other props).
 * Items can be nested; anything between an item and the card must keep 3D
 * (`transform-3d`) and must not clip (`overflow-hidden` flattens the effect).
 */
function DepthCardItem({ depth = 0, x = 0, y = 0, rotateX = 0, rotateY = 0, rotateZ = 0, className, style, ...props }: DepthCardItemProps) {
  return (
    <div
      data-slot="depth-card-item"
      className={cn(
        "transform-3d transition-transform duration-500 ease-out",
        "[transform:translate3d(0,0,0)]",
        "group-data-active/depth-card:[transform:translate3d(var(--dx),var(--dy),var(--dz))_rotateX(var(--drx))_rotateY(var(--dry))_rotateZ(var(--drz))]",
        className
      )}
      style={
        {
          "--dx": `${x}px`,
          "--dy": `${y}px`,
          "--dz": `${depth}px`,
          "--drx": `${rotateX}deg`,
          "--dry": `${rotateY}deg`,
          "--drz": `${rotateZ}deg`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { DepthCard, DepthCardItem }
