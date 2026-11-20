"use client"

import * as React from "react"
import { Droplets, RotateCcw, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

interface GrowingPlantProps extends React.ComponentProps<"div"> {
  /** Petal colour of the flower. */
  bloom?: string
  onBloom?: () => void
}

const STAGES = ["A seed in the soil", "A sprout", "A seedling", "A young plant", "In bud", "In flower"]

/** A leaf pair at a height on the stem, popping out as the plant grows. */
function Leaves({ y, size, flip = false }: { y: number; size: number; flip?: boolean }) {
  return (
    <g className="animate-growing-plant-pop motion-reduce:animate-none" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <path d={`M100 ${y} C${100 - size} ${y - size * 0.2} ${100 - size * 1.2} ${y - size * 0.9} ${100 - size * 0.2} ${y - size * 0.7} C${100 - size * 0.1} ${y - size * 0.5} 100 ${y - size * 0.3} 100 ${y}Z`} fill="#6b9564" transform={flip ? `translate(0 -6)` : undefined} />
      <path d={`M100 ${y} C${100 + size} ${y - size * 0.2} ${100 + size * 1.2} ${y - size * 0.9} ${100 + size * 0.2} ${y - size * 0.7} C${100 + size * 0.1} ${y - size * 0.5} 100 ${y - size * 0.3} 100 ${y}Z`} fill="#4d7449" transform={flip ? undefined : `translate(0 -6)`} />
    </g>
  )
}

/**
 * A potted plant you grow by looking after it: give it light and water it
 * when the soil is dry, and it grows from seed to flower. Water a wet pot and
 * it gets soggy instead.
 */
function GrowingPlant({ bloom = "#d98c7a", onBloom, className, ...props }: GrowingPlantProps) {
  const [stage, setStage] = React.useState(0)
  const [moisture, setMoisture] = React.useState(0.2)
  const [sunny, setSunny] = React.useState(true)
  const [watering, setWatering] = React.useState(0)
  const [note, setNote] = React.useState("The soil is dry.")
  const moistureRef = React.useRef(0.2)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  // The soil dries out over time.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      moistureRef.current = Math.max(0, moistureRef.current - 0.06)
      setMoisture(moistureRef.current)
    }, 1500)
    return () => window.clearInterval(id)
  }, [])

  const water = () => {
    const wasWet = moistureRef.current > 0.65
    moistureRef.current = Math.min(1, moistureRef.current + 0.6)
    setMoisture(moistureRef.current)
    setWatering((count) => count + 1)
    if (stage === STAGES.length - 1) return setNote("It's in full flower. Keep it watered.")
    if (wasWet) return setNote("The soil is soggy. Let it dry out before watering again.")
    if (!sunny) return setNote("It's drinking, but it needs light to grow.")
    setNote("Drinking it up…")
    timers.current.push(
      window.setTimeout(() => {
        setStage((current) => Math.min(STAGES.length - 1, current + 1))
        setNote(stage + 1 === STAGES.length - 1 ? "It flowered!" : "It grew. Let the soil dry a little, then water again.")
        if (stage + 1 === STAGES.length - 1) onBloom?.()
      }, 1100)
    )
  }

  const soil = `color-mix(in oklab, #7c4a24 ${100 - moisture * 55}%, #2b1609)`
  const stemTop = [228, 214, 186, 158, 140, 128][stage]

  return (
    <div data-slot="growing-plant" className={cn("flex w-72 max-w-full flex-col items-center gap-4", className)} {...props}>
      <div className={cn("relative w-full overflow-hidden rounded-3xl transition-colors duration-700", sunny ? "bg-linear-to-b from-[#efe7d8] to-[#e2d6c2] dark:from-[#3b3833] dark:to-[#2b2824]" : "bg-linear-to-b from-[#4b4e57] to-[#363841]")}>
        {/* Window light falling across the wall. */}
        <span aria-hidden="true" className={cn("absolute -top-6 right-0 h-48 w-40 skew-x-[-18deg] bg-[linear-gradient(90deg,rgb(255_244_214/0.85),rgb(255_244_214/0)_85%)] blur-[2px] transition-opacity duration-700", !sunny && "opacity-0")} />
        <svg viewBox="0 60 200 240" className="relative w-full" role="img" aria-label={`${STAGES[stage]}. Soil is ${moisture > 0.65 ? "wet" : moisture > 0.25 ? "damp" : "dry"}.`}>
          {/* Watering can and drops. */}
          {watering > 0 ? (
            <g key={watering} className="animate-growing-plant-can motion-reduce:hidden" style={{ transformBox: "fill-box", transformOrigin: "100% 100%" }}>
              <path d="M150 70 h30 v26 h-30 z" fill="#64748b" />
              <path d="M150 76 L118 92 L120 96 L150 86 Z" fill="#475569" />
              {[0, 1, 2, 3].map((i) => (
                <circle key={i} cx={114 - i * 4} cy={104} r="2.2" fill="#8fb6cf" className="animate-growing-plant-drop" style={{ animationDelay: `${0.3 + i * 0.12}s` }} />
              ))}
            </g>
          ) : null}
          {/* Plant. */}
          {stage === 0 ? <ellipse cx="100" cy="230" rx="5" ry="3.5" fill="#8a6a3a" /> : <path d={`M100 232 L100 ${stemTop}`} stroke="#4d6e45" strokeWidth="4" strokeLinecap="round" className="transition-[d] duration-700" />}
          {stage >= 1 ? <Leaves y={stage === 1 ? 216 : 214} size={stage === 1 ? 12 : 14} /> : null}
          {stage >= 2 ? <Leaves key="l2" y={194} size={22} flip /> : null}
          {stage >= 3 ? <Leaves key="l3" y={170} size={26} /> : null}
          {stage === 4 ? <ellipse cx="100" cy={stemTop - 6} rx="7" ry="10" fill="#6f8f4a" className="animate-growing-plant-pop" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} /> : null}
          {stage === 5 ? (
            <g className="animate-growing-plant-pop motion-reduce:animate-none" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              {Array.from({ length: 8 }, (_, i) => (
                <ellipse key={i} cx="100" cy={stemTop - 18} rx="7" ry="15" fill={bloom} transform={`rotate(${i * 45} 100 ${stemTop - 4})`} />
              ))}
              <circle cx="100" cy={stemTop - 4} r="8" fill="#e2b85a" />
            </g>
          ) : null}
          {/* Pot. */}
          <path d="M58 228 H142 L132 292 H68 Z" fill="#b0603c" />
          <path d="M100 228 H142 L132 292 H100 Z" fill="rgb(0 0 0 / 0.1)" />
          <rect x="52" y="220" width="96" height="14" rx="3" fill="#c06e48" />
          <ellipse cx="100" cy="222" rx="44" ry="5" fill={soil} className="transition-[fill] duration-700" />
        </svg>
      </div>

      {/* Soil moisture. */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Soil moisture</span>
          <span>{moisture > 0.65 ? "Wet" : moisture > 0.25 ? "Damp" : "Dry"}</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className={cn("h-full rounded-full transition-[width] duration-700", moisture > 0.65 ? "bg-[#3f6e8f]" : "bg-[#7ea3bd]")} style={{ width: `${moisture * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={water} className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50">
          <Droplets aria-hidden="true" className="size-4" />
          Water
        </button>
        <button
          type="button"
          aria-pressed={sunny}
          onClick={() => setSunny(!sunny)}
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm shadow-xs outline-none hover:bg-muted aria-pressed:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Sun aria-hidden="true" className="size-4" />
          Sunlight
        </button>
        {stage > 0 ? (
          <button
            type="button"
            aria-label="Start again"
            onClick={() => {
              setStage(0)
              setNote("A fresh seed. The soil is dry.")
            }}
            className="grid size-9 place-items-center rounded-md border bg-background text-muted-foreground shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
      <p role="status" className="text-center text-sm">
        <span className="font-medium">{STAGES[stage]}.</span> {note}
      </p>
    </div>
  )
}

export { GrowingPlant }
