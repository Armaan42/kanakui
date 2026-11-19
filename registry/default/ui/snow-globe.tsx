"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SnowGlobeProps extends React.ComponentProps<"div"> {
  src: string
  alt: string
  /** Engraved on the base. */
  label?: string
  flakes?: number
}

interface Flake {
  x: number
  size: number
  duration: number
  delay: number
  drift: number
}

/** A flake layout that's the same on the server and the first client render. */
const settled = (count: number): Flake[] =>
  Array.from({ length: count }, (_, i) => ({ x: (i * 37) % 100, size: 2 + (i % 3), duration: 7 + (i % 5), delay: -((i * 0.7) % 7), drift: ((i % 7) - 3) * 4 }))

/**
 * A snow globe. A gentle snow always falls; press it (or the Shake button) to
 * shake it and send a flurry swirling round the scene.
 */
function SnowGlobe({ src, alt, label = "Greetings", flakes = 40, className, ...props }: SnowGlobeProps) {
  const [snow, setSnow] = React.useState(() => settled(flakes))
  const [shakes, setShakes] = React.useState(0)

  const shake = () => {
    setShakes((value) => value + 1)
    setSnow(
      Array.from({ length: flakes * 2 }, () => ({
        x: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 3 + Math.random() * 4,
        delay: -Math.random() * 1.5,
        drift: (Math.random() - 0.5) * 60,
      }))
    )
  }

  return (
    <div data-slot="snow-globe" className={cn("flex w-64 max-w-full flex-col items-center", className)} {...props}>
      <button
        type="button"
        onClick={shake}
        aria-label={`${alt}. Press to shake the snow globe.`}
        key={shakes}
        className={cn("relative aspect-square w-full rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/60", shakes > 0 && "animate-snow-globe-shake motion-reduce:animate-none")}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full shadow-[inset_0_-12px_30px_rgb(255_255_255/0.35),inset_0_0_0_3px_rgb(255_255_255/0.5),0_14px_30px_-10px_rgb(0_0_0/0.45)]">
          <img src={src} alt="" className="size-full scale-110 object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-sky-200/10 to-sky-900/20" />
          {snow.map((flake, i) => (
            <span
              key={`${shakes}-${i}`}
              aria-hidden="true"
              className="animate-snow-globe-fall absolute -top-2 rounded-full bg-white/90 motion-reduce:animate-none"
              style={{ left: `${flake.x}%`, width: flake.size, height: flake.size, animationDuration: `${flake.duration}s`, animationDelay: `${flake.delay}s`, "--drift": `${flake.drift}px` } as React.CSSProperties}
            />
          ))}
          <span aria-hidden="true" className="absolute top-[8%] left-[16%] h-1/4 w-1/5 -rotate-30 rounded-full bg-white/35 blur-sm" />
        </span>
      </button>
      <div className="-mt-6 h-16 w-[70%] rounded-b-[2rem] rounded-t-md bg-linear-to-b from-amber-800 to-amber-950 shadow-lg">
        <p className="pt-7 text-center font-serif text-xs tracking-[0.2em] text-amber-100/90 uppercase">{label}</p>
      </div>
      <button type="button" onClick={shake} className="mt-3 rounded-md px-3 py-1.5 text-sm text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
        Shake
      </button>
    </div>
  )
}

export { SnowGlobe }
