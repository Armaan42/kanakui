"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

interface ZoetropeProps extends React.ComponentProps<"div"> {
  /** Starting speed in turns per minute. */
  defaultSpeed?: number
}

const FRAMES = 12

/** One frame of a bouncing ball: high in the middle of the cycle, squashed on the ground. */
function Frame({ index }: { index: number }) {
  const t = index / FRAMES
  const height = Math.sin(Math.PI * t)
  const speed = Math.abs(Math.cos(Math.PI * t))
  const onGround = index === 0
  const rx = onGround ? 8.5 : 6 - speed * 1
  const ry = onGround ? 4.2 : 6 + speed * 1.8
  const cy = 54 - ry - height * 38
  return (
    <svg viewBox="0 0 40 60" className="size-full">
      <rect width="40" height="60" fill="#fef3c7" />
      <line x1="2" y1="54.5" x2="38" y2="54.5" stroke="#78350f" strokeWidth="1.2" />
      <ellipse cx="20" cy="55.5" rx={7 - height * 3.5} ry="1.4" fill="rgb(0 0 0 / 0.25)" />
      <ellipse cx="20" cy={cy} rx={rx} ry={ry} fill="#dc2626" />
      <ellipse cx={18} cy={cy - ry * 0.35} rx={rx * 0.3} ry={ry * 0.25} fill="rgb(255 255 255 / 0.6)" />
    </svg>
  )
}

/**
 * A zoetrope: a slotted drum with twelve drawings inside. Spin it and look
 * through the slits; the peephole shows what your eye would see, the
 * drawings blurring into a bouncing ball.
 */
function Zoetrope({ defaultSpeed = 40, className, ...props }: ZoetropeProps) {
  const [speed, setSpeed] = React.useState(defaultSpeed)
  const [spinning, setSpinning] = React.useState(true)
  const [frame, setFrame] = React.useState(0)
  const ring = React.useRef<HTMLDivElement>(null)
  const angle = React.useRef(0)
  const speedRef = React.useRef(speed)
  const id = React.useId()

  React.useEffect(() => {
    speedRef.current = speed
  }, [speed])

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setSpinning(false)
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  React.useEffect(() => {
    if (!spinning) return
    let frameId = 0
    let last = performance.now()
    let shown = -1
    const step = (now: number) => {
      angle.current = (angle.current + ((now - last) / 60000) * speedRef.current * 360) % 360
      last = now
      if (ring.current) ring.current.style.transform = `rotateX(-24deg) rotateY(${-angle.current}deg)`
      const current = Math.floor((angle.current / 360) * FRAMES) % FRAMES
      if (current !== shown) {
        shown = current
        setFrame(current)
      }
      frameId = requestAnimationFrame(step)
    }
    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [spinning])

  return (
    <div data-slot="zoetrope" className={cn("flex w-80 max-w-full flex-col items-center gap-5", className)} {...props}>
      {/* The drum. */}
      <div aria-hidden="true" className="relative h-44 w-full [perspective:900px]">
        <div ref={ring} className="absolute top-6 left-1/2 h-24 w-0 [transform-style:preserve-3d]" style={{ transform: "rotateX(-24deg) rotateY(0deg)" }}>
          {Array.from({ length: FRAMES }, (_, i) => (
            <div key={i} className="absolute -left-[27px] h-24 w-[54px] [transform-style:preserve-3d]" style={{ transform: `rotateY(${(i * 360) / FRAMES}deg) translateZ(112px)` }}>
              {/* Outside of the drum: a dark card. The gaps between the cards are the slits. */}
              <div className="absolute inset-0 bg-linear-to-b from-neutral-800 to-neutral-950 [backface-visibility:hidden]">
                <span className="absolute top-1 left-1/2 h-9 w-1 -translate-x-1/2 rounded-full bg-black" />
              </div>
              {/* Inside: the drawing, seen through the slits across the drum. */}
              <div className="absolute inset-0 bg-[#fef3c7] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <Frame index={i} />
              </div>
            </div>
          ))}
        </div>
        <span className="absolute bottom-2 left-1/2 h-4 w-3 -translate-x-1/2 bg-neutral-500" />
        <span className="absolute bottom-0 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-neutral-700" />
      </div>

      <div className="flex w-full items-center gap-4">
        {/* The peephole. */}
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-neutral-900 p-2 shadow-[inset_0_0_0_4px_#404040]">
          <div className="size-full overflow-hidden rounded-full" role="img" aria-label={spinning ? "A ball bouncing, seen through the slits" : `Drawing ${frame + 1} of ${FRAMES}`}>
            <Frame index={frame} />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor={id} className="flex justify-between text-sm">
            <span>Speed</span>
            <span className="font-mono tabular-nums text-muted-foreground">{speed} rpm</span>
          </label>
          <input id={id} type="range" min={5} max={60} value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="mt-1.5 w-full accent-amber-700" />
          <button
            type="button"
            aria-pressed={spinning}
            onClick={() => setSpinning(!spinning)}
            className="mt-2 inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {spinning ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
            Spin
          </button>
        </div>
      </div>
    </div>
  )
}

export { Zoetrope }
