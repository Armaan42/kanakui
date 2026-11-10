import * as React from "react"

import { cn } from "@/lib/utils"

interface Text3dProps {
  text: string
  /** Element to render. */
  as?: "h1" | "h2" | "h3" | "p" | "span"
  /** Extrusion depth in layers (each about one pixel). */
  depth?: number
  /** Tilt toward the viewer on hover. */
  tilt?: boolean
  className?: string
}

/**
 * Text extruded into 3D with stacked shadows, tilting slightly on hover.
 * Pure CSS: the text stays real, selectable text. Uses the current text color
 * for the face and darker mixes for the sides. No tilt with reduced motion.
 */
function Text3d({ text, as: Tag = "h2", depth = 8, tilt = true, className }: Text3dProps) {
  const shadow = Array.from(
    { length: depth },
    (_, i) => `${i + 1}px ${i + 1}px 0 color-mix(in oklch, currentColor ${Math.max(18, 45 - i * 3)}%, var(--background))`
  ).join(", ")

  return (
    <Tag
      data-slot="text-3d"
      className={cn(
        "inline-block font-semibold tracking-tight [transform:perspective(800px)] transition-transform duration-500 ease-out motion-reduce:transition-none",
        tilt && "hover:[transform:perspective(800px)_rotateX(14deg)_rotateY(-14deg)] motion-reduce:hover:[transform:none]",
        className
      )}
      style={{ textShadow: shadow }}
    >
      {text}
    </Tag>
  )
}

export { Text3d, type Text3dProps }
