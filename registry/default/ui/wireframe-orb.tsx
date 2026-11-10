"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Group } from "three"

import { cn } from "@/lib/utils"
import { useSceneState } from "@/registry/default/hooks/use-scene-state"

interface WireframeOrbProps {
  /** Geometry detail. 0 is a plain icosahedron; 3 is nearly round. */
  detail?: number
  /** How strongly the orb leans toward the pointer. */
  follow?: number
  /** Accessible description of the graphic. */
  label?: string
  className?: string
}

function Orb({ detail, follow, color }: { detail: number; follow: number; color: string }) {
  const group = React.useRef<Group>(null)

  useFrame(({ pointer }, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.y += delta * 0.2
    // Ease toward the pointer for a subtle parallax tilt.
    g.rotation.x += (pointer.y * follow - g.rotation.x) * 0.05
    g.position.x += (pointer.x * follow * 0.3 - g.position.x) * 0.05
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.25, detail]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
      <points>
        <icosahedronGeometry args={[1.25, detail]} />
        <pointsMaterial color={color} size={3} sizeAttenuation={false} />
      </points>
    </group>
  )
}

/**
 * A slowly turning wireframe sphere with glowing vertices that leans toward
 * the pointer. Uses the CSS text color; pauses off screen and with reduced
 * motion.
 */
function WireframeOrb({ detail = 2, follow = 0.5, label = "Rotating wireframe sphere", className }: WireframeOrbProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { color, active } = useSceneState(ref)

  return (
    <div ref={ref} role="img" aria-label={label} data-slot="wireframe-orb" className={cn("relative aspect-square w-full max-w-sm text-foreground", className)}>
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "demand"}
        fallback={<p className="p-4 text-sm text-muted-foreground">3D graphics are not available in this browser.</p>}
      >
        <Orb detail={detail} follow={follow} color={color} />
      </Canvas>
    </div>
  )
}

export { WireframeOrb, type WireframeOrbProps }
