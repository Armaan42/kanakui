"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Points } from "three"

import { cn } from "@/lib/utils"
import { useSceneState } from "@/registry/default/hooks/use-scene-state"

interface DottedGlobeProps {
  /** Number of dots on the sphere. */
  dots?: number
  /** Dot size in pixels. */
  dotSize?: number
  /** Rotation speed in radians per second. */
  speed?: number
  /** Accessible description of the graphic. */
  label?: string
  className?: string
}

/** Evenly spread points on a unit sphere (Fibonacci lattice). */
function spherePoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions.set([Math.cos(theta) * radius, y, Math.sin(theta) * radius], i * 3)
  }
  return positions
}

interface DragState {
  active: boolean
  x: number
  y: number
  /** Rotation still to apply, in radians, gathered from pointer and keyboard. */
  pendingX: number
  pendingY: number
}

interface PendingRotation {
  x: number
  y: number
  dragging: boolean
}

interface GlobeProps {
  dots: number
  dotSize: number
  speed: number
  color: string
  /** Returns (and clears) rotation gathered from drags and arrow keys since the last frame. */
  takeRotation: () => PendingRotation
}

function Globe({ dots, dotSize, speed, color, takeRotation }: GlobeProps) {
  const ref = React.useRef<Points>(null)
  const positions = React.useMemo(() => spherePoints(dots), [dots])

  useFrame((_, delta) => {
    const globe = ref.current
    if (!globe) return
    const pending = takeRotation()
    if (!pending.dragging) globe.rotation.y += speed * delta
    globe.rotation.y += pending.y
    globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x + pending.x))
  })

  return (
    <points ref={ref} rotation={[0.35, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={dotSize} sizeAttenuation={false} transparent opacity={0.85} />
    </points>
  )
}

/**
 * A sphere of evenly spaced dots that slowly turns. Drag it, or focus it and
 * use the arrow keys, to spin it. Dots use the CSS text color, so it follows
 * your theme. Rendering pauses off screen; with reduced motion it only moves
 * when you drag it.
 */
function DottedGlobe({ dots = 1600, dotSize = 2, speed = 0.15, label = "Rotating globe made of dots", className }: DottedGlobeProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { color, active, reducedMotion } = useSceneState(ref)
  const drag = React.useRef<DragState>({ active: false, x: 0, y: 0, pendingX: 0, pendingY: 0 })
  const [interacting, setInteracting] = React.useState(false)

  function nudge(dx: number, dy: number) {
    drag.current.pendingY += dx
    drag.current.pendingX += dy
  }

  const takeRotation = React.useCallback((): PendingRotation => {
    const state = drag.current
    const pending = { x: state.pendingX, y: state.pendingY, dragging: state.active }
    state.pendingX = 0
    state.pendingY = 0
    return pending
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${label}. Drag or use the arrow keys to rotate.`}
      tabIndex={0}
      data-slot="dotted-globe"
      className={cn(
        "relative aspect-square w-full max-w-md cursor-grab touch-none rounded-full text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing",
        className
      )}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        drag.current.active = true
        drag.current.x = event.clientX
        drag.current.y = event.clientY
        setInteracting(true)
      }}
      onPointerMove={(event) => {
        if (!drag.current.active) return
        nudge((event.clientX - drag.current.x) * 0.008, (event.clientY - drag.current.y) * 0.008)
        drag.current.x = event.clientX
        drag.current.y = event.clientY
      }}
      onPointerUp={() => {
        drag.current.active = false
        setInteracting(false)
      }}
      onPointerCancel={() => {
        drag.current.active = false
        setInteracting(false)
      }}
      onKeyDown={(event) => {
        const step = 0.15
        const moves: Record<string, [number, number]> = {
          ArrowLeft: [-step, 0],
          ArrowRight: [step, 0],
          ArrowUp: [0, -step],
          ArrowDown: [0, step],
        }
        const move = moves[event.key]
        if (!move) return
        event.preventDefault()
        nudge(...move)
        setInteracting(true)
        setTimeout(() => setInteracting(false), 300)
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        dpr={[1, 2]}
        frameloop={active || interacting ? "always" : "demand"}
        fallback={<p className="p-4 text-sm text-muted-foreground">3D graphics are not available in this browser.</p>}
      >
        <Globe dots={dots} dotSize={dotSize} speed={reducedMotion ? 0 : speed} color={color} takeRotation={takeRotation} />
      </Canvas>
    </div>
  )
}

export { DottedGlobe, type DottedGlobeProps }
