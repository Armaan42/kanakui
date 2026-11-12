"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
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

import { cn } from "@/lib/utils"
import { useSceneState } from "@/registry/default/hooks/use-scene-state"
import { LAND_MASK } from "@/registry/default/lib/land-mask"

/** A point on Earth as `[latitude, longitude]` in degrees. */
type LatLon = [number, number]

interface ArcGlobeRoute {
  from: LatLon
  to: LatLon
}

interface ArcGlobeProps {
  /** Routes to draw. Defaults to a set of links between major cities. */
  routes?: ArcGlobeRoute[]
  /** Longitude turned toward the viewer at the start, in degrees. */
  startLongitude?: number
  /** Auto-rotation speed in radians per second. */
  speed?: number
  /** How fast the pulses travel; 1 is the default pace. */
  pulseSpeed?: number
  /** Points sampled over the sphere; about a third land on continents and are drawn. */
  dots?: number
  /** Dot size in pixels. */
  dotSize?: number
  /** Start and end colors of each arc. Any CSS color three.js understands (hex, rgb, hsl). */
  arcColors?: [string, string]
  /** Color of the glow around the rim. */
  atmosphereColor?: string
  /** Accessible description of the graphic. */
  label?: string
  className?: string
}

const DEG = Math.PI / 180
const RADIUS = 1
/** One cycle of an arc: the pulse travels for 1, then the landing ring plays until 1.6. */
const CYCLE = 1.6

const CITY: Record<string, LatLon> = {
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
}

const DEFAULT_ROUTES: ArcGlobeRoute[] = [
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
].map(([from, to]) => ({ from: CITY[from!]!, to: CITY[to!]! }))

/** Latitude/longitude to a point on the sphere. */
function toVector([lat, lon]: LatLon, radius = RADIUS) {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

/** Evenly spread points (a Fibonacci sphere), kept only where the land mask says land. */
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
    const y = 1 - (i / (samples - 1)) * 2
    const lat = Math.asin(y) / DEG
    const lon = ((((i * golden) / DEG) % 360) + 360) % 360 - 180
    if (isLand(lat, lon)) positions.push(...toVector([lat, lon], RADIUS * 1.002).toArray())
  }
  return new Float32Array(positions)
}

/** A tube along the great circle between two points, lifted in the middle. */
function arcGeometry(route: ArcGlobeRoute) {
  const a = toVector(route.from).normalize()
  const b = toVector(route.to).normalize()
  const omega = Math.max(a.angleTo(b), 1e-4)
  const lift = 0.06 + omega * 0.13
  const points: Vector3[] = []
  for (let i = 0; i <= 48; i++) {
    const t = i / 48
    const p = a
      .clone()
      .multiplyScalar(Math.sin((1 - t) * omega) / Math.sin(omega))
      .add(b.clone().multiplyScalar(Math.sin(t * omega) / Math.sin(omega)))
    points.push(p.multiplyScalar(RADIUS + Math.sin(Math.PI * t) * lift))
  }
  return new TubeGeometry(new CatmullRomCurve3(points), 96, 0.0055, 6, false)
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
    float alpha = (1.0 - smoothstep(0.5, 1.0, d)) * (0.15 + 0.8 * vFacing);
    gl_FragColor = vec4(uColor, alpha);
  }
`
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
    float intensity = pow(max(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.6);
    gl_FragColor = vec4(uColor, clamp(intensity * 0.7, 0.0, 1.0));
  }
`
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
    float pulse = smoothstep(head - 0.38, head, vProgress) * step(vProgress, head);
    vec3 color = mix(uFrom, uTo, vProgress);
    gl_FragColor = vec4(color, clamp(0.16 + pulse, 0.0, 1.0));
  }
