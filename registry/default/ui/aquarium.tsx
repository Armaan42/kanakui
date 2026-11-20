"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

interface AquariumProps extends React.ComponentProps<"div"> {
  /** Fish colours, one fish each. */
  fish?: string[]
}

type Fish = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; color: string; size: number }
type Flake = { id: number; x: number; y: number }

const W = 400
const H = 260
const SAND = 232
const COLORS = ["#e8742c", "#e9c46a", "#7fb3c8", "#d97b6c", "#cfd8c6"]

/** Where the fish start: spread across the tank, the same every time. */
const makeFish = (colors: string[]): Fish[] =>
  colors.map((color, i) => ({ x: 60 + i * 70, y: 70 + ((i * 53) % 120), vx: i % 2 ? 0.6 : -0.6, vy: 0, tx: 60 + i * 70, ty: 90, color, size: 0.8 + ((i * 7) % 4) * 0.12 }))

/**
 * A little aquarium. The fish wander about; click the water (or press Feed)
 * to drop food, and they race to eat it. Switch the light off for the night.
 */
function Aquarium({ fish: colors = COLORS, className, ...props }: AquariumProps) {
  const school = React.useRef<Fish[] | null>(null)
  const flakes = React.useRef<Flake[]>([])
  const [scene, setScene] = React.useState(() => ({ fish: makeFish(colors), flakes: [] as Flake[] }))
  const colorsRef = React.useRef(colors)
  const [day, setDay] = React.useState(true)
  const [eaten, setEaten] = React.useState(0)
  const nextFlake = React.useRef(0)
  const dayRef = React.useRef(day)
  const svg = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    dayRef.current = day
    colorsRef.current = colors
  }, [day, colors])

  React.useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    school.current ??= makeFish(colorsRef.current)
    let frame = 0
    let last = performance.now()
    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.7, 3)
      last = now
      const pace = dayRef.current ? 1 : 0.4
      // Food sinks slowly to the sand.
      flakes.current = flakes.current.map((flake) => ({ ...flake, y: Math.min(SAND - 4, flake.y + 0.35 * dt), x: flake.x + Math.sin((now / 400 + flake.id) % 6.28) * 0.15 }))
      let ate = 0
      school.current = school.current!.map((fish) => {
        const food = flakes.current.reduce<Flake | null>((best, flake) => (!best || Math.hypot(flake.x - fish.x, flake.y - fish.y) < Math.hypot(best.x - fish.x, best.y - fish.y) ? flake : best), null)
        let { tx, ty } = fish
        if (food) {
          tx = food.x
          ty = food.y
        } else if (Math.hypot(tx - fish.x, ty - fish.y) < 12 || Math.random() < 0.002) {
          tx = 30 + Math.random() * (W - 60)
          ty = 30 + Math.random() * (SAND - 70)
        }
        const speed = (food ? 0.09 : 0.025) * pace
        let vx = (fish.vx + (tx - fish.x) * speed * 0.02 * dt) * 0.97
        let vy = (fish.vy + (ty - fish.y) * speed * 0.02 * dt) * 0.95
        const limit = (food ? 2.6 : 1.1) * pace
        const v = Math.hypot(vx, vy)
        if (v > limit) {
          vx = (vx / v) * limit
          vy = (vy / v) * limit
        }
        if (still && !food) {
          vx *= 0.8
          vy *= 0.8
        }
        const x = Math.min(W - 20, Math.max(20, fish.x + vx * dt))
        const y = Math.min(SAND - 14, Math.max(16, fish.y + vy * dt))
        if (food && Math.hypot(food.x - x, food.y - y) < 10) {
          flakes.current = flakes.current.filter((flake) => flake.id !== food.id)
          ate += 1
        }
        return { ...fish, x, y, vx, vy, tx, ty }
      })
      if (ate) setEaten((count) => count + ate)
      setScene({ fish: school.current, flakes: flakes.current })
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const sprinkle = (x: number, count: number) => {
    for (let i = 0; i < count; i++) {
      nextFlake.current += 1
      flakes.current.push({ id: nextFlake.current, x: Math.min(W - 10, Math.max(10, x + (Math.random() - 0.5) * 40)), y: 8 + Math.random() * 6 })
    }
  }

  return (
    <div data-slot="aquarium" className={cn("flex w-full max-w-xl flex-col gap-3", className)} {...props}>
      <div className="rounded-2xl bg-neutral-800 p-2 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.8)]">
        <svg
          ref={svg}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Aquarium with ${colors.length} fish. ${scene.flakes.length ? `${scene.flakes.length} flakes of food in the water.` : ""} Click the water to feed them.`}
          onClick={(event) => {
            const box = svg.current!.getBoundingClientRect()
            sprinkle(((event.clientX - box.left) / box.width) * W, 4)
          }}
          className="block w-full cursor-pointer rounded-xl"
        >
          <defs>
            <linearGradient id="aquarium-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={day ? "#9cc7c4" : "#1d3340"} />
              <stop offset="1" stopColor={day ? "#2f6b72" : "#0a161c"} />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#aquarium-water)" className="transition-[fill] duration-700" />
          {/* Light rays. */}
          {day ? (
            <g fill="rgb(255 255 255 / 0.07)">
              <path d="M60 0 L110 0 L60 230 L0 230 Z" />
              <path d="M200 0 L240 0 L230 230 L170 230 Z" />
              <path d="M320 0 L350 0 L390 230 L340 230 Z" />
            </g>
          ) : null}
          {/* Sand, rock and weed. */}
          <path d={`M0 ${SAND} C80 ${SAND - 10} 160 ${SAND + 6} 240 ${SAND - 4} S360 ${SAND - 8} 400 ${SAND} V${H} H0 Z`} fill="#d6c08f" />
          <path d="M280 238 C285 214 320 206 338 220 C350 230 346 240 340 242 Z" fill="#6b6f6a" />
          {[40, 58, 350, 372].map((x, i) => (
            <path
              key={x}
              d={`M${x} ${SAND + 2} C${x - 10} ${SAND - 40} ${x + 12} ${SAND - 70} ${x - 2} ${SAND - 110 + i * 12}`}
              fill="none"
              stroke={i % 2 ? "#3f6b3a" : "#557f46"}
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-aquarium-sway motion-reduce:animate-none"
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%", animationDelay: `${-i * 0.7}s` }}
            />
          ))}
          {/* Bubbles from the air stone. */}
          <rect x="196" y={SAND - 6} width="16" height="6" rx="2" fill="#475569" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={204 + (i % 2 ? 3 : -3)}
              cy={SAND - 10}
              r={2 + (i % 3)}
              fill="none"
              stroke="rgb(255 255 255 / 0.7)"
              className="animate-aquarium-bubble motion-reduce:hidden"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
          {scene.flakes.map((flake) => (
            <rect key={flake.id} x={flake.x - 1.5} y={flake.y - 1} width="3" height="2" fill="#b45309" />
          ))}
          {scene.fish.map((fish, i) => (
            <g key={i} transform={`translate(${fish.x} ${fish.y}) scale(${fish.vx < 0 ? -fish.size : fish.size} ${fish.size})`}>
              <path d="M-12 0 L-22 -8 L-20 0 L-22 8 Z" fill={fish.color} opacity="0.85" />
              <ellipse rx="14" ry="8" fill={fish.color} />
              <path d="M-2 -7 Q2 -13 6 -6" fill={fish.color} opacity="0.85" />
              <circle cx="7" cy="-2" r="2" fill="#fff" />
              <circle cx="7.6" cy="-2" r="1" fill="#0f172a" />
            </g>
          ))}
          {!day ? <rect width={W} height={H} fill="rgb(2 6 23 / 0.35)" pointerEvents="none" /> : null}
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => sprinkle(W / 2 + (Math.random() - 0.5) * 200, 6)}
          className="h-9 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Feed
        </button>
        <button
          type="button"
          aria-pressed={!day}
          onClick={() => setDay(!day)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {day ? <Moon aria-hidden="true" className="size-3.5" /> : <Sun aria-hidden="true" className="size-3.5" />}
          Night light
        </button>
        <p role="status" className="ml-auto text-sm text-muted-foreground">
          {eaten ? `${eaten} ${eaten === 1 ? "flake" : "flakes"} eaten` : "Hungry fish"}
        </p>
      </div>
    </div>
  )
}

export { Aquarium }
