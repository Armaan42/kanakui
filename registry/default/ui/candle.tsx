"use client"

import * as React from "react"
import { Flame, Mic, Wind } from "lucide-react"

import { cn } from "@/lib/utils"

interface CandleProps extends React.ComponentProps<"div"> {
  /** Minutes it takes to burn all the way down. */
  burnMinutes?: number
  /** Offer to blow it out through the microphone. */
  microphone?: boolean
}

/**
 * A candle. The flame flickers and leans away from your pointer; blow it out
 * (with the button, or by really blowing into the microphone) and a wisp of
 * smoke curls up. It slowly burns down while it's lit.
 */
function Candle({ burnMinutes = 10, microphone = true, className, ...props }: CandleProps) {
  const [lit, setLit] = React.useState(true)
  const [left, setLeft] = React.useState(100)
  const [lean, setLean] = React.useState(0)
  const [smoke, setSmoke] = React.useState(0)
  const [listening, setListening] = React.useState(false)
  const stream = React.useRef<{ stop: () => void } | null>(null)
  const litRef = React.useRef(lit)
  const leftRef = React.useRef(100)

  React.useEffect(() => {
    litRef.current = lit
  }, [lit])

  const blowOut = React.useCallback(() => {
    if (!litRef.current) return
    litRef.current = false
    setLit(false)
    setSmoke((count) => count + 1)
  }, [])

  // Burn down a little at a time while lit, and go out at the bottom.
  React.useEffect(() => {
    if (!lit) return
    const id = window.setInterval(() => {
      const next = Math.max(8, leftRef.current - 100 / (burnMinutes * 60))
      leftRef.current = next
      setLeft(next)
      if (next <= 8) blowOut()
    }, 1000)
    return () => window.clearInterval(id)
  }, [lit, burnMinutes, blowOut])

  React.useEffect(() => () => stream.current?.stop(), [])

  const listen = async () => {
    if (listening) {
      stream.current?.stop()
      stream.current = null
      setListening(false)
      return
    }
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      ctx.createMediaStreamSource(media).connect(analyser)
      const data = new Uint8Array(analyser.fftSize)
      let frame = 0
      let loud = 0
      const check = () => {
        analyser.getByteTimeDomainData(data)
        const level = Math.sqrt(data.reduce((sum, value) => sum + ((value - 128) / 128) ** 2, 0) / data.length)
        // A breath is a sustained rush of noise, not a single click.
        loud = level > 0.18 ? loud + 1 : 0
        if (loud > 6) blowOut()
        frame = requestAnimationFrame(check)
      }
      check()
      stream.current = {
        stop: () => {
          cancelAnimationFrame(frame)
          media.getTracks().forEach((track) => track.stop())
          void ctx.close()
        },
      }
      setListening(true)
    } catch {
      setListening(false)
    }
  }

  const height = 40 + left * 1.6

  return (
    <div data-slot="candle" className={cn("flex w-64 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div
        className="relative flex h-80 w-full items-end justify-center overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_50%_100%,#292524,#0c0a09_70%)]"
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect()
          const x = (event.clientX - box.left) / box.width - 0.5
          // The flame bends away from the pointer, more when it's close.
          setLean(-Math.sign(x) * Math.max(0, 0.5 - Math.abs(x)) * 24)
        }}
        onPointerLeave={() => setLean(0)}
      >
        <span aria-hidden="true" className="absolute inset-0 transition-opacity duration-700" style={{ opacity: lit ? 1 : 0, background: `radial-gradient(circle at 50% ${100 - (height + 50) / 3.2}%, rgb(255 170 60 / 0.35), transparent 55%)` }} />
        <div aria-hidden="true" className="relative mb-6 flex flex-col items-center">
          {/* Flame. */}
          <div className="relative h-16 w-8 origin-bottom transition-transform duration-300" style={{ transform: `rotate(${lean}deg)` }}>
            {lit ? (
              <div key="flame" className="absolute inset-0 origin-bottom animate-candle-flicker motion-reduce:animate-none">
                <span className="absolute bottom-0 left-1/2 h-20 w-12 -translate-x-1/2 rounded-full bg-orange-400/30 blur-xl" />
                <span className="absolute bottom-0 left-1/2 h-14 w-6 -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-linear-to-t from-orange-500 via-amber-300 to-yellow-100 blur-[1px]" />
                <span className="absolute bottom-0.5 left-1/2 h-7 w-3 -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-linear-to-t from-sky-500/80 via-white to-white/80" />
              </div>
            ) : (
              <svg key={smoke} viewBox="0 0 40 120" className="absolute bottom-0 left-1/2 h-32 w-10 -translate-x-1/2 animate-candle-smoke motion-reduce:hidden">
                <path d="M20 118 C10 96 30 84 18 62 C8 44 28 30 20 4" fill="none" stroke="rgb(214 211 209 / 0.6)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className="h-3 w-0.5 bg-neutral-900" />
          {/* Wax. */}
          <div className="relative w-16 rounded-t-[40%_20%] rounded-b-sm bg-linear-to-r from-amber-100 via-[#fff8e7] to-amber-200 shadow-[inset_-6px_0_10px_rgb(0_0_0/0.12)] transition-[height] duration-1000" style={{ height }}>
            <span className="absolute top-1 left-2 h-8 w-2.5 rounded-b-full bg-[#fffaf0]" />
            <span className="absolute top-1 right-3 h-12 w-2 rounded-b-full bg-[#fffaf0]" />
          </div>
          <span className="h-3 w-28 rounded-[50%] bg-linear-to-b from-neutral-400 to-neutral-600" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {lit ? (
          <button type="button" onClick={blowOut} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50">
            <Wind aria-hidden="true" className="size-4" />
            Blow it out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (left <= 8) {
                leftRef.current = 100
                setLeft(100)
              }
              litRef.current = true
              setLit(true)
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Flame aria-hidden="true" className="size-4" />
            {left <= 8 ? "New candle" : "Light it"}
          </button>
        )}
        {microphone ? (
          <button
            type="button"
            aria-pressed={listening}
            onClick={listen}
            className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Mic aria-hidden="true" className="size-4" />
            {listening ? "Listening…" : "Blow into the mic"}
          </button>
        ) : null}
      </div>
      <p role="status" className="text-center text-sm text-muted-foreground">
        {lit ? `Burning, ${Math.round(left)}% left.` : left <= 8 ? "Burnt down to the end." : "Out. A wisp of smoke rises."}
      </p>
    </div>
  )
}

export { Candle }
