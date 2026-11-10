"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useReducedMotion } from "motion/react"
import { AdditiveBlending, Color, type Group, type ShaderMaterial } from "three"

const RADIUS = 5.5
const ARMS = 4

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

/** Spiral-arm positions, colors (hot core to cool rim), sizes and twinkle seeds. */
function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const randoms = new Float32Array(count)
  const inner = new Color("#ffb48f")
  const middle = new Color("#c084fc")
  const outer = new Color("#38bdf8")
  const color = new Color()
  const jitter = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)

  const coreColor = new Color("#ffe1c2")
  const coreCount = Math.round(count * 0.08)

  for (let i = 0; i < count; i++) {
    if (i < coreCount) {
      // A dense, warm core.
      const r = Math.pow(Math.random(), 2) * 0.9
      const theta = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(theta) * r
      positions[i * 3 + 1] = jitter() * 0.18
      positions[i * 3 + 2] = Math.sin(theta) * r
      colors.set([coreColor.r, coreColor.g, coreColor.b], i * 3)
      scales[i] = 0.8 + Math.random() * 1.4
      randoms[i] = Math.random()
      continue
    }
    const r = 0.3 + Math.pow(Math.random(), 1.4) * RADIUS
    const arm = ((i % ARMS) / ARMS) * Math.PI * 2
    const angle = arm + r * 1.15
    const spread = 0.08 + r * 0.07
    positions[i * 3] = Math.cos(angle) * r + jitter() * spread * 1.6
    positions[i * 3 + 1] = jitter() * spread * 0.5
    positions[i * 3 + 2] = Math.sin(angle) * r + jitter() * spread * 1.6

    const t = r / RADIUS
    if (t < 0.45) color.copy(inner).lerp(middle, t / 0.45)
    else color.copy(middle).lerp(outer, (t - 0.45) / 0.55)
    colors.set([color.r, color.g, color.b], i * 3)

    scales[i] = 0.4 + Math.random() * 1.1
    randoms[i] = Math.random()
  }
  return { positions, colors, scales, randoms }
}

interface PointerState {
  x: number
  y: number
}

function GalaxyPoints({ count, animate, pointer }: { count: number; animate: boolean; pointer: React.RefObject<PointerState> }) {
  const group = React.useRef<Group>(null)
  const material = React.useRef<ShaderMaterial>(null)
  const gl = useThree((state) => state.gl)
  const data = React.useMemo(() => buildGalaxy(count), [count])
  const uniforms = React.useMemo(() => ({ uTime: { value: 0 }, uSize: { value: 60 * gl.getPixelRatio() } }), [gl])

  useFrame(({ camera }, delta) => {
    const step = animate ? Math.min(delta, 0.05) : 0
    if (material.current) material.current.uniforms.uTime!.value += step
    if (group.current) group.current.rotation.y += step * 0.06

    // Ease the camera toward the pointer, and dive in as the page scrolls.
    const scroll = typeof window === "undefined" ? 0 : Math.min(window.scrollY / window.innerHeight, 1)
    const p = pointer.current ?? { x: 0, y: 0 }
    const targetX = p.x * 1.2
    const targetY = 4.6 - p.y * 0.8 - scroll * 1.6
    const targetZ = 6.4 - scroll * 2.6
    const ease = animate ? 1 - Math.pow(0.04, step) : 1
    camera.position.x += (targetX - camera.position.x) * ease
    camera.position.y += (targetY - camera.position.y) * ease
    camera.position.z += (targetZ - camera.position.z) * ease
    camera.lookAt(0, 2.7, 0)
  })

  return (
    <group ref={group} rotation={[0.18, 0, -0.12]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
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
 * A spiral galaxy of glowing particles. It turns slowly, leans toward the
 * pointer and moves closer as the page scrolls. It stops drawing while off
 * screen, and holds still with reduced motion. Decorative only.
 */
export function Galaxy({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const pointer = React.useRef<PointerState>({ x: 0, y: 0 })
  const [visible, setVisible] = React.useState(true)
  const reduceMotion = useReducedMotion() ?? false
  // Rendered only in the browser (loaded with ssr: false), so window is available.
  const [count] = React.useState(() => (window.matchMedia("(max-width: 640px)").matches ? 18000 : 50000))

  React.useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)))
    if (node) observer.observe(node)

    return () => {
      window.removeEventListener("pointermove", onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <Canvas
        camera={{ position: [0, 4.6, 6.4], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible && !reduceMotion ? "always" : "demand"}
      >
        <GalaxyPoints count={count} animate={!reduceMotion} pointer={pointer} />
      </Canvas>
    </div>
  )
}
