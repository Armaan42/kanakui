import * as React from "react"

import { cn } from "@/lib/utils"

const FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
] as const

interface Cube3dProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Up to six faces: front, right, back, left, top, bottom. Missing faces stay empty. */
  faces: React.ReactNode[]
  /** Edge length in pixels. */
  size?: number
  /** Seconds per full turn. */
  duration?: number
}

/**
 * A CSS-only cube that slowly tumbles in 3D and pauses on hover. Faces take
 * any content. With reduced motion it rests at a fixed angle that shows
 * three faces. Works in Server Components.
 */
function Cube3d({ faces, size = 160, duration = 14, className, style, ...props }: Cube3dProps) {
  return (
    <div
      data-slot="cube-3d"
      className={cn("group relative [perspective:900px]", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <div
        className="relative size-full animate-cube-3d [transform-style:preserve-3d] group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:[transform:rotateX(-24deg)_rotateY(-36deg)]"
        style={{ animationDuration: `${duration}s` }}
      >
        {FACES.map((transform, index) => (
          <div
            key={transform}
            className="absolute inset-0 flex items-center justify-center rounded-lg border bg-card/90 p-3 text-center text-sm font-medium [backface-visibility:hidden]"
            style={{ transform: `${transform} translateZ(${size / 2}px)` }}
          >
            {faces[index]}
          </div>
        ))}
      </div>
    </div>
  )
}

export { Cube3d, type Cube3dProps }
