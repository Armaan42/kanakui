"use client"

import * as React from "react"
import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber"
import { useReducedMotion } from "motion/react"
import {
  AdditiveBlending,
  BackSide,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type ShaderMaterial,
  TubeGeometry,
  Vector3,
} from "three"

import { LAND_MASK } from "@/components/home/land-mask"

const DEG = Math.PI / 180
const RADIUS = 1
/** Longitude that faces the viewer at the start (Europe, Africa and India). */
const START_LON = 35

/** Latitude/longitude to a point on the sphere (three-globe's convention). */
function toVector(lat: number, lon: number, radius = RADIUS) {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

const CITIES = {
  sanFrancisco: [37.77, -122.42],
  newYork: [40.71, -74.0],
  saoPaulo: [-23.55, -46.63],
  london: [51.51, -0.13],
  frankfurt: [50.11, 8.68],
  lagos: [6.52, 3.38],
  nairobi: [-1.29, 36.82],
  dubai: [25.2, 55.27],
  mumbai: [19.08, 72.88],
  singapore: [1.35, 103.82],
  tokyo: [35.68, 139.69],
  seoul: [37.57, 126.98],
  sydney: [-33.87, 151.21],
} as const satisfies Record<string, readonly [number, number]>

type City = keyof typeof CITIES

function cityVector(city: City, radius = RADIUS) {
  const [lat, lon] = CITIES[city]
  return toVector(lat, lon, radius)
}

const ROUTES: [City, City][] = [
  ["london", "newYork"],
  ["frankfurt", "mumbai"],
  ["mumbai", "singapore"],
  ["singapore", "sydney"],
  ["dubai", "london"],
  ["lagos", "saoPaulo"],
  ["nairobi", "dubai"],
  ["tokyo", "sanFrancisco"],
  ["seoul", "frankfurt"],
  ["newYork", "saoPaulo"],
  ["mumbai", "nairobi"],
  ["sydney", "tokyo"],
]

/** One cycle of an arc: the pulse travels for 1, then the landing ring plays until 1.6. */
const CYCLE = 1.6

// ---------- Land dots ----------

function landPoints(samples: number) {
  const bytes = Uint8Array.from(atob(LAND_MASK.data), (c) => c.charCodeAt(0))
  const isLand = (lat: number, lon: number) => {
    const row = Math.min(LAND_MASK.height - 1, Math.max(0, Math.floor(90 - lat)))
    const col = Math.min(LAND_MASK.width - 1, Math.max(0, Math.floor(lon + 180)))
    const i = row * LAND_MASK.width + col
    return ((bytes[i >> 3]! >> (i & 7)) & 1) === 1
  }
  const positions: number[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < samples; i++) {
    // Evenly spread points (a Fibonacci sphere), kept only over land.
    const y = 1 - (i / (samples - 1)) * 2
    const lat = Math.asin(y) / DEG
    const lon = ((((i * golden) / DEG) % 360) + 360) % 360 - 180
    if (isLand(lat, lon)) positions.push(...toVector(lat, lon, RADIUS * 1.002).toArray())
  }
  return new Float32Array(positions)
}

const dotVertex = /* glsl */ `
  uniform float uSize;
  varying float vFacing;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 normal = normalize(normalMatrix * normalize(position));
    vFacing = clamp(dot(normal, normalize(-mv.xyz)), 0.0, 1.0);
    gl_PointSize = uSize / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`
const dotFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vFacing;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float alpha = (1.0 - smoothstep(0.5, 1.0, d)) * (0.15 + 0.75 * vFacing);
    gl_FragColor = vec4(uColor, alpha);
  }
`

// ---------- Atmosphere ----------

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.6) * 0.85;
    gl_FragColor = vec4(uColor, 1.0) * intensity;
  }
`

// ---------- Arcs ----------

const arcVertex = /* glsl */ `
  varying float vProgress;
  void main() {
    vProgress = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const arcFragment = /* glsl */ `
  uniform float uPhase;
  uniform vec3 uFrom;
  uniform vec3 uTo;
  varying float vProgress;
  void main() {
    float head = uPhase;
    float tail = head - 0.38;
    float pulse = smoothstep(tail, head, vProgress) * step(vProgress, head);
    float alpha = 0.13 + pulse;
    vec3 color = mix(uFrom, uTo, vProgress);
    gl_FragColor = vec4(color * (0.6 + pulse * 1.6), alpha);
  }
