"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Points } from "three"

import { cn } from "@/lib/utils"
import { useSceneState } from "@/registry/default/hooks/use-scene-state"

interface ParticleWaveProps {
  /** Points along the x axis. */
  columns?: number
  /** Points along the z axis. */
  rows?: number
  /** Wave height. */
  amplitude?: number
  /** Accessible description of the graphic. */
  label?: string
  className?: string
}

function Wave({ columns, rows, amplitude, color }: { columns: number; rows: number; amplitude: number; color: string }) {
  const ref = React.useRef<Points>(null)
  const positions = React.useMemo(() => {
    const array = new Float32Array(columns * rows * 3)
    let i = 0
    for (let x = 0; x < columns; x++) {
      for (let z = 0; z < rows; z++) {
        array.set([(x - columns / 2) * 0.18, 0, (z - rows / 2) * 0.18], i)
        i += 3
      }
    }
    return array
  }, [columns, rows])

  useFrame(({ clock }) => {
    const geometry = ref.current?.geometry
    if (!geometry) return
    const attribute = geometry.attributes.position
    if (!attribute) return
    const t = clock.getElapsedTime()
    const array = attribute.array as Float32Array
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i] ?? 0
      const z = array[i + 2] ?? 0
      array[i + 1] = Math.sin(x * 0.9 + t) * amplitude * 0.5 + Math.cos(z * 0.8 + t * 0.8) * amplitude * 0.5
    }
    attribute.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={2} sizeAttenuation={false} transparent opacity={0.8} />
    </points>
  )
}

/**
 * A field of points rolling like a wave, seen from a low angle. Works well as
 * a hero background. Uses the CSS text color; pauses off screen and with
 * reduced motion.
 */
function ParticleWave({ columns = 70, rows = 40, amplitude = 0.6, label = "Animated wave of particles", className }: ParticleWaveProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { color, active } = useSceneState(ref)

  return (
    <div ref={ref} role="img" aria-label={label} data-slot="particle-wave" className={cn("relative h-72 w-full text-foreground", className)}>
      <Canvas
        camera={{ position: [0, 2.2, 6], fov: 55 }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "demand"}
        fallback={<p className="p-4 text-sm text-muted-foreground">3D graphics are not available in this browser.</p>}
      >
        <Wave columns={columns} rows={rows} amplitude={amplitude} color={color} />
      </Canvas>
    </div>
  )
}

export { ParticleWave, type ParticleWaveProps }
