"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { AdditiveBlending, Color, type Group, type ShaderMaterial } from "three"

import { cn } from "@/lib/utils"
import { useSceneState } from "@/registry/default/hooks/use-scene-state"

interface ParticleGalaxyProps {
  /** Number of particles. Lower it for low-end phones. */
  count?: number
  /** Number of spiral arms. */
  arms?: number
  /** Colors from the core, through the middle, to the rim. Hex, rgb() or hsl(). */
  colors?: [string, string, string]
  /** Turning speed in radians per second. */
  speed?: number
  /** Lean the camera toward the pointer. */
  followPointer?: boolean
  /** Accessible description of the graphic. */
  label?: string
  className?: string
}

const RADIUS = 5.5

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aRandom;
  attribute vec3 aColor;
  varying vec3 vColor;
  void main() {
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    float twinkle = 0.7 + 0.3 * sin(uTime * 1.7 + aRandom * 60.0);
    gl_PointSize = uSize * aScale * twinkle / -viewPosition.z;
    vColor = aColor;
  }
`
const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5)) * 2.0;
    float strength = pow(clamp(1.0 - d, 0.0, 1.0), 2.6);
    gl_FragColor = vec4(vColor * strength, strength);
  }
`

/** Seeded random numbers, so the galaxy is the same shape on every load. */
function random(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function buildGalaxy(count: number, arms: number, colors: [string, string, string]) {
  const rand = random(42)
  const positions = new Float32Array(count * 3)
  const tints = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const randoms = new Float32Array(count)
  const [inner, middle, outer] = colors.map((c) => new Color(c)) as [Color, Color, Color]
  const color = new Color()
  const jitter = () => Math.pow(rand(), 3) * (rand() < 0.5 ? 1 : -1)
  const coreCount = Math.round(count * 0.08)

  for (let i = 0; i < count; i++) {
    if (i < coreCount) {
      // A dense, warm core.
      const r = Math.pow(rand(), 2) * 0.9
      const theta = rand() * Math.PI * 2
      positions.set([Math.cos(theta) * r, jitter() * 0.18, Math.sin(theta) * r], i * 3)
      color.copy(inner).lerp(new Color("#ffffff"), 0.35)
      tints.set([color.r, color.g, color.b], i * 3)
      scales[i] = 0.8 + rand() * 1.4
      randoms[i] = rand()
      continue
    }
    const r = 0.3 + Math.pow(rand(), 1.4) * RADIUS
    const angle = ((i % arms) / arms) * Math.PI * 2 + r * 1.15
    const spread = 0.08 + r * 0.07
    positions.set(
      [Math.cos(angle) * r + jitter() * spread * 1.6, jitter() * spread * 0.5, Math.sin(angle) * r + jitter() * spread * 1.6],
      i * 3
    )
    const t = r / RADIUS
    if (t < 0.45) color.copy(inner).lerp(middle, t / 0.45)
    else color.copy(middle).lerp(outer, (t - 0.45) / 0.55)
    tints.set([color.r, color.g, color.b], i * 3)
    scales[i] = 0.4 + rand() * 1.1
    randoms[i] = rand()
  }
  return { positions, tints, scales, randoms }
}

interface Pointer {
  x: number
  y: number
}

function Galaxy({
  count,
  arms,
  colors,
  speed,
  pointer,
}: {
  count: number
  arms: number
  colors: [string, string, string]
  speed: number
  pointer: React.RefObject<Pointer | null>
}) {
  const group = React.useRef<Group>(null)
  const material = React.useRef<ShaderMaterial>(null)
  const gl = useThree((state) => state.gl)
  const [inner, middle, outer] = colors
  const data = React.useMemo(() => buildGalaxy(count, arms, [inner, middle, outer]), [count, arms, inner, middle, outer])
  const uniforms = React.useMemo(() => ({ uTime: { value: 0 }, uSize: { value: 60 * gl.getPixelRatio() } }), [gl])

  useFrame(({ camera }, delta) => {
    const step = Math.min(delta, 0.05)
    if (material.current) material.current.uniforms.uTime!.value += step
    if (group.current) group.current.rotation.y += step * speed
    const p = pointer.current ?? { x: 0, y: 0 }
    const ease = 1 - Math.pow(0.04, step || 1)
    camera.position.x += (p.x * 1.2 - camera.position.x) * ease
    camera.position.y += (4.6 - p.y * 0.8 - camera.position.y) * ease
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group} rotation={[0.18, 0, -0.12]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[data.tints, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[data.scales, 1]} />
          <bufferAttribute attach="attributes-aRandom" args={[data.randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  )
}

/**
 * A spiral galaxy of glowing particles that slowly turns and leans toward
 * the pointer. Made for dark backgrounds; fill a `relative` section with it
 * as a backdrop. Rendering pauses off screen, and with reduced motion it
 * holds still.
 */
function ParticleGalaxy({
  count = 40000,
  arms = 4,
  colors = ["#ffb48f", "#c084fc", "#38bdf8"],
  speed = 0.06,
  followPointer = true,
  label = "Spiral galaxy of glowing particles",
  className,
}: ParticleGalaxyProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const pointer = React.useRef<Pointer | null>(null)
  const { active, reducedMotion } = useSceneState(ref)

  React.useEffect(() => {
    if (!followPointer) return
    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [followPointer])

  return (
    <div ref={ref} role="img" aria-label={label} data-slot="particle-galaxy" className={cn("relative h-96 w-full", className)}>
      <Canvas
        camera={{ position: [0, 4.6, 6.4], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true }}
        frameloop={active ? "always" : "demand"}
        fallback={<p className="p-4 text-sm text-muted-foreground">3D graphics are not available in this browser.</p>}
      >
        <Galaxy count={count} arms={arms} colors={colors} speed={reducedMotion ? 0 : speed} pointer={pointer} />
      </Canvas>
    </div>
  )
}

export { ParticleGalaxy, type ParticleGalaxyProps }