`

function arcGeometry(from: City, to: City) {
  const a = cityVector(from).normalize()
  const b = cityVector(to).normalize()
  const omega = a.angleTo(b)
  const lift = 0.06 + omega * 0.13
  const points: Vector3[] = []
  for (let i = 0; i <= 48; i++) {
    const t = i / 48
    // Spherical interpolation along the great circle, lifted in the middle.
    const p = a
      .clone()
      .multiplyScalar(Math.sin((1 - t) * omega) / Math.sin(omega))
      .add(b.clone().multiplyScalar(Math.sin(t * omega) / Math.sin(omega)))
    points.push(p.multiplyScalar(RADIUS + Math.sin(Math.PI * t) * lift))
  }
  return new TubeGeometry(new CatmullRomCurve3(points), 96, 0.0055, 6, false)
}

interface RouteState {
  geometry: TubeGeometry
  to: Vector3
  offset: number
  speed: number
}

function Scene({ animate, drag }: { animate: boolean; drag: React.RefObject<{ x: number; y: number }> }) {
  const spin = React.useRef<Group>(null)
  const gl = useThree((state) => state.gl)
  const time = React.useRef(animate ? 0 : 0.7)
  const arcMaterials = React.useRef<(ShaderMaterial | null)[]>([])
  const rings = React.useRef<(Mesh | null)[]>([])

  const [samples] = React.useState(() => (window.matchMedia("(max-width: 640px)").matches ? 11000 : 16000))
  const dots = React.useMemo(() => landPoints(samples), [samples])
  const routes = React.useMemo<RouteState[]>(
    () =>
      ROUTES.map(([from, to], i) => ({
        geometry: arcGeometry(from, to),
        to: cityVector(to, RADIUS * 1.004),
        offset: (i * 0.37) % 1,
        speed: 0.22 + ((i * 7) % 5) * 0.03,
      })),
    []
  )
  React.useEffect(() => () => routes.forEach((r) => r.geometry.dispose()), [routes])

  const startY = React.useMemo(() => {
    const theta = (START_LON + 180) * DEG
    return -Math.atan2(-Math.cos(theta), Math.sin(theta))
  }, [])

  const uniforms = React.useMemo(
    () => ({
      dots: { uSize: { value: 7.5 * gl.getPixelRatio() }, uColor: { value: new Color("#dbe4ff") } },
      atmosphere: { uColor: { value: new Color("#6d5dfc") } },
    }),
    [gl]
  )
  const arcUniforms = React.useMemo(
    () =>
      routes.map(() => ({
        uPhase: { value: 0 },
        uFrom: { value: new Color("#a78bfa") },
        uTo: { value: new Color("#67e8f9") },
      })),
    [routes]
  )

  useFrame((_, delta) => {
    if (animate) time.current += Math.min(delta, 0.05)
    const t = time.current
    if (spin.current) {
      const d = drag.current ?? { x: 0, y: 0 }
      spin.current.rotation.y = startY + t * 0.07 + d.x
      spin.current.rotation.x = Math.max(-0.5, Math.min(0.5, d.y))
    }
    routes.forEach((route, i) => {
      const phase = (((t * route.speed + route.offset) % 1) + 1) % 1 * CYCLE
      const material = arcMaterials.current[i]
      if (material) material.uniforms.uPhase!.value = Math.min(phase, 1.38)
      const ring = rings.current[i]
      if (ring) {
        const landed = phase > 1 ? (phase - 1) / (CYCLE - 1) : -1
        ring.visible = landed >= 0
        if (landed >= 0) {
          ring.scale.setScalar(1 + landed * 3.5)
          ;(ring.material as MeshBasicMaterial).opacity = 1 - landed
        }
      }
    })
  })

  return (
    <group rotation={[0.32, 0, -0.08]}>
      <group ref={spin}>
        <mesh>
          <sphereGeometry args={[RADIUS * 0.996, 64, 64]} />
          <meshBasicMaterial color="#0b0b16" />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dots, 3]} />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={dotVertex}
            fragmentShader={dotFragment}
            uniforms={uniforms.dots}
            transparent
            depthWrite={false}
          />
        </points>
        {routes.map((route, i) => (
          <React.Fragment key={i}>
            <mesh geometry={route.geometry}>
              <shaderMaterial
                ref={(m) => {
                  arcMaterials.current[i] = m
                }}
                vertexShader={arcVertex}
                fragmentShader={arcFragment}
                uniforms={arcUniforms[i]}
                transparent
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>
            <mesh position={route.to}>
              <sphereGeometry args={[0.012, 12, 12]} />
              <meshBasicMaterial color="#e0e7ff" />
            </mesh>
            <mesh
              ref={(m) => {
                rings.current[i] = m
                // Lie flat on the surface: turn the ring's +z toward the surface normal.
                m?.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), route.to.clone().normalize())
              }}
              position={route.to}
              visible={false}
            >
              <ringGeometry args={[0.014, 0.022, 32]} />
              <meshBasicMaterial color="#67e8f9" transparent depthWrite={false} side={DoubleSide} blending={AdditiveBlending} />
            </mesh>
          </React.Fragment>
        ))}
      </group>
      <mesh scale={1.16}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={uniforms.atmosphere}
          side={BackSide}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

/**
 * A dotted Earth with glowing routes between world cities. Pulses travel
 * along each arc and ripple where they land. It turns slowly and can be
 * dragged; it stops drawing off screen and holds still with reduced motion.
 * Decorative: hidden from assistive technology.
 */
export function ArcGlobe({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef({ x: 0, y: 0 })
  const pointer = React.useRef<{ x: number; y: number } | null>(null)
  const reduceMotion = useReducedMotion() ?? false
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") return
        event.currentTarget.setPointerCapture(event.pointerId)
        pointer.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerMove={(event) => {
        if (!pointer.current) return
        drag.current.x += (event.clientX - pointer.current.x) * 0.006
        drag.current.y = Math.max(-0.5, Math.min(0.5, drag.current.y + (event.clientY - pointer.current.y) * 0.004))
        pointer.current = { x: event.clientX, y: event.clientY }
        invalidate()
      }}
      onPointerUp={() => {
        pointer.current = null
      }}
      onPointerCancel={() => {
        pointer.current = null
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.1], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible && !reduceMotion ? "always" : "demand"}
        className="cursor-grab active:cursor-grabbing"
      >
        <Scene animate={!reduceMotion} drag={drag} />
      </Canvas>
    </div>
  )
}
