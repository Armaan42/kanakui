"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InstantPhoto {
  src: string
  alt: string
  caption?: string
}

interface InstantCameraProps extends React.ComponentProps<"div"> {
  /** Photos the camera "takes", in order. They repeat if the film outlasts them. */
  photos: InstantPhoto[]
  /** Exposures in a pack of film. */
  film?: number
  /** Photos already taken when it first appears. */
  defaultTaken?: number
  onCapture?: (photo: InstantPhoto, remaining: number) => void
}

const TILTS = [-3, 2, -1.5, 3.5]

/**
 * An instant camera. Press the red button: the flash fires, a print slides
 * out of the slot and slowly develops. When the film runs out, reload it.
 */
function InstantCamera({ photos, film = 8, defaultTaken = 0, onCapture, className, ...props }: InstantCameraProps) {
  const [taken, setTaken] = React.useState(defaultTaken)
  const [shots, setShots] = React.useState(defaultTaken)
  const [flash, setFlash] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const remaining = film - shots
  const latest = taken > 0 ? photos[(taken - 1) % photos.length] : null
  const previous = taken > 1 ? photos[(taken - 2) % photos.length] : null

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const shoot = () => {
    if (remaining <= 0) return
    const photo = photos[taken % photos.length]
    setTaken(taken + 1)
    setShots(shots + 1)
    setFlash(true)
    onCapture?.(photo, remaining - 1)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFlash(false), 140)
  }

  return (
    <div data-slot="instant-camera" className={cn("flex w-72 max-w-full flex-col items-center", className)} {...props}>
      <div className="relative w-full pb-[17rem]">
        {/* Prints slide out of the slot at the bottom of the body. */}
        <div className="absolute -inset-x-4 top-[12.75rem] bottom-0 flex justify-center overflow-hidden">
          {previous ? <Print key={`p${taken}`} photo={previous} tilt={TILTS[taken % TILTS.length]} settled /> : null}
          {latest ? <Print key={taken} photo={latest} tilt={TILTS[(taken + 1) % TILTS.length]} /> : null}
        </div>

        <div className="relative z-10 h-52 overflow-hidden rounded-[1.75rem] bg-linear-to-b from-stone-100 to-stone-300 shadow-[0_18px_28px_-16px_rgb(0_0_0/0.65),inset_0_2px_0_white] ring-1 ring-black/10">
          <div aria-hidden="true" className="absolute inset-x-0 top-[62%] flex h-3 flex-col">
            <span className="flex-1 bg-amber-500" />
            <span className="flex-1 bg-teal-700" />
          </div>
          <span aria-hidden="true" className={cn("absolute top-4 left-5 h-9 w-16 rounded-md border border-stone-400 transition-colors duration-100", flash ? "bg-white shadow-[0_0_34px_14px_white]" : "bg-[repeating-linear-gradient(90deg,#e7e5e4_0_3px,#fafaf9_3px_6px)]")} />
          <span aria-hidden="true" className="absolute top-4 right-5 size-9 rounded-md bg-[radial-gradient(circle_at_35%_30%,#475569,#020617_70%)] ring-2 ring-stone-400" />
          <span aria-hidden="true" className="absolute top-7 left-1/2 grid size-32 -translate-x-1/2 place-items-center rounded-full bg-linear-145 from-stone-700 to-black shadow-[0_5px_10px_rgb(0_0_0/0.4)] ring-4 ring-stone-200">
            <span className="grid size-20 place-items-center rounded-full bg-neutral-950 ring-1 ring-stone-600">
              <span className="relative size-12 rounded-full bg-[radial-gradient(circle_at_38%_32%,#7c6fd6,#123a4c_46%,#020617_74%)]">
                <span className="absolute top-2 left-3 h-1.5 w-3 -rotate-30 rounded-full bg-white/50" />
              </span>
            </span>
          </span>
          <p aria-live="polite" className="absolute right-4 bottom-3 rounded-sm bg-stone-800 px-1.5 py-0.5 font-mono text-[10px] text-amber-300 tabular-nums">
            <span className="sr-only">Film left: </span>
            {remaining}
          </p>
          <button
            type="button"
            onClick={shoot}
            disabled={remaining <= 0}
            aria-label="Take a photo"
            className="absolute bottom-3 left-4 size-11 rounded-full bg-linear-to-b from-red-500 to-red-700 shadow-[0_3px_0_#7f1d1d,0_5px_6px_rgb(0_0_0/0.3)] outline-none transition-[transform,box-shadow] duration-75 active:translate-y-[3px] active:shadow-[0_0_0_#7f1d1d] focus-visible:ring-3 focus-visible:ring-blue-600/60 disabled:from-stone-400 disabled:to-stone-500 disabled:shadow-[0_3px_0_#57534e] motion-reduce:transition-none"
          />
          <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-1.5 rounded-t-sm bg-stone-800" />
        </div>
      </div>

      {remaining <= 0 ? (
        <button
          type="button"
          onClick={() => setShots(0)}
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Load new film
        </button>
      ) : null}
    </div>
  )
}

function Print({ photo, tilt, settled = false }: { photo: InstantPhoto; tilt: number; settled?: boolean }) {
  return (
    <figure
      style={{ "--tilt": `${tilt}deg`, rotate: `${settled ? tilt * 2 : tilt}deg` } as React.CSSProperties}
      className={cn("absolute top-3 w-52 bg-[#fdfcf8] p-2.5 pb-3 text-neutral-700 shadow-[0_6px_12px_-6px_rgb(0_0_0/0.45)] ring-1 ring-black/5", settled ? "opacity-90" : "animate-instant-camera-eject motion-reduce:animate-none")}
    >
      <img src={photo.src} alt={photo.alt} draggable={false} className={cn("aspect-square w-full bg-neutral-800 object-cover", !settled && "animate-instant-camera-develop motion-reduce:animate-none")} />
      <figcaption className="mt-2 min-h-4 truncate text-center font-serif text-xs italic">{photo.caption}</figcaption>
    </figure>
  )
}

export { InstantCamera }