`

interface PendingRotation {
  x: number
  y: number
  dragging: boolean
}

interface SceneProps {
  routes: ArcGlobeRoute[]
  startLongitude: number
  speed: number
  pulseSpeed: number
  animate: boolean
  dots: number
  dotSize: number
  color: string
  arcColors: [string, string]
  atmosphereColor: string
  /** Returns (and clears) rotation gathered from drags and arrow keys since the last frame. */
  takeRotation: () => PendingRotation
}

function Scene({
  routes,
  startLongitude,
  speed,
  pulseSpeed,
  animate,
  dots,
  dotSize,
  color,
  arcColors,
  atmosphereColor,
  takeRotation,
}: SceneProps) {
  const gl = useThree((state) => state.gl)
  const spin = React.useRef<Group>(null)
  const time = React.useRef(animate ? 0 : 0.7)
  const arcMaterials = React.useRef<(ShaderMaterial | null)[]>([])
  const rings = React.useRef<(Mesh | null)[]>([])

  const positions = React.useMemo(() => landPoints(dots), [dots])
  const arcs = React.useMemo(
    () =>
      routes.map((route, i) => ({
        geometry: arcGeometry(route),
        end: toVector(route.to, RADIUS * 1.004),
        offset: (i * 0.37) % 1,
        speed: 0.22 + ((i * 7) % 5) * 0.03,
      })),
    [routes]
  )
  React.useEffect(() => () => arcs.forEach((arc) => arc.geometry.dispose()), [arcs])

  const dotUniforms = React.useMemo(
    () => ({ uSize: { value: dotSize * 3.1 * gl.getPixelRatio() }, uColor: { value: new Color(color) } }),
    [dotSize, color, gl]
  )
  const atmosphereUniforms = React.useMemo(() => ({ uColor: { value: new Color(atmosphereColor) } }), [atmosphereColor])
  const arcUniforms = React.useMemo(
    () =>
      arcs.map(() => ({
        uPhase: { value: 0 },
        uFrom: { value: new Color(arcColors[0]) },
        uTo: { value: new Color(arcColors[1]) },
      })),
    [arcs, arcColors]
  )

  const startY = React.useMemo(() => {
    const theta = (startLongitude + 180) * DEG
    return -Math.atan2(-Math.cos(theta), Math.sin(theta))
  }, [startLongitude])
  const rotation = React.useRef({ y: 0, x: 0 })

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05)
    const pending = takeRotation()
    if (animate) time.current += step * pulseSpeed
    if (animate && !pending.dragging) rotation.current.y += speed * step
    rotation.current.y += pending.y
    rotation.current.x = Math.max(-0.6, Math.min(0.6, rotation.current.x + pending.x))
    if (spin.current) {
      spin.current.rotation.y = startY + rotation.current.y
      spin.current.rotation.x = rotation.current.x
    }
    arcs.forEach((arc, i) => {
      const phase = ((((time.current * arc.speed + arc.offset) % 1) + 1) % 1) * CYCLE
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
        {/* Writes depth only, hiding the far side while the page shows through. */}
        <mesh renderOrder={-1}>
          <sphereGeometry args={[RADIUS * 0.996, 64, 64]} />
          <meshBasicMaterial colorWrite={false} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <shaderMaterial vertexShader={dotVertex} fragmentShader={dotFragment} uniforms={dotUniforms} transparent depthWrite={false} />
        </points>
        {arcs.map((arc, i) => (
          <React.Fragment key={i}>
            <mesh geometry={arc.geometry}>
              <shaderMaterial
                ref={(material) => {
                  arcMaterials.current[i] = material
                }}
                vertexShader={arcVertex}
                fragmentShader={arcFragment}
                uniforms={arcUniforms[i]}
                transparent
                depthWrite={false}
              />
            </mesh>
            <mesh position={arc.end}>
              <sphereGeometry args={[0.012, 12, 12]} />
              <meshBasicMaterial color={arcColors[1]} />
            </mesh>
            <mesh
              ref={(mesh) => {
                rings.current[i] = mesh
                // Lie flat on the surface: turn the ring's +z toward the surface normal.
                mesh?.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), arc.end.clone().normalize())
              }}
              position={arc.end}
              visible={false}
            >
              <ringGeometry args={[0.014, 0.022, 32]} />
              <meshBasicMaterial color={arcColors[1]} transparent depthWrite={false} side={DoubleSide} />
            </mesh>
          </React.Fragment>
        ))}
      </group>
      <mesh scale={1.16}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          side={BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/**
 * A dotted Earth with glowing routes between places. A pulse travels along
 * each arc and ripples where it lands. Continents are drawn from Natural
 * Earth land data in the CSS text color, so the globe follows your theme.
 * Drag it, or focus it and use the arrow keys, to turn it. Rendering pauses
 * off screen; with reduced motion it only moves when you turn it.
 */
function ArcGlobe({
  routes = DEFAULT_ROUTES,
  startLongitude = 20,
  speed = 0.07,
  pulseSpeed = 1,
  dots = 16000,
  dotSize = 2.4,
  arcColors = ["#a78bfa", "#22d3ee"],
  atmosphereColor = "#6d5dfc",
  label = "Globe with routes between cities",
  className,
}: ArcGlobeProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { color, active, reducedMotion } = useSceneState(ref)
  const drag = React.useRef({ active: false, x: 0, y: 0, pendingX: 0, pendingY: 0 })
  const [interacting, setInteracting] = React.useState(false)

  // Rebuild routes only when their values change, not on every new array.
  const routesKey = JSON.stringify(routes)
  const stableRoutes = React.useMemo(() => JSON.parse(routesKey) as ArcGlobeRoute[], [routesKey])
  const [arcFrom, arcTo] = arcColors
  const stableArcColors = React.useMemo<[string, string]>(() => [arcFrom, arcTo], [arcFrom, arcTo])

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
      data-slot="arc-globe"
      className={cn(
        "relative aspect-square w-full cursor-grab rounded-full text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing",
        className
      )}
      // Vertical swipes still scroll the page on touch screens; horizontal ones turn the globe.
      style={{ touchAction: "pan-y" }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        drag.current.active = true
        drag.current.x = event.clientX
        drag.current.y = event.clientY
        setInteracting(true)
      }}
      onPointerMove={(event) => {
        if (!drag.current.active) return
        nudge((event.clientX - drag.current.x) * 0.006, (event.clientY - drag.current.y) * 0.004)
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
        camera={{ position: [0, 0, 3.1], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={active || interacting ? "always" : "demand"}
        fallback={<p className="p-4 text-sm text-muted-foreground">3D graphics are not available in this browser.</p>}
      >
        <Scene
          routes={stableRoutes}
          startLongitude={startLongitude}
          speed={speed}
          pulseSpeed={pulseSpeed}
          animate={!reducedMotion}
          dots={dots}
          dotSize={dotSize}
          color={color}
          arcColors={stableArcColors}
          atmosphereColor={atmosphereColor}
          takeRotation={takeRotation}
        />
      </Canvas>
    </div>
  )
}

export { ArcGlobe, type ArcGlobeProps, type ArcGlobeRoute }
